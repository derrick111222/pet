<template>
  <view class="container">
    <view class="message-list">
      <view class="message-item" v-for="(message, index) in messages" :key="index" @tap="goToChat(message)">
        <image :src="message.avatar" class="avatar"></image>
        <view class="message-content">
          <view class="message-header">
            <text class="username">{{message.username}}</text>
            <text class="time">{{message.time}}</text>
          </view>
          <view class="message-body">
            <text class="last-message">{{message.lastMessage}}</text>
            <view class="badge" v-if="message.unread > 0">
              <text>{{message.unread}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="empty-state" v-if="messages.length === 0">
      <image src="/static/images/empty-message.png" mode="aspectFit"></image>
      <text>暂无消息</text>
      <button @tap="goToExplore">去看看附近的宠物</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        {
          id: 1,
          username: '奶糖的主人',
          avatar: '/static/images/avatar1.jpg',
          lastMessage: '你好，我对你的奶糖很感兴趣，可以了解更多吗？',
          time: '09:30',
          unread: 2,
          petId: 1,
          petName: '奶糖'
        },
        {
          id: 2,
          username: '皮皮的主人',
          avatar: '/static/images/avatar2.jpg',
          lastMessage: '好的，周末下午方便面看看皮皮吗？',
          time: '昨天',
          unread: 0,
          petId: 2,
          petName: '皮皮'
        },
        {
          id: 3,
          username: '米粒的主人',
          avatar: '/static/images/avatar3.jpg',
          lastMessage: '米粒很乖的，已经打过疫苗了，您可以随时来看看',
          time: '昨天',
          unread: 1,
          petId: 3,
          petName: '米粒'
        },
        {
          id: 4,
          username: '豆豆的主人',
          avatar: '/static/images/avatar4.jpg',
          lastMessage: '收到您的申请了，豆豆现在在观察期。',
          time: '星期一',
          unread: 0,
          petId: 4,
          petName: '豆豆'
        }
      ]
    };
  },
  methods: {
    goToChat(message) {
      uni.navigateTo({
        url: `/pages/chat/chat?id=${message.id}&username=${message.username}&petId=${message.petId}&petName=${message.petName}`
      });
    },
    goToExplore() {
      uni.switchTab({
        url: '/pages/pet/pet'
      });
    }
  }
};
</script>

<style lang="scss">
.container {
  background-color: #f8f8f8;
  min-height: 100vh;
}

.message-list {
  padding: 0 20rpx;
}

.message-item {
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eee;
  background-color: #fff;
}

.avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.message-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10rpx;
}

.username {
  font-size: 30rpx;
  color: #333;
  font-weight: bold;
}

.time {
  font-size: 24rpx;
  color: #999;
}

.message-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.last-message {
  font-size: 26rpx;
  color: #666;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.badge {
  min-width: 36rpx;
  height: 36rpx;
  border-radius: 18rpx;
  background-color: #FF6B6B;
  color: #fff;
  font-size: 22rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8rpx;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 200rpx;
}

.empty-state image {
  width: 200rpx;
  height: 200rpx;
  margin-bottom: 30rpx;
}

.empty-state text {
  font-size: 28rpx;
  color: #999;
  margin-bottom: 30rpx;
}

.empty-state button {
  background-color: #FF6B6B;
  color: #fff;
  font-size: 28rpx;
  padding: 10rpx 40rpx;
  border-radius: 40rpx;
}
</style> 