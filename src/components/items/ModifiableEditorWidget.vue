<script setup lang="ts">
import {
  Modifiable,
  ModifiableTag
} from "@/types/Modifiable";

const modifiable = defineModel<Modifiable>('modifiable', {
  required: true,
});
</script>

<template>
  <v-row>
    <v-col cols="6">
      <v-text-field
        v-model.number="modifiable.baseVal"
        label="Base Value"
        outlined
        class="mb-3"
        type="number"
        step="1"
      />
    </v-col>
    <v-col cols="6">
      <v-select
        v-model="modifiable.tags"
        :items="Object.values(ModifiableTag)"
        label="Tags"
        multiple
        outlined
      />
    </v-col>
  </v-row>
</template>

<style scoped lang="sass">

</style>
