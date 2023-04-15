<template>
  <div class="tcm_map_content" id="map_container"></div>
</template>
<script >
let map = null;
let heatmap = null;
let labelsLayer = null;
let massMarks = null;
let normalMarker = null;
let infoWindow1 = null;
let infoWindow2 = null;
let pointMarkList = {};
let bigPointMarkList = [];
import { clinicOne } from "@/api/opsgateway.js";
import Vue from "vue/dist/vue.esm.js";
import customTable from "@/components/swipper/index.vue"; //引入组件
export default {
  name: "tcmMap",
  directives: {},
  components: {},
  data() {
    return {
      AMap: null,
      clnInfo: {},
    };
  },
  props: {},
  computed: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    // 获取门诊详情
    async getClinicOne(clnId) {
      if (clnId === 88888888) {
        this.clnInfo = {
          clnId: 88888888,
          clnName: "小藤中医互联网医院",
          clnDoorPhoto: "",
          clnPhone: "010-88177185",
          clnContact: "李波",
          clnContactNumber: "13934506222",
          clnDetail: "海南省澄迈县老城镇老城高新技术产业示范区",
        };
      } else {
        const res = await clinicOne({
          clnId,
        });
        this.clnInfo = res;
      }
    },

    init() {
      map = new AMap.Map("map_container", {
        //设置地图容器id
        zoom: 4.8, //初始化地图级别
        center: [102.55, 33.32], //初始化地图中心点位置
        resizeEnable: true,
      });
      map.setMapStyle("amap://styles/12bf7b9784e779e838c1cf4c6814b38d");

      map.plugin(["AMap.HeatMap"], () => {
        //初始化heatmap对象
        heatmap = new AMap.HeatMap(map, {
          radius: 25, //给定半径
          gradient: {
            0.5: "#00FFFF",
            0.65: "#00FF00",
            0.7: "#FFD800",
            0.9: "#FF5400",
            1.0: "#ff6699",
          },
          opacity: [0, 0.8],
        });
      });
      normalMarker = new AMap.Marker({
        content: " ",
        anchor: "top-center",
        offset: [0, -50],
      });
    },
    showHeateMap(heatmapData, max) {
      this.removeMarker();
      this.removeMassMarker();
      this.hideHeateMap();
      //设置数据集：该数据为北京部分“公园”数据
      heatmap.setDataSet({
        data: heatmapData,
        max: max,
      });
      heatmap.show();
    },
    hideHeateMap() {
      heatmap.hide();
    },
    addMarker(data) {
      data.forEach((item) => {
        if (!pointMarkList[item.id] && AMap) {
          let marker = new AMap.Marker({
            position: new AMap.LngLat(
              Number(item.position[0]),
              Number(item.position[1])
            ), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: item.name,
            icon: item.icon,
            offset: new AMap.Pixel(-item.offset[0], -item.offset[1]), // 添加 Icon 图标 URL
            extData: item,
          });
          // 将创建的点标记添加到已有的地图实例：
          map.add(marker);
          marker.on("click", this.markerClick);
          pointMarkList[item.id] = marker;
        }
      });
    },
    addMassMarker(data) {
      this.removeMarker();
      this.removeMassMarker();
      this.hideHeateMap();
      let list = [];
      data.forEach((item, i) => {
        list.push({
          lnglat: item.position,
          style: item.icon,
          name: item.name,
          id: i,
          extData: item.data,
        });
      });
      let style = [
        {
          url: "./image/乡镇.png",
          zIndex: 3,
          size: new AMap.Size(30, 30),
          anchor: new AMap.Pixel(15, 15),
        },
        {
          url: "./image/合作.png",
          zIndex: 4,
          size: new AMap.Size(30, 30),
          anchor: new AMap.Pixel(15, 15),
        },
      ];
      massMarks = new AMap.MassMarks(list, {
        opacity: 1,
        zIndex: 111,
        cursor: "pointer",
        style: style,
      });
      massMarks.on("mouseover", function(e) {
        normalMarker.setPosition(e.data.lnglat);
        normalMarker.setContent(
          "<div class='map_icon_title'>" + e.data.name + "</div>"
        );
        map.add(normalMarker);
      });
      massMarks.on("mouseout", function() {
        map.remove(normalMarker);
      });
      massMarks.on("click", (e) => {
        console.log(e);
        if (e.data.extData) {
          const infowindowWrap = Vue.extend({
            template: `
            <div class="tcm_maptips_content">
              <div class="tcm_maptips_title" :title="extData.arStoreName">{{extData.arStoreName}}</div>
            <div class="tcm_maptips_img">
              <customTable :list="extData.arStoreImages.split(',')" v-if="extData.arStoreImages.length"> </customTable>
              <div class="tcm_maptips_img_tips" v-else>暂无门头照片</div>
            </div>
            <div class="tcm_maptips_title">门诊联系信息</div>
            <div class="tcm_maptips_info">
              <div class="tcm_maptips_info_item">
                <div>联系人</div>
                <div>：</div>
                <div>{{extData.arContact}}</div>
              </div>
              <div class="tcm_maptips_info_item">
                <div>手机号</div>
                <div>：</div>
                <div>{{extData.arContactNumber}}</div>
              </div>
              <div class="tcm_maptips_info_item">
                <div>地址</div>
                <div>：</div>
                <div>{{extData.arProvinceName+extData.arCityName+extData.arCountyName+extData.arStoreAddr}}</div>
              </div>
            </div>
            </div>
          `,
            data: function() {
              return {
                extData: e.data.extData,
              };
            },
            components: {
              customTable: customTable,
            },
          });
          const component = new infowindowWrap().$mount();
          infoWindow2 = new AMap.InfoWindow({
            offset: new AMap.Pixel(0, -25),
            content: component.$el,
          });
          infoWindow2.open(map, e.data.lnglat);
        }
      });
      massMarks.setMap(map);
    },
    removeMarker() {
      for (const key in pointMarkList) {
        map.remove(pointMarkList[key]);
      }
      pointMarkList = {};

      infoWindow1 && infoWindow1.close();
    },
    removeMassMarker() {
      massMarks && massMarks.clear();
      infoWindow2 && infoWindow2.close();
    },
    async markerClick(e) {
      console.log(e);
      console.log(e.target.getPosition());
      await this.getClinicOne(e.target._opts.extData.id);
      this.openInfo(e.target.getPosition());
      this.$emit("pointclick", this.clnInfo);
    },
    openInfo(position) {
      const cln = this.clnInfo;
      const imgList = cln.clnDoorPhoto.split(",").filter((item) => {
        return item.length;
      });
      const infowindowWrap = Vue.extend({
        template: `
          <div class="tcm_maptips_content">
            <div class="tcm_maptips_title" :title="cln.clnName">{{cln.clnName}}</div>
            <div class="tcm_maptips_img">
              <customTable :list="imgList" v-if="imgList"> </customTable>
              <div class="tcm_maptips_img_tips" v-else>暂无门头照片</div>
            </div>
            <div class="tcm_maptips_title">门诊联系信息</div>
            <div class="tcm_maptips_info">
              <div class="tcm_maptips_info_item">
                <div>座机号</div>
                <div>：</div>
                <div>{{cln.clnPhone}}</div>
              </div>
              <div class="tcm_maptips_info_item">
                <div>联系人</div>
                <div>：</div>
                <div>{{cln.clnContact}}</div>
              </div>
              <div class="tcm_maptips_info_item">
                <div>手机号</div>
                <div>：</div>
                <div>{{cln.clnContactNumber}}</div>
              </div>
              <div class="tcm_maptips_info_item">
                <div>地址</div>
                <div>：</div>
                <div>{{cln.clnDetail}}</div>
              </div>
            </div>
          </div>
        `,
        data: function() {
          return {
            cln: cln,
            imgList: imgList,
          };
        },
        components: {
          customTable: customTable,
        },
      });
      const component = new infowindowWrap().$mount();
      infoWindow1 = new AMap.InfoWindow({
        offset: new AMap.Pixel(0, -75),
        content: component.$el,
      });
      infoWindow1.open(map, position);
    },
  },
  watch: {},
};
</script>
<style lang="less">
@import "../../assets/css/map/map.less";
</style>
