<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  /**
   * A Vue component that extracts the text node of single contained 'pre' tag.
   * This component is required since 'pre' elements are the only components that preserve whitespacing.
   *
   * If we want a component to render raw text, this component can be utilized
   * to trim the opening and closing 'pre' tag.
   */
  @Component({
    name: 'raw'
  })
  export default class Raw extends Vue{
    render () {
      const children = this.$slots.default!;
      if (children.length !== 1 || children[0].tag !== 'pre') {
        throw new Error('Expected "raw" component to contain exactly one "pre" element');
      }

      let pre = children[0];
      if (!pre.children || pre.children.length !== 1 || pre.children[0].tag) {
        throw new Error('Expected nested "pre" element to contain exactly one text node')
      }

      const textNode = pre.children![0];
      textNode.text = textNode.text?.trim();
      return textNode;
    }
  }
</script>
