<script setup lang="ts">
  import type { IGameObject } from '@/models/interfaces/IGameObject';
  const gameObjectOptions = defineModel('object', {
    type: Object as PropType<IGameObject>,
    required: true,
  });

  const rules = [
    (value: string) => {
      if (value) return true;
      return 'Field is required.';
    },
  ];
</script>

<template>
  <v-row>
    <v-col>
      <v-text-field
        v-model="gameObjectOptions.name"
        :rules="rules"
        label="Name"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-text-field
        v-model="gameObjectOptions.description"
        label="Description"
      />
    </v-col>
  </v-row>
</template>

<style scoped lang="sass"></style>
