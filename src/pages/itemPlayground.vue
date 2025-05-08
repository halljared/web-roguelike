<script setup lang="ts">
  import { useItemStore } from '@/stores/itemStore';
  import { useGameContext } from '@/composables/GameContextComposable';
  import type { IItem } from '@/models/interfaces/IItem';
  import ItemEditor from '@/components/items/ItemEditor.vue';
  import {
    useModifiableEventService,
    ModifiableEventType,
  } from '@/services/ModifiableEventService';

  const { playgroundStore } = useGameContext();
  const itemStore = useItemStore();
  const modifiableEventService = useModifiableEventService();
  const items = itemStore.list();

  const editingItem = ref<IItem | null>(null);
  const dialog = ref(false);
  const logMessages = ref<string[]>([]);

  /**
   * Creates a copy of the selected item and adds it to the playground
   * @param {IItem} item - The item to copy
   */
  function copyItem(item: IItem) {
    const copy = playgroundStore.addCopy(item);
  }

  /**
   * Opens the edit dialog for the selected item
   * @param {IItem} item - The item to edit
   */
  function editCopy(item: IItem) {
    editingItem.value = item;
    dialog.value = true;
  }

  /**
   * Saves the edited item and emits an update event
   */
  function saveEdit() {
    dialog.value = false;
  }

  /**
   * Removes an item and emits a delete event
   * @param {string} id - The ID of the item to remove
   */
  function removeItem(id: string) {
    playgroundStore.removeCopy(id);
  }

  // Register global listeners for debugging purposes
  onMounted(() => {
    const unsubscribeCreated = modifiableEventService.on(
      ModifiableEventType.CREATED,
      (modifiable) => console.log('ModifiableEvent CREATED:', modifiable)
    );

    const unsubscribeUpdated = modifiableEventService.on(
      ModifiableEventType.UPDATED,
      (modifiable) => console.log('ModifiableEvent UPDATED:', modifiable)
    );

    const unsubscribeDeleted = modifiableEventService.on(
      ModifiableEventType.DELETED,
      (modifiable) => console.log('ModifiableEvent DELETED:', modifiable)
    );

    onUnmounted(() => {
      unsubscribeCreated();
      unsubscribeUpdated();
      unsubscribeDeleted();
    });
  });
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
                    @click="removeItem(copy.id)"
                  />
                  <v-btn
                    icon="mdi-pencil"
                    size="small"
                    color="warning"
                    variant="text"
                    @click="editCopy(copy)"
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

      <v-row class="mt-4">
        <v-col>
          <v-sheet
            class="pa-4"
            rounded
            elevation="2"
          >
            <div class="d-flex align-center mb-2">
              <h2>Event Log</h2>
              <v-spacer></v-spacer>
              <v-btn
                size="small"
                color="grey"
                variant="text"
                @click="logMessages = []"
              >
                Clear
              </v-btn>
            </div>
            <v-divider class="mb-4" />

            <v-list
              v-if="logMessages.length"
              lines="one"
              density="compact"
              class="log-container"
            >
              <v-list-item
                v-for="(log, index) in logMessages"
                :key="index"
                class="log-item"
              >
                {{ log }}
              </v-list-item>
            </v-list>
            <p
              v-else
              class="text-subtitle-1"
            >
              No events logged yet
            </p>
          </v-sheet>
        </v-col>
      </v-row>

      <v-dialog
        v-model="dialog"
        max-width="800px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Edit Item</span>
          </v-card-title>
          <v-card-text>
            <ItemEditor
              v-if="editingItem"
              v-model:item="editingItem"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="blue darken-1"
              @click="dialog = false"
              >Cancel</v-btn
            >
            <v-btn
              color="primary"
              @click="saveEdit"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-responsive>
  </v-container>
</template>

<style scoped lang="sass">
  h2
    margin-bottom: 16px

  .log-container
    max-height: 200px
    overflow-y: auto
    border: 1px solid rgba(0, 0, 0, 0.12)
    border-radius: 4px

  .log-item
    border-bottom: 1px solid rgba(0, 0, 0, 0.08)

    &:last-child
      border-bottom: none
</style>
