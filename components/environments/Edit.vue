<template>
  <SmartModal v-if="show" @close="hideModal">
    <div slot="header">
      <div class="row-wrapper">
        <h3 class="heading">{{ $t("edit_environment") }}</h3>
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
        :placeholder="editingEnvironment.name"
        @keyup.enter="saveEnvironment"
      />
      <div class="row-wrapper">
        <label for="variableList">{{ $t("env_variable_list") }}</label>
        <div>
          <button
            v-tooltip.bottom="$t('clear')"
            class="icon button"
            @click="clearContent($event)"
          >
            <i class="material-icons">clear_all</i>
          </button>
        </div>
      </div>
      <ul
        v-for="(variable, index) in vars"
        :key="index"
        class="
          border-b border-dashed
          divide-y
          md:divide-x
          border-divider
          divide-dashed divide-divider
          md:divide-y-0
        "
        :class="{ 'border-t': index == 0 }"
      >
        <li>
          <input
            v-model="variable.key"
            class="input"
            :placeholder="$t('variable_count', { count: index + 1 })"
            :name="'param' + index"
          />
        </li>
        <li>
          <input
            v-model="variable.value"
            class="input"
            :placeholder="$t('value_count', { count: index + 1 })"
            :name="'value' + index"
          />
        </li>
        <div>
          <li>
            <button
              id="variable"
              v-tooltip.bottom="$t('delete')"
              class="icon button"
              @click="removeEnvironmentVariable(index)"
            >
              <i class="material-icons">delete</i>
            </button>
          </li>
        </div>
      </ul>
      <ul>
        <li>
          <button class="icon button" @click="addEnvironmentVariable">
            <i class="material-icons">add</i>
            <span>{{ $t("add_new") }}</span>
          </button>
        </li>
      </ul>
    </div>
    <div slot="footer">
      <div class="row-wrapper">
        <span></span>
        <span>
          <button class="icon button" @click="hideModal">
            {{ $t("cancel") }}
          </button>
          <button class="icon button primary" @click="saveEnvironment">
            {{ $t("save") }}
          </button>
        </span>
      </div>
    </div>
  </SmartModal>
</template>

<script lang="ts">
import Vue, { PropType } from "vue"
import clone from "lodash/clone"
import type { Environment } from "~/newstore/environments"
import { updateEnvironment } from "~/newstore/environments"

export default Vue.extend({
  props: {
    show: Boolean,
    editingEnvironment: {
      type: Object as PropType<Environment | null>,
      default: null,
    },
    editingEnvironmentIndex: { type: Number, default: null },
  },
  data() {
    return {
      name: null as string | null,
      vars: [] as { key: string; value: string }[],
      doneButton: '<i class="material-icons">done</i>',
    }
  },
  watch: {
    editingEnvironment() {
      this.name = this.editingEnvironment?.name ?? null
      this.vars = clone(this.editingEnvironment?.variables ?? [])
    },
    show() {
      this.name = this.editingEnvironment?.name ?? null
      this.vars = clone(this.editingEnvironment?.variables ?? [])
    },
  },
  methods: {
    clearContent({ target }: { target: HTMLElement }) {
      this.vars = []

      target.innerHTML = this.doneButton
      this.$toast.info(this.$t("cleared").toString(), {
        icon: "clear_all",
      })
      setTimeout(
        () => (target.innerHTML = '<i class="material-icons">clear_all</i>'),
        1000
      )
    },
    addEnvironmentVariable() {
      this.vars.push({
        key: "",
        value: "",
      })
    },
    removeEnvironmentVariable(index: number) {
      this.vars.splice(index, 1)
    },
    saveEnvironment() {
      if (!this.name) {
        this.$toast.info(this.$t("invalid_environment_name").toString())
        return
      }

      const environmentUpdated: Environment = {
        name: this.name,
        variables: this.vars,
      }

      updateEnvironment(this.editingEnvironmentIndex, environmentUpdated)
      this.hideModal()
    },
    hideModal() {
      this.name = null
      this.$emit("hide-modal")
    },
  },
})
</script>
