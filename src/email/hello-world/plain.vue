<template>
<raw><pre>Hello {{data.male ? 'Mr.' : 'Ms.'}} {{data.prename}} {{data.lastname}}</pre></raw>
</template>

<script lang="ts">
  import { Vue, Component, Inject } from 'vue-property-decorator'
  import Raw from '@/components/raw.vue'
  import { Data } from '.';

  @Component({
    components: { Raw: Raw },
  })
  export default class HelloWorldPlain extends Vue {
    @Inject()
    data!: Data;
  }
</script>

<style>
</style>
