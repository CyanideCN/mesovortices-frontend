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
                <q-fab color="primary" @click="switchTypeForm" icon="add" class="absolute"
                  style="top: 0; right: 12px; transform: translateY(-50%);">
                  <q-tooltip>
                    新用户注册
                  </q-tooltip>
                </q-fab>
                <q-form class="q-px-sm q-pt-xl">
                  <q-input ref="email" square clearable v-model="email" type="email" lazy-rules
                    :rules="[this.required, this.isEmail]" label="Email">
                    <template v-slot:prepend>
                      <q-icon name="email" />
                    </template>
                  </q-input>
                  <q-input ref="username" v-if="register" square clearable v-model="username" lazy-rules
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
                  <q-input ref="repassword" v-if="register" square clearable v-model="repassword"
                    :type="passwordFieldType" lazy-rules :rules="[this.required, this.diffPassword]"
                    label="重复密码">
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
import { defineComponent } from 'vue'

export default defineComponent({
  el: '#q-app',
  data () {
    return {
      title: '账号登录',
      email: '',
      username: '',
      password: '',
      repassword: '',
      register: false,
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
    diffPassword (val) {
      const val2 = this.$refs.password.value
      return ((val && (val === val2)) || '密码不匹配')
    },
    isEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return (emailPattern.test(val) || '请输入正确邮箱地址')
    },
    submit () {
      if (this.register) {
        this.$refs.email.validate()
        this.$refs.username.validate()
        this.$refs.password.validate()
        this.$refs.repassword.validate()
      } else {
        this.$refs.email.validate()
        this.$refs.password.validate()
      }

      if (!this.register) {
        if (!this.$refs.email.hasError && (!this.$refs.password.hasError)) {
          this.$q.notify({
            icon: 'done',
            color: 'positive',
            message: '登录成功'
          })
        }
      }
    },
    switchTypeForm () {
      this.register = !this.register
      this.title = this.register ? '账号注册' : '账号登录'
      this.btnLabel = this.register ? '注册' : '登录'
    },
    switchVisibility () {
      this.visibility = !this.visibility
      this.passwordFieldType = this.visibility ? 'text' : 'password'
      this.visibilityIcon = this.visibility ? 'visibility_off' : 'visibility'
    }
  }
})
</script>
