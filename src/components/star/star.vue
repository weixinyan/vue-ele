<template>
  <div class="star" :class="starType">
    <span v-for="item in itemClass" :class="item" class="star-item" :key="item.id">{{item}}</span>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = "on";
const CLS_HALF = "half";
const CLS_OFF = "off";

export default {
  props: ["size", "score"],

  // 引入到子组件中
  computed: {
    starType() {
      return "star-" + this.size;
      // 在这里应用，定义类。新类
    },
    itemClass() {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      let hasDecimal = score % 1 != 0;
      let integer = Math.floor(score);
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
      console.log(result);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './common/stylus/mixin.styl';

.star {
  font-size: 0;
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }

  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('star24_on');
      }

      &.half {
        bg-image('star24_half');
      }

      &.off {
        bg-image('star24_off');
      }
    }
  }

  &.star-36 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('star36_on');
      }

      &.half {
        bg-image('star36_half');
      }

      &.off {
        bg-image('star36_off');
      }
    }
  }

  &.star-48 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('star48_on');
      }

      &.half {
        bg-image('star48_half');
      }

      &.off {
        bg-image('star48_off');
      }
    }
  }
}
</style>
