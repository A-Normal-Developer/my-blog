<template>
  <!-- #ifndef H5 -->
  <page-meta root-font-size="52px">
  <!-- #endif -->
    <view class="detail-container">
      <!-- 文章内容区域 -->
      <block v-if="articleData">
        <!-- 标题 -->
        <view class="title">{{ articleData.articleTitle }}</view>
        <view class="detail-info">
          <view class="detail-left">
            <view class="avatar-box">
              <!-- 头像 -->
              <image class="avatar" :src="articleData.avatar" />
            </view>
            <view class="author-box">
              <!-- 作者 -->
              <text class="author">{{ articleData.nickName }}</text>
              <!-- 发布时间 -->
              <text class="release-time">{{ articleData.date }}</text>
            </view>
          </view>
          <view class="detail-right">
            <!-- 关注按钮 -->
            <button class="follow" size="mini" :type="articleData.isFollow ? 'primary' : 'default'"
              :loading="isFollowLoading" @click="onFollowClick">
              {{ articleData.isFollow ? '已关注' : '关注' }}
            </button>
          </view>
        </view>
        <!-- 文章内容 -->
        <mp-html class="markdown_views" :content="addClassFromHTML(articleData.content)" scroll-table />
        <!-- 评论列表 -->
        <view class="comment-box">
          <article-comment-list ref="mescrollItem" :articleId="articleId" :isShowAllComment="isShowAllComment"
            @moreClick="isShowAllComment = true" />
        </view>
        <!-- 底部功能区 -->
        <article-operate :articleData="articleData" @commitClick="onCommit" @changePraise="onChangePraise"
          @changeCollect="onChangeCollect" />
        <!-- 输入评论的popup -->
        <uni-popup ref="popup" type="bottom" @change="onCommitPopupChange">
          <article-comment-commit v-if="isShowCommit" :articleId="articleId" @success="onSendSuccess" />
        </uni-popup>
      </block>
    </view>
  <!-- #ifndef H5 -->
    </page-meta>
  <!-- #endif -->
</template>

<script>
  import {
    mapActions
  } from "vuex"
  // 当mescroll-body写在子组件时,父页面需引入mescroll-comp.js的mixins
  import MescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js';
  import mpHtml from '@/uni_modules/mp-html/components/mp-html/mp-html'
  import {
    userFollow
  } from "../../../api/user.js"

  import {
    getArticleDetail
  } from "../../../api/article.js"

  export default {
    mixins: [MescrollCompMixin],
    components: {
      mpHtml
    },
    data() {
      return {
        articleId: "",
        author: "",
        articleData: null,
        isShowAllComment: false,
        isFollowLoading: false,
        isShowCommit: false
      };
    },

    onLoad({
      articleId,
      author
    }) {
      this.articleId = articleId
      this.author = author
      this._getArticleDetail({
        articleId,
        author
      })
    },

    methods: {
      ...mapActions("user", ["isLogin"]),

      /**
       * 点赞处理回调
       */
      onChangePraise(isPraise) {
        this.articleData.isPraise = isPraise;
      },

      /**
       * 收藏处理回调
       */
      onChangeCollect(isCollect) {
        this.articleData.isCollect = isCollect;
      },

      onSendSuccess(data) {
        this.$refs.popup.close()
        this.isShowCommit = false
        this.$refs.mescrollItem.addCommentList(data)

      },

      onCommitPopupChange(e) {
        if (e.show) {
          this.isShowCommit = e.show
        } else {
          setTimeout(() => {
            this.isShowCommit = e.show
          }, 200)
        }

      },

      onCommit() {
        this.$refs.popup.open()
      },


      async onFollowClick() {
        const isLogin = await this.isLogin()
        if (!isLogin) {
          return
        }

        this.isFollowLoading = true
        const {
          data
        } = await userFollow({
          author: this.author,
          isFollow: !this.articleData.isFollow
        })

        this.articleData.isFollow = !this.articleData.isFollow
        this.isFollowLoading = false

      },


      /**
       * 为所有的 DOM 增加类名
       */
      addClassFromHTML(info) {
        return info
          .replace(/<p>/gi, '<p class="p-cls">')
          .replace(/<a>/gi, '<a class="a-cls">')
          .replace(/<h1>/gi, '<h1 class="h1-cls">')
          .replace(/<h2>/gi, '<h2 class="h2-cls">')
          .replace(/<h3>/gi, '<h3 class="h3-cls">')
          .replace(/<h4>/gi, '<h4 class="h4-cls">')
          .replace(/<h5>/gi, '<h5 class="h5-cls">')
          .replace(/<h6>/gi, '<h6 class="h6-cls">')
          .replace(/<ul>/gi, '<ul class="ul-cls">')
          .replace(/<li>/gi, '<li class="li-cls">')
          .replace(/<ol>/gi, '<ol class="ol-cls">')
          .replace(/<td>/gi, '<td class="td-cls">')
          .replace(/<th>/gi, '<th class="th-cls">')
          .replace(/<tr>/gi, '<tr class="tr-cls">')
          .replace(/<dl>/gi, '<dl class="dl-cls">')
          .replace(/<dd>/gi, '<dd class="dd-cls">')
          .replace(/<hr>/gi, '<hr class="hr-cls">')
          .replace(/<pre>/gi, '<pre class="pre-cls">')
          .replace(/<strong>/gi, '<strong class="strong-cls">')
          .replace(/<input>/gi, '<input class="input-cls">')
          .replace(/<table>/gi, '<table class="table-cls">')
          .replace(/<details>/gi, '<details class="details-cls">')
          .replace(/<code>/gi, '<code class="code-cls">')
          .replace(/<kbd>/gi, '<kbd class="kbd-cls">')
          .replace(/<summary>/gi, '<summary class="summary-cls">')
          .replace(/<blockquote>/gi, '<blockquote class="blockquote-cls">')
          .replace(/<img/gi, '<img class="img-cls"');
      },
      async _getArticleDetail(param) {
        uni.showLoading({
          title: "加载中"
        })
        const {
          data
        } = await getArticleDetail(param)
        this.articleData = data.data
      }
    }

  }
</script>

<style lang="scss">

  .detail-container {
    padding: $uni-spacing-col-base $uni-spacing-row-base;
    padding-bottom: 108px;

    .title {
      font-size: $uni-font-size-title;
      color: $uni-text-title-color;
      font-weight: bold;
    }

    .detail-info {
      padding: $uni-spacing-col-base 0;
      display: flex;
      justify-content: space-between;

      .detail-left {
        display: flex;

        .author-box {
          margin-left: $uni-spacing-row-base;
          display: flex;
          flex-direction: column;

          .author {
            font-size: $uni-font-size-base;
            font-weight: bolder;
            color: $uni-color-title;
          }

          .release-time {
            font-size: $uni-font-size-sm;
            color: $uni-text-color-grey;
          }
        }
      }

      .detail-right {
        display: flex;
        align-items: center;
      }
    }
  }
</style>
