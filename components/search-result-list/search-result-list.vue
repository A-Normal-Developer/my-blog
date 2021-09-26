<template>
  <view class="search-result-list-container">
    <empty-data v-if="isEmpty"></empty-data>
    <mescroll-body v-else ref="mescrollRef" height="50%" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="{auto: false}" :up="{auto: false}"> 
      <block v-for="(item, index) in searchResultWithHighLight" :key="index">
        <view class="search-result-list-box" @click="onItemClick(item)">
          <search-result-item-theme-1 :data="item" v-if="!item.pic_list || item.pic_list.length === 0"/>
          <search-result-item-theme-2 :data="item" v-else-if="item.pic_list.length === 1"/>
          <search-result-item-theme-3 :data="item" v-else/>
        </view>
      </block>
    </mescroll-body>
  </view>
</template>

<script>
  import { getSearchResult } from "../../api/search.js"
  import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
  
  export default {
    name:"search-result-list",
    mixins: [MescrollMixin],
    props: {
      queryStr: {
        type: String,
        required: true
      }
    },
    computed: {
      searchResultWithHighLight() {
        return this.searchResult.map(item => {
          item.title = item.title.replace(/<em>/g, "<em style='color: #f94d2a; margin: 0 2px'>");
          item.description = item.description.replace(/<em>/g, "<em style='color: #f94d2a; margin: 0 2px'>");
          return item
        })

      }
    },
    data() {
      return {
        page: 1,
        searchResult: [],
        isEmpty: false
      };
    },
    
    mounted() {
      this.mescroll = this.$refs.mescrollRef.mescroll
    },
    
    methods: {
      onItemClick({ author, id }) {
        uni.navigateTo({
          url: `/subpkg/pages/blog-detail/blog-detail?author=${author}&articleId=${id}`
        })
      },
      
      async _getSearchResult() {
        const { data } = await getSearchResult({
          q: this.queryStr,
          p: this.page
        })
        
        if(data.list.length === 0) {
          this.mescroll.endSuccess(0, false)
        } else {
          this.mescroll.endSuccess(data.list.length, true)
        }

        if(this.page === 1) {
          this.searchResult = data.list
        } else {
          this.searchResult = [...this.searchResult, ...data.list]
        }


        if(this.searchResult.length === 0) {
          this.isEmpty = true
        }
        
      },
      
      async mescrollInit() {
        await this._getSearchResult()
      },
      
      async downCallback() {
        console.log("下拉刷新");
        this.page = 1
        await this._getSearchResult()
      },
      
      async upCallback() {
        console.log("上拉加载");
        this.page += 1
        await this._getSearchResult()
      }
    }
    
  }
</script>

<style lang="scss" scoped>
.search-result-list-container {
  padding: $uni-spacing-col-lg $uni-spacing-row-lg;
  .search-result-list-box {
    margin-bottom: $uni-spacing-col-big;
  }
}
</style>
