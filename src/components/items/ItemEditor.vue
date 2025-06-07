<script setup lang="ts">
  import type { IItem } from '@/models/interfaces/IItem';
  import type { IAttribute } from '@/models/interfaces/IAttribute';
  import type { IModifier } from '@/models/interfaces/IModifier';
  import { createAttribute } from '@/models/modifiables/Attribute';
  import { createModifier } from '@/models/Modifier';
  import {
    useModifiableEventService,
    ModifiableEventType,
  } from '@/services/ModifiableEventService';

  const item = defineModel<IItem>('item', {
    required: true,
  });

  const modifiableEventService = useModifiableEventService();

  const emit = defineEmits<{
    (e: 'update:modifier', modifier: IModifier): void;
    (e: 'update:attribute', attribute: IAttribute): void;
  }>();

  function newAttribute() {
    const attribute = createAttribute();
    item.value.attributes.push(attribute);
    modifiableEventService.emit({
      type: ModifiableEventType.CREATED,
      modifiable: toRaw(attribute),
    });
  }

  function newModifier() {
    const modifier = createModifier();
    item.value.modifiers.push(modifier);
    modifiableEventService.emit({
      type: ModifiableEventType.CREATED,
      modifiable: toRaw(modifier),
    });
  }

  // Optional: Handle updates to existing attributes/modifiers
  function updateAttribute(attribute: IAttribute) {
    modifiableEventService.emit({
      type: ModifiableEventType.UPDATED,
      modifiable: toRaw(attribute),
    });
  }

  function updateModifier(modifier: IModifier) {
    modifiableEventService.emit({
      type: ModifiableEventType.UPDATED,
      modifiable: toRaw(modifier),
    });
  }
</script>

<template>
  <game-object-editor :object="item" />
  <h4 class="mt-3">Attributes</h4>
  <v-divider class="mb-3" />
  <v-row
    v-for="(attribute, index) in item.attributes"
    :key="index"
  >
    <v-col
      cols="11"
      offset="1"
    >
      <attribute-editor-widget
        :attribute="attribute"
        @update:attribute="updateAttribute"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col offset="1">
      <v-btn
        type="button"
        color="green-lighten-2"
        @click="newAttribute"
      >
        Add Attribute
      </v-btn>
    </v-col>
  </v-row>
  <h4 class="mt-3">Modifiers</h4>
  <v-divider class="mb-3" />
  <v-row
    v-for="(modifier, index) in item.modifiers"
    :key="index"
  >
    <v-col
      cols="11"
      offset="1"
    >
      <modifier-editor-widget
        :modifier="modifier"
        @update:modifier="updateModifier"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col offset="1">
      <v-btn
        type="button"
        color="green-lighten-2"
        @click="newModifier"
      >
        Add Modifier
      </v-btn>
    </v-col>
  </v-row>
</template>

<style scoped lang="sass"></style>
