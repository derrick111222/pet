<template>
  <view class="container">
    <!-- 用户信息卡片 -->
    <view class="user-card">
      <view class="user-info">
        <image class="avatar" src="/static/images/user-avatar.jpg"></image>
        <view class="user-details">
          <text class="username">小明的宠物之家</text>
          <text class="user-id">账号: pet_123456</text>
        </view>
      </view>
      <view class="user-bio">
        <text>热爱小动物的守护者，已养了两只猫咪和一只柯基。希望在这里结识更多爱宠人士，分享养宠经验~</text>
      </view>
      <view class="edit-profile" @tap="editProfile">
        <text class="iconfont icon-edit"></text>
      </view>
    </view>

    <!-- 功能模块 -->
    <view class="feature-grid">
      <view class="feature-item" @tap="navigateTo('/pages/my-pets/my-pets')">
        <image src="/static/images/icon-pets.png"></image>
        <text>我的宠物</text>
        <text class="feature-desc">查看健康档案</text>
      </view>
      <view class="feature-item" @tap="navigateTo('/pages/moments/moments')">
        <image src="/static/images/icon-moments.png"></image>
        <text>记录时刻</text>
        <text class="feature-desc">分享快乐瞬间</text>
      </view>
      <view class="feature-item" @tap="navigateTo('/pages/favorites/favorites')">
        <image src="/static/images/icon-favorites.png"></image>
        <text>我的收藏</text>
        <text class="feature-desc">精选内容</text>
      </view>
      <view class="feature-item" @tap="navigateTo('/pages/health/health')">
        <image src="/static/images/icon-health.png"></image>
        <text>健康服务</text>
        <text class="feature-desc">在线问诊</text>
      </view>
    </view>

    <!-- 我的喜欢 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">我的喜欢</text>
        <text class="section-more" @tap="navigateTo('/pages/favorites/favorites')">查看更多 ></text>
      </view>
      <scroll-view scroll-x class="favorites-list">
        <view class="favorite-item" v-for="(pet, index) in favoritePets" :key="index" @tap="viewPet(pet.id)">
          <image :src="pet.avatar"></image>
          <text class="pet-name">{{pet.name}}</text>
          <text class="pet-breed">{{pet.breed}}</text>
        </view>
      </scroll-view>
    </view>

    <!-- 设置列表 -->
    <view class="settings-list">
      <view class="settings-item" @tap="navigateTo('/pages/settings/settings')">
        <text class="iconfont icon-settings"></text>
        <text>设置</text>
        <text class="iconfont icon-arrow-right"></text>
      </view>
      <view class="settings-item" @tap="navigateTo('/pages/help/help')">
        <text class="iconfont icon-help"></text>
        <text>帮助与反馈</text>
        <text class="iconfont icon-arrow-right"></text>
      </view>
      <view class="settings-item" @tap="navigateTo('/pages/about/about')">
        <text class="iconfont icon-info"></text>
        <text>关于我们</text>
        <text class="iconfont icon-arrow-right"></text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        username: '小明的宠物之家',
        userId: 'pet_123456',
        avatar: '/static/images/user-avatar.jpg',
        bio: '热爱小动物的守护者，已养了两只猫咪和一只柯基。希望在这里结识更多爱宠人士，分享养宠经验~'
      },
      favoritePets: [
        {
          id: 1,
          name: '奶糖',
          breed: '英短',
          avatar: '/static/images/pet-cat1.jpg'
        },
        {
          id: 2,
          name: '可可',
          breed: '金毛',
          avatar: '/static/images/pet-dog2.jpg'
        },
        {
          id: 3,
          name: '豆豆',
          breed: '荷兰垂耳兔',
          avatar: '/static/images/pet-rabbit.jpg'
        }
      ]
    };
  },
  methods: {
    editProfile() {
      uni.navigateTo({
        url: '/pages/edit-profile/edit-profile'
      });
    },
    navigateTo(url) {
      uni.navigateTo({
        url: url
      });
    },
    viewPet(id) {
      uni.navigateTo({
        url: `/pages/pet-detail/pet-detail?id=${id}`
      });
    }
  }
};
</script>

<style lang="scss">
.container {
  background-color: #f8f8f8;
  min-height: 100vh;
  padding-bottom: 30rpx;
}

.user-card {
  background-color: #fff;
  padding: 30rpx;
  position: relative;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
  margin-right: 20rpx;
}

.user-details {
  flex: 1;
}

.username {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
  display: block;
}

.user-id {
  font-size: 24rpx;
  color: #999;
  display: block;
}

.user-bio {
  font-size: 26rpx;
  color: #666;
  line-height: 1.5;
  margin-top: 20rpx;
}

.edit-profile {
  position: absolute;
  top: 30rpx;
  right: 30rpx;
  font-size: 40rpx;
  color: #999;
}

.feature-grid {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  margin-top: 20rpx;
  padding: 20rpx;
}

.feature-item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx 0;
}

.feature-item image {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 10rpx;
}

.feature-item text {
  font-size: 28rpx;
  color: #333;
}

.feature-desc {
  font-size: 22rpx !important;
  color: #999 !important;
  margin-top: 6rpx;
}

.section {
  background-color: #fff;
  margin-top: 20rpx;
  padding: 20rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.section-more {
  font-size: 24rpx;
  color: #999;
}

.favorites-list {
  white-space: nowrap;
}

.favorite-item {
  display: inline-block;
  width: 180rpx;
  margin-right: 20rpx;
  text-align: center;
}

.favorite-item image {
  width: 180rpx;
  height: 180rpx;
  border-radius: 12rpx;
  margin-bottom: 10rpx;
}

.pet-name {
  font-size: 28rpx;
  color: #333;
  display: block;
}

.pet-breed {
  font-size: 22rpx;
  color: #999;
  display: block;
}

.settings-list {
  background-color: #fff;
  margin-top: 20rpx;
}

.settings-item {
  display: flex;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #eee;
}

.settings-item:last-child {
  border-bottom: none;
}

.settings-item .iconfont {
  font-size: 40rpx;
  color: #999;
  margin-right: 20rpx;
}

.settings-item text:nth-child(2) {
  flex: 1;
  font-size: 30rpx;
  color: #333;
}

.icon-arrow-right {
  margin-right: 0;
}
</style> 