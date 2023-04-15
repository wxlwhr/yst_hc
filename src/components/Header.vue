<template>
  <div class="yst-header-container">
    <div class="yst-header-container-title">玉生堂中医互联网养生馆</div>
    <div class="yst-header-container-date">
      <span>
        北京市
      </span>
      <span>
        多云转晴
      </span>
      <span>
        10℃ ~ 12℃
      </span>
      <span>
        2023年04月11日       星期二      08:00
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped>
.yst-header-container {
  width: 100%;
  height: 60px;
  background: url("../assets/images/header_bg.png") no-repeat;
  background-position: center top;
  background-size: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 22px 0 33px;
  box-sizing: border-box;
  .yst-header-container-title {
    font-size: 28px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 30px;
    background: linear-gradient(0deg, #B5FFDA 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .yst-header-container-date {
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 30px;
    >span:nth-child(2),>span:nth-child(4){
      padding-left: 24px;
    }
    >span:nth-child(3){
      padding-left: 14px;
    }
  }
}
</style>
