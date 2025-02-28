<template>
  <view class="container">
    <!-- 宠物图片轮播 -->
    <swiper class="pet-swiper" indicator-dots autoplay circular>
      <swiper-item v-for="(image, index) in petInfo.images" :key="index">
        <image :src="image" mode="aspectFill"></image>
      </swiper-item>
    </swiper>
    
    <!-- 宠物基本信息 -->
    <view class="pet-info-card">
      <view class="pet-header">
        <view class="pet-name-breed">
          <text class="pet-name">{{petInfo.name}}</text>
          <text class="pet-breed">{{petInfo.breed}}</text>
        </view>
        <view class="pet-distance">{{petInfo.distance}}km</view>
      </view>
      
      <view class="pet-tags">
        <view class="tag" v-for="(tag, index) in petInfo.tags" :key="index">
          {{tag}}
        </view>
      </view>
      
      <view class="pet-description">
        {{petInfo.description}}
      </view>
      
      <view class="pet-attributes">
        <view class="attribute">
          <text class="attribute-label">年龄</text>
          <text class="attribute-value">{{petInfo.age}}岁</text>
        </view>
        <view class="attribute">
          <text class="attribute-label">性别</text>
          <text class="attribute-value">{{petInfo.gender}}</text>
        </view>
        <view class="attribute">
          <text class="attribute-label">疫苗</text>
          <text class="attribute-value">{{petInfo.vaccine ? '已接种' : '未接种'}}</text>
        </view>
        <view class="attribute">
          <text class="attribute-label">绝育</text>
          <text class="attribute-value">{{petInfo.sterilization ? '已绝育' : '未绝育'}}</text>
        </view>
      </view>
    </view>
    
    <!-- 主人信息 -->
    <view class="owner-card">
      <view class="card-title">主人信息</view>
      <view class="owner-info">
        <image :src="petInfo.owner.avatar" class="owner-avatar"></image>
        <view class="owner-details">
          <text class="owner-name">{{petInfo.owner.name}}</text>
          <text class="owner-bio">{{petInfo.owner.bio}}</text>
        </view>
      </view>
    </view>
    
    <!-- 领养须知 -->
    <view class="adoption-card">
      <view class="card-title">领养须知</view>
      <view class="adoption-requirements">
        <view class="requirement" v-for="(req, index) in petInfo.requirements" :key="index">
          <text class="requirement-icon">•</text>
          <text class="requirement-text">{{req}}</text>
        </view>
      </view>
    </view>
    
    <!-- 底部操作栏 -->
    <view class="action-bar">
      <view class="action-like" @tap="toggleLike">
        <text class="iconfont" :class="isLiked ? 'icon-heart-filled' : 'icon-heart'"></text>
        <text>{{isLiked ? '已喜欢' : '喜欢'}}</text>
      </view>
      <view class="action-share" @tap="sharePet">
        <text class="iconfont icon-share"></text>
        <text>分享</text>
      </view>
      <button class="action-contact" @tap="contactOwner">联系主人</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      petId: null,
      isLiked: false,
      petInfo: {
        id: 1,
        name: '奶糖',
        breed: '英短银渐层',
        age: 2,
        gender: '母',
        distance: 0.5,
        description: '奶糖是一只非常可爱的英短银渐层猫咪，性格温顺亲人。它已经2岁了，身体健康，已完成所有疫苗接种和绝育手术。奶糖非常喜欢和人互动，会使用猫砂，有良好的生活习惯。由于工作原因，主人无法继续照顾它，希望能找到一个爱猫的家庭收养。',
        vaccine: true,
        sterilization: true,
        tags: ['温顺', '亲人', '已绝育', '已驱虫'],
        images: [
          '/static/images/pet-cat1.jpg',
          '/static/images/pet-cat2.jpg',
          '/static/images/pet-cat3.jpg'
        ],
        owner: {
          name: '小明',
          avatar: '/static/images/avatar1.jpg',
          bio: '猫咪爱好者，已养了3只猫'
        },
        requirements: [
          '有养猫经验',
          '室内饲养',
          '定期体检',
          '不离不弃',
          '接受回访'
        ]
      }
    };
  },
  methods: {
    toggleLike() {
      this.isLiked = !this.isLiked;
      
      if (this.isLiked) {
        uni.showToast({
          title: '已添加到我的喜欢',
          icon: 'success'
        });
      }
    },
    sharePet() {
      uni.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline']
      });
    },
    contactOwner() {
      uni.navigateTo({
        url: `/pages/chat/chat?petId=${this.petInfo.id}&petName=${this.petInfo.name}&username=${this.petInfo.owner.name}`
      });
    }
  },
  onLoad(options) {
    if (options.id) {
      this.petId = options.id;
      // 在实际应用中，这里应该根据ID从服务器获取宠物信息
      // 这里使用模拟数据
    }
  },
  // 分享功能
  onShareAppMessage() {
    return {
      title: `【寻找新家】${this.petInfo.breed} ${this.petInfo.name}`,
      path: `/pages/pet-detail/pet-detail?id=${this.petInfo.id}`,
      imageUrl: this.petInfo.images[0]
    };
  }
};
</script>

