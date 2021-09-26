<template>
  <view class="search-result-item-container">
    <rich-text :nodes="data.title" class="item-title line-clamp-2"></rich-text>
    <rich-text :nodes="data.description" class="item-desc line-clamp-2"></rich-text>
    <view class="item-desc-bottom">
      <view class="item-author">{{ data.author }}</view>
      <view class="item-update-time">
        <uni-icons class="item-update-time-icon" type="compose" color="#999"></uni-icons>
        <text>{{ showRelativeTime }}</text>
      </view>
    </view>
  </view>
</template>

<script>
  import { dateRelativeFormat } from "../../utils/format.js"
  export default {
    name:"search-result-item-theme-1",
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    computed: {
      showRelativeTime() {
        return dateRelativeFormat(this.data.updateTime)
      }
    },
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss" scoped>
.search-result-item-container {
  margin-bottom: $uni-spacing-col-big;
  .item-title {
    color: $uni-text-title-color;
    font-size: $uni-font-size-lg;
    font-weight: bold;
  }
  .item-desc {
    margin-top: $uni-spacing-col-base;
    font-size: $uni-font-size-base;
    color: $uni-color-subtitle;
    
  }
  
  .item-desc-bottom {
    margin-top: $uni-spacing-col-base;
    display: flex;
    color: $uni-text-color-grey;
    font-size: $uni-font-size-sm;
    .item-author {
      margin-right: $uni-spacing-col-lg;
    }
    .item-update-time {
      .item-update-time-icon {
        color: $uni-text-color-grey;
        margin-right: $uni-spacing-col-sm;
      }
    }
  }
}
</style>
