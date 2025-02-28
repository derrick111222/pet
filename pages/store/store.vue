<template>
  <view class="container">
    <!-- 搜索框 -->
    <view class="search-box">
      <view class="search-input">
        <text class="iconfont icon-search"></text>
        <input type="text" placeholder="搜索商品" disabled @tap="goToSearch" />
      </view>
      <view class="cart-icon" @tap="goToCart">
        <text class="iconfont icon-cart"></text>
      </view>
    </view>

    <!-- 分类标签 -->
    <scroll-view scroll-x class="category-tabs">
      <view 
        class="tab-item" 
        :class="{ active: currentCategory === 'all' }" 
        @tap="switchCategory('all')"
      >
        全部
      </view>
      <view 
        class="tab-item" 
        :class="{ active: currentCategory === 'food' }" 
        @tap="switchCategory('food')"
      >
        食品
      </view>
      <view 
        class="tab-item" 
        :class="{ active: currentCategory === 'toys' }" 
        @tap="switchCategory('toys')"
      >
        玩具
      </view>
      <view 
        class="tab-item" 
        :class="{ active: currentCategory === 'clean' }" 
        @tap="switchCategory('clean')"
      >
        清洁
      </view>
      <view 
        class="tab-item" 
        :class="{ active: currentCategory === 'medical' }" 
        @tap="switchCategory('medical')"
      >
        医疗
      </view>
      <view 
        class="tab-item" 
        :class="{ active: currentCategory === 'clothes' }" 
        @tap="switchCategory('clothes')"
      >
        服饰
      </view>
    </scroll-view>

    <!-- 商品列表 -->
    <view class="product-list">
      <view class="product-item" v-for="(product, index) in filteredProducts" :key="index" @tap="goToProductDetail(product.id)">
        <image :src="product.image" mode="aspectFill"></image>
        <view class="product-info">
          <text class="product-name">{{product.name}}</text>
          <text class="product-desc">{{product.desc}}</text>
          <view class="product-price-action">
            <text class="product-price">¥{{product.price}}</text>
            <view class="add-to-cart" @tap.stop="addToCart(product)">
              <text class="iconfont icon-add"></text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentCategory: 'all',
      products: [
        {
          id: 1,
          name: '优质猫粮 10kg',
          desc: '天然无谷物配方',
          price: 299,
          category: 'food',
          image: '/static/images/product-cat-food.jpg'
        },
        {
          id: 2,
          name: '狗狗磨牙玩具',
          desc: '耐咬无毒材质',
          price: 49,
          category: 'toys',
          image: '/static/images/product-dog-toy.jpg'
        },
        {
          id: 3,
          name: '猫咪按摩梳',
          desc: '舒适除毛工具',
          price: 68,
          category: 'clean',
          image: '/static/images/product-cat-brush.jpg'
        },
        {
          id: 4,
          name: '宠物智能喂食器',
          desc: '自动定时投食',
          price: 399,
          category: 'food',
          image: '/static/images/product-feeder.jpg'
        },
        {
          id: 5,
          name: '宠物牵引绳',
          desc: '可伸缩设计',
          price: 89,
          category: 'clothes',
          image: '/static/images/product-leash.jpg'
        },
        {
          id: 6,
          name: '宠物医疗包',
          desc: '家庭急救必备',
          price: 129,
          category: 'medical',
          image: '/static/images/product-medical.jpg'
        }
      ]
    };
  },
  computed: {
    filteredProducts() {
      if (this.currentCategory === 'all') {
        return this.products;
      } else {
        return this.products.filter(product => product.category === this.currentCategory);
      }
    }
  },
  methods: {
    goToSearch() {
      uni.navigateTo({
        url: '/pages/search/search?type=product'
      });
    },
    goToCart() {
      uni.navigateTo({
        url: '/pages/cart/cart'
      });
    },
    switchCategory(category) {
      this.currentCategory = category;
    },
    goToProductDetail(id) {
      uni.navigateTo({
        url: `/pages/product-detail/product-detail?id=${id}`
      });
    },
    addToCart(product) {
      // 这里可以添加购物车逻辑
      uni.showToast({
        title: '已添加到购物车',
        icon: 'success'
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

.cart-icon {
  padding: 0 20rpx;
  font-size: 48rpx;
}

.category-tabs {
  white-space: nowrap;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
}

.tab-item {
  display: inline-block;
  padding: 20rpx 30rpx;
  font-size: 28rpx;
  color: #666;
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

.product-list {
  display: flex;
  flex-wrap: wrap;
  padding: 20rpx;
}

.product-item {
  width: 48%;
  margin-bottom: 20rpx;
  background-color: #fff;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  margin-right: 4%;
}

.product-item:nth-child(2n) {
  margin-right: 0;
}

.product-item image {
  width: 100%;
  height: 300rpx;
}

.product-info {
  padding: 16rpx;
}

.product-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 8rpx;
  display: block;
}

.product-desc {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 16rpx;
  display: block;
}

.product-price-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 32rpx;
  color: #FF6B6B;
  font-weight: bold;
}

.add-to-cart {
  width: 50rpx;
  height: 50rpx;
  background-color: #FF6B6B;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
</style> 