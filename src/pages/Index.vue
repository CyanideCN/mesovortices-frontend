<template>
  <div class="q-col-gutter-md row items-start">
    <div class="col-sm-4 col-xs-8 offset-xs-2 offset-sm-0">
      <q-img src="https://mesovortices.com/api/static/skewt.png" :ratio="16/9">
        <div class="absolute-full text-h4 flex flex-center">
          <q-item to="sounding">
            Sounding Skew-T
          </q-item>
        </div>
      </q-img>
    </div>
    <div class="col-sm-4 col-xs-8 offset-xs-2 offset-sm-0">
      <q-img src="https://mesovortices.com/api/static/models.png" :ratio="16/9">
        <div class="absolute-full text-h4 flex flex-center">
          <q-item to="models">
            Model Prediction
          </q-item>
        </div>
      </q-img>
    </div>
      <div class="col-sm-4 col-xs-8 offset-xs-2 offset-sm-0">
        <q-img src="https://mesovortices.com/api/static/ringanl.png" :ratio="16 / 9">
          <div class="absolute-full text-h4 flex flex-center">
            <q-item to="ringanalysis">
              Ring Analysis
            </q-item>
          </div>
        </q-img>
      </div>
    <div class="col-sm-4 col-xs-8 offset-xs-2 offset-sm-0">
      <q-img src="https://mesovortices.com/api/static/stforecast.png" :ratio="16/9">
        <div class="absolute-full text-h4 flex flex-center">
          <q-item to="stforecast">
            Station Forecast
          </q-item>
        </div>
      </q-img>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageIndex'
})
</script>
