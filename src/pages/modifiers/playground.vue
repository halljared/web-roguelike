<script setup lang="ts">
  import { useModifierTemplateStore } from '@/stores/modifierTemplateStore';
  import { ref } from 'vue';
  import { ModifierRarity, type IGenerateItemOptions } from '@/models/types';
  import { useGameContext } from '@/composables/GameContextComposable';
  const { playgroundStore } = useGameContext();
  const modifierStore = useModifierTemplateStore();
  const modifiers = modifierStore.list();

  const generatorOptions = ref<IGenerateItemOptions>({
    modifierOptions: {
      rarity: ModifierRarity.COMMON,
    },
    numberOfModifiers: 1,
  });

  function generateItem() {
    playgroundStore.generateItem(generatorOptions.value);
  }
</script>

<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-center fill-height mx-auto"
      max-width="1200"
    >
      <v-row>
        <!-- Available Modifiers Column -->
        <v-col>
          <v-sheet
            class="pa-4"
            rounded
            elevation="2"
          >
            <h2>Available Modifiers</h2>
            <v-divider class="mb-4" />

            <v-row>
              <v-col cols="12">
                <v-card
                  v-for="modifier in modifiers"
                  :key="modifier.id"
                  variant="elevated"
                  color="secondary"
                  elevation="2"
                  class="mb-2 pa-2"
                >
                  <div class="d-flex align-center">
                    <v-icon
                      icon="mdi-function-variant"
                      class="mr-2"
                    />
                    <span class="font-weight-medium">{{ modifier.name }}</span>

                    <v-spacer />

                    <v-btn
                      icon="mdi-pencil"
                      size="small"
                      :to="`/modifiers/${modifier.id}`"
                      class="mr-2"
                    />
                  </div>
                </v-card>
              </v-col>
            </v-row>

            <v-btn
              color="primary"
              block
              to="/modifiers"
              class="mt-4"
            >
              Create New Modifier
            </v-btn>
          </v-sheet>
        </v-col>

        <!-- Generator Options Column -->
        <v-col>
          <v-sheet
            class="pa-4"
            rounded
            elevation="2"
          >
            <h2>Generator Options</h2>
            <v-divider class="mb-4" />

            <v-form @submit.prevent="generateItem">
              <v-select
                v-model="generatorOptions.modifierOptions.rarity"
                :items="Object.values(ModifierRarity)"
                label="Modifier Rarity"
                class="mb-4"
              />
              <v-text-field
                v-model.number="generatorOptions.numberOfModifiers"
                label="Number of Modifiers"
                type="number"
                min="1"
                class="mb-4"
              />
              <v-btn
                color="primary"
                block
                type="submit"
              >
                Generate Item
              </v-btn>
            </v-form>
          </v-sheet>
        </v-col>

        <!-- Generated Items Column -->
        <v-col>
          <v-sheet
            class="pa-4"
            rounded
            elevation="2"
          >
            <h2>Generated Items</h2>
            <v-divider class="mb-4" />

            <v-list v-if="playgroundStore.selectedCopies.length">
              <v-list-item
                v-for="item in playgroundStore.selectedCopies"
                :key="item.id"
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
                    @click="playgroundStore.removeCopy(item.id)"
                  />
                </template>

                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <div
                  v-if="item.modifiers?.length"
                  class="mt-2"
                >
                  <strong>Modifiers:</strong>
                  <v-list
                    density="compact"
                    class="modifier-list"
                  >
                    <v-list-item
                      v-for="modifier in item.modifiers"
                      :key="modifier.id"
                      :title="modifier.name"
                      class="mb-1"
                      rounded
                      variant="outlined"
                    >
                      <template #prepend>
                        <v-icon
                          icon="mdi-cube-outline"
                          color="info"
                          class="mr-2"
                        />
                      </template>

                      <template #subtitle>
                        <div class="d-flex align-center">
                          <v-chip
                            size="small"
                            color="info"
                            class="mr-2"
                          >
                            {{ modifier.target }}
                          </v-chip>
                          <span class="text-body-2">Value: {{ modifier.baseVal }}</span>
                        </div>
                      </template>
                    </v-list-item>
                  </v-list>
                </div>
              </v-list-item>
            </v-list>
            <p
              v-else
              class="text-subtitle-1"
            >
              No items generated yet
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
