<template>
  <SmartModal v-if="show" @close="hideModal">
    <div slot="header">
      <div class="row-wrapper">
        <h3 class="heading">{{ $t("edit_collection") }}</h3>
        <div>
          <button class="icon button" @click="hideModal">
            <i class="material-icons">close</i>
          </button>
        </div>
      </div>
    </div>
    <div slot="body" class="flex flex-col">
      <label for="selectLabel">{{ $t("label") }}</label>
      <input
        id="selectLabel"
        v-model="name"
        class="input"
        type="text"
        :placeholder="placeholderCollName"
        @keyup.enter="saveCollection"
      />
    </div>
    <div slot="footer">
      <div class="row-wrapper">
        <span></span>
        <span>
          <button class="icon button" @click="hideModal">
            {{ $t("cancel") }}
          </button>
          <button class="icon button primary" @click="saveCollection">
            {{ $t("save") }}
          </button>
        </span>
      </div>
    </div>
  </SmartModal>
</template>

<script>
export default {
  props: {
    show: Boolean,
    placeholderCollName: { type: String, default: null },
  },
  data() {
    return {
      name: null,
    }
  },
  methods: {
    saveCollection() {
      this.$emit("submit", this.name)
      this.hideModal()
    },
    hideModal() {
      this.name = null
      this.$emit("hide-modal")
    },
  },
}
</script>
