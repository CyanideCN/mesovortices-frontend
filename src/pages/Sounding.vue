<template>
  <div class="row">
    <div class="col-xs-9 offset-xs-1 col-sm-3 offset-sm-2">
    <q-input color="grey-3" label-color="black" outlined v-model="text" placeholder='输入WMO站号'>
      <template v-slot:append>
        <q-btn icon="eva-search-outline" @click="onClick" unelevated />
      </template>
    </q-input>
    </div>
    <div class="col-xs-5 offset-xs-1 col-sm-2 offset-sm-1">
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
      :options="time_options"
      color="primary"
      size="xs"
      class="time_option_group"
      />
    </div>
    <div class='col'>
      <q-option-group
      v-model="mode"
      :options="mode_options"
      color="primary"
      size="xs"
      class="mode_option_group"
      />
    </div>
  </div>
  <div class='row'>
    <div class='col-sm-8 offset-sm-2 col-xs-12'>
      <q-img
        v-if="pic_url"
        :src="pic_url"
        fit="contain"
      />
      <q-table
        v-if="level_data"
        :rows="level_data"
        row-key="pressure"
        :pagination="{ rowsPerPage: 50 }"
        separator="cell"
        :columns="columns"
        dense
      />
    </div>
  </div>
</template>

<style>
</style>

<script>
import { defineComponent, ref } from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

const tableCols = [{ name: 'pressure', align: 'center', label: 'PRES (hPa)', field: 'pressure', sortable: false },
  { name: 'temperature', align: 'center', label: 'TEMP (degC)', field: 'temperature', sortable: false },
  { name: 'dewpoint', align: 'center', label: 'DWPT (degC)', field: 'dewpoint', sortable: false },
  { name: 'geopotential', align: 'center', label: 'HGHT (gpm)', field: 'geopotential', sortable: false },
  { name: 'wind_direction', align: 'center', label: 'WDIR (deg)', field: 'wind_direction', sortable: false },
  { name: 'wind_speed', align: 'center', label: 'WSPD (m/s)', field: 'wind_speed', sortable: false }]

const callBackend = function (api) {
  return axios.get('https://mesovortices.com/' + api)
}

export default defineComponent({
  name: 'Sounding',
  methods: {
    onClick () {
      const stationId = this.text
      if (stationId === '') {
        Notify.create({
          message: '站号不能为空',
          position: 'top',
          color: 'red',
          textColor: 'white'
        })
        return
      }
      let dstring = this.date + this.time_pick.replace('Z', '')
      dstring = dstring.replaceAll('/', '')
      if (this.mode === 'pic') {
        callBackend('api/get_sounding_plot?stid=' + stationId + '&time=' + dstring)
          .catch(error => {
            console.log(error)
            Notify.create({
              message: '连接错误，请稍后重试',
              position: 'top',
              color: 'red',
              textColor: 'white'
            })
          }).then(x => {
            if (x.data.code !== 0) {
              Notify.create({
                message: x.data.msg,
                position: 'top',
                color: 'red',
                textColor: 'white'
              })
            } else {
              this.level_data = ''
              this.pic_url = x.data.path
            }
          })
      } else if (this.mode === 'text') {
        callBackend('api/get_sounding_data?stid=' + stationId + '&time=' + dstring)
          .catch(error => {
            console.log(error)
            Notify.create({
              message: '连接错误，请稍后重试',
              position: 'top',
              color: 'red',
              textColor: 'white'
            })
          })
          .then(x => {
            if (x.data.code !== 0) {
              Notify.create({
                message: x.data.msg,
                position: 'top',
                color: 'red',
                textColor: 'white'
              })
            } else if (x.status !== 200) {
              Notify.create({
                message: '连接错误，请稍后重试',
                position: 'top',
                color: 'red',
                textColor: 'white'
              })
            } else {
              this.pic_url = ''
              this.level_data = JSON.parse(x.data.msg)
            }
          })
      }
    }
  },
  setup () {
    const d = new Date().toISOString().substring(0, 10).replaceAll('-', '/')
    return {
      columns: tableCols,
      date: ref(d),
      time_pick: ref('00Z'),
      pic_url: ref(''),
      mode: ref('pic'),
      level_data: ref(''),
      time_options: [
        {
          label: '00Z',
          value: '00Z'
        },
        {
          label: '12Z',
          value: '12Z'
        }
      ],
      mode_options: [{
        label: '图片',
        value: 'pic'
      },
      {
        label: '表格',
        value: 'text'
      }]
    }
  },
  data () {
    return {
      text: ''
    }
  }
})
</script>

<style>
.mode_option_group .q-radio {
  margin-right: 0px;
}
.time_option_group .q-radio {
  margin-right: 0px;
}
</style>
