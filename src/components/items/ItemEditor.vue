<script setup lang="ts">
import { Item } from "@/types/Item";

const item = defineModel('item', {
  type: Item,
  required: true
});
</script>

<template>
  <game-object-editor :object="item">
    <h4>Attributes</h4>
    <v-divider class="mb-3" />
    <h4>Modifiers</h4>
    <v-divider class="mb-3" />
  </game-object-editor>
</template>

<style scoped lang="sass">

</style>
