<script setup lang="ts">

import { Modifier } from "@/types/Modifier";

const modifier = defineModel('modifier', {
  type: Modifier,
  default: new Modifier()
});
</script>

<template>
  <h4>Modifier</h4>
  <v-divider class="mb-3" />
  <game-object-editor :object="modifier" />
</template>

<style scoped lang="sass">

</style>
