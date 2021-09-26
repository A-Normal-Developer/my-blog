<template>
  <view class="search-hot-list-container">
    <view class="search-hot-list-title card">{{emoji[1]}}梁慧 - 你可真特娘的 - 是个天才</view>
    <view class="search-hot-list-box card">
      <block v-for="(item, index) in searchHotList" :key="index">
        <view class="search-hot-list-item" @click="onItemClick(item)">
          <hot-ranking :ranking="index + 1"></hot-ranking>
          <text class="label line-clamp">{{ item.label }}</text>
          <image class="search-hot-icon" src="/static/images/hot-icon.png" v-if="index <= 2"></image>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
  import { getSearchHotList } from "../../api/search.js"
  import emoji from "../../static/emoji.js" 
  
  export default {
    name:"search-hot-list",
    data() {
      return {
        searchHotList: [],
        emoji
      };
    },
    created() {
      this._getSearchHotList()
    },
    methods: {
      async _getSearchHotList() {
        const list = await getSearchHotList()
        this.searchHotList = list
      },
      
      onItemClick(item) {
        this.$emit('onHotListItemClick', item.label)
      }
    }
  }
</script>

<style lang="scss" scoped>
.search-hot-list-container {
  .search-hot-list-title {
    color: $uni-text-color-hot;
    font-size: $uni-font-size-base;
    font-weight: 700;
  }
  
  .search-hot-list-box {
    .search-hot-list-item {
      display: flex;
      align-items: center;
      padding: 8rpx;
      margin-bottom: $uni-spacing-col-lg;
      
      .label {
        color: $uni-text-color;
        font-size: $uni-font-size-base;
        margin: 0 $uni-spacing-row-base;
      }
      
      .search-hot-icon {
        width: 26rpx;
        height: 26rpx;
      }
      
    }
    
  }
}
</style>
