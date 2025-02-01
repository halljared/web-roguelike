<script setup lang="ts">
import { useModifierStore } from "@/stores/modifierStore";

const store = useModifierStore();
const modifiers = store.list();
const headers = [
  {
    title: "ID",
    key: "id",
  },
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Description",
    key: "description",
  },
  {
    title: "Actions",
    key: "actions",
    sortable: false,
  },
];
</script>

<template>
  <h3>Modifier List</h3>
  <v-divider class="mb-5" />
  <v-data-table :items="modifiers" :headers="headers">
    <template #[`item.actions`]="{ item }">
      <router-link :to="`/modifiers/${item.id}`">
        <v-btn icon="mdi-pencil" density="comfortable" />
      </router-link>

      <v-btn icon="mdi-delete" density="comfortable" />
    </template>
  </v-data-table>
</template>

<style scoped lang="sass"></style>
