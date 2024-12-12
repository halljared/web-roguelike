<script setup lang="ts">
import {Modifier, ModifierType} from "@/types/Modifier";

const modifier = new Modifier(ModifierType.ADDITIVE, 0);
const enumOptions = Object.values(ModifierType).map((value) => ({
  text: value,
  value: value
}));
</script>

<template>
  <v-select
    label="Type"
    :items="enumOptions"
    item-value="value"
    item-title="text"
  />
</template>

<style scoped lang="sass">

</style>
