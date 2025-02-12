<script setup lang="ts">
  import { useItemStore } from '@/stores/itemStore';
  import { Item } from '@/models/Item';
  import { useGameContext } from '@/composables/GameContextComposable';
  const { playgroundStore } = useGameContext();
  const itemStore = useItemStore();
  const items = itemStore.list();

  function copyItem(item: Item) {
    playgroundStore.addCopy(item);
  }
</script>

<template>
  <v-container
    id="playground"
    class="fill-height"
  >
    <v-responsive
      class="align-center fill-height mx-auto"
      max-width="1200"
    >
      <v-row>
        <v-col>
          <v-sheet
            class="pa-4"
            rounded
            elevation="2"
          >
            <h2>Available Items</h2>
            <v-divider class="mb-4" />

            <v-row>
              <v-col
                cols="12"
                sm="8"
                md="6"
              >
                <v-card
                  v-for="item in items"
                  :key="item.id"
                  variant="elevated"
                  color="secondary"
                  elevation="2"
                  class="mb-2 pa-2"
                >
                  <div class="d-flex align-center">
                    <v-icon
                      icon="mdi-cube-outline"
                      class="mr-2"
                    />

                    <span class="font-weight-medium">{{ item.name }}</span>

                    <v-spacer />

                    <v-btn
                      icon="mdi-pencil"
                      size="small"
                      :to="`/items/${item.id}`"
                      class="mr-2"
                    />
                    <v-btn
                      icon="mdi-plus"
                      size="small"
                      @click="copyItem(item)"
                    />
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <v-btn
              color="primary"
              block
              to="/items"
              class="mt-4"
            >
              Create New Item
            </v-btn>
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet
            class="pa-4"
            rounded
            elevation="2"
          >
            <h2>Active Items</h2>
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
                <div
                  v-if="copy.modifiers?.length"
                  class="mt-2"
                >
                  <strong>Modifiers:</strong>
                  <ul>
                    <li
                      v-for="modifier in copy.modifiers"
                      :key="modifier.id"
                    >
                      {{ modifier.name }}: {{ modifier.baseVal }}
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
      <v-row>
        <v-col>
          <v-sheet
            class="pa-4"
            rounded
          >
            <h2>Modified Items</h2>
            <v-list v-if="playgroundStore.selectedCopies.length">
              <v-list-item
                v-for="copy in playgroundStore.selectedCopies"
                :key="copy.id"
                hover
                variant="elevated"
                bg-color="warning"
                class="mb-2"
              >
                <v-list-item-title>{{ copy.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  This item is being modified by
                  {{ playgroundStore.getItemModifiers(copy).size }} modifier(s)
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
            <p
              v-else
              class="text-subtitle-1"
            >
              No modified items
            </p>
          </v-sheet>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<style scoped lang="sass">
  h2
    margin-bottom: 16px
</style>
