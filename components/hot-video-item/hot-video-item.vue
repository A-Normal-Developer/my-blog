<template>
  <view class="hot-video-item-container">
    <view class="video-box">
      <video id="my-video" class="video" :src="data.play_url" enable-danmu danmu-btn></video>
    </view>
    <view class="hot-video-info"  @click="$emit('click', data)">
      <view class="video-title">{{ data.title }}</view>
      <view class="hot-video-info-left">
        <image class="avatar" src="/static/images/default-avatar.png" mode="scaleToFill"></image>
        <text class="author-txt">{{ data.source_name }}</text>
      </view>
      <view class="hot-video-info-right">
        <uni-icons class="icon" type="videocam"></uni-icons>
        <text class="video-play-num">{{ data.fmplaycnt }}</text>
      </view>
    </view>

  </view>
</template>

<script>
  export default {
    name: "hot-video-item",
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    data() {
      return {

      };
    }
  }
</script>

<style lang="scss" scoped>
  .hot-video-item-container {
    position: relative;
    margin-bottom: $uni-spacing-col-lg;

    .video {
      width: 100%;
      height: 460rpx;
    }

    .hot-video-info {
      display: flex;
      justify-content: space-between;
      background-color: $uni-bg-color;
      padding: $uni-spacing-col-sm $uni-spacing-row-lg;

      .video-title {
        position: absolute;
        top: $uni-spacing-col-big;
        left: $uni-spacing-row-lg;
        color: $uni-text-color-inverse;
        font-size: $uni-font-size-lg;
      }

      .hot-video-info-left {
        display: flex;
        align-items: center;

        .author-txt {
          margin-left: $uni-spacing-row-sm;
          font-size: $uni-font-size-base;
          color: $uni-text-color;
          font-weight: bold;
        }

      }

      .hot-video-info-right {
        display: flex;
        align-items: center;

        .video-play-num {
          margin-left: $uni-spacing-row-sm;
          font-size: $uni-font-size-sm;
          color: $uni-text-color;
        }
      }
    }
  }
</style>
