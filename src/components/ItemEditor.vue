<script setup lang="ts">
import { Item } from "@/types/Item";
import { useItemStore } from "@/stores/items";
import { Attribute } from "@/types/Attribute";

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
  _item = new Item();
}
let item = ref(_item);
const isNew = computed(() => {
  return !itemStore.getItemById(item.value.id);
})

function newAttr() {
  item.value.attributes.push(new Attribute());
}

function saveItem() {
  if (isValid.value) {
    itemStore.setItem(item.value);
    item = ref(Item.copy(item.value));
    emit("done");
  }
}
</script>

<template>
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
    <h4>Attributes</h4>
    <v-divider class="mb-5" />
    <v-row
      v-for="attribute in item.attributes"
      :key="attribute.id"
    >
      <v-col cols="12">
        <attribute-editor-widget />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn
          color="green-lighten-2"
          @click="newAttr()"
        >
          Add Attribute
        </v-btn>
      </v-col>
    </v-row>
    <v-divider class="my-5" />
    <div class="mt-3">
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
    </div>
  </v-form>
</template>

<style scoped lang="sass">

</style>
