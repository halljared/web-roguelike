<script setup lang="ts">

import type { IGameObjectOptions } from "@/types/IGameObjectOptions";

const gameObjectOptions = defineModel('object', {
  type: Object as PropType<IGameObjectOptions>,
  required: true
});

const rules = [
  (value: string) => {
    if (value) return true
    return 'Field is required.'
  }
];

</script>

<template>
  <v-text-field
    v-model="gameObjectOptions.name"
    :rules="rules"
    label="Name"
  />
  <v-text-field
    v-model="gameObjectOptions.description"
    label="Description"
  />
</template>

<style scoped lang="sass">

</style>
