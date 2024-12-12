<script setup lang="ts">

import ItemEditor from "@/components/ItemEditor.vue";

const router = useRouter();
const route = useRoute('/items/[[id]]');
const id = route.params.id;

function done() {
  router.back();
}
</script>

<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <h3>Item Editor</h3>
      <v-divider class="mb-5" />
      <ItemEditor
        :item-id="id"
        @done="done"
      />
    </v-responsive>
  </v-container>
</template>

<style scoped lang="sass">

</style>
