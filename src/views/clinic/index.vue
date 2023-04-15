<template>
  <div class="clinic">
    <div class="clinic-top clinic-item">
      <!-- 店铺信息 -->
      <Card title="店铺信息" class="clinic-info m-r-20">
        <div class="info p-l-16 p-t-14 p-b-14 p-r-30">
          <div class="info-img m-r-14">
            <img src="" alt="" />
          </div>
          <div class="info-text">
            <div class="info-text-name m-b-12">{{ data.info.name }}</div>
            <div class="info-text-address">
              <img class="icon" src="@/assets/images/地址.png" alt="" />
              {{ data.info.address }}
            </div>
            <div class="info-text-score p-l-24">
              <span v-for="item in 5" :key="item">
                <img
                  class="icon"
                  v-if="item <= data.info.score"
                  src="@/assets/images/星.png"
                  alt=""
                />
                <img
                  class="icon"
                  v-else
                  src="@/assets/images/星-none.png"
                  alt=""
                />
              </span>
            </div>
          </div>
        </div>
        <div class="sell">
          <SmallCard
            v-for="(item, index) in sells"
            :key="index"
            :has-border="index !== 2"
            :data="item"
            :type="1"
          />
        </div>
        <div class="chart m-t-10">
          <Charts :option="infoOption"></Charts>
        </div>
      </Card>
      <!-- 店铺销售 -->
      <Card title="店铺销售" class="clinic-sell"> </Card>
    </div>
    <div class="clinic-bottom clinic-item m-t-20">
      <!-- 店铺客户 -->
      <Card title="店铺客户" class="clinic-client m-r-20"> </Card>
      <!-- 销售额 -->
      <Card title="销售额" class="clinic-sales m-r-20"> </Card>
      <!-- 运维监控 -->
      <Card title="运维监控" class="clinic-video"> </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Card from "./components/box-card.vue";
import SmallCard from "@/components/card-small.vue";
import Charts from "@/components/charts.vue";
import icon1 from "@/assets/images/日客单价.png";
import icon2 from "@/assets/images/日客流量.png";
import icon3 from "@/assets/images/日销售额.png";
import { infoOption } from "./options";

export default defineComponent({
  components: {
    Card,
    SmallCard,
    Charts,
  },
  setup() {
    const data = ref({
      info: {
        name: "玉生堂慧中医诊所",
        address: "北京市丰台区大成路金隅大成时代1103",
        score: 3,
      },
    });
    const sells = ref([
      {
        name: "日客流量",
        icon: icon2,
        num: 124,
        pre: 78,
      },
      {
        name: "日销售额",
        icon: icon3,
        num: 1452.45,
        pre: 78,
      },
      {
        name: "日销售额",
        icon: icon1,
        num: 1502.45,
        pre: 78,
      },
    ]);
    return {
      data,
      icon1,
      icon2,
      icon3,
      sells,
      infoOption,
    };
  },
});
</script>

<style lang="less" scoped>
.clinic {
  height: 100%;
  &-item {
    display: flex;
    height: calc(50% - 10px);
  }
  &-info,
  &-client,
  &-sales {
    width: 614px;
  }
  &-sell,
  &-video {
    width: 100%;
    flex: 1;
  }
  .icon {
    width: 22px;
    height: 22px;
  }
  &-info {
    .info {
      display: flex;
      &-img {
        width: 160px;
        height: 90px;
        background: #00e59b;
        border-radius: 5px;
      }
      &-text {
        &-name {
          font-size: 22px;
          font-weight: 500;
          color: #FFFFFF;
        }
        &-address {
          font-size: 16px;
          color: #ccefec;
        }
      }
    }
    .sell {
      display: flex;
      justify-content: center;
    }
    .chart{
        width: 100%;
        height:calc(100% - 226px);
    }
  }
}
</style>