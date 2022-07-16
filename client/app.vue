<template>
  <div class="container">
    <DataTable :value="products" responsiveLayout="scroll">
      <Column field="date" header="Data" />
      <Column field="title" header="Title" />
      <Column field="amount" header="Amount" />
      <Column field="tags" header="Tags">
        <template #body="slotProps">
          <Tag
            v-for="(tag, index) in slotProps.data.tags"
            :class="index !== 0 && 'ml-2'"
            >{{ tag }}</Tag
          >
        </template>
      </Column>

      <Column header="Actions">
        <template #body="slotProps">
          <PButton @click="editItem(slotProps.data)">Edit</PButton>
        </template>
      </Column>
    </DataTable>

    <PButton @click="isModalOpen = true">Add Item</PButton>

    <PDialog
      header="This is header"
      v-model:visible="isModalOpen"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '40vw' }"
      :modal="true"
      dismissable-mask
    >
      <div class="grid">
        <div class="col-12">
          <div class="field">
            <label for="username1">Title</label>

            <PInputText
              v-model="title"
              id="username1"
              type="username"
              aria-describedby="username1-help"
            />
          </div>
        </div>

        <div class="col-12 md:col-6">
          <div class="field">
            <label for="basic">Basic</label>
            <PCalendar id="basic" v-model="date" autocomplete="off" />
          </div>
        </div>

        <div class="col-12 md:col-6">
          <div class="field">
            <label for="username1">Amount</label>
            <PInputNumber v-model="amount" mode="currency" currency="PLN" />
          </div>
        </div>

        <div class="col-12">
          <div class="field">
            <label for="username1">Title</label>

            <PMultiSelect
              v-model="selectedTags"
              :options="tags"
              optionLabel="tag"
              placeholder="Select Tag"
            />
          </div>
        </div>
      </div>

      <template #footer>
        <PButton
          label="Cancel"
          icon="pi pi-times"
          @click="isModalOpen = false"
          class="p-button-text"
          :disabled="isSaving"
        />
        <PButton
          label="Save"
          icon="pi pi-check"
          @click="saveItem"
          autofocus
          :loading="isSaving"
        />
      </template>
    </PDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import DataTable from "primevue/datatable/DataTable.vue";
import Column from "primevue/column/Column.vue";
import Tag from "primevue/tag/Tag.vue";
import PButton from "primevue/button/Button.vue";
import PDialog from "primevue/dialog/Dialog.vue";
import PInputText from "primevue/inputtext/InputText.vue";
import PCalendar from "primevue/calendar/Calendar.vue";
import PMultiSelect from "primevue/multiselect/MultiSelect.vue";
import PInputNumber from "primevue/inputnumber/InputNumber.vue";

interface Tag {
  tag: string;
  value: string;
}

interface Item {
  title: string;
  id: string;
  date: string;
  amount: number;
  tags: String[];
}

const products = ref<Item[]>();
const date = ref();
const amount = ref();
const title = ref("");
const selectedTags = ref();

const isModalOpen = ref(false);
const isSaving = ref(false);
const tags = ref([
  {
    tag: "tag1",
    value: "tag1",
  },
  {
    tag: "tag2",
    value: "tag2",
  },
]);

products.value = [
  {
    title: "Item #1",
    id: "1",
    date: new Date("2022-02-12").toDateString(),
    amount: 1.22,
    tags: ["tag1", "tag2"],
  },
  {
    title: "Item #2",
    id: "2",
    date: new Date("2022-02-13").toDateString(),
    amount: 1.22,
    tags: ["tag1", "tag2"],
  },
  {
    title: "Item #3",
    id: "3",
    date: new Date("2012-02-13").toDateString(),
    amount: 1.22,
    tags: ["tag1", "tag2"],
  },
];

const saveItem = () => {
  isSaving.value = true;
  setTimeout(() => {
    isSaving.value = false;
    isModalOpen.value = false;
  }, 2000);
};

const editItem = (item: Item) => {
  amount.value = item.amount;
  title.value = item.title;
  date.value = item.date;
  selectedTags.value = item.tags.map((tagId) => {
    return tags.value.find((tag) => tag.value === tagId);
  });
  isModalOpen.value = true;
};

watch(isModalOpen, (newValue) => {
  if (!newValue) {
    console.log("close");

    amount.value = undefined;
    title.value = "";
    date.value = "";
    selectedTags.value = "";
  }
});
</script>

<style>
.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
}
</style>
