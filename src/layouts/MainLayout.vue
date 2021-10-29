<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff">
      <q-header elevated class="bg-black">
        <q-toolbar>
          <q-toolbar-title>Mesovortices</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="400"
      >
        <q-scroll-area class="fit">
          <q-list padding class="menu-list">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="eva-thermometer-outline" />
              </q-item-section>

              <q-item-section>
                Observation
              </q-item-section>
            </q-item>

            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="eva-globe-2-outline" />
              </q-item-section>

              <q-item-section>
                Satellite
              </q-item-section>
            </q-item>
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
</script>
