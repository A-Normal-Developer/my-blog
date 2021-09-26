<template>
  <view class="video-detail-container">
    <view class="video-box">
      <video id="my-video" class="video" :src="videoData.play_url" :danmu-list="danmuList" enable-danmu
        danmu-btn></video>
    </view>
    <view class="hot-video-info">
      <view class="video-title">{{ videoData.title }}</view>
      <view class="hot-video-info-left">
        <image class="avatar" src="/static/images/default-avatar.png" mode="scaleToFill"></image>
        <text class="author-txt">{{ videoData.source_name }}</text>
      </view>
      <view class="hot-video-info-right">
        <uni-icons class="icon" type="videocam"></uni-icons>
        <text class="video-play-num">{{ videoData.fmplaycnt }}</text>
      </view>
    </view>

    <!-- 弹幕模块 -->
    <view class="danmu-box">
      <!-- 加载动画 -->
      <uni-load-more status="loading" v-if="isLoadingComment"></uni-load-more>
      <!-- 无弹幕 -->
      <empty-data v-else-if="commentList.length === 0"></empty-data>
      <!-- 弹幕列表 -->
      <view class="comment-container" v-else>
        <view class="all-comment-title">全部弹幕</view>
        <view class="list">
          <block v-for="(item, index) in commentList" :key="index">
            <article-comment-item :data="item" />
          </block>
        </view>
      </view>
    </view>
    <!-- 底部功能区 -->
    <article-operate :placeholder="'发个弹幕，开心一下'" :articleData="videoData" @commitClick="onCommit"
      @changePraise="onChangePraise" @changeCollect="onChangeCollect" />
    <!-- 输入弹幕的popup -->
    <uni-popup ref="popup" type="bottom" @change="onCommitPopupChange">
      <article-comment-commit v-if="isShowCommit" :articleId="videoData.id" @success="onSendBarrage" />
    </uni-popup>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from "vuex"
  import {
    getHVideoDanmuList
  } from "../../../api/video.js"

  import {
    getRandomColor
  } from '../../../utils/format.js';

  export default {
    computed: {
      ...mapState("video", ["videoData"])
    },

    data() {
      return {
        danmuList: [],
        commentList: [],
        isShowCommit: false,
        // video 组件上下文
        videoContext: null,
        isLoadingComment: true
      };
    },

    created() {
      this._getHVideoDanmuList()
    },

    onReady: function(res) {
      // 获取 video 组件上下文
      this.videoContext = uni.createVideoContext('my-video');
    },

    methods: {
      ...mapMutations('video', ['setVideoData']),
      onChangePraise(isPraise) {
        this.setVideoData({ ...this.videoData, isPraise });
      },
      
      onChangeCollect(isCollect) {
        this.setVideoData({ ...this.videoData, isCollect });
      },
      

      async _getHVideoDanmuList() {
        const {
          data
        } = await getHVideoDanmuList({
          videoId: this.videoData.id
        })
        // 定义随机颜色
        data.list.forEach((item) => {
          item.color = getRandomColor();
        });
        this.danmuList = [...data.list];
        this.commentList = [...data.list];
        this.isLoadingComment = false;
      },

      /**
       * 发布弹幕点击事件
       */
      onCommit() {
        // 通过组件定义的ref调用uni-popup方法
        this.$refs.popup.open();
      },

      /**
       * 发布弹幕的 popup 切换事件
       */
      onCommitPopupChange(e) {
        // 修改对应的标记，当 popup 关闭时，为了动画平顺，进行延迟处理
        if (e.show) {
          this.isShowCommit = e.show;
        } else {
          setTimeout(() => {
            this.isShowCommit = e.show;
          }, 200);
        }
      },

      /**
       * 弹幕发布成功之后的回调
       */
      onSendBarrage(data) {
        // 发送弹幕
        this.videoContext.sendDanmu({
          text: data.info.content,
          color: getRandomColor()
        });
        // 添加弹幕到数据源
        this.commentList.unshift(data.info);
        // 关闭 pop
        this.$refs.popup.close();
        // 关闭标记
        this.isShowCommit = false;
        // 提示用户
        uni.showToast({
          title: '发表成功'
        });
      },


    }
  }
</script>

<style lang="scss" scoped>
  .video-detail-container {
    position: relative;

    .video-box {
      .video {
        width: 100%;
        height: 460rpx;
      }
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

    .danmu-box {
      border-top: $uni-spacing-col-sm solid $uni-bg-color-grey;
      margin-bottom: 36px;

      .comment-container {
        padding: $uni-spacing-col-lg $uni-spacing-row-lg;

        .all-comment-title {
          font-size: $uni-font-size-lg;
          font-weight: bold;
        }
      }
    }

  }
</style>
