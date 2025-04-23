<script setup lang="ts">
  import { Item } from '@/models/Item';
  import { Attribute } from '@/models/modifiables/Attribute';
  import { Modifier } from '@/models/Modifier';

  const item = defineModel('item', {
    type: Item,
    required: true,
  });

  function newAttribute() {
    item.value.attributes.push(new Attribute());
  }

  function newModifier() {
    item.value.modifiers.push(new Modifier());
  }
</script>

<template>
  <game-object-editor :object="item" />
  <h4 class="mt-3"> Attributes </h4>
  <v-divider class="mb-3" />
  <v-row
    v-for="(attribute, index) in item.attributes"
    :key="index"
  >
    <v-col
      cols="11"
      offset="1"
    >
      <attribute-editor-widget :attribute="attribute" />
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
  <h4 class="mt-3"> Modifiers </h4>
  <v-divider class="mb-3" />
  <v-row
    v-for="(modifier, index) in item.modifiers"
    :key="index"
  >
    <v-col
      cols="11"
      offset="1"
    >
      <modifier-editor-widget :modifier="modifier" />
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
