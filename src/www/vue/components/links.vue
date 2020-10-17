<template lang="pug">
  .links
    p
      router-link(:to="{name:'HelloComponent'}") typeScirpt_webpack_vue
    p
      router-link(:to="{name:'HiUserComponent'}") Hi User
    p
      router-link(:to="{name:'SwitchComponent'}") switch
    p
      router-link(:to="{name:'V1Component'}") v1
    p
      router-link(:to="{name:'V2Component'}") v2
</template>