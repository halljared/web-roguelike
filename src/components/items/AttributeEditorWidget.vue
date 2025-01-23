<script setup lang="ts">

import { Attribute } from "@/types/Attribute";

const attribute = defineModel('attribute', {
  type: Attribute,
  default: new Attribute({ description: "", name: "" })
});
</script>

<template>
  <h4>Attribute</h4>
  <v-divider class="mb-3" />
  <game-object-editor :object="attribute" />
</template>

<style scoped lang="sass">

</style>
