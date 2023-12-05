<template>
  <div class="row" v-if="!q.platform.is.mobile || q.platform.is.ipad">
    <div class="col-6 offset-3">
      <q-slider v-model="index" :min="0" :max="max_length" :step="1" markers :marker-labels="markerlabel" snap/>
    </div>
  </div>
  <div class='row'>
    <div class='col-md-2 col-xs-6 offset-xs-3 offset-md-0'>
      <q-select
        map-options v-model="time" :options="timeOptions"
        label="起报时次" outlined square emit-value
      />
      <q-select
        map-options v-model="type" :options="typeOptions"
        label="产品" outlined square emit-value
      />
    </div>
    <div class="col-10 offset-1" v-if="q.platform.is.mobile && !q.platform.is.ipad">
      <q-slider v-model="index" :min="0" :max="max_length" :step="1" markers :marker-labels="markerlabel" snap/>
    </div>
    <div class='col-md-8 col-xs-12'>
      <q-img
        v-if="pic_url"
        :src="pic_url"
        fit="contain"
        no-transition
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { Notify, useQuasar } from 'quasar'

const callBackend = function (api) {
  return axios.get('https://mesovortices.com/' + api)
}

export default {
  setup () {
    const initType = 'EPS_T850H500'
    const q = useQuasar()
    return {
      index: ref(0),
      type: ref(initType),
      time: ref(null),
      max_length: ref(0),
      q: ref(q),
      imgList: ref([]),
      timeOptions: ref([]),
      typeOptions: [
        { label: 'EPS850温度500位势', value: 'EPS_T850H500' }
      ]
    }
  },
  created () {
    callBackend('api/get_nwp_runs?product=' + this.type)
      .then(x => {
        if (x.data.code !== 0) {
          Notify.create({
            message: x.data.msg,
            position: 'top',
            color: 'red',
            textColor: 'white'
          })
        } else {
          this.timeOptions = []
          x.data.runs.forEach(element => {
            this.timeOptions.push({ label: element, value: element }
            )
          })
          this.time = x.data.runs[0]
        }
      })
      .catch(function (e) {
        this.timeOptions = []
      })
  },
  computed: {
    pic_url: function () {
      if (this.imgList == null) {
        return ''
      } else {
        return this.imgList[this.index]
      }
    },
    markerlabel: function () {
      if (this.imgList == null) {
        return ''
      } else {
        console.log(this.index)
        return this.index * 24
      }
    }
  },
  watch: {
    type: function (val) {
      if (this.time == null) {
        return
      }
      callBackend('api/get_nwp_plot?product=' + this.type + '&basetime=' + this.time)
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
            this.max_length = this.imgList.length - 1
          }
        })
        .catch(function (e) {
          this.imgList = []
        })
    },
    time: function (val) {
      if (val == null) {
        return
      }
      callBackend('api/get_nwp_plot?product=' + this.type + '&basetime=' + this.time)
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
            this.max_length = this.imgList.length - 1
          }
        })
        .catch(function (e) {
          this.imgList = []
        })
    }
  }
}
</script>
