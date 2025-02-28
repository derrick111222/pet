<template>
  <view class="container">
    <!-- 聊天记录 -->
    <scroll-view 
      scroll-y 
      class="chat-list" 
      :scroll-top="scrollTop" 
      :scroll-with-animation="true"
      @scrolltoupper="loadMoreMessages"
    >
      <view class="loading" v-if="isLoading">
        <text>加载更多消息...</text>
      </view>
      
      <view class="chat-item" 
        v-for="(message, index) in messages" 
        :key="index"
        :class="{ 'chat-item-self': message.isSelf }"
      >
        <image 
          v-if="!message.isSelf" 
          :src="otherAvatar" 
          class="avatar"
        ></image>
        <view class="message-content" :class="{ 'message-self': message.isSelf }">
          <text>{{ message.content }}</text>
          <view class="message-time">{{ message.time }}</view>
        </view>
        <image 
          v-if="message.isSelf" 
          src="/static/images/user-avatar.jpg" 
          class="avatar"
        ></image>
      </view>
      
      <view class="date-divider" v-if="messages.length > 0">
        <text>{{ currentDate }}</text>
      </view>
    </scroll-view>
    
    <!-- 宠物信息卡片 -->
    <view class="pet-card" v-if="petInfo">
      <image :src="petInfo.avatar" class="pet-avatar"></image>
      <view class="pet-info">
        <text class="pet-name">{{ petInfo.name }}</text>
        <text class="pet-desc">{{ petInfo.breed }}</text>
      </view>
      <view class="view-pet" @tap="viewPetDetail">
        <text>查看</text>
      </view>
    </view>
    
    <!-- 输入框 -->
    <view class="input-area">
      <view class="input-box">
        <input 
          type="text" 
          v-model="inputMessage" 
          placeholder="输入消息..." 
          confirm-type="send"
          @confirm="sendMessage"
        />
      </view>
      <view class="send-btn" @tap="sendMessage">
        <text>发送</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      otherAvatar: '',
      petId: '',
      petName: '',
      inputMessage: '',
      scrollTop: 0,
      isLoading: false,
      messages: [
        {
          content: '你好，我对你的宠物很感兴趣',
          time: '09:30',
          isSelf: true
        },
        {
          content: '你好！很高兴你喜欢我的宠物',
          time: '09:31',
          isSelf: false
        },
        {
          content: '它很健康，已经打过疫苗了',
          time: '09:32',
          isSelf: false
        },
        {
          content: '可以告诉我更多关于它的信息吗？',
          time: '09:33',
          isSelf: true
        },
        {
          content: '当然可以，它今年2岁了，性格很温顺，喜欢和人互动',
          time: '09:35',
          isSelf: false
        }
      ],
      petInfo: null
    };
  },
  computed: {
    currentDate() {
      const now = new Date();
      return `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
    }
  },
  methods: {
    sendMessage() {
      if (!this.inputMessage.trim()) return;
      
      // 添加新消息
      this.messages.push({
        content: this.inputMessage,
        time: this.getCurrentTime(),
        isSelf: true
      });
      
      this.inputMessage = '';
      
      // 滚动到底部
      this.$nextTick(() => {
        this.scrollToBottom();
      });
      
      // 模拟对方回复
      setTimeout(() => {
        this.messages.push({
          content: '好的，我明白了。有什么其他问题吗？',
          time: this.getCurrentTime(),
          isSelf: false
        });
        
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }, 1000);
    },
    getCurrentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    },
    scrollToBottom() {
      // 获取消息列表高度，滚动到底部
      const query = uni.createSelectorQuery().in(this);
      query.select('.chat-list').boundingClientRect(data => {
        this.scrollTop = data.height * 2; // 确保滚动到底部
      }).exec();
    },
    loadMoreMessages() {
      if (this.isLoading) return;
      
      this.isLoading = true;
      
      // 模拟加载更多历史消息
      setTimeout(() => {
        const historyMessages = [
          {
            content: '你好，我想了解一下这只宠物',
            time: '昨天 18:20',
            isSelf: true
          },
          {
            content: '你好，有什么可以帮到你的？',
            time: '昨天 18:25',
            isSelf: false
          }
        ];
        
        this.messages = [...historyMessages, ...this.messages];
        this.isLoading = false;
      }, 1000);
    },
    viewPetDetail() {
      uni.navigateTo({
        url: `/pages/pet-detail/pet-detail?id=${this.petId}`
      });
    }
  },
  onLoad(options) {
    // 获取路由参数
    if (options.username) {
      this.username = options.username;
      uni.setNavigationBarTitle({
        title: this.username
      });
    }
    
    if (options.petId) {
      this.petId = options.petId;
    }
    
    if (options.petName) {
      this.petName = options.petName;
    }
    
    // 模拟获取宠物信息
    if (this.petId && this.petName) {
      this.petInfo = {
        id: this.petId,
        name: this.petName,
        breed: '英短银渐层',
        avatar: '/static/images/pet-cat1.jpg'
      };
    }
    
    // 模拟获取对方头像
    this.otherAvatar = '/static/images/avatar1.jpg';
    
    // 初始化后滚动到底部
    this.$nextTick(() => {
      this.scrollToBottom();
    });
  }
};
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f1f1f1;
}

.chat-list {
  flex: 1;
  padding: 20rpx;
  box-sizing: border-box;
}

.chat-item {
  display: flex;
  margin-bottom: 30rpx;
}

.chat-item-self {
  flex-direction: row-reverse;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin: 0 20rpx;
}

.message-content {
  max-width: 60%;
  padding: 20rpx;
  border-radius: 10rpx;
  background-color: #fff;
  position: relative;
}

.message-self {
  background-color: #a0e75a;
}

.message-content text {
  font-size: 28rpx;
  color: #333;
  word-break: break-all;
}

.message-time {
  font-size: 22rpx;
  color: #999;
  margin-top: 10rpx;
}

.date-divider {
  display: flex;
  justify-content: center;
  margin: 30rpx 0;
}

.date-divider text {
  font-size: 24rpx;
  color: #999;
  background-color: #f1f1f1;
  padding: 0 20rpx;
}

.pet-card {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: #fff;
  border-top: 1rpx solid #eee;
  border-bottom: 1rpx solid #eee;
}

.pet-avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 10rpx;
  margin-right: 20rpx;
}

.pet-info {
  flex: 1;
}

.pet-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  display: block;
}

.pet-desc {
  font-size: 24rpx;
  color: #999;
  display: block;
}

.view-pet {
  padding: 10rpx 20rpx;
  background-color: #f8f8f8;
  border-radius: 30rpx;
}

.view-pet text {
  font-size: 24rpx;
  color: #666;
}

.input-area {
  display: flex;
  padding: 20rpx;
  background-color: #fff;
  border-top: 1rpx solid #eee;
}

.input-box {
  flex: 1;
  background-color: #f8f8f8;
  border-radius: 10rpx;
  padding: 0 20rpx;
}

.input-box input {
  height: 80rpx;
  font-size: 28rpx;
}

.send-btn {
  width: 120rpx;
  height: 80rpx;
  background-color: #FF6B6B;
  border-radius: 10rpx;
  margin-left: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.send-btn text {
  color: #fff;
  font-size: 28rpx;
}

.loading {
  text-align: center;
  padding: 20rpx 0;
}

.loading text {
  font-size: 24rpx;
  color: #999;
}
</style> 