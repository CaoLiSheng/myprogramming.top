<template lang="pug">
.r.tag-clouds(:style="{ height }")
  a(
    v-for="tag in allTags",
    :key="tag",
    :class="{ selected: isSelected(tag), out: isOut(tag) }",
    @click="$event.preventDefault(); click(tag)"
  ) {{ tag }}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class TagClouds extends Vue.extend({
  props: ["allTags", "extendable", "selected", "height"],
}) {
  isSelected(tag: string): boolean {
    return this.selected.includes(tag);
  }

  isOut(tag: string): boolean {
    if (!this.extendable.length) return false;
    return !this.extendable.includes(tag);
  }

  click(tag: string) {
    const curR = this.$router.currentRoute;
    const query = curR.params["query"];

    let newQuery = tag;
    if ("*" !== query) {
      const tags = query.split(",").map((t: string) => t.trim());
      const idx = tags.indexOf(tag);
      if (idx >= 0) {
        if (tags.length === 1) {
          newQuery = "*";
        } else {
          newQuery = [...tags.slice(0, idx), ...tags.slice(idx + 1)].join(",");
        }
      } else {
        newQuery = [...tags, tag].join(",");
      }
    }

    this.$router.replace({
      name: "TagsComponent",
      params: { query: newQuery },
    });
  }
}
</script>

<style lang="stylus" scoped>
.tag-clouds
  overflow-x: hidden;
  overflow-y: auto;
  border-bottom: solid 0.01rem gray;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: flex-start;
  a
    cursor: pointer;
    font-size: 0.18rem;
    line-height: 1em;
    border-radius: 0.3em;
    padding: 0.2em 0.5em;
    margin: 0.3em;
    color: var(--tag-base-foreground-theme-color);
    background: var(--tag-base-background-theme-color);
    &.out
      color: var(--tag-out-foreground-theme-color);
      background: var(--tag-out-background-theme-color);
    &.selected
      color: var(--tag-selected-foreground-theme-color);
      background: var(--tag-selected-background-theme-color);
      text-shadow: 0 0 0.1em var(--tag-selected-shadow-theme-color);
    @media (hover: hover)
      &:hover
        color: var(--tag-hover-foreground-theme-color);
        background: var(--tag-hover-background-theme-color);
    &:active
      color: var(--tag-active-foreground-theme-color);
      background: var(--tag-active-background-theme-color);
</style>

<style lang="stylus" scoped>
body[theme='Light'] .tag-clouds
  --tag-base-foreground-theme-color: #333;
  --tag-base-background-theme-color: #eee;
  --tag-selected-foreground-theme-color: #ddd;
  --tag-selected-background-theme-color: #f66;
  --tag-selected-shadow-theme-color: #333;
  --tag-out-foreground-theme-color: #666;
  --tag-out-background-theme-color: #aaa;
  --tag-hover-foreground-theme-color: #98f;
  --tag-hover-background-theme-color: #609;
  --tag-active-foreground-theme-color: #a9f;
  --tag-active-background-theme-color: #63e;
body[theme='Dark'] .tag-clouds
  --tag-base-foreground-theme-color: #eee;
  --tag-base-background-theme-color: #333;
  --tag-selected-foreground-theme-color: #ddd;
  --tag-selected-background-theme-color: #f66;
  --tag-selected-shadow-theme-color: #333;
  --tag-out-foreground-theme-color: #aaa;
  --tag-out-background-theme-color: #666;
  --tag-hover-foreground-theme-color: #98f;
  --tag-hover-background-theme-color: #609;
  --tag-active-foreground-theme-color: #a9f;
  --tag-active-background-theme-color: #63e;
</style>