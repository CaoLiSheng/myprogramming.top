<template>
  <svg class="icon" viewBox="0 0 1024 1024" width="256" height="256">
    <path
      class="outline"
      d="M278.826667 213.333333H896a85.333333 85.333333 0 0 1 85.333333 85.333334v426.666666a85.333333 85.333333 0 0 1-85.333333 85.333334H278.826667a85.333333 85.333333 0 0 1-70.997334-37.973334l-157.994666-237.013333a42.666667 42.666667 0 0 1 0-47.36L207.786667 251.349333A85.333333 85.333333 0 0 1 278.826667 213.333333z m-142.208 298.666667l142.208 213.333333H896V298.666667H278.826667l-142.208 213.333333zM298.666667 554.666667a42.666667 42.666667 0 1 1 0-85.333334 42.666667 42.666667 0 0 1 0 85.333334z"
    ></path>
  </svg>
</template>

<style lang="stylus" scoped>
.tag path
  fill: var(--btn-base-theme-color);
  transition: transform 200ms;
.tag:hover path, .tag.selected path
  transform: scale3d(-1, 1, 1);
  transform-origin: 50% 50% 0;
  fill: var(--btn-active-theme-color);
</style>