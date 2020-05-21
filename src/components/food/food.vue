<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="scrollwrapper">
      <div class="scrollcontent">
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image" class="img" />
            <div class="back" @click="hide">
              <i class="iconfont icon-arrow_lift"></i>
            </div>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper" v-show="food.count>0">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <div class="buy" v-show="!food.count || food.count === 0" @click="addFirst">加入购物车</div>
        </div>
        <split v-show="food.info"></split>
        <div class="info">
          <h1 class="title">商品信息</h1>
          <p class="text" v-show="food.info">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect
            :selectType="selectType"
            :onlyContent="onlyContent"
            :desc="desc"
            :ratings="food.ratings"
            @ratingtype-select="ratingtypeSelect"
            @content-toggle="contentToggle"
          ></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li
                v-show="needShow(rating.rateType, rating.text)"
                v-for="rating in food.ratings"
                class="rating-item"
                :key="rating.id"
              >
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" hieght="12" :src="rating.avatar" />
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span
                    :class="{'iconfont icon-thumb_up':rating.rateType === 0, 'iconfont icon-thumb_down':rating.rateType === 1}"
                  ></span>
                  {{rating.text}}
                </p>
              </li>
            
            </ul>
          </div>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
import Vue from "vue";
import BScroll from "better-scroll";
import cartcontrol from "../cartcontrol/cartcontrol";
import split from "../split/split";
import ratingselect from "../ratingselect/ratingselect";
import { formatTime } from "../../common/js/data"
export default {
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: "全部",
        positive: "推荐",
        negative: "吐槽"
      }
    };
  },
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    show() {
      this.showFlag = true;
      //   this.selectType = ALL;
      //   this.onlyContent = false;

      if (this.showFlag) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.scrollwrapper, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
    },
    hide() {
      this.showFlag = false;
    },
    addFirst(event) {
      this.$emit("cart-add", event.target);
      Vue.set(this.food, "count", 1);
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    },
    ratingtypeSelect(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    contentToggle(onlyContent) {
      this.onlyContent = onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  filters: {
      formatDate(time) {
        //   使用js模块实现时间格式处理
        let data = new Date(time);
        return formatTime(data, 'yyyy-MM-dd hh:mm');
      }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl';

.food {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  z-index: 30;
  width: 100%;
  height: 100%;
  background: #fff;

  &.move-enter, &.move-leave-to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  &.move-enter-active, &.move-leave-active {
    opacity: 1;
    transition: all 0.2s linear;
  }

  .scrollcontent {
    padding-bottom 60px
  }

  .food-content {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;

    .image-header {
      .img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

    .back {
      position: absolute;
      top: 10px;
      left: 0;

      .icon-arrow_lift {
        display: block;
        padding: 10px;
        font-size: 20px;
        color: #fff;
      }
    }
  }

  .content {
    position: relative;
    margin: 10px;

    .title {
      font-size: 16px;
      font-weight: 700;
      color: #000;
      padding-bottom: 4px;
    }

    .detail {
      margin-top: 5px;
      font-size: 10px;
      color: #333;

      .rating {
        margin-left: 5px;
      }
    }

    .price {
      padding: 10px 0;
      font-weight: 700;
      line-height: 24px;

      .now {
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240, 20, 20);
      }

      .old {
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }

    .cartcontrol-wrapper {
      position: absolute;
      right: 18px;
      bottom: 18px;
    }

    .buy {
      position: absolute;
      right: 18px;
      bottom: 18px;
      z-index: 10;
      height: 24px;
      line-height: 24px;
      padding: 0 12px;
      box-sizing: border-box;
      border-radius: 12px;
      font-size: 10px;
      color: #fff;
      background: rgb(0, 160, 220);
    }
  }

  .info {
    padding: 18px;

    .title {
      line-height: 14px;
      margin-bottom: 6px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }

    .text {
      line-height: 24px;
      padding: 0 8px;
      font-size: 12px;
      color: rgb(77, 85, 93);
    }
  }

  .rating {
    padding: 18px;

    .title {
      line-height: 14px;
      margin-bottom: 6px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }

    .rating-wrapper {
      padding: 0 18px;

      .rating-item {
        position: relative;
        padding: 16px 0;
        border-1px(rgba(7, 17, 27, 0.1));

        .user {
          position: absolute;
          right: 0;
          top: 16px;
          line-height: 12px;
          font-size: 0;

          .name {
            display: inline-block;
            vertical-align: top;
            margin-right: 6px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }

          .avatar {
            border-radius: 50%;
          }
        }

        .time {
          margin-bottom: 6px;
          font-size: 10px;
          line-height: 12px;
          color: rgb(147, 153, 159);
        }

        .text {
          line-height: 16px;
          font-size: 12px;
          color: rgb(7, 17, 27);

          .icon-thumb_up, .icon-thumb_down {
            line-height: 16px;
            margin-right: 4px;
            font-size: 12px;
          }

          .icon-thumb_up {
            color: rgb(0, 160, 220);
          }

          .icon-thumb_down {
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }

  .no-rating {
    padding: 16px 0;
    font-size: 12px;
    color: rgb(147, 153, 159);
  }
}
</style>
