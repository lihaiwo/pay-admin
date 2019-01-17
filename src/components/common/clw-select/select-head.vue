<template>
  <div>
    <div class="ivu-tag ivu-tag-checked" v-for="item in selectedMultiple">
        <span class="ivu-tag-text">{{ item.label }}</span>
        <Icon type="ios-close" @click.native.stop="removeTag(item)"></Icon>
      </div>
    <span
      :class="singleDisplayClasses"
      v-show="singleDisplayValue"
    >{{ singleDisplayValue }}</span>
  </div>
</template>
<script>
const prefixCls = 'ivu-select';
export default {
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    values: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String
    },
  },
  data () {
    return {
      showPlaceholder: true
    }
  },
  computed: {
    singleDisplayClasses(){
      const {filterable, multiple, showPlaceholder} = this;
      return [{
        [prefixCls + '-placeholder']: showPlaceholder && !filterable,
        [prefixCls + '-selected-value']: !showPlaceholder && !multiple && !filterable,
      }];
    },
    singleDisplayValue(){
      if ((this.multiple && this.values.length > 0) || this.filterable) return '';
      return `${this.selectedSingle}` || this.localePlaceholder;
    },
    localePlaceholder () {
      if (this.placeholder === undefined) {
        return 'i.select.placeholder';
      } else {
        return this.placeholder;
      }
    },
    selectedSingle(){
      return '';
    },
    selectedMultiple(){
      return this.multiple ? this.values : [];
    }
  },
  methods: {
    removeTag (value) {
      if (this.disabled) return false;
      this.eventHub.$emit('Select-on-change', value);
    }
  }
}
</script>
