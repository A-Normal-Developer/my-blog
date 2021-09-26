<template>
  <view class="tabs-container">

    <scroll-view scroll-x class="scroll-view" scroll-with-animation :scroll-left="scrollLeft">
      <view class="tabs-item-box">
        <template v-for="(item, index) in tabData">
          <view :id="'_tab_' + index" class="tabs-item" :key="index" @click="tabClick(index)"
            :style="{color: currentIndex === index? defaultConfig.activeTextColor : defaultConfig.textColor}">
            {{ item.label }}
          </view>
        </template>
        <view class="underLine" :style="{ 
                    transform: 'translate('+ slider.left +'px, 0)',
                    width: defaultConfig.underLineWidth + 'px',
                    height: defaultConfig.underLineHeight + 'px',
                    backgroundColor: defaultConfig.underLineColor
                  }">
        </view>
      </view>

    </scroll-view>


  </view>
</template>

<script>
  export default {
    name: "my-tabs",
    props: {
      config: {
        type: Object,
        default () {
          return {}
        }
      },

      tabData: {
        type: Array,
        default () {
          return []
        }
      },

      defaultIndex: {
        type: Number,
        default: 0
      }
    },

    data() {
      return {
        tabList: [],
        scrollLeft: 0,
        currentIndex: -1,
        slider: {
          left: 0
        },
        // 默认的样式
        defaultConfig: {
          textColor: "#333",
          activeTextColor: "#f94d2a",
          underLineWidth: 24,
          underLineHeight: 2,
          underLineColor: '#f94d2a',
        }

      };
    },

    methods: {
      tabClick(index) {
        this.currentIndex = index
        this.tabToIndex()
        this.$emit("tabIndexChange", index)
      },

      tabToIndex() {
        if(this.tabList.length === 0) return
        const index = this.currentIndex
        this.slider = {
          left: this.tabList[index]._slider.left
        }
        this.scrollLeft = this.currentIndex * this.defaultConfig.underLineWidth
      },
      updateTabWidth() {
        let data = this.tabList
        if (data.length === 0) return
        const query = uni.createSelectorQuery().in(this);
        data.forEach((item, index) => {
          query
            .select("#_tab_" + index)
            .boundingClientRect(res => {
              item._slider = {
                left: res.left + (res.width - this.defaultConfig.underLineWidth) / 2
              }
              if (data.length - 1 === index) {
                this.tabToIndex()
              }
            })
            .exec()
        })

      }
    },

    watch: {
      tabData: {
        handler(newVal) {
          this.tabList = newVal
          setTimeout(() => {
            this.updateTabWidth()
          }, 0)
        },
        immediate: true
      },

      defaultIndex: {
        handler(newVal) {
          this.currentIndex = newVal
          this.tabToIndex()
        },
        immediate: true
      },

      config: {
        handler(newVal) {
          this.defaultConfig = {
            ...this.defaultConfig,
            ...newVal
          }
        },
        immediate: true
      },

    }
  }
</script>

<style lang="scss" scoped>
  .tabs-container {
    height: 90rpx;
    line-height: 90rpx;
    font-size: $uni-font-size-base;
    background-color: $uni-bg-color;

    .scroll-view {
      width: 100%;
      height: 100%;

      white-space: nowrap;

      .tabs-item-box {
        position: relative;

        .tabs-item {
          display: inline-block;
          padding: 0 30rpx;
          text-align: center;
          color: $uni-text-color;
          box-sizing: border-box;

          &-active {
            color: $uni-text-color-hot;
          }
        }

        .underLine {
          position: absolute;
          bottom: 0;
          border-radius: 6rpx;
          transition: .5s;
        }

      }




    }
  }
  
  /* #ifdef H5 */
  /deep/.uni-scroll-view::-webkit-scrollbar {
    display: none;
  }
  /deep/.uni-scroll-view {
    scrollbar-width: none;
  }
  /* #endif */
  
</style>
