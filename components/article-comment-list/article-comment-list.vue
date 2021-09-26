<template>
  <!-- 精简评论 -->
  <view class="comment-limt-container" v-if="!isShowAllComment">
    <view class="comment-title">精简评论</view>
    <block v-for="(item, index) in commentList.slice(0, 2)" :key="index">
      <!-- item 项组件 -->
      <article-comment-item :data="item.info" />
    </block>
    <view class="show-more" @click="$emit('moreClick')">查看更多评论</view>
  </view>
  <!-- 全部评论 -->
  <view class="comment-all-container" v-else>
    <!-- 当mescroll-body写在子组件时,父页面需引入mescroll-comp.js的mixins -->
    <mescroll-body ref="mescrollRef" @init="mescrollInit" @up="upCallback" :down="{
          use: false
        }" :up="{
          textNoMore: '-- 我也是有底线的！ --'
        }">
      <view class="comment-title">全部评论</view>
      <view class="list">
        <block v-for="(item, index) in commentList" :key="index">
          <article-comment-item :data="item.info" />
        </block>
      </view>
    </mescroll-body>
  </view>
</template>

<script>
  import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
  import {
    getArticleCommentList
  } from "../../api/article.js"

  export default {
    name: "article-comment-list",
    mixins: [MescrollMixin],
    props: {
      articleId: {
        type: String,
        required: true
      },
      // 是否展示全部评论
      isShowAllComment: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        page: 1,
        pageSize: 5,
        commentList: [],
        // 组件实例
        mescroll: null,
        // 评论总数
        commentListTotal: 0,
      };
    },

    created() {
      this._getArticleCommentList()
    },

    methods: {
      addCommentList(data) {
        this.commentList.unshift(data)
      },
      
      async mescrollInit() {
        await this._getArticleCommentList()
        this.getMescroll().endBySize(this.commentList.length, this.commentListTotal);
      },

      async upCallback() {
        this.page += 1
        await this._getArticleCommentList()
        this.getMescroll().endBySize(this.commentList.length, this.commentListTotal);
      },

      /**
       * 返回 mescroll实例对象
       */
      getMescroll() {
        if (!this.mescroll) {
          this.mescroll = this.$refs.mescrollRef.mescroll;
        }
        return this.mescroll;
      },

      async _getArticleCommentList() {
        const {
          data
        } = await getArticleCommentList({
          articleId: this.articleId,
          page: this.page,
          size: this.pageSize
        })
        this.commentListTotal = data.count
        // 判断是否为第一页数据
        if (this.page === 1) {
          this.commentList = data.list;
        } else {
          this.commentList = [...this.commentList, ...data.list];
        }
        
        
      }

    }
  }
</script>

<style lang="scss" scoped>
  .comment-title {
    font-weight: bold;
    color: $uni-text-title-color;
    font-size: $uni-font-size-lg;
    margin: $uni-spacing-col-lg 0;
  }

  .comment-limt-container {
    .show-more {
      margin: $uni-spacing-col-lg;
      text-align: center;
      color: $uni-text-color-more;
      font-size: $uni-font-size-base;
    }
  }
</style>
