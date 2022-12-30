<template>
  <div>box</div>
</template>

<script lang="jsx">
import { A } from 'a';
import C, { E } from 'b';

import { h } from '@stencil/core';

export { A, C, E };

export const a = <div />
</script>

<style lang="less">

.a {
    .b
}
</style>
