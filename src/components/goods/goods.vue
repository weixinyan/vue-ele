<template>
  <!-- 使用flex进行两栏布局 -->
  <div class="goods">
    <div class="menu-wrapper" ref="menu">
      <ul>
        <li
          v-for="(item,index) in goods"
          :key="index"
          class="menu-item"
          :class="{'current': currentIndex===index}"
          @click="selectMenu(index, $event)"
        >
          <span class="text border-1px">
            <span v-if="item.type " class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <!-- 自适应右侧 -->
    <div class="foods-wrapper" ref="foods">
      <ul class="good-list">
        <li v-for="(item,index) in goods" :key="index" class="good-item food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul class="food-list">
            <li @click="selectFoods(food, $event)" v-for="(food,num) in item.foods" :key="num" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon" style="width:57px;height:57px" />
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <!-- 按钮组件 -->
                  <cartcontrol :food="food" @cart-add="cartAdd"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 购物车组件 -->
    <shopcart
      ref="shopcart"
      :deliveryPrice="seller.deliveryPrice"
      :minPrice="seller.minPrice"
      :selectFoods="selectFood"
    ></shopcart>
    <!-- food详情页面 -->
    <food :food="selectedFood" ref="food" @cart-add="cartAdd"></food>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import shopcart from "../shopcart/shopcart";
import cartcontrol from "../cartcontrol/cartcontrol";
import food from "../food/food";

export default {
  props: ["seller"],
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    };
  },
  computed: {
    currentIndex() {
      // console.log("this.scrollY--", this.scrollY);
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    // 已经选择的foods--需要传入到购物车组件中
    selectFood() {
      let foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    this.$axios.get("/api/goods").then(result => {
      this.goods = result.data;
      this.$nextTick(() => {
        this._initScroll();
        //  console.log(this.menuScroll)
        this._calculateHeight();
      });
    });
  },
  methods: {
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menu, {
        click: true
      });

      this.foodScroll = new BScroll(this.$refs.foods, {
        click: true,
        probeType: 3
      });
  

      this.foodScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      let foodList = this.$refs.foods.getElementsByClassName("food-list-hook");
      // console.log(foodList)
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index, event) {
      if (!event._constructed) {
        return;
      }
      let foodList = this.$refs.foods.getElementsByClassName("food-list-hook");
      let el = foodList[index];
      this.foodScroll.scrollToElement(el, 300);
      this.scrollY = this.listHeight[index];
      // this.currentIndex = index
    },
    // 父组件想访问子组件的方法
    cartAdd(target) {
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target);
      });
    },
    selectFoods(food, event) {
      if (!event._constructed) {
        return;
      }
      this.selectedFood = food;
      // console.log(this.selectedFood)
      this.$refs.food.show();
    }
  
  },
  components: {
    shopcart,
    cartcontrol,
    food
  },
  // 获取添加事件
  // events: {
  //   "cart-add"(target) {
  //     console.log('00000',target)
  //     this._drop(target);
  //   }
  // }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/';

.goods {
  display: flex;
  overflow: hidden;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      line-height: 14px;
      padding: 0 12px;

      &.current {
        position: relative;
        margin-top: -1px;
        z-index: 10;
        background: #fff;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
        vertical-align: top;

        &.decrease {
          bg-image('decrease_3');
        }

        &.discount {
          bg-image('discount_3');
        }

        &.guarantee {
          bg-image('guarantee_3');
        }

        &.invoice {
          bg-image('invoice_3');
        }

        &.special {
          bg-image('special_3');
        }
      }

      .text {
        display: table-cell;
        width: 56px;
        font-size: 12px;
        vertical-align: middle;
        border-1px(rgba(7, 17, 27, 0.1));
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 17px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
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
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
