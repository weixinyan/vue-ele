<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64" />
      </div>
      <!-- 内容区 -->
      <div class="content">
        <div class="title">
          <div class="brand"></div>
          <div class="name">{{seller.name}}</div>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div v-if="seller.supports" class="supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <!-- 小图标区 -->
      <div v-if="seller.supports" class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="iconfont icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="iconfont icon-keyboard_arrow_right" @click="showDetail"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" />
    </div>
    <!-- 详情页 -->
    <!-- <div v-show="detailShow" class="detail"> -->
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
            <!-- 这个地方传递只到子组件 4.2-->
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="txt">优惠信息</div>
            <div class="line"></div>
          </div>
          <!-- 详细页面中的活动 -->
          <ul v-if="seller.supports" class="detail-supports">
            <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="txt">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>

      <div class="detail-close" @click="hideDetail">
        <i class="iconfont icon-guanbi"></i>
      </div>
    </div>
  </div>
</template>

<script>
import star from "../star/star.vue";
export default {
  props: ["seller"],
  data() {
    return {
      detailShow: false
    };
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "guarantee", "invoice", "special"];
  },
  components: {
    star
  }
};
</script>

<style lang="stylus" scoped>
@import './common/stylus/mixin.styl';

.header {
  overflow: hidden;
  position: relative;
  color: #fff;
  background: rgba(7, 17, 27, 0.5);

  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;

    .avatar {
      display: inline-block;
      vertical-align: top;

      img {
        border-radius: 2px;
      }
    }

    .content {
      display: inline-block;
      font-size: 14px;
      margin-left: 16px;

      .title {
        margin: 2px 0px 8px 0;

        .brand {
          display: inline-block;
          width: 30px;
          height: 18px;
          bg-image('brand');
          background-size: 30px 18px;
          background-repeat: no-rapeat;
          vertical-align: top;
        }

        .name {
          display: inline-block;
          margin-left: 6px;
          font-size: 16px;
          line-height: 18px;
          font-weight: blod;
        }
      }

      .description {
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
      }

      .supports {
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          vertical-align: top;

          &.decrease {
            bg-image('decrease_1');
          }

          &.discount {
            bg-image('discount_1');
          }

          &.guarantee {
            bg-image('guarantee_1');
          }

          &.invoice {
            bg-image('invoice_1');
          }

          &.special {
            bg-image('special_1');
          }
        }

        .text {
          font-size: 12px;
          line-height: 10px;
        }
      }
    }

    .support-count {
      position: absolute;
      right: 12px;
      bottom: 14px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.2);
      text-align: center;

      .count {
        font-size: 10px;
        vertical-align: top;
      }

      .icon-keyboard_arrow_right {
        margin-left: 2px;
        font-size: 10px;
      }
    }
  }

  .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(7, 17, 27, 0.2);

    // font-size 0 消除空白间隙
    .bulletin-title {
      vertical-align: top;
      display: inline-block;
      width: 22px;
      height: 12px;
      bg-image('bulletin');
      background-size: 22px 12px;
      background-repeat: no-repeat;
      margin-top: 8px;
    }

    .bulletin-text {
      vertical-align: top;
      margin: 0 4px;
      font-size: 10px;
    }

    .icon-keyboard_arrow_right {
      position: absolute;
      font-size: 10px;
      right: 12px;
      top: 0px;
    }
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }

  .detail {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7, 17, 27, 0.8);

    .v-enter, .v-leave {
      opacity: 1;
    }

    .v-enter-active, .v-leave-active {
      opacity: 0;
      transition: all 0.8s ease;
    }

    .detail-wrapper {
      min-height: 100%;
      width: 100%;

      .detail-main {
        margin-top: 60px;
        padding-bottom: 64px;

        .name {
          line-height: 16px;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
        }

        .star-wrapper {
          margin-top: 18px;
          padding: 2px 0;
          text-align: center;
        }

        .title {
          display: flex;
          width: 80%;
          margin: 28px auto 24px auto;

          .line {
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }

          .txt {
            padding: 0 12px;
            font-size: 14px;
            font-weight: 700;
          }
        }

        .detail-supports {
          width: 80%;
          margin: 0 auto;

          .support-item {
            padding: 0 12px;
            margin-bottom: 12px;

            &:last-child {
              nargin-bottom: 0;
            }

            .icon {
              display: inline-block;
              width: 16px;
              height: 16px;
              vertical-align: top;
              margin-right: 6px;
              background-size: 16px 16px;
              background-repeat: no-repeat;

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
              line-height: 12px;
              font-size: 12px;
            }
          }
        }

        .bulletin {
          width: 80%;
          margin: 0 auto;

          .content {
            padding: 0 12px;
            line-height: 24px;
            font-size: 12px;
          }
        }
      }
    }

    .detail-close {
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0 auto;
      clear: both;
      font-size: 32px;
    }
  }
}
</style>
