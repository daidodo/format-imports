<script setup>
import Bar from './Bar.vue';
import Foo from './Foo.vue';
</script>

<template>
  <component :is="Foo" />
  <component :is="someCondition ? Foo : Bar" />
</template>