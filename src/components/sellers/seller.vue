<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="iconfont icon-favorite" :class="{'active': favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
      </div>
      <ul v-if="seller.supports" class="supports">
        <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
          <span class="icon" :class="classMap[item.type]"></span>
          <span class="text">{{item.description}}</span>
        </li>
      </ul>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics" :key="pic.id">
              <img :src="pic" width="120" height="90" />
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos" :key="info.id">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import { saveToLocal,loadFromLocal } from '../../common/js/store';
import BScroll from "better-scroll";
import star from "../star/star";
import split from "../split/split";
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
    //   favorite: false
    favorite: (()=> {
        return loadFromLocal(this.seller.id, 'favorite', false);
    })()
    };
  },
  computed: {
    favoriteText() {
      return this.favorite ? "已收藏" : "收藏";
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "guarantee", "invoice", "special"];
  },
  //   当dom元素全部渲染好的情况下
  mounted() {
    this._initScroll();
    this._initPics();
  },
  watch: {
    seller() {
      this._initScroll();
      this._initPics();
    }
  },
  methods: {
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    },
    _initPics() {
      // 实现图片横向滚动效果
      if (this.seller.pics) {
        let picWidth = 120;
        let margin = 6;
        let width = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs.picList.style.width = width + "px";
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassThrough: "vertical"
            });
          } else {
            this.picScroll.refresh();
          }
        });
      }
    },
    toggleFavorite() {
        this.favorite = !this.favorite;
        // 缓存到前端页面中
        // localStorage.favorite = this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
    }
  },
  components: {
    star,
    split
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl';

.seller {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;

  .overview {
    position: relative;
    padding: 18px;

    .title {
      margin-bottom: 8px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }

    .desc {
      padding-bottom: 18px;
      font-size: 0;
      border-1px(rgba(7, 17, 27, 0.1));

      .star {
        display: inline-block;
        vertical-align: top;
        margin-right: 8px;
      }

      .text {
        display: inline-block;
        vertical-align: top;
        margin-right: 12px;
        font-size: 10px;
        color: rgb(77, 85, 93);
      }
    }

    .remark {
      display: flex;
      padding-top: 18px;

      .block {
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, 0.1);

        &:last-child {
          border: none;
        }

        h2 {
          margin-bottom: 4px;
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .content {
          line-height: 24px;
          font-size: 10px;
          color: rgb(7, 17, 27);
        }

        .stress {
          font-size: 24px;
        }
      }
    }

    .favorite {
      position: absolute;
      width 50px
      right: 11px;
      top: 18px;
      text-align: center;


      .icon-favorite {
        display: block;
        margin-bottom: 4px;
        line-height: 24px;
        font-size: 24px;
        color: #d4d6d9;

        &.active {
          color: rgb(240, 20, 20);
        }
      }
      .text{
          line-height 10px
          font-size 10px
          color rgb(77, 85, 93)
          
          }
    }
  }

  .bulletin {
    padding: 18px 18px 0 18px;

    .title {
      margin-bottom: 8px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }

    .content-wrapper {
      padding: 0 12px 16px 12px;
      border-1px(rgba(7, 17, 27, 0.1));

      .content {
        line-height: 24px;
        font-size: 12px;
        color: rgb(240, 20, 20);
      }
    }
  }

  .supports {
    padding-left: 18px;

    .support-item {
      padding: 16px 12px;
      border-1px(rgba(7, 17, 27, 0.1));
      font-size: 0;

      &:last-child {
        border-none();
      }

      .icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 6px;
        background-size: 16px 16px;
        background-repeat: no-repeat;
        vertical-align: top;

        &.decrease {
          bg-image('decrease_2');
        }

        &.discount {
          bg-image('discount_2');
        }

        &.guarantee {
          bg-image('guarantee_2');
        }

        &.invoice {
          bg-image('invoice_2');
        }

        &.special {
          bg-image('special_2');
        }
      }

      .text {
        line-height: 16px;
        font-size: 12px;
        color: rgb(7, 17, 27);
      }
    }
  }

  .pics {
    padding: 18px;

    .title {
      margin-bottom: 12px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }

    .pic-wrapper {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;

      .pic-list {
        font-size: 0;

        .pic-item {
          display: inline-block;
          margin-right: 6px;
          width: 120px;
          height: 90px;

          &:last-child {
            margin: 0;
          }
        }
      }
    }
  }

  .info {
    padding: 18px 18px 0 18px;
    color: rgb(7, 17, 27);

    .title {
      padding-bottom: 12px;
      line-height: 14px;
      font-size: 14px;
      border-1px(rgba(7, 17, 27, 0.1));
    }

    .info-item {
      padding: 16px 12px;
      line-height: 16px;
      font-size: 12px;
      border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
      }
    }
  }
}
</style>
