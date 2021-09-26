<template>
  <view class="search-history-container">
    <!-- title -->
    <view class="search-history-title-box">
      <view class="search-history-title">搜索历史</view>
      <view v-if="!isShowClear">
        <uni-icons @click="isShowClear = true" type="trash"/>
      </view>
      <view v-else>
        <text class="operTxt" @click="clearAllHistory">全部删除</text>
        <text class="operTxt" @click="isShowClear = false">完成</text>
      </view>
    </view>
    <!-- history-list -->
    <view class="search-history-box">
      <block v-for="(item, index) in searchHistoryData" :key="index">
        <view class="search-history-item" @click="clickHistoryItem(item, index)">
          <text class="search-history-text line-clamp">{{ item }}</text>
          <uni-icons v-show="isShowClear" type="clear"></uni-icons>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
  import { mapState } from "vuex"
  
  export default {
    name:"search-history",
    computed: {
      ...mapState("search", ["searchHistoryData"])
    },
    
    data() {
      return {
        isShowClear: false,
        
      };
    },
    methods: {
      clearAllHistory() {
        uni.showModal({
          title: "提示",
          content: "是否删除全部历史搜索",
          showCancel: true,
          success: ({ confirm, cancel }) => {
            if(confirm) {
              this.isShowClear = false
              this.$store.commit("search/clearAllSearchHistory")
            }
          }
        })
      },
      
      clickHistoryItem(item, index) {
        if(this.isShowClear) {
          this.$store.commit("search/removeSingleSearchHistory", index)
        } else {
          this.$emit('onClickHistoryItem', item)
        }
      }
      
    }
  }
</script>

<style lang="scss" scoped>
.search-history-container {
  padding: $uni-spacing-col-lg $uni-spacing-row-lg;
  .search-history-title-box {
    display: flex;
    justify-content: space-between;

    .search-history-title {
      font-size: $uni-font-size-sm;
      color: $uni-text-color;
      padding: $uni-spacing-col-sm $uni-spacing-row-sm;
    }
    
    .operTxt {
      color: $uni-text-color-grey;
      font-size: $uni-font-size-sm;
      padding: $uni-spacing-col-sm $uni-spacing-row-sm;
    }
    
  }
  
  .search-history-box {
    margin-top: $uni-spacing-row-lg;
    
    .search-history-item {
      position: relative;
      display: inline-block;
      width: 50%;
      padding: $uni-spacing-col-base $uni-spacing-row-base;
      box-sizing: border-box;
      
      .search-history-text {
        display: inline-block;
        width: 85%;
        color: $uni-text-color;
        font-size: $uni-font-size-base;
      }
    }
    
    .search-history-item:nth-child(odd)::after {
      content: "";
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-55%);
      height: 30rpx;
      border-left: 2rpx solid #999;
    }
    
  }
  
  
}
</style>
