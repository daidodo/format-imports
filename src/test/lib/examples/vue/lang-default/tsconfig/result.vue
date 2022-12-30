<template>
  <div>box</div>
</template>

<script>
import React from 'react';

import { A } from 'a';
import C, { E } from 'b';

export { A, C, E };

export const a = <div />
</script>

<style lang="less">

.a {
    .b
}
</style>
