<template>
  <div class="box-card">
    <div class="card-header">
      <div class="card-title">
        <span>{{ title }}</span>
      </div>
    </div>
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "标题",
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.box-card {
  background: rgb(2, 22, 29, 0.8);
  border: 1px solid #346787;
  .card-header {
    .card-title {
      font-size: 20px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: transparent;
      background-image: linear-gradient(0deg, #b5ffda 0%, #ffffff 100%);
      -webkit-background-clip: text;
      padding: 10px;
    }
    &::after {
      content: "";
      display: block;
      height: 1px;
      background: linear-gradient(
        270deg,
        rgba(209, 255, 236, 0) 0%,
        #d1ffec 100%
      );
    }
  }

  .card-content {
    // min-height: 400px;
    height: calc(100% - 41px);
  }
}
</style>