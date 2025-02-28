<template>
  <view class="container">
    <!-- 搜索框 -->
    <view class="search-box">
      <view class="search-input">
        <text class="iconfont icon-search"></text>
        <input type="text" placeholder="搜索宠物、商品、服务" disabled @tap="goToSearch" />
      </view>
      <text class="notification-icon" @tap="goToNotification">
        <text class="iconfont icon-notification"></text>
      </text>
    </view>

    <!-- 分类导航 -->
    <view class="category-nav">
      <view class="category-item" @tap="navigateToCategory('care')">
        <image src="/static/images/category-care.png" mode="aspectFit"></image>
        <text>宠物护理</text>
      </view>
      <view class="category-item" @tap="navigateToCategory('medical')">
        <image src="/static/images/category-medical.png" mode="aspectFit"></image>
        <text>宠物诊疗</text>
      </view>
      <view class="category-item" @tap="navigateToCategory('supplies')">
        <image src="/static/images/category-supplies.png" mode="aspectFit"></image>
        <text>宠物用品</text>
      </view>
      <view class="category-item" @tap="navigateToCategory('training')">
        <image src="/static/images/category-training.png" mode="aspectFit"></image>
        <text>宠物训练</text>
      </view>
    </view>

    <!-- 精选推荐 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">精选推荐</text>
        <text class="section-more" @tap="goToMore('featured')">更多</text>
      </view>
      <view class="featured-list">
        <view class="featured-item" @tap="goToDetail('cat-care')">
          <image src="/static/images/cat-care.jpg" mode="aspectFill"></image>
          <view class="featured-info">
            <text class="featured-title">如何照顾新生小猫</text>
            <text class="featured-desc">新手养猫必读指南，让它的小猫健康成长</text>
          </view>
        </view>
        <view class="featured-item" @tap="goToDetail('dog-training')">
          <image src="/static/images/dog-training.jpg" mode="aspectFill"></image>
          <view class="featured-info">
            <text class="featured-title">狗狗的日常训练</text>
            <text class="featured-desc">专业训犬师分享训练技巧和方法</text>
          </view>
        </view>
        <view class="featured-item" @tap="goToDetail('pet-nutrition')">
          <image src="/static/images/pet-nutrition.jpg" mode="aspectFill"></image>
          <view class="featured-info">
            <text class="featured-title">宠物营养搭配指南</text>
            <text class="featured-desc">科学的宠物饮食计划</text>
          </view>
        </view>
        <view class="featured-item" @tap="goToDetail('cat-behavior')">
          <image src="/static/images/cat-behavior.jpg" mode="aspectFill"></image>
          <view class="featured-info">
            <text class="featured-title">猫咪行为分解析</text>
            <text class="featured-desc">了解猫咪的身体语言</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 附近宠物 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">附近的宠物</text>
        <text class="section-more" @tap="goToNearbyPets">查看更多</text>
      </view>
      <scroll-view scroll-x class="nearby-pets">
        <view class="pet-card" v-for="(pet, index) in nearbyPets" :key="index" @tap="goToPetDetail(pet.id)">
          <image :src="pet.avatar" mode="aspectFill"></image>
          <view class="pet-info">
            <text class="pet-name">{{pet.name}}</text>
            <text class="pet-breed">{{pet.breed}}</text>
            <text class="pet-distance">{{pet.distance}}km</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      nearbyPets: [
        {
          id: 1,
          name: '奶糖',
          breed: '英短银渐层',
          distance: 0.5,
          avatar: '/static/images/pet1.jpg'
        },
        {
          id: 2,
          name: '可可',
          breed: '金毛',
          distance: 0.8,
          avatar: '/static/images/pet2.jpg'
        },
        {
          id: 3,
          name: '豆豆',
          breed: '荷兰垂耳兔',
          distance: 1.5,
          avatar: '/static/images/pet3.jpg'
        },
        {
          id: 4,
          name: '皮皮',
          breed: '柯基',
          distance: 1.2,
          avatar: '/static/images/pet4.jpg'
        }
      ]
    };
  },
  methods: {
    goToSearch() {
      uni.navigateTo({
        url: '/pages/search/search'
      });
    },
    goToNotification() {
      uni.navigateTo({
        url: '/pages/notification/notification'
      });
    },
    navigateToCategory(category) {
      uni.navigateTo({
        url: `/pages/category/category?type=${category}`
      });
    },
    goToMore(type) {
      uni.navigateTo({
        url: `/pages/more/more?type=${type}`
      });
    },
    goToDetail(id) {
      uni.navigateTo({
        url: `/pages/article/article?id=${id}`
      });
    },
    goToNearbyPets() {
      uni.switchTab({
        url: '/pages/pet/pet'
      });
    },
    goToPetDetail(id) {
      uni.navigateTo({
        url: `/pages/pet-detail/pet-detail?id=${id}`
      });
    }
  }
};
</script>

<style lang="scss">
.container {
  padding-bottom: 20rpx;
}

.search-box {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: #fff;
}

.search-input {
  flex: 1;
  display: flex;
  align-items: center;
  height: 70rpx;
  background-color: #f5f5f5;
  border-radius: 35rpx;
  padding: 0 30rpx;
}

.search-input input {
  flex: 1;
  height: 70rpx;
  font-size: 28rpx;
  margin-left: 10rpx;
}

.notification-icon {
  padding: 0 20rpx;
  font-size: 48rpx;
}

.category-nav {
  display: flex;
  justify-content: space-between;
  padding: 30rpx 20rpx;
  background-color: #fff;
  margin-bottom: 20rpx;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
}

.category-item image {
  width: 100rpx;
  height: 100rpx;
  margin-bottom: 10rpx;
}

.category-item text {
  font-size: 24rpx;
  color: #333;
}

.section {
  background-color: #fff;
  margin-bottom: 20rpx;
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

.featured-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.featured-item {
  width: 48%;
  margin-bottom: 20rpx;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.featured-item image {
  width: 100%;
  height: 200rpx;
}

.featured-info {
  padding: 16rpx;
}

.featured-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 8rpx;
  display: block;
}

.featured-desc {
  font-size: 24rpx;
  color: #666;
  display: block;
}

.nearby-pets {
  white-space: nowrap;
}

.pet-card {
  display: inline-block;
  width: 200rpx;
  margin-right: 20rpx;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.pet-card image {
  width: 100%;
  height: 200rpx;
}

.pet-info {
  padding: 10rpx;
}

.pet-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  display: block;
}

.pet-breed {
  font-size: 22rpx;
  color: #666;
  display: block;
}

.pet-distance {
  font-size: 22rpx;
  color: #999;
  display: block;
}
</style> 