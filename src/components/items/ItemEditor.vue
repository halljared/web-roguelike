<script setup lang="ts">
import { Item } from "@/types/Item";
import { Attribute } from "@/types/Attribute";
import { Modifier } from "@/types/Modifier";

const item = defineModel('item', {
  type: Item,
  required: true
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
  <h4>Attributes</h4>
  <v-divider :class="{ 'mb-6': item.attributes.length > 0 }" />
  <v-row
    v-for="(attribute, index) in item.attributes"
    :key="index"
  >
    <v-col
      cols="11"
      offset="1"
      class="py-0"
    >
      <attribute-editor-widget :attribute="attribute" />
    </v-col>
  </v-row>
  <v-row class="mt-0">
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
  <h4 class="mt-3">
    Modifiers
  </h4>
  <v-divider :class="{ 'mb-6': item.modifiers.length > 0 }" />
  <v-row
    v-for="(modifier, index) in item.modifiers"
    :key="index"
  >
    <v-col
      cols="11"
      offset="1"
      class="py-0"
    >
      <modifier-editor-widget :modifier="modifier" />
    </v-col>
  </v-row>
  <v-row class="mt-0">
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

<style scoped lang="sass">

</style>
