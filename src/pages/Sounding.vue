<template>
  <div class="row">
    <div class="col-xs-8 offset-xs-2 col-sm-3 offset-sm-3">
    <q-input color="grey-3" label-color="black" outlined v-model="text" placeholder='输入WMO站号'>
      <template v-slot:append>
        <q-btn icon="eva-search-outline" @click="onClick" unelevated />
      </template>
    </q-input>
    </div>
    <div class="col-xs-8 offset-xs-2 col-sm-2 offset-sm-1">
      <q-input filled v-model="date" mask="date" :rules="['date']">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date v-model="date">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class='col'>
      <q-option-group
      v-model="time_pick"
      :options="options"
      color="primary"
      size="xs"
      />
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

<style>
</style>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Sounding',
  methods: {
    onClick () {
      const stationId = this.text
      const dstring = this.date + ' ' + this.time_pick
      console.log(stationId)
      console.log(dstring)
    }
  },
  setup () {
    const d = new Date().toISOString().substring(0, 10).replaceAll('-', '/')
    return {
      date: d,
      time_pick: ref('00Z'),
      pic_url: ref(''),
      options: [
        {
          label: '00Z',
          value: '00Z'
        },
        {
          label: '12Z',
          value: '12Z'
        }
      ]
    }
  },
  data () {
    return {
      text: ''
    }
  }
})
</script>
