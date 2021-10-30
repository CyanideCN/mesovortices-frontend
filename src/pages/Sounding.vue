<template>
  <div class="row">
    <div class="col-6 offset-3">
    <q-input color="grey-3" label-color="black" outlined v-model="text" placeholder='输入WMO站号'>
      <template v-slot:append>
        <q-btn icon="eva-search-outline" @click="onClick" unelevated />
      </template>
    </q-input>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Sounding',
  methods: {
    onClick () {
      console.log(this.text)
    }
  }
})
</script>
