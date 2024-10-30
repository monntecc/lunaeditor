<script setup lang="ts">
import { DropdownMenuParent } from "@/model/DropdownMenuParent.ts";
import { ref, Ref } from "vue";

interface DropdownMenuItemProps {
  parent: DropdownMenuParent;
}

withDefaults(defineProps<DropdownMenuItemProps>(), {});

const isHovered: Ref<boolean> = ref(false);

const onHover = () => isHovered.value = !isHovered.value;
</script>

<template>
  <div class="dropdown-menu-wrapper" @mouseenter="onHover()" @mouseleave="onHover()">
    <div class="dropdown-menu-title">{{ parent.span }}</div>
    <div class="dropdown-options" v-if="isHovered">
      <div class="dropdown-menu-children" v-for="children in parent.children" @click="children.func()">
        <span>{{ children.span }}</span>
        <template v-if="children.shortcut">
          <kbd>{{ children.shortcut.join(' + ') }}</kbd>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dropdown-menu-wrapper {
  padding: 8px 12px;
  position: relative;
  text-align: center;

  &:hover {
    background-color: rgba(51, 51, 51, 0.62);
  }
}

.dropdown-options {
  position: absolute;
  min-width: 200px;
  width: auto;
  left: 1px;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  padding: 2px;
  background-color: #1c1c1c;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1px solid #3f3f3f;
}

.dropdown-menu-children {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  text-wrap: nowrap;
  padding: 4px 6px;
  cursor: pointer;
  user-select: none;
  font-size: 14px;

  &:hover {
    background-color: rgba(51, 51, 51, 0.62);
    &:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
}

kbd {
  font-size: 8px;
  font-weight: 700;
  text-wrap: nowrap;
  padding: 4px;
  background-color: rgba(72, 72, 72, 0.21);
  border-radius: 4px;
}
</style>