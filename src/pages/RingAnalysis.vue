<template>
  <div class="row">
  </div>
  <div class='row'>
    <div class='col-8 offset-2'>
      <q-img
        v-if="pic_url"
        :src=pic_url
        fit="contain"
      />
    </div>
  </div>
    <div class='row'>
      <div class='col-8 offset-2'>
        <q-img
          src="https://mesovortices.com/media/Ring_Stat.png"
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
  name: 'RingAnalysis',
  methods: {
    created () {
    }
  },
  setup () {
    return {
      pic_url: ref('')
    }
  },
  data () {
    callBackend('api/get_latest_ring_analysis')
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
})
</script>
