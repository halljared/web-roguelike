<script setup lang="ts">
  import { createAttribute } from '@/models/modifiables/Attribute';
  import type { IAttribute } from '@/models/interfaces/IAttribute';

  const attribute = defineModel<IAttribute>('attribute', {
    default: () => createAttribute(),
  });
  const emit = defineEmits<{
    (e: 'update:attribute', attribute: IAttribute): void;
  }>();

  function onChange() {
    emit('update:attribute', attribute.value);
  }
</script>

<template>
  <h4>Attribute</h4>
  <v-divider class="mb-3" />
  <game-object-editor :object="attribute" />
  <modifiable-editor-widget
    :modifiable="attribute"
    @update:modifiable="onChange"
  />
</template>

<style scoped lang="sass"></style>
