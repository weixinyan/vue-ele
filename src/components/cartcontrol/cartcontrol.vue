<template>
  <div class="cartcontrol">
    <transition>
      <div
        class="iconfont icon-remove_circle_outline cart-decrease"
        v-show="food.count>0"
        @click.stop="decreaseCart($event)"
      ></div>
    </transition>

    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>

    <div class="iconfont icon-add_circle cart-add" @click.stop="addCart($event)"></div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  props: {
    food: {
      type: Object
    }
  },
  created() {
    // console.log(this.food);
  },
  methods: {
    addCart(event) {
      console.log('123445')
      if (!event._constructed) {
        return;
      }
      //   console.log('click');
      if (!this.food.count) {
        //   this.food.count = 1;
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
      // 此处为了获取点击加这个事件--子向父传值，cart-add父组件函数名，target子组件的参数
      this.$emit('cart-add', event.target);
   
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return;
      }
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.cartcontrol {
  font-size: 0;

  .cart-decrease, .cart-add, .cart-count {
    display: inline-block;
  }

  .cart-decrease,.cart-add {
   
      font-size: 24px;
      line-height: 24px;
      color: rgb(0, 160, 220);

  }

  .cart-count {
    vertical-align: top;
    width: 12px;
    padding: 0 5px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .cart-add {
  
  }

  .v-enter-active, .v-leave-active {
    transition: all 0.5s linear;
    opacity: 1;
  }

  .v-enter, .v-leave-to {
    opacity: 0;
    transform: translate3d(24px, 0, 0);
  }
}
</style>
