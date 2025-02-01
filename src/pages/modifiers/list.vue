<script setup lang="ts">
  import ModifierList from '@/components/modifiers/ModifierList.vue';
</script>

<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <modifier-list />
    </v-responsive>
  </v-container>
</template>

<style scoped lang="sass"></style>
