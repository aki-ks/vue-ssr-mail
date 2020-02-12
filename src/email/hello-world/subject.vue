<template>
  <raw><pre>Thanks for joining, {{data.prename}}!</pre></raw>
</template>

<script lang="ts">
  import Raw from '@/components/raw.vue'
  import { Vue, Component, Inject } from 'vue-property-decorator'
  import { Data } from '.';

  @Component({
    components: { Raw: Raw },
  })
  export default class HelloWorldSubject extends Vue {
    @Inject()
    data!: Data;
  }
</script>

<style>
</style>
