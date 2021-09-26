<template>
  <view>
    <my-login @onLoginSuccess="onLoginSuccess"/>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    },
    
    methods: {
      onLoginSuccess() {
        uni.navigateBack({
          delta: 1
        })
      }
      
    }
  }
</script>

<style lang="scss">

</style>
