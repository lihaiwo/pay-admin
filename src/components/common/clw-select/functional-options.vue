<script>
const returnArrayFn = () => [];
export default {
  props: {
    options: {
      type: Array,
      default: returnArrayFn
    },
  },
  functional: true,
  render(h, {props, parent}){
    return props.options;
  }
}
</script>
