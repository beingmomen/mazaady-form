export const state = () => ({
  categories: [],
  subCategories: [],
  processTypeList: [],
  selectedProccessTypeOptions: [],
  processTypeModelOptions: [],
  selectedModelTypes: [],


  category: null,
  subCategory: null,
  processType: null,
  processTypeSelectedOption: null,
  selectedModel: null,
  selectedModelType: null,
})

export const getters = {
  categories: (state) => state.categories,
  subCategories: (state) => state.subCategories,
  processTypeList: (state) => state.processTypeList,
  category: (state) => state.category,
  subCategory: (state) => state.subCategory,
  processType: (state) => state.processType,
  selectedProccessTypeOptions: (state) => state.selectedProccessTypeOptions,
  processTypeSelectedOption: (state) => state.processTypeSelectedOption,
  processTypeModelOptions: (state) => state.processTypeModelOptions,
  selectedModel: (state) => state.selectedModel,
  selectedModelTypes: (state) => state.selectedModelTypes,
  selectedModelType: (state) => state.selectedModelType,
}

export const actions = {
  async nuxtServerInit({ commit, $axios }) {
    // add private key header
  },
  categoryChange({ state, commit }, payload) {
    if (payload) {
      commit('subCategories', payload?.children)
    } else {
      commit('subCategories', [])
      commit('setFieldValue', {
        key: 'subCategory',
        value: null,
      })
    }

  },
  async subCategoryChange({ state, commit }, payload) {
    const id = payload.id
    const { data } = await this.$axios.$get('/v1/properties', {
      params: {
        cat: id,
      },
    })
    const allData = [...data, { id: 0, name: 'Other' }]
    commit('processTypeList', allData)
  },


  async processTypeChange({ state, commit }, payload) {
    const id = payload?.id
    if (!id) return

    const { data } = await this.$axios.$get(`/v1/get-options-child/${id}`)
    commit('selectedProccessTypeOptions', data[0].options)
  },


  async selectedTypeOptionChange({ state, commit }, payload) {
    const id = payload?.id
    if (!id) return

    const { data } = await this.$axios.$get(`/v1/get-options-child/${id}`)
    commit('processTypeModelOptions', data[0]?.options)
  },

  async selectedModelChange({ state, commit }, payload) {
    const id = payload?.id
    if (!id) return

    const { data } = await this.$axios.$get(`/v1/get-options-child/${id}`)
    commit('selectedModelTypes', data)

  },

  async selectedModelTypeChange({ state, commit }, payload) {
    // const id = payload?.id
    // if (!id) return

    // const { data } = await this.$axios.$get(`/v1/get-options-child/${id}`)
    console.log('selected Model Type CHANGED')

  },


  // --------------------------------------
  // Load all options method
  // --------------------------------------

  async loadOptionChildren({ state, commit }, payloadOptions) {
    let { payload, commitName } = payloadOptions
    const id = payload?.id
    if (!id) return

    const { data } = await this.$axios.$get(`/v1/get-options-child/${id}`)
    commit(commitName, data[0].options)
  },
  // --------------------------------------

}

export const mutations = {
  categories(state, val) {
    state.categories = val
  },
  subCategories(state, val) {
    state.subCategories = val
  },
  processTypeList(state, val) {
    state.processTypeList = val
  },
  selectedProccessTypeOptions(state, val) {
    state.selectedProccessTypeOptions = val
  },
  processTypeSelectedOption(state, val) {
    state.processTypeSelectedOption = val
  },
  processTypeModelOptions(state, val) {
    state.processTypeModelOptions = val
  },
  selectedModelTypes(state, val) {
    state.selectedModelTypes = val
  },
  selectedModelType(state, val) {
    state.selectedModelType = val
  },
  setFieldValue(state, { key, value }) {
    state[key] = value
  },
}
