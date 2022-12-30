<template>
  <div>box</div>
</template>

<script setup lang="jsx">
import {
  A,
  B,
} from 'a';
import { E } from 'b';

export { A, B, E };
</script>

<style lang="less">

.a {
    .b
}
</style>
