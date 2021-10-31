<template>
  <div class="row">
    <div class="col-xs-8 offset-xs-2 col-sm-5 offset-sm-3">
      <q-input color="grey-3" label-color="black" outlined v-model="text" placeholder='输入WMO站号'>
        <template v-slot:append>
          <q-btn icon="eva-search-outline" @click="onClick" unelevated />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'StationForecast',
  methods: {
    onClick () {
      const stationId = this.text
      console.log(stationId)
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
