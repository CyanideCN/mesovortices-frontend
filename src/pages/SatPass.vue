<template>
  <div class='row'>
    <div class='col-md-2 col-xs-6 offset-xs-3 offset-md-0'>
      <q-select map-options v-model="atcf" :options="atcfOptions" label="热带气旋" outlined square emit-value />
    </div>
    <div class='col-md-8 col-xs-12'>
      <q-img v-if="pic_url" :src="pic_url" fit="contain" no-transition />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'

const callBackend = function (api) {
  return axios.get('https://mesovortices.com/' + api)
}

export default defineComponent({
  name: 'SatPass',
  created () {
    callBackend('api/get_active_storms')
      .then(x => {
        if (x.data.code === 0) {
          this.atcfOptions = []
          x.data.storms.forEach(element => {
            this.atcfOptions.push({ label: element, value: element.substring(0, 3) }
            )
          })
          this.atcf = x.data.storms[0].substring(0, 3)
        }
      })
  },
  setup () {
    const q = useQuasar()
    return {
      q: ref(q),
      pic_url: ref(''),
      atcf: ref(''),
      atcfOptions: ref([])
    }
  },
  watch: {
    atcf: function (val) {
      if (val === '') {
        return
      }
      callBackend('api/get_latest_satpass?atcf_code=' + this.atcf)
        .then(x => {
          if (x.data.code === 0) {
            this.pic_url = x.data.path
          }
        })
    }
  }
})
</script>
