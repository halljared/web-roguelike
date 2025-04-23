<script setup lang="ts">
  import { createAttribute } from '@/models/modifiables/Attribute';
  import type { IAttribute } from '@/models/interfaces/IAttribute';

  const attribute = defineModel<IAttribute>('attribute', {
    default: () => createAttribute(),
  });
</script>

<template>
  <h4>Attribute</h4>
  <v-divider class="mb-3" />
  <game-object-editor :object="attribute" />
  <modifiable-editor-widget :modifiable="attribute" />
</template>

<style scoped lang="sass"></style>
