<script setup lang="ts">
  import { createModifier } from '@/models/Modifier';
  import type { IModifier } from '@/models/interfaces/IModifier';
  import { ModifiableTag, ModifierType, ModifierRarity } from '@/models/types';

  const modifier = defineModel<IModifier>('modifier', {
    default: () => createModifier(),
  });

  const props = defineProps({
    header: {
      type: Boolean,
      default: true,
    },
  });

  const emit = defineEmits<{
    (e: 'update:modifier', modifier: IModifier): void;
  }>();

  function handleModifierUpdate() {
    emit('update:modifier', modifier.value);
  }
</script>

<template>
  <h4 v-if="header">Modifier</h4>
  <v-divider
    v-if="header"
    class="mb-3"
  />
  <game-object-editor :object="modifier" />
  <modifiable-editor-widget
    :modifiable="modifier"
    @update:modifiable="handleModifierUpdate"
  />
  <v-row>
    <v-col cols="6">
      <v-select
        v-model="modifier.modifierType"
        :items="Object.values(ModifierType)"
        label="Scaling Type"
        outlined
        @update:model-value="handleModifierUpdate"
      />
    </v-col>
    <v-col cols="6">
      <v-select
        v-model="modifier.target"
        :items="Object.values(ModifiableTag)"
        label="Target"
        outlined
        @update:model-value="handleModifierUpdate"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="6">
      <v-select
        v-model="modifier.rarity"
        :items="Object.values(ModifierRarity)"
        label="Rarity"
        outlined
        @update:model-value="handleModifierUpdate"
      />
    </v-col>
  </v-row>
</template>

<style scoped lang="sass"></style>
