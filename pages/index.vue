<template>
  <div class="flex justify-center mt-20">
    <form class="w-6/12">
      <FormVSelect
        label="Categories"
        place-holder="Select Category"
        list-data="categories"
        store-key="category"
        change
      />
      <FormVSelect
        label="Sub Category"
        place-holder="Select Sub Category"
        list-data="subCategories"
        store-key="subCategory"
        change
      />
      <FormVSelect
        v-if="subCategory"
        label="Process Type"
        place-holder="Select Process Type"
        list-data="processTypeList"
        store-key="processType"
        change
      />
      <input
        v-if="processType?.name == 'Other'"
        type="text"
        placeholder="From User"
        class="input w-full border-solid border-2 border-gray-300"
      />
      <FormVSelect
        v-if="selectedProccessTypeOptions.length"
        class="mt-6"
        :label="processType?.name"
        :place-holder="`Select ${processType?.name}`"
        list-data="selectedProccessTypeOptions"
        store-key="processTypeSelectedOption"
        change
      />
      <!-- Model -->
      <FormVSelect
        v-if="processTypeModelOptions?.length"
        class="mt-6"
        label="Model"
        place-holder="Select Model"
        list-data="processTypeModelOptions"
        store-key="selectedModel"
        change
      />
      <!-- Type -->
      <FormVSelect
        v-if="selectedModelTypes?.length"
        class="mt-6"
        label="Type"
        place-holder="Select Type"
        list-data="selectedModelTypes"
        store-key="selectedModelType"
        change
      />
    </form>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ $axios, store }) {
    const { data } = await $axios.$get('/get_all_cats')
    // console.warn('data', data.categories);
    store.commit('categories', data.categories)
    // store.dispatch('categories/getAllDataFromApi', data)
    return {}
  },
  mounted() {
    // add private key in $axios header
    this.$axios.setHeader('private-key', '3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16')
  },
  data() {
    return {
      category: null,
    }
  },
  computed: {
    subCategory() {
      return this.$store.getters.subCategory
    },
    processType() {
      return this.$store.getters.processType
    },
    selectedProccessTypeOptions() {
      return this.$store.getters.selectedProccessTypeOptions
    },
    processTypeSelectedOption() {
      return this.$store.getters.processTypeSelectedOption
    },
    processTypeModelOptions() {
      return this.$store.getters.processTypeModelOptions
    },
    selectedModelTypes() {
      return this.$store.getters.selectedModelTypes
    },
  },
  methods: {
    changeData() {},
  },
}
</script>
