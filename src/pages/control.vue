<script setup lang="ts">

</script>

<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <v-row>
        <v-col cols="6">
          <v-sheet
            :elevation="6"
            class="pa-2"
            rounded
          >
            <h2>Items</h2>
            <v-divider />
            <router-link
              v-slot="{ navigate }"
              to="/items/list"
              custom
            >
              <v-btn
                class="mb-3"
                color="grey-lighten-1"
                block
                @click="navigate"
              >
                List
              </v-btn>
            </router-link>
            <router-link
              v-slot="{ navigate }"
              to="/items"
              custom
            >
              <v-btn
                class="mb-3"
                color="green-lighten-2"
                elevation="2"
                block
                @click="navigate"
              >
                Create
              </v-btn>
            </router-link>
            <router-link
              v-slot="{ navigate }"
              to="/playground"
              custom
            >
              <v-btn
                class="mb-3"
                color="blue-lighten-2"
                elevation="2"
                block
                @click="navigate"
              >
                Playground
              </v-btn>
            </router-link>
          </v-sheet>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<style scoped lang="sass">

</style>
