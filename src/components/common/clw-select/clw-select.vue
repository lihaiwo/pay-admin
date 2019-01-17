<template>
  <div
    :class="classes"
    v-click-outside.capture="onClickOutside"
    v-click-outside:mousedown.capture="onClickOutside"
  >
    <div
      ref="reference"

      :class="selectionCls"
      @click="toggleMenu"
    >
      <slot name="input">
        <select-head
          :multiple="multiple"
          :values="values"
          :placeholder="placeholder"
        >
        </select-head>
      </slot>
    </div>
    <transition name="fade">
      <Drop
        :class="dropdownCls"
        v-show="dropVisible"
        placement="bottom-start"
        ref="dropdown"
        style="width: auto;"
      >
        <ul v-show="showNotFoundLabel" :class="[prefixCls + '-not-found']"><li>{{ localeNotFoundText }}</li></ul>
        <ul :class="prefixCls + '-dropdown-list'" style="padding: 7px 16px;min-width: 300px;max-width: 400px;">
          <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
            <Checkbox
              :indeterminate="indeterminate"
              :value="checkAll"
              @click.prevent.native="handleCheckAll">全选</Checkbox>
              
          </div>
          <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
            <functional-options
              :options="selectOptions"
            >
            </functional-options>
          </CheckboxGroup>
          <div style="text-align:right;padding-top:6px;margin-top:6px;">
            <Button size="small" type="text" style="margin-right:4px;" @click="hideMenu">取消</Button>
            <Button size="small" type="primary" @click="selectConfirm">确定</Button>
          </div>
        </ul>
      </Drop>
    </transition>
  </div>
</template>
<script>
import Drop from './dropdown.vue';
import {directive as clickOutside} from 'v-click-outside-x';
import TransferDom from '@/directive/transfer-dom';
import Emitter from '../../mixins/emitter';
import SelectHead from './select-head.vue';
import FunctionalOptions from './functional-options.vue';

const findOptionsInVNode = (node) => {
  const opts = node.componentOptions;
  return [node]
  // if (opts && opts.tag.match(optionRegexp)) return [node];
  if (!node.children && (!opts || !opts.children)) return [];
  const children = [...(node.children || []), ...(opts && opts.children || [])];
  const options = children.reduce(
      (arr, el) => [...arr, ...findOptionsInVNode(el)], []
  ).filter(Boolean);
  return options.length > 0 ? options : [];
};

const extractOptions = (options) => options.reduce((options, slotEntry) => {
  return options.concat(findOptionsInVNode(slotEntry));
}, []);

