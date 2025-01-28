<script setup lang="ts">
import { useItemStore } from '@/stores/items'
import { usePlaygroundStore } from '@/stores/playground'
import { Item } from '@/models/Item'

const itemStore = useItemStore()
const playgroundStore = usePlaygroundStore()
const items = itemStore.list()

function copyItem(item: Item) {
  playgroundStore.addCopy(item)
}
</script>

<template>
  <v-container
    id="playground"
    class="fill-height"
  >
    <v-row>
      <v-col cols="6">
        <v-sheet
          class="pa-4"
          rounded
          elevation="2"
        >
          <h2>Available Items</h2>
          <v-divider class="mb-4" />

          <v-list
            density="compact"
            max-width="300"
          >
            <v-list-item
              v-for="item in items"
              :key="item.id"
              variant="elevated"
              bg-color="secondary"
              elevation="2"
              class="mb-2"
            >
              <template #prepend>
                <v-icon
                  icon="mdi-cube-outline"
                  class="mr-2"
                />
              </template>

              <template #title>
                <div class="d-flex align-center">
                  <span class="font-weight-medium">{{ item.name }}</span>
                </div>
              </template>

              <template #append>
                <v-btn
                  icon="mdi-pencil"
                  size="small"
                  :to="`/items/${item.id}`"
                />
                <v-btn
                  icon="mdi-content-copy"
                  size="small"
                  class="mr-2"
                  @click="copyItem(item)"
                />
              </template>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>

      <v-col cols="6">
        <v-sheet
          class="pa-4"
          rounded
          elevation="2"
        >
          <h2>Copied Items</h2>
          <v-divider class="mb-4" />

          <v-list v-if="playgroundStore.selectedCopies.length">
            <v-list-item
              v-for="copy in playgroundStore.selectedCopies"
              :key="copy.id"
              hover
              variant="elevated"
              bg-color="primary"
              class="mb-2"
            >
              <template #append>
                <v-btn
                  icon="mdi-close"
                  size="small"
                  color="error"
                  variant="text"
                  @click="playgroundStore.removeCopy(copy.id)"
                />
              </template>

              <v-list-item-title>{{ copy.name }}</v-list-item-title>
              <v-list-item-subtitle>ID: {{ copy.id }}</v-list-item-subtitle>
              <div class="mt-2">
                <strong>Description:</strong>
                <p>{{ copy.description }}</p>
              </div>
              <div
                v-if="copy.attributes?.length"
                class="mt-2"
              >
                <strong>Attributes:</strong>
                <ul>
                  <li
                    v-for="attr in copy.attributes"
                    :key="attr.id"
                  >
                    {{ attr.name }}: {{ attr.baseVal }}
                  </li>
                </ul>
              </div>
            </v-list-item>
          </v-list>
          <p
            v-else
            class="text-subtitle-1"
          >
            No copies made yet
          </p>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="sass">
h2
  margin-bottom: 16px

</style>
