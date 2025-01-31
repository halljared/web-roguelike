<script setup lang="ts">
  import {useItemStore} from "@/stores/itemStore";

  const store = useItemStore();
  const items = store.list();
  const headers = [
    {
      title: 'ID',
      key: 'id',
    },
    {
      title: 'Name',
      key: 'name',
    },
    {
      title: 'Description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      sortable: false,
    }
  ]
</script>

<template>
  <h3>Item List</h3>
  <v-divider class="mb-5" />
  <v-data-table
    :items="items"
    :headers="headers"
  >
    <template #[`item.actions`]="{ item }">
      <router-link :to="`/items/${item.id}`">
        <v-btn
          icon="mdi-pencil"
          density="comfortable"
        />
      </router-link>
      <v-btn
        icon="mdi-delete"
        density="comfortable"
      />
    </template>
  </v-data-table>
</template>

<style scoped lang="sass">

</style>
