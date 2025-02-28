<script>
export default {
  onLaunch: function() {
    console.log('App Launch');
    // 初始化应用
  },
  onShow: function() {
    console.log('App Show');
  },
  onHide: function() {
    console.log('App Hide');
  }
};
</script>

<style>
/* 全局样式 */
page {
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica,
    Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei',
    sans-serif;
  font-size: 14px;
  color: #333;
  background-color: #f8f8f8;
}

.container {
  padding: 20rpx;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

.justify-between {
  justify-content: space-between;
}

.justify-center {
  justify-content: center;
}

.align-center {
  align-items: center;
}

.text-center {
  text-align: center;
}

.text-primary {
  color: #FF6B6B;
}

.bg-white {
  background-color: #ffffff;
}

.rounded {
  border-radius: 8rpx;
}

.shadow {
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.p-20 {
  padding: 20rpx;
}

.m-20 {
  margin: 20rpx;
}

.mt-20 {
  margin-top: 20rpx;
}

.mb-20 {
  margin-bottom: 20rpx;
}
</style> 