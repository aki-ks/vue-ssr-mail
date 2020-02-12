<template>
  <Raw>
    Hello {{data.male ? 'Mr.' : 'Ms.'}} {{data.prename}} {{data.lastname}}
  </Raw>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import Raw from '@/components/Raw.vue'

  @Component({
    components: { Raw },
    inject: [ 'data' ]
  })
  export default class HelloWorldPlain extends Vue {}
</script>

<style>
</style>
