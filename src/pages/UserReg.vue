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
                    :rules="[this.required, this.isEmail]" label="Email">
                    <template v-slot:prepend>
                      <q-icon name="email" />
                    </template>
                  </q-input>
                  <q-input ref="username" square clearable v-model="username" lazy-rules
                    :rules="[this.required]" type="username" label="用户名">
                    <template v-slot:prepend>
                      <q-icon name="person" />
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
      title: '账号注册',
      email: '',
      username: '',
      password: '',
      repassword: '',
      passwordFieldType: 'password',
      btnLabel: '注册',
      visibility: false,
      visibilityIcon: 'visibility'
    }
  },
  methods: {
    required (val) {
      return ((val && val.length > 0) || '请填写本栏')
    },
    isEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return (emailPattern.test(val) || '请输入正确邮箱地址')
    },
    submit () {
      this.$refs.email.validate()
      this.$refs.username.validate()
      this.$refs.password.validate()
      if (this.$refs.email.hasError || this.$refs.password.hasError) {
        this.$q.notify({
          message: '输入有误',
          color: 'red',
          textColor: 'white'
        })
        return
      }
      axios.post('http://127.0.0.1:5000/ua/register',
        { email: encode(this.email), username: this.username, pwd: encode(this.password) })
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
              message: '注册成功，即将跳转登录页面'
            })
            this.$router.push('/login')
          }
        })
    }
  }
})
</script>
