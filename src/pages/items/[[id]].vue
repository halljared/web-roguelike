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
  <ItemEditor
    :item-id="id"
    @done="done"
  />
</template>

<style scoped lang="sass">

</style>