const prefixCls = 'ivu-select';
export default {
  name: 'ClwSelect',
  mixins: [ Emitter ],
  components: { FunctionalOptions, Drop, SelectHead },
  directives: { clickOutside, TransferDom },
  props: {
    multiple: {
      type: Boolean,
      default: true
    },
    value: {
      type: [String, Number, Array],
      default: ''
    },
    placeholder: {
      type: String
    },
  },
  data () {
    return {
      prefixCls: prefixCls,
      visible: false,
      slotOptions: this.$slots.default,
      values: [],

      indeterminate: true,
      checkAll: false,
      checkAllGroup: []
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-visible`]: this.visible,
          [`${prefixCls}-multiple`]: this.multiple,
          [`${prefixCls}-single`]: !this.multiple,
        }
      ];
    },
    dropdownCls () {
      return {
        [prefixCls + '-dropdown-transfer']: this.transfer,
        [prefixCls + '-multiple']: this.multiple && this.transfer,
        ['ivu-auto-complete']: this.autoComplete,
      };
    },
    selectionCls () {
      return {
        [`${prefixCls}-selection`]: !this.autoComplete,
        [`${prefixCls}-selection-focused`]: this.isFocused
      };
    },
    publicValue(){
      if (this.labelInValue){
          return this.multiple ? this.values : this.values[0];
      } else {
          return this.multiple ? this.values.map(option => option.value) : (this.values[0] || {}).value;
      }
    },
    dropVisible () {
      let status = true;
      return this.visible && status;
    },
    showNotFoundLabel () {
      const {loading, remote, selectOptions} = this;
      return selectOptions && selectOptions.length === 0 && (!remote || (remote && !loading));
    },
    localeNotFoundText () {
      if (typeof this.notFoundText === 'undefined') {
          return 'i.select.noMatch';
      } else {
          return this.notFoundText;
      }
    },
    flatOptions(){
      return extractOptions(this.selectOptions);
    },
    selectOptions () {
      const selectOptions = [];
      const slotOptions = (this.slotOptions || []);
      let optionCounter = -1;
      const currentIndex = this.focusIndex;
      const selectedValues = this.values.filter(Boolean).map(({value}) => value);
      for (let option of slotOptions) {
        // const cOptions = option.componentOptions;
        // if (!cOptions) continue;
        // selectOptions.push({...option});
        selectOptions.push(this.processOption(option, selectedValues, optionCounter === currentIndex));
      }
      return selectOptions;
    }
  },
  methods: {
    getOptionData(value){
      const option = this.flatOptions.find(({componentOptions}) => componentOptions.propsData.label === value);
      if (!option) return null;
      const label = option.componentOptions.children[0].text;
      return {
          value: value,
          label: label,
      };
    },
    toggleMenu (e, force) {
      if (this.disabled) {
        return false;
      }
      this.visible = typeof force !== 'undefined' ? force : !this.visible;
      if (this.visible){
        this.dropDownWidth = this.$el.getBoundingClientRect().width;
        this.broadcast('Drop', 'on-update-popper');
      }
    },
    hideMenu () {
      this.toggleMenu(null, false);
    },
    onClickOutside (event) {
      if (this.visible) {
        if (event.type === 'mousedown') {
          event.preventDefault();
          return;
        }
        event.preventDefault();
        this.hideMenu();
      }else {
          
      }
    },
    processOption (option, values, isFocused) {
      if (!option.componentOptions) return option;

      this.checkAllGroup = values

      const propsData = {
        ...option.componentOptions.propsData,
      }

      return {
        ...option,
        componentOptions: {
          ...option.componentOptions,
          propsData: propsData
        }
      };
    },
    onOptionClick (option) {
      if (this.multiple){
        const valueIsSelected = this.values.find(({value}) => value === option.value);
        if (valueIsSelected){
            this.values = this.values.filter(({value}) => value !== option.value);
        } else {
            this.values = this.values.concat(option);
        }
      }
    },
    getInitialValue () {
      const {multiple, remote, value} = this;
      let initialValue = Array.isArray(value) ? value : [value];
      if (!multiple && (typeof initialValue[0] === 'undefined' || (String(initialValue[0]).trim() === '' && !Number.isFinite(initialValue[0])))) initialValue = [];
      return initialValue.filter((item) => {
        return Boolean(item) || item === 0;
      });
    },
    selectConfirm () {
      this.values = this.checkAllGroup.map(x=>{
        return this.getOptionData(x) 
      });
      this.hideMenu();
    },
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.checkAllGroup = this.flatOptions.map(({componentOptions}) => componentOptions.propsData.label);;
      } else {
        this.checkAllGroup = [];
      }
    },
    checkAllGroupChange (data) {
      if (data.length === 3) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
    initCheckBox () {
      // set the initial values if there are any
      if (!this.remote && this.selectOptions.length > 0){
        this.values = this.getInitialValue().map(value => {
            if (typeof value !== 'number' && !value) return null;
            return this.getOptionData(value);
        }).filter(Boolean);
      }
    }
  },
  mounted () {
    this.eventHub.$on('Select-on-change', this.onOptionClick);

    this.initCheckBox();
  },
  destroyed () {
    this.eventHub.$off('Select-on-change');
  },
  watch: {
    value(value){
      const {getInitialValue, getOptionData, publicValue} = this;

      if (value === '') this.checkAllGroup = [];
      else if (JSON.stringify(value) !== JSON.stringify(publicValue)) {
        this.$nextTick(() => this.values = getInitialValue().map(getOptionData).filter(Boolean));
      }
    },
    values (now, before) {
      const newValue = JSON.stringify(now);
      const oldValue = JSON.stringify(before);
      // v-model is always just the value, event with labelInValue === true
      const vModelValue = (this.publicValue && this.labelInValue) ?
        (this.multiple ? this.publicValue.map(({value}) => value) : this.publicValue.value) :
        this.publicValue;
      const shouldEmitInput = newValue !== oldValue && vModelValue !== this.value;
      if (shouldEmitInput) {
        this.$emit('input', vModelValue); // to update v-model
        this.$emit('on-change', this.publicValue);
        this.dispatch('FormItem', 'on-form-change', this.publicValue);
      }
    }
  }
}
</script>
