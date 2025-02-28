<template>
  <view class="container">
    <!-- 顶部标签栏 -->
    <view class="filter-tabs">
      <view 
        class="tab-item" 
        :class="{ active: currentFilter === 'all' }" 
        @tap="switchFilter('all')"
      >
        全部
      </view>
      <view 
        class="tab-item" 
        :class="{ active: currentFilter === 'cat' }" 
        @tap="switchFilter('cat')"
      >
        猫咪
      </view>
      <view 
        class="tab-item" 
        :class="{ active: currentFilter === 'dog' }" 
        @tap="switchFilter('dog')"
      >
        狗狗
      </view>
      <view 
        class="tab-item" 
        :class="{ active: currentFilter === 'rabbit' }" 
        @tap="switchFilter('rabbit')"
      >
        兔子
      </view>
      <view 
        class="tab-item" 
        :class="{ active: currentFilter === 'other' }" 
        @tap="switchFilter('other')"
      >
        各种
      </view>
    </view>

    <!-- 宠物列表 -->
    <scroll-view scroll-y class="pet-list" @scrolltolower="loadMore">
      <view class="pet-card" v-for="(pet, index) in filteredPets" :key="index">
        <image :src="pet.avatar" mode="aspectFill" class="pet-avatar"></image>
        <view class="pet-info">
          <view class="pet-header">
            <view class="pet-name-breed">
              <text class="pet-name">{{pet.name}}</text>
              <text class="pet-breed">{{pet.breed}}</text>
            </view>
            <text class="pet-distance">{{pet.distance}}km</text>
          </view>
          <text class="pet-description">{{pet.description}}</text>
          <view class="pet-actions">
            <view class="action-like" @tap="likePet(pet)">
              <text class="iconfont" :class="pet.isLiked ? 'icon-heart-filled' : 'icon-heart'"></text>
            </view>
            <button class="action-contact" @tap="contactOwner(pet)">联系主人</button>
          </view>
        </view>
      </view>

      <view class="loading" v-if="isLoading">
        <text>加载中...</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentFilter: 'all',
      isLoading: false,
      pets: [
        {
          id: 1,
          name: '奶糖',
          breed: '英短银渐层',
          type: 'cat',
          age: 2,
          distance: 0.5,
          description: '活泼可爱的小猫咪，非常喜欢和人互动，会使用猫砂',
          avatar: '/static/images/pet-cat1.jpg',
          isLiked: false
        },
        {
          id: 2,
          name: '皮皮',
          breed: '柯基',
          type: 'dog',
          age: 1.5,
          distance: 0.8,
          description: '活力十足的狗狗，训练良好，喜欢和其他狗狗玩耍',
          avatar: '/static/images/pet-dog1.jpg',
          isLiked: false
        },
        {
          id: 3,
          name: '米粒',
          breed: '金丝熊',
          type: 'other',
          age: 1,
          distance: 1.2,
          description: '乖巧的小仓鼠，性格温顺，适合新手饲养',
          avatar: '/static/images/pet-hamster.jpg',
          isLiked: false
        },
        {
          id: 4,
          name: '豆豆',
          breed: '荷兰垂耳兔',
          type: 'rabbit',
          age: 3,
          distance: 1.5,
          description: '温顺的小兔子，很干净，已绝育，会使用兔厕所',
          avatar: '/static/images/pet-rabbit.jpg',
          isLiked: false
        }
      ]
    };
  },
  computed: {
    filteredPets() {
      if (this.currentFilter === 'all') {
        return this.pets;
      } else {
        return this.pets.filter(pet => pet.type === this.currentFilter);
      }
    }
  },
  methods: {
    switchFilter(filter) {
      this.currentFilter = filter;
    },
    likePet(pet) {
      // 在实际应用中，这里应该调用API来保存用户的喜欢状态
      const index = this.pets.findIndex(p => p.id === pet.id);
      if (index !== -1) {
        this.pets[index].isLiked = !this.pets[index].isLiked;
        
        if (this.pets[index].isLiked) {
          uni.showToast({
            title: '已添加到我的喜欢',
            icon: 'success'
          });
        }
      }
    },
    contactOwner(pet) {
      uni.navigateTo({
        url: `/pages/chat/chat?petId=${pet.id}&petName=${pet.name}`
      });
    },
    loadMore() {
      if (this.isLoading) return;
      
      this.isLoading = true;
      
      // 模拟加载更多数据
      setTimeout(() => {
        // 在实际应用中，这里应该调用API来获取更多宠物数据
        const morePets = [
          {
            id: 5,
            name: '花花',
            breed: '美短',
            type: 'cat',
            age: 1.5,
            distance: 2.1,
            description: '粘人的小猫咪，喜欢被抚摸，会使用猫砂',
            avatar: '/static/images/pet-cat2.jpg',
            isLiked: false
          },
          {
            id: 6,
            name: '旺财',
            breed: '拉布拉多',
            type: 'dog',
            age: 2.5,
            distance: 2.3,
            description: '友善的大型犬，适合有养狗经验的家庭',
            avatar: '/static/images/pet-dog2.jpg',
            isLiked: false
          }
        ];
        
        this.pets = [...this.pets, ...morePets];
        this.isLoading = false;
      }, 1000);
    }
  },
  onLoad() {
    // 获取位置信息，用于计算与宠物的距离
    uni.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log('当前位置：', res.latitude, res.longitude);
        // 在实际应用中，这里应该调用API来获取附近的宠物
      },
      fail: () => {
        uni.showToast({
          title: '获取位置失败，请检查权限设置',
          icon: 'none'
        });
      }
    });
  }
};
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.filter-tabs {
  display: flex;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
  position: sticky;
  top: 0;
  z-index: 10;
}

.tab-item {
  flex: 1;
  padding: 20rpx 0;
  font-size: 28rpx;
  color: #666;
  text-align: center;
  position: relative;
}

.tab-item.active {
  color: #FF6B6B;
  font-weight: bold;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 4rpx;
  background-color: #FF6B6B;
}

.pet-list {
  flex: 1;
  padding: 20rpx;
}

.pet-card {
  background-color: #fff;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.pet-avatar {
  width: 100%;
  height: 400rpx;
}

.pet-info {
  padding: 20rpx;
}

.pet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10rpx;
}

.pet-name-breed {
  display: flex;
  flex-direction: column;
}

.pet-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.pet-breed {
  font-size: 24rpx;
  color: #666;
  margin-top: 4rpx;
}

.pet-distance {
  font-size: 24rpx;
  color: #999;
}

.pet-description {
  font-size: 26rpx;
  color: #666;
  margin: 16rpx 0;
  line-height: 1.5;
}

.pet-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20rpx;
}

.action-like {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  border: 1rpx solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40rpx;
}

.icon-heart {
  color: #999;
}

.icon-heart-filled {
  color: #FF6B6B;
}

.action-contact {
  flex: 1;
  margin-left: 20rpx;
  height: 80rpx;
  line-height: 80rpx;
  background-color: #FF6B6B;
  color: #fff;
  font-size: 28rpx;
  border-radius: 40rpx;
}

.loading {
  text-align: center;
  padding: 20rpx 0;
  color: #999;
  font-size: 24rpx;
}
</style> 