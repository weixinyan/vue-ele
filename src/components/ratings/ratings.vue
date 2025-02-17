<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <div class="score">{{seller.serviceScore}}</div>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <div class="score">{{seller.foodScore}}</div>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect
        :selectType="selectType"
        :onlyContent="onlyContent"
        :ratings="ratings"
        @ratingtype-select="ratingtypeSelect"
        @content-toggle="contentToggle"
      ></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in ratings" :key="rating.id" class="rating-item">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28" class="img" />
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="iconfont icon-thumb_up"></span>
                <span v-for="item in rating.recommend" :key="item.id" class="item">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

import BScroll from "better-scroll";
import star from "../star/star";
import split from "../split/split";
import ratingselect from "../ratingselect/ratingselect";
import { formatTime } from "../../common/js/data";
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      selectType: ALL,
      onlyContent: true,
      ratings: []
    };
  },
  created() {
    this.$axios.get("/api/ratings").then(result => {
      this.ratings = result.data;
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.ratings, {
          click: true
        });
      });
    });
  },
  methods: {
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
    star,
    split,
    ratingselect
  },
  filters: {
    formatDate(time) {
      //   使用js模块实现时间格式处理
      let data = new Date(time);
      return formatTime(data, "yyyy-MM-dd hh:mm");
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl';

.ratings {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;

  .overview {
    display: flex;
    padding: 18px 0;

    .overview-left {
      flex: 0 0 137px;
      padding: 6px;
      width: 137px;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      text-align: center;

      @media only screen and (max-width: 320px) {
        flex: 0 0 120px;
        width: 120px;
      }

      .score {
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color: rgb(255, 153, 0);
      }

      .title {
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 1;
        color: rgb(7, 17, 27);
      }

      .rank {
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }

    .overview-right {
      flex: 1;
      padding: 6px 0 6px 24px;

      @media only screen and (max-width: 320px) {
        padding-left: 6px;
      }

      .score-wrapper {
        font-size: 0;

        .title {
          display: inline-block;
          vertical-align: top;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }

        .star {
          display: inline-block;
          margin: 0 12px;
          vertical-align: top;
        }

        .score {
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          color: rgb(255, 153, 0);
        }
      }

      .delivery-wrapper {
        fone-size: 0;

        .title {
          margin-bottom: 8px;
          line-height: 12px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }

        .delivery {
          margin-left: 12px;
          font-size: 12px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}

.rating-wrapper {
  padding: 0 18px;

  .rating-item {
    display: flex;
    padding: 18px 0;
    border-1px(rgba(7, 17, 27, 0.2));

    .avatar {
      flex: 0 0 28px;
      width: 28px;
      margin-right: 12px;

      .img {
        border-radius: 50%;
      }
    }

    .content {
      position: relative;
      flex: 1;

      .name {
        line-height: 12px;
        font-size: 10px;
        color: rgb(7, 17, 27);
        margin-bottom: 4px;
      }

      .star-wrapper {
        margin: 6px;
        font-size: 0;

        .star {
          display: inline-block;
          margin-right: 6px;
          vertical-align: top;
        }

        .delivery {
          display: inline-block;
          vertical-align: top;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }

      .name {
      }

      .text {
        margin-bottom: 8px;
        line-height: 18px;
        color: rgb(7, 17, 27);
        font-size: 12px;
      }

      .recommend {
        line-height: 16px;
        font-size: 0;

        .icon-thumb_up, .item {
          display: inline-block;
          font-size: 9px;
        }

        .icon-thumb_up {
          color: rgb(0, 160, 220);
        }

        .item {
          padding: 0 6px;
          border: 1px solid rgba(7, 17, 27, 0.1);
          border-radius: 1px;
          color: rgb(147, 153, 159);
          background: #fff;
        }
      }

      .time {
        position: absolute;
        right: 0;
        top: 0;
        line-height: 12px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }
  }
}
</style>
