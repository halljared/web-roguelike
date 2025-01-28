<script setup lang="ts">

import { Attribute } from "@/models/Attribute";

const attribute = defineModel('attribute', {
  type: Attribute,
  default: new Attribute()
});
</script>

<template>
  <h4>Attribute</h4>
  <v-divider class="mb-3" />
  <game-object-editor :object="attribute" />
  <modifiable-editor-widget :modifiable="attribute" />
</template>

<style scoped lang="sass">

</style>
