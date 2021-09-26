<template>
  <view class="my-search-container">
    <!-- uni自带组件库 搜索框 -->
    <uni-search-bar 
      v-if="isShowInput"
      class="my-uni-search-bar" 
      radius="100" 
      :bgColor="defaultConfig.backgroundColor"
      :placeholder="placeholderText"
      :value="value"
      @confirm="onConfirm"
      @focus="onFocus"
      @blur="onBlur"
      @clear="onClear"
      @cancel="onCancel"
      @input="onInput"
    >
      <uni-icons slot="clearIcon" type="clear" color="#999"></uni-icons>
    </uni-search-bar>
    <!-- 自定义搜索按钮 -->
    <view v-else
          class="my-search-box"  
          :style="{
             height: defaultConfig.height + 'px',
             backgroundColor: defaultConfig.backgroundColor,
             border: defaultConfig.border
           }"
    >
      <!-- 搜索图标 -->
      <image class="search-logo" :src="defaultConfig.icon"></image>
      <!-- 搜索文字占位 -->
      <text class="placeholder" :style="{ color: defaultConfig.color }">{{ placeholderText }}</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    props: {
      value: {
        type: String
      },
      placeholderText: {
        type: String,
        default: "搜索"
      },
      isShowInput: {
        type: Boolean,
        default: false
      },
      defaultConfig: {
        type: Object,
        default() {
          return {
            height: 36,
            backgroundColor: '#fff',
            icon: '/static/images/search.png',
            color: '#454545',
            border: '2rpx solid #c9c9c9'
          }
        }
      }
    },
    
    data() {
      return {
        
      };
    },
    
    methods: {
      onConfirm() {
        this.$emit("search", this.value)
      },
      onFocus() {
        this.$emit("focus", this.value)
      },
      onBlur() {
        this.$emit("blur", this.value)
      },
      onClear() {
        this.$emit("clear", this.value)
      },
      onCancel() {
        this.$emit("cancel", this.value)
      },
      onInput(value) {
        this.$emit("input", value)
      }
      
      
    },
    
  }
</script>

<style lang="scss" scoped>
.my-search-container {
  width: 100%;
  
  .my-uni-search-bar {
    
  }
  
  .my-search-box {
    display: flex;
    align-items: center;
    height: 72rpx;
    padding: 0 $uni-spacing-row-base;
    border: 1rpx solid $uni-border-color;
    border-radius: 30rpx;
    background-color: $uni-bg-color;
    
    .search-logo {
      width: $uni-img-size-sm;
      height: $uni-img-size-sm;
    }
    
    .placeholder {
      color: $uni-text-color-grey;
      font-size: $uni-font-size-sm;
      margin-left: $uni-spacing-row-sm;
      
    }
  }
}
</style>
