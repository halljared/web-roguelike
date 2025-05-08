<script setup lang="ts">
  import type { IModifiable } from '@/models/interfaces/IModifiable';
  import { ModifiableTag } from '@/models/types';

  const modifiable = defineModel<IModifiable>('modifiable', {
    required: true,
  });
  const emit = defineEmits<{
    (e: 'update:modifiable', modifiable: IModifiable): void;
  }>();

  function onChange() {
    emit('update:modifiable', modifiable.value);
  }
</script>

<template>
  <v-row>
    <v-col cols="6">
      <v-text-field
        v-model.number="modifiable.baseVal"
        label="Base Value"
        outlined
        type="number"
        step="1"
        @change="onChange"
      />
    </v-col>
    <v-col cols="6">
      <v-select
        v-model="modifiable.tags"
        :items="Object.values(ModifiableTag)"
        label="Tags"
        multiple
        outlined
        @update:modelValue="onChange"
      />
    </v-col>
  </v-row>
</template>

<style scoped lang="sass"></style>
