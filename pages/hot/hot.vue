<template>
  <view class="hot-container">
    <!-- logo显示区域 -->
    <image class="logo" src="/static/images/joinWX.png" @click="clickImg" mode="aspectFit" />
    <!-- 自定义搜索组件 -->
    <view class="search-box" @click="navToSearch">
      <my-search></my-search>
    </view>
    <!-- 自定义tabs组件 -->
    <view class="tab-sticky">
      <my-tabs :tabData="tabData" :defaultIndex="currentIndex" @tabIndexChange="onTabIndexChange"></my-tabs>
    </view>
    
    <!-- list列表 -->
    <swiper class="swiper" @change="onSwiperChange" @animationfinish="swiperAnimationfinish" :current="currentIndex" :style="{height: currentSwiperHeight + 'px'}">
      <swiper-item class="swiper-item" v-for="(tabItem, tabIndex) in tabData" :key="tabIndex">
        <view>
          <uni-load-more v-if="isLoading" status="loading"></uni-load-more>
          <template v-else>
            <hot-list-item @click.native="listItemClick(item)" :class="'hot-list-item-' + tabIndex"  v-for="(item, index) in hotListData[tabIndex]" :hotListItem="item" :ranking="index + 1"
              :key="index"></hot-list-item>
          </template>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  import {
    getHotTabs,
    getHotListByTab
  } from "../../api/hot.js"

  export default {
    data() {
      return {
        tabData: [],
        hotListData: {},
        isLoading: true,
        currentIndex: 0,
        currentSwiperHeight: 0,
        swiperHeightData: {},
        currentPageScrollTop: 0
      };
    },

    created() {
      this._getHotTabs()
    },
    onPageScroll({ scrollTop }) {
      this.currentPageScrollTop = scrollTop
    },

    methods: {
      
      listItemClick({ user_name, id }) {
        uni.navigateTo({
          url: `/subpkg/pages/blog-detail/blog-detail?author=${user_name}&articleId=${id}`
        })
      },
      
      clickImg() {
        uni.previewImage({
          urls: [require("@/static/images/joinWX.png")],
          longPressActions: {
            itemList: [],
          }
        });
      },
      
      async _getHotTabs() {  
        const { data } = await getHotTabs()
        this.tabData = data.list
        this._getHotListByTab()
      },

      async _getHotListByTab() {
        if (!this.hotListData[this.currentIndex]) {
          this.isLoading = true
          const tabId = this.tabData[this.currentIndex].id
          const { data } = await getHotListByTab(tabId)
          this.hotListData[this.currentIndex] = data.list
          this.isLoading = false
          
          setTimeout(async () => {
            this.currentSwiperHeight = await this.getCurrentSwiperHeight()
            this.swiperHeightData[this.currentIndex] = this.currentSwiperHeight
          }, 0)
        }

      },

      onTabIndexChange(index) {
        this.currentIndex = index
      },
      onSwiperChange(event) {
        if(this.currentPageScrollTop >= 130) {
          uni.pageScrollTo({
            scrollTop: 130
          })
        }
        this.currentIndex = event.detail.current
      },
      
      swiperAnimationfinish() {
        this._getHotListByTab()
      },
      
      getCurrentSwiperHeight() {
        return new Promise((resolve, reject) => {
          let sum = 0;
          const query = uni.createSelectorQuery().in(this);
          query
            .selectAll(".hot-list-item-" + this.currentIndex)
            .boundingClientRect(res => {
              sum = res.reduce((preValue, item) => {
                return preValue + item.height
              }, 0)
              resolve(sum)
            })
            .exec()
        })
      },
      
      navToSearch() {
        uni.navigateTo({
          url: "/subpkg/pages/search-blog/search-blog"
        })
      }
      
    },
    
    watch: {
      currentIndex: {
        handler: 'getCurrentSwiperHeight',
        immediate: true
      }
    }
    
    
  }
</script>

<style lang="scss" scoped>
  .hot-container {
    height: 100%;
    background-color: $uni-bg-color;

    .logo {
      width: 100%;
      height: 200rpx;
    }

    .search-box {
      padding: 0 32rpx;
      margin-bottom: $uni-spacing-col-base;
    }
    
    
    .tab-sticky {
      position: sticky;
      z-index: 9;
      /* #ifndef H5 */
      top: 0;
      /* #endif */
      /* #ifdef H5 */
      top: 44px;
      /* #endif */
    }
    

  }
</style>
