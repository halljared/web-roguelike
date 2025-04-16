<script setup lang="ts">
  import { Modifier } from '@/models/Modifier';
  import { useModifierTemplateStore } from '@/stores/modifierTemplateStore';

  const router = useRouter();
  const route = useRoute('/modifiers/[[id]]');
  const id = route.params.id || '';
  const modifierStore = useModifierTemplateStore();
  let _modifier = modifierStore.getModifierById(id);
  if (_modifier) {
    _modifier = Modifier.copy(_modifier, true);
  } else {
    _modifier = new Modifier();
  }
  let modifier = ref(_modifier);
  const isValid = ref(false);

  const isNew = computed(() => {
    return !modifierStore.getModifierById(modifier.value.id);
  });

  function save() {
    if (isValid.value) {
      modifierStore.setModifier(modifier.value);
      modifier = ref(Modifier.copy(modifier.value));
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
      <h3>Modifier Editor</h3>
      <v-divider class="mb-5" />
      <v-form
        v-model="isValid"
        @submit.prevent="save"
      >
        <modifier-editor-widget
          :modifier="modifier"
          :header="false"
        />
        <v-divider class="my-3" />
        <div class="mt-3">
          <v-btn
            type="submit"
            color="green-lighten-2"
          >
            {{ isNew ? 'Create' : 'Update' }}
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

<style scoped lang="sass"></style>
