<template>
  <div id="app">
    <!-- 头部区域 -->
    <v-header :seller="seller"></v-header>
    <!-- 分类导航 -->
    <div class="tab">
      <router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/ratings" class="tab-item">评论</router-link>
      <router-link to="/sellers" class="tab-item">商家</router-link>
    </div>
    <!-- 内容区 -->
    <keep-alive>
        <router-view :seller="seller"></router-view>
    </keep-alive>
  
  </div>
</template>

<script>
import { urlParse } from './common/js/url'
import header from "./components/header/header.vue";
export default {
  name: "App",
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          // console.log(queryParam)
          return queryParam.id;
        })()
      }
    };
  },
  created() {
    this.$axios.get("/api/sellers?id=" + this.seller.id).then(result => {
      this.seller = result.data;
      // console.log(this.seller.id)---取不到id
      this.seller = Object.assign({}, this.seller, result.data);//对象扩展属性
      // console.log(this.seller.id)---可取到id
    });
  },
  components: {
    "v-header": header
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
@import './common/stylus/mixin.styl';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;

  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-1px(rgba(7, 17, 27, 0.1));
    text-align center

    .tab-item {
      flex: 1;
    }
  }

  .active {
    color: red;
  }
}
</style>
