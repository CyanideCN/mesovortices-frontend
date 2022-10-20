<template>
  <div class="row">
    <div class='offset-5'>
      <q-btn outline no-caps rounded color="primary" label="Start Simulation" @click="onButtonClicked"/>
    </div>
  </div>
  <div class='row' v-if="sim_id">
    <span>Simulation id : {{sim_id}}</span>
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
import { ref, defineComponent } from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

export default defineComponent({
  setup () {
    return {
      pic_url: ref(null),
      sim_id: ref(null)
    }
  },
  methods: {
    onButtonClicked () {
      console.log('123')
      axios.get('https://mesovortices.com/api/get_tcsim_result')
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
            this.sim_id = x.data.sim_id
          }
        })
        .catch(function (e) {
          this.pic_url = null
        })
    }
  }
})
</script>
