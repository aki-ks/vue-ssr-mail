<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  @Component({
    name: 'Raw'
  })
  export default class Raw extends Vue{
    render () {
      return this.$slots.default
    }
  }
</script>

<style>
</style>
