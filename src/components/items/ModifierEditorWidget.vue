<script setup lang="ts">

import { Modifier, ModifierType } from "@/types/Modifier";
import { ModifiableTag } from "@/types/Modifiable";

const modifier = defineModel('modifier', {
  type: Modifier,
  default: new Modifier()
});
</script>

<template>
  <h4>Modifier</h4>
  <v-divider class="mb-3" />
  <game-object-editor :object="modifier" />
  <modifiable-editor-widget :modifiable="modifier" />
  <v-row>
    <v-col cols="6">
      <v-select
        v-model="modifier.modifierType"
        :items="Object.values(ModifierType)"
        label="Scaling Type"
        outlined
      />
    </v-col>
    <v-col cols="6">
      <v-select
        v-model="modifier.target"
        :items="Object.values(ModifiableTag)"
        label="Target"
        outlined
      />
    </v-col>
  </v-row>
</template>

<style scoped lang="sass">

</style>
