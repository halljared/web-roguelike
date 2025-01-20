<script setup lang="ts">
import type { IGameObjectOptions } from "@/types/ModifiableGroup";

const gameObjectOptions = defineModel('object', {
  type: Object as PropType<IGameObjectOptions>,
  required: true
});

const rules = [
  (value: string) => {
    if (value) return true
    return 'Field is required.'
  }
];

</script>

<template>
  <v-text-field
    v-model="gameObjectOptions.name"
    :rules="rules"
    label="Name"
  />
  <v-text-field
    v-model="gameObjectOptions.description"
    :rules="rules"
    label="Description"
  />
  <slot />
  <!--  <h4>Attributes</h4>-->
  <!--  <v-divider class="mb-5" />-->
  <!--  <v-row-->
  <!--    v-for="(attribute, index) in item.modifiables"-->
  <!--    :key="attribute.id"-->
  <!--  >-->
  <!--    <v-col cols="12">-->
  <!--      <modifiable-editor-widget v-model="item.modifiables[index]" />-->
  <!--    </v-col>-->
  <!--  </v-row>-->
  <!--  <v-row>-->
  <!--    <v-col cols="12">-->
  <!--      <v-btn-->
  <!--        color="green-lighten-2"-->
  <!--        @click="newAttr()"-->
  <!--      >-->
  <!--        Add Attribute-->
  <!--      </v-btn>-->
  <!--    </v-col>-->
  <!--  </v-row>-->
</template>

<style scoped lang="sass">

</style>
