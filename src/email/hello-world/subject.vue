<template>
  <Raw>
    Thanks for joining, {{data.prename}}!
  </Raw>
</template>

<script lang="ts">
  import Raw from '@/components/Raw.vue'
  import { Vue, Component } from 'vue-property-decorator'

  @Component({
    components: { Raw },
    inject: [ 'data' ]
  })
  export default class HelloWorldSubject extends Vue {}
</script>

<style>
</style>
