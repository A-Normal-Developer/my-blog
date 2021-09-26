<script>
  export default {
    onLaunch: function() {
      // #ifdef H5
      console.log("h5");
      // #endif
      
      // #ifndef H5
      console.log("feih5");
      // #endif
    },
    onShow: function() {
      
    },
    onHide: function() {
      
    }
  }
</script>

<style>
  /*每个页面公共css */
  /* scroll-view 去除横向滚动条 */
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
</style>
