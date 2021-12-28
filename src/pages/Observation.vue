<template>
  <div class="row">
    <div class="col-xs-9 offset-xs-2 col-sm-5 offset-sm-3">
      <q-slider v-model="index" :min="0" :max="11" :step="1" snap/>
    </div>
  </div>
  <div class='row'>
    <div class='col-2'>
      <q-select
        map-options v-model="area" :options="areaOptions"
        label="绘图区域" outlined square emit-value
      />
      <q-select
        map-options v-model="type" :options="typeOptions"
        label="要素" outlined square emit-value
      />
    </div>
    <div class='col-8'>
      <q-img
        v-if="pic_url"
        :src="pic_url"
        fit="contain"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

const callBackend = function (api) {
  return axios.get('https://mesovortices.com/' + api)
}

export default {
  setup () {
    const initType = 'snowd'
    const initArea = 'nc'
    return {
      index: ref(11),
      type: ref(initType),
      area: ref(initArea),
      imgList: ref([]),
      areaOptions: [{ label: '华北地区', value: 'nc' },
        { label: '东北地区', value: 'nec' },
        { label: '华东地区', value: 'ec' },
        { label: '西南地区', value: 'swc' },
        { label: '华南地区', value: 'sc' },
        { label: '中北地区', value: 'mn' },
        { label: '青藏地区', value: 'qz' },
        { label: '新疆', value: 'xj' }],
      typeOptions: [{ label: '6小时最大雪深', value: 'snowd' },
        { label: '24小时最大雪深', value: 'snowd24' },
        { label: '现在天气', value: 'cww' },
        { label: '露点变温', value: 'tdd' }
      ]
    }
  },
  created () {
    callBackend('api/get_obs_plot?type=' + this.type + '&area=' + this.area)
      .then(x => {
        if (x.data.code !== 0) {
          Notify.create({
            message: x.data.msg,
            position: 'top',
            color: 'red',
            textColor: 'white'
          })
        } else {
          this.imgList = x.data.paths
        }
      })
      .catch(function (e) {
        this.imgList = []
      })
  },
  computed: {
    pic_url: function () {
      if (this.imgList == null) {
        return ''
      } else {
        let i = 0
        if (this.imgList.length < 12) {
          i = 12 - this.imgList.length
        }
        let trueIndex = this.index - i
        if (trueIndex < 0) {
          trueIndex = 0
        }
        return this.imgList[trueIndex]
      }
    }
  },
  watch: {
    type: function (val) {
      callBackend('api/get_obs_plot?type=' + val + '&area=' + this.area)
        .then(x => {
          if (x.data.code !== 0) {
            Notify.create({
              message: x.data.msg,
              position: 'top',
              color: 'red',
              textColor: 'white'
            })
          } else {
            this.imgList = x.data.paths
          }
        })
        .catch(function (e) {
          this.imgList = []
        })
    },
    area: function (val) {
      callBackend('api/get_obs_plot?type=' + this.type + '&area=' + val)
        .then(x => {
          if (x.data.code !== 0) {
            Notify.create({
              message: x.data.msg,
              position: 'top',
              color: 'red',
              textColor: 'white'
            })
          } else {
            this.imgList = x.data.paths
          }
        })
        .catch(function (e) {
          this.imgList = []
        })
    }
  },
  methods: {
    onTypeSelectorClick (type) {
      this.type = type
      console.log(type)
    }
  }
}
</script>