<style lang="scss">
.container {
  padding-bottom: 120rpx; // 为底部操作栏留出空间
}

.pet-swiper {
  width: 100%;
  height: 500rpx;
}

.pet-swiper image {
  width: 100%;
  height: 100%;
}

.pet-info-card {
  background-color: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.pet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.pet-name {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-right: 20rpx;
}

.pet-breed {
  font-size: 28rpx;
  color: #666;
}

.pet-distance {
  font-size: 24rpx;
  color: #999;
}

.pet-tags {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20rpx;
}

.tag {
  font-size: 24rpx;
  color: #FF6B6B;
  background-color: rgba(255, 107, 107, 0.1);
  padding: 6rpx 20rpx;
  border-radius: 30rpx;
  margin-right: 20rpx;
  margin-bottom: 10rpx;
}

.pet-description {
  font-size: 28rpx;
  color: #333;
  line-height: 1.6;
  margin-bottom: 30rpx;
}

.pet-attributes {
  display: flex;
  flex-wrap: wrap;
  background-color: #f8f8f8;
  border-radius: 12rpx;
  padding: 20rpx;
}

.attribute {
  width: 50%;
  display: flex;
  margin-bottom: 20rpx;
}

.attribute-label {
  font-size: 26rpx;
  color: #999;
  width: 120rpx;
}

.attribute-value {
  font-size: 26rpx;
  color: #333;
  font-weight: bold;
}

.owner-card, .adoption-card {
  background-color: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.card-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  position: relative;
  padding-left: 20rpx;
}

.card-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6rpx;
  height: 30rpx;
  background-color: #FF6B6B;
  border-radius: 3rpx;
}

.owner-info {
  display: flex;
  align-items: center;
}

.owner-avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.owner-details {
  flex: 1;
}

.owner-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
  display: block;
}

.owner-bio {
  font-size: 26rpx;
  color: #666;
  display: block;
}

.requirement {
  display: flex;
  margin-bottom: 16rpx;
}

.requirement-icon {
  font-size: 30rpx;
  color: #FF6B6B;
  margin-right: 10rpx;
}

.requirement-text {
  font-size: 28rpx;
  color: #333;
  line-height: 1.5;
}

.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: #fff;
  border-top: 1rpx solid #eee;
  z-index: 100;
}

.action-like, .action-share {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120rpx;
}

.action-like .iconfont, .action-share .iconfont {
  font-size: 40rpx;
  margin-bottom: 6rpx;
}

.icon-heart {
  color: #999;
}

.icon-heart-filled {
  color: #FF6B6B;
}

.icon-share {
  color: #999;
}

.action-like text, .action-share text {
  font-size: 24rpx;
  color: #666;
}

.action-contact {
  flex: 1;
  height: 80rpx;
  line-height: 80rpx;
  background-color: #FF6B6B;
  color: #fff;
  font-size: 30rpx;
  border-radius: 40rpx;
  margin-left: 30rpx;
}
</style> 