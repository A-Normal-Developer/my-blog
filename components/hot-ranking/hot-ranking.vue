<template>
  <view class="ranking-container">
    <image class="ranking-bg" :src="getRankingBg"></image>
    <text class="ranking-text" :class="{'text-white': ranking <= 3}">{{ ranking }}</text>
  </view>
</template>

<script>
  export default {
    name: "hot-ranking",
    props: {
      ranking: {
        type: Number,
        required: true
      }
    },
    computed: {
      getRankingBg() {
        if (this.ranking <= 3) {
          return require(`@/static/images/ranking-${this.ranking}.png`)
        } else {
          return require(`@/static/images/ranking-other.png`)
        }
      }
      
      
    },
    data() {
      return {

      };
    }
  }
</script>

<style lang="scss" scoped>
  .ranking-container {
    position: relative;
    text-align: center;
    width: 36rpx;
    height: 40rpx;

    .ranking-bg {
      width: 100%;
      height: 100%;
    }

    .ranking-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-55%, -55%);
      font-size: $uni-font-size-sm;
      font-weight: 700;
      color: $uni-text-color;
    }
    .text-white {
      color: #fff;
    }
    
  }
</style>
