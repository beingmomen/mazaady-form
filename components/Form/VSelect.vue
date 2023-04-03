<template>
  <div class="mb-6">
    <label >{{ label }}</label>
    <v-select
    class="mt-2"
      v-model="fieldValue"
      :reduce="(item) => item"
      label="name"
      :options="list"
      :placeholder="placeHolder"
      @input="changeData($event)"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null,
    },
    placeHolder: {
      type: String,
      default: null,
    },
    listData: {
      type: String,
      default: null,
    },
    storeKey: {
      type: String,
      default: null,
    },
    change: {
      type: Boolean,
      default: null,
    },
  },
  computed: {
    list() {
      return this.$store.getters[this.listData]
    },
    fieldValue: {
      get: function () {
        return this.$store.getters[this.storeKey]
      },
      set(val) {
        this.$store.commit(`setFieldValue`, {
          key: this.storeKey,
          value: val,
        })
      },
    },
  },
  methods: {
    changeData(data) {
      this.change && this.$store.dispatch(`${this.storeKey}Change`, data)
    },
  },
}
</script>

<style lang="scss" scoped></style>
