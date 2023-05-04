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
      <q-option-group v-model="time_pick" :options="time_options" color="primary" size="xs" class="time_option_group" />
    </div>
    <div class='col'>
      <q-option-group v-model="mode" :options="mode_options" color="primary" size="xs" class="mode_option_group" />
    </div>
  </div>
  <div class='row'>
    <div class='col-sm-8 offset-sm-2 col-xs-12'>
      <q-img v-if="pic_url" :src="pic_url" fit="contain" />
      <q-table v-if="level_data" :rows="level_data" row-key="pressure" :pagination="{ rowsPerPage: 50 }" separator="cell"
        :columns="columns" dense />
    </div>
  </div>
</template>

<style></style>

<script>
import { defineComponent, ref } from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'
import verifyUser from 'src/assets/authtool'

const callBackend = function (api) {
  return axios.get('https://mesovortices.com/' + api)
}

const createWarning = function (text) {
  Notify.create({
    message: text,
    position: 'top',
    color: 'red',
    textColor: 'white'
  })
}

export default defineComponent({
  name: 'Sounding',
  methods: {
    onClick () {
      const stationId = this.text
      if (stationId === '') {
        createWarning('站号不能为空')
        return
      }
      const timestamp = Date.now()
      if ((timestamp - this.last_click_time) < 5000) {
        createWarning('请勿快速重复点击')
        this.last_click_time = timestamp
        return
      }
      this.last_click_time = timestamp
      let dstring = this.date + this.time_pick.replace('Z', '')
      dstring = dstring.replaceAll('/', '')
      callBackend('api/protected/get_sounding_plot?stid=' + stationId + '&time=' + dstring)
        .catch(error => {
          console.log(error)
          createWarning('连接错误，请稍后重试')
        }).then(x => {
          if (x.data.code !== 0) {
            createWarning(x.data.msg)
          } else {
            this.level_data = ''
            this.pic_url = x.data.path
          }
        })
    }
  },
  setup () {
    const d = new Date().toISOString().substring(0, 10).replaceAll('-', '/')
    return {
      date: ref(d),
      time_pick: ref('00Z'),
      pic_url: ref(''),
      mode: ref('pic'),
      level_data: ref(''),
      last_click_time: ref(0),
      time_options: [
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
  },
  beforeCreate () {
    verifyUser().then(flag => {
      if (!flag) {
        Notify.create({
          message: '请先登录',
          color: 'red',
          textColor: 'white'
        })
        this.$router.push('/ulogin')
      }
    })
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
