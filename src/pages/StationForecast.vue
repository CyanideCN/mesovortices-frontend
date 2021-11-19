<template>
  <div class="row">
    <div class="col-xs-8 offset-xs-2 col-sm-4 offset-sm-4">
      <q-input color="grey-3" label-color="black" outlined v-model="text" placeholder='输入WMO站号'>
        <template v-slot:append>
          <q-btn icon="eva-search-outline" @click="onClick" unelevated />
        </template>
      </q-input>
    </div>
  </div>
  <div class='row'>
    <div class='col-8 offset-2'>
      <q-img
        v-if="pic_url"
        :src="pic_url"
        fit="contain"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

const callBackend = function (api) {
  return axios.get('https://mesovortices.com/' + api)
}

export default defineComponent({
  name: 'StationForecast',
  methods: {
    onClick () {
      const stationId = this.text
      callBackend('api/get_nmc_fcst_plot?stid=' + stationId)
        .then(x => {
          if (x.data.code !== 0) {
            Notify.create({
              message: x.data.msg,
              position: 'top',
              color: 'red',
              textColor: 'white'
            })
          } else {
            this.pic_url = x.data.path
          }
        })
    }
  },
  setup () {
    return {
      pic_url: ref('')
    }
  },
  data () {
    return {
      text: ''
    }
  }
})
</script>
