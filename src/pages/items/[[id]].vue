<script setup lang="ts">

import { useItemStore } from "@/stores/items";
import { Item } from "@/models/Item";

const router = useRouter();
const route = useRoute('/items/[[id]]');
const id = route.params.id || "";
const itemStore = useItemStore();
let _item = itemStore.getItemById(id);
if (_item) {
  _item = Item.copy(_item, true);
} else {
  _item = new Item();
}
let item = ref(_item);
const isValid = ref(false);

const isNew = computed(() => {
  return !itemStore.getItemById(item.value.id);
})

function save() {
  if (isValid.value) {
    itemStore.setItem(item.value);
    item = ref(Item.copy(item.value));
    router.back();
  }
}

function cancel() {
  router.back();
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
        @submit.prevent="save"
      >
        <ItemEditor :item="item" />
        <v-divider class="my-3" />
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
            @click="cancel"
          >
            Cancel
          </v-btn>
        </div>
      </v-form>
    </v-responsive>
  </v-container>
</template>

<style scoped lang="sass">

</style>
