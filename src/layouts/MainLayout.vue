<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff">
      <q-header elevated class="bg-black">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Mesovortices</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="220"
        :breakpoint="500"
      >
        <q-scroll-area class="fit">
          <q-list class="rounded-borders">
            <q-item
              icon="eva-globe-2-outline"
              label="Home"
              to="/"
            >
              <q-item-section avatar>
                <q-icon name="eva-home-outline" />
              </q-item-section>

              <q-item-section>
                Home
              </q-item-section>
            </q-item>
            <q-expansion-item
              expand-separator
              icon="eva-thermometer-outline"
              label="Current Observation"
            >
              <q-card>
                <q-card-section>
                  <q-item clickable dense to="sounding">
                    Sounding Skew-T
                  </q-item>
                  <q-item clickable dense to="observation">
                    Surface Observation
                  </q-item>
                  <q-item clickable dense to="fengyuobs">
                    Fengyu Weather Station
                  </q-item>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item expand-separator icon="assessment" label="Forecast">
              <q-card>
                <q-card-section>
                  <q-item dense clickable to="stforecast">
                    Station Forecast
                  </q-item>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item
              expand-separator
              icon="eva-globe-outline"
              label="Satellite"
            >
              <q-card>
                <q-card-section>
                  <q-item dense clickable to="ringanalysis">
                    Dvorak Ring Analysis
                  </q-item>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item
              expand-separator
              icon="eva-book-outline"
              label="Miscellaneous"
            >
              <q-card>
                <q-card-section>
                  <q-item dense clickable to="typhoonsim">
                    Typhoon Track Simulation
                  </q-item>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      drawer: ref(false)
    }
  }
}
</script>
