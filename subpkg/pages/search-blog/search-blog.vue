<template>
  <view class="search-blog-container">
    <view class="search-bar-box">
      <my-search
        isShowInput="true"
        :placeholderText="defaultPlaceholder"
        v-model="searchValue"
        :defaultConfig="{
          backgroundColor: '#f1f0f3'
        }"
        @search="onSearchConfirm"
        @focus="onSearchFocus"
        @blur="onSearchBlur"
        @clear="onSearchClear"
        @cancel="onSearchCancel"
        @input="onSearchInput"
      />
    </view>
    <view class="search-hot-list-box" v-if="showType === SEARCH_HOT_LIST">
      <search-hot-list @onHotListItemClick="onSearchConfirm"/>
    </view>
    <view class="search-history-box" v-else-if="showType === SEARCH_HISTORY">
      <search-history @onClickHistoryItem="onSearchConfirm"/>
    </view>
    <view class="search-result-list-box" v-else>
      <search-result-list ref="mescrollItem" :queryStr="searchValue"></search-result-list>
    </view>
  </view>
</template>

<script>
  import { mapState } from "vuex"
  import MescrollCompMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js";
  import { getDefaultText } from "../../../api/search.js"
  import { 
    SEARCH_HOT_LIST, 
    SEARCH_HISTORY, 
    SEARCH_RESULT 
  } from "../../../constant/searchConstant.js"
  
  export default {
    mixins: [MescrollCompMixin],
    data() {
      return {
        searchValue: "",
        defaultPlaceholder: "快乐风男",
        SEARCH_HOT_LIST,
        SEARCH_HISTORY,
        SEARCH_RESULT,
        showType: SEARCH_HOT_LIST
      };
    },
    created() {
      this._getDefaultText()
      
    },
    methods: {
      async _getDefaultText() {
        const { data } = await getDefaultText()
        this.defaultPlaceholder = data.defaultText
      },
      
      onHotListItemClick(item) {
        console.log(item.label);
      },
      
      onSearchConfirm(val) {
        this.searchValue = val? val : this.defaultPlaceholder
        this.$store.commit("search/addSearchHistory", this.searchValue)
        if(this.searchValue) {
          this.showType = SEARCH_RESULT
        }
      },
      
      onSearchFocus(value) {
        this.showType = SEARCH_HISTORY
      },
      onSearchBlur(value) {
        
      },
      onSearchClear(value) {
        this.showType = SEARCH_HISTORY
      },
      onSearchCancel(value) {
        this.showType = SEARCH_HOT_LIST
      },
      onSearchInput(value) {
        
      }
    }
  }
</script>

<style lang="scss" scoped>
.search-blog-container {
  .search-bar-box {
    padding: $uni-spacing-row-sm;
    background-color: $uni-bg-color;
    position: sticky;
    top: 0;
    z-index: 9;
  }
}
</style>
