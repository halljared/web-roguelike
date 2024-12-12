<script setup lang="ts">
import { Item } from "@/types/Item";
import { useItemStore } from "@/stores/items";
import { Modifier } from "@/types/Modifier";

const { itemId = "" } = defineProps<{ itemId?: string }>();
const emit = defineEmits(['done'])
const itemStore = useItemStore();
const isValid = ref(false);
const rules = [
  (value: string) => {
    if (value) return true
    return 'Field is required.'
  }
];
let _item = itemStore.getItemById(itemId);
if (_item) {
  _item = Item.copy(_item);
} else {
  _item = new Item("", "");
  _item.modifiers.push(new Modifier());
}
let item = ref(_item);
const isNew = computed(() => {
  return !itemStore.getItemById(item.value.id);
})

function saveItem() {
  if (isValid.value) {
    itemStore.setItem(item.value);
    item = ref(Item.copy(item.value));
    emit("done");
  }
}
</script>

<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <h3>Item Editor</h3>
      <v-divider class="mb-5" />
      <v-form
        v-model="isValid"
        @submit.prevent="saveItem"
      >
        <v-text-field
          v-model="item.name"
          :rules="rules"
          label="Name"
        />
        <v-text-field
          v-model="item.description"
          :rules="rules"
          label="Description"
        />
        <h4>Modifiables</h4>
        <v-divider class="mb-5" />
        <modifiable-editor-widget />
        <v-btn
          type="submit"
          color="green-lighten-2"
        >
          {{ isNew ? "Create" : "Update" }}
        </v-btn>
        <v-btn
          class="ml-4"
          color="red-lighten-1"
          variant="outlined"
          @click="$emit('done')"
        >
          Cancel
        </v-btn>
      </v-form>
    </v-responsive>
  </v-container>
</template>

<style scoped lang="sass">

</style>
