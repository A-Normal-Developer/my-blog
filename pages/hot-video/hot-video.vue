<template>
	<view class="hot-video-container">
    <mescroll-body 
        ref="mescrollRef" 
        @init="mescrollInit" 
        @down="downCallback" 
        @up="upCallback" 
        :down="{auto: false}" 
        :up="{auto: false}"
    >
      <block v-for="(item, index) in videoList" :key="index">
        <hot-video-item @click="onItemClick" :data="item"/>
      </block>
    </mescroll-body>
	</view>
</template>

<script>
  import { mapMutations } from "vuex"
  import { getHotVideoList } from "../../api/video.js"
  import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
    mixins: [MescrollMixin],
		data() {
			return {
				page: 1,
        size: 10,
        videoList: [],
        mescroll: null
			};
		},

    mounted() {
      this.mescroll = this.$refs.mescrollRef.mescroll
    },
    
    methods: {
      ...mapMutations("video", ["setVideoData"]),
      
      onItemClick(item) {
        this.setVideoData(item)
        uni.navigateTo({
          url: "/subpkg/pages/video-detail/video-detail"
        })
      },
      
      async mescrollInit() {
        await this._getHotVideoList()
      },
      async downCallback() {
        this.page = 1
        await this._getHotVideoList()
        
      },
      async upCallback() {
        this.page += 1
        await this._getHotVideoList()
      },
      
      async _getHotVideoList() {
        const { data } = await getHotVideoList({
          page: this.page,
          size: this.size
        })
        if(this.page === 1) {
          this.videoList = data.list
          this.mescroll.endSuccess(data.list.length, true)
        } else {
          this.videoList = [...this.videoList, ...data.list]
          this.mescroll.endSuccess()
        }

      },
      
    }
	}
</script>

<style lang="scss" scoped>
.hot-video-container {
  background-color: $uni-bg-color-grey;
}
</style>
