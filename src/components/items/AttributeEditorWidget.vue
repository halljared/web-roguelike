<script setup lang="ts">

import { Attribute } from "@/types/Attribute";

const attribute = defineModel({
  type: Attribute,
  default: new Attribute({ description: "", name: "" })
});
const rules = [
  (value: string) => {
    if (value) return true
    return 'Field is required.'
  }
];
</script>

<template>
  <h4>Attribute</h4>
  <v-divider class="mb-3" />
  <v-text-field
    v-model="attribute.name"
    :rules="rules"
    label="Name"
  />
  <v-text-field
    v-model="attribute.description"
    :rules="rules"
    label="Description"
  />
</template>

<style scoped lang="sass">

</style>
