<template>
  <div>box</div>
</template>

<script lang="js">
import React from 'react';

import {
  A,
  B,
} from 'a';
import C, {
  D,
  E,
} from 'b';
import F from 'b';

import { h } from '@stencil/core';

export { A, C, E };

export const a = <div />
</script>

<style lang="less">

.a {
    .b
}
</style>
