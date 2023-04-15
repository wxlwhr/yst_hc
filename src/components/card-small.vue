<template>
  <div :class="`small-card p-l-10 p-r-10 type${type}`">
    <div class="small-card-name m-t-5">
      <img class="icon m-r-10" :src="data.icon" alt="" />
      <span>{{ data.name }}</span>
    </div>
    <div class="small-card-num m-t-7 m-b-11">{{ data.num }}</div>
    <div class="small-card-compare p-l-20">
      <span>较前一日</span>
      <span :class="`result ${result_class} m-l-8`">
        {{ result }}
        <span class="triangle"></span>
      </span>
    </div>
    <div v-if="type === 1 && hasBorder" class="border"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs } from "vue";

export default defineComponent({
  props: {
    data: {
      type: Object,
      default() {
        return {
          icon: "",
          name: "",
          num: 0,
          pre: 0,
        };
      },
    },
    hasBorder: {
      type: Boolean,
      default: true,
    },
    type: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const { data } = toRefs(props);
    const type  = props.type;
    const result = computed(() => {
      const { pre, num } = data.value;
      let symbol = num - pre > 0 ? "+" : "";
      if(type == 3){
        return `${pre}%`;
      }
      return `${symbol}${num - pre}`;
    });
    const result_class = computed(() => {
      const { pre, num } = data.value;
      return pre - num > 0 ? "reduce" : "add";
    });
    return {
      result,
      result_class,
    };
  },
});
</script>

<style lang="less" scoped>
.small-card {
  display: flex;
  flex-direction: column;
  position: relative;
  &-name,
  &-num,
  &-compare {
    text-align: center;
  }
  &-name {
    font-weight: 400;
    color: #ccefec;
  }
  &-num {
    font-size: 32px;
    font-weight: bold;
    color: #ffffff;
  }
  &-compare {
    color: #ccefec;
  }
  &.type2 {
    background: url("@/assets/images/statistic_bg-2.png");
    width: 200px;
    height: 200px;
    .small-card-name {
      padding: 28px 0;
    }
    .small-card-num {
      font-size: 36px;
      font-weight: bold;
      color: #01ecec;
    }
  }
  &.type3 {
    background: url("@/assets/images/statistic_bg-3.png");
    width: 200px;
    height: 110px;
    padding: 0;
    .small-card-num {
      color: #01ecec;
    }
  }
  .border {
    position: absolute;
    right: 0;
    content: "";
    display: block;
    width: 2px;
    height: 90px;
    background: linear-gradient(
      to top,
      transparent 0%,
      #0ac4c6 50%,
      transparent 100%
    );
  }
}
.icon {
  width: 22px;
  height: 22px;
}
.result {
  .triangle {
    display: inline-block;
    border: 8px solid transparent;
  }
  &.add {
    color: #ffcf3d;
    .triangle {
      border-bottom-color: #ffcf3d;
    }
  }
  &.reduce {
    color: #ff6d5e;
    .triangle {
      border-top-color: #ff6d5e;
      transform: translateY(7px);
    }
  }
}
</style>