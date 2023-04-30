<template>
  <div id="q-app">
    <q-layout view="lHh Lpr fff">
      <q-page class="window-height window-width row justify-center items-center"
        style="background: linear-gradient(#FFFFFF, #70a7fa);">
        <div class="column q-pa-lg">
          <div class="row">
            <q-card square class="shadow-24" style="width:400px;height:540px;">
              <q-card-section class="bg-grey-9">
                <h4 class="text-h5 text-white q-my-md">{{ title }}</h4>
              </q-card-section>
              <q-card-section>
                <q-form class="q-px-sm q-pt-xl">
                  <q-input ref="email" square clearable v-model="email" type="email" lazy-rules
                    :rules="[this.required]" label="Email/用户名">
                    <template v-slot:prepend>
                      <q-icon name="email" />
                    </template>
                  </q-input>
                  <q-input ref="password" square clearable v-model="password" :type="passwordFieldType" lazy-rules
                    :rules="[this.required]" label="密码">
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                    <template v-slot:append>
                      <q-icon :name="visibilityIcon" @click="switchVisibility" class="cursor-pointer" />
                    </template>
                  </q-input>
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-lg">
                <q-btn unelevated size="lg" color="secondary" @click="submit" class="full-width text-white"
                  :label="btnLabel" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-layout>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { defineComponent } from 'vue'
import { Buffer } from 'buffer'
import { LocalStorage } from 'quasar'

import axios from 'axios'

const encode = function (st) {
  const b = Buffer.from(st)
  const s = b.toString('base64')
  return s
}

const decode = function (st) {
  const b = Buffer.from(st, 'base64')
  const s = b.toString()
  return s
}

export default defineComponent({
  el: '#q-app',
  data () {
    return {
      title: '账号登录',
      email: '',
      password: '',
      passwordFieldType: 'password',
      btnLabel: '登录',
      visibility: false,
      visibilityIcon: 'visibility'
    }
  },
  methods: {
    required (val) {
      return ((val && val.length > 0) || '请填写本栏')
    },
    submit () {
      this.$refs.email.validate()
      this.$refs.password.validate()
      if (this.$refs.email.hasError || this.$refs.password.hasError) {
        this.$q.notify({
          message: '输入有误',
          color: 'red',
          textColor: 'white'
        })
        return
      }
      axios.post('http://127.0.0.1:5000/ua/login',
        { user: encode(this.email), pwd: encode(this.password) })
        .then(x => {
          if (x.data.code !== 0) {
            this.$q.notify({
              message: x.data.msg,
              color: 'red',
              textColor: 'white'
            })
          } else {
            this.$q.notify({
              icon: 'done',
              color: 'positive',
              message: '登录成功，即将跳转上一页'
            })
            LocalStorage.set('sign', x.data.sign)
            LocalStorage.set('username', this.email)
            this.$router.back()
          }
        })
    },
    switchVisibility () {
      this.visibility = !this.visibility
      this.passwordFieldType = this.visibility ? 'text' : 'password'
      this.visibilityIcon = this.visibility ? 'visibility_off' : 'visibility'
    }
  }
})
</script>
