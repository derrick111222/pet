<template>
  <view class="container">
    <!-- 搜索框 -->
    <view class="search-header">
      <view class="search-box">
        <text class="iconfont icon-search"></text>
        <input 
          type="text" 
          v-model="searchKeyword" 
          placeholder="搜索宠物、商品、服务" 
          focus
          confirm-type="search"
          @confirm="doSearch"
        />
        <text class="clear-icon" @tap="clearSearch" v-if="searchKeyword">×</text>
      </view>
      <text class="cancel-btn" @tap="goBack">取消</text>
    </view>

    <!-- 搜索类型切换 -->
    <view class="search-tabs">
      <view 
        class="tab-item" 
        :class="{ active: searchType === 'all' }" 
        @tap="switchType('all')"
      >
        全部
      </view>
      <view 
        class="tab-item" 
        :class="{ active: searchType === 'pet' }" 
        @tap="switchType('pet')"
      >
        宠物
      </view>
      <view 
        class="tab-item" 
        :class="{ active: searchType === 'product' }" 
        @tap="switchType('product')"
      >
        商品
      </view>
      <view 
        class="tab-item" 
        :class="{ active: searchType === 'article' }" 
        @tap="switchType('article')"
      >
        文章
      </view>
    </view>

    <!-- 搜索历史 -->
    <view class="search-history" v-if="!searchKeyword && searchHistory.length > 0">
      <view class="history-header">
        <text class="history-title">搜索历史</text>
        <text class="clear-history" @tap="clearHistory">清除</text>
      </view>
      <view class="history-list">
        <view 
          class="history-item" 
          v-for="(item, index) in searchHistory" 
          :key="index"
          @tap="useHistoryItem(item)"
        >
          <text class="iconfont icon-time"></text>
          <text class="history-text">{{item}}</text>
        </view>
      </view>
    </view>

    <!-- 热门搜索 -->
    <view class="hot-search" v-if="!searchKeyword">
      <view class="hot-header">
        <text class="hot-title">热门搜索</text>
      </view>
      <view class="hot-tags">
        <view 
          class="hot-tag" 
          v-for="(tag, index) in hotTags" 
          :key="index"
          @tap="useHotTag(tag)"
        >
          {{tag}}
        </view>
      </view>
    </view>

    <!-- 搜索结果 -->
    <view class="search-results" v-if="searchKeyword && hasSearched">
      <!-- 宠物结果 -->
      <view class="result-section" v-if="searchType === 'all' || searchType === 'pet'">
        <view class="section-header" v-if="searchType === 'all'">
          <text class="section-title">宠物</text>
          <text class="section-more" @tap="switchType('pet')">查看更多 ></text>
        </view>
        <view class="pet-list">
          <view class="pet-item" v-for="(pet, index) in filteredPets" :key="index" @tap="goToPetDetail(pet.id)">
            <image :src="pet.avatar" class="pet-avatar"></image>
            <view class="pet-info">
              <text class="pet-name">{{pet.name}}</text>
              <text class="pet-breed">{{pet.breed}}</text>
              <text class="pet-distance">{{pet.distance}}km</text>
            </view>
          </view>
          <view class="empty-result" v-if="filteredPets.length === 0">
            <text>没有找到相关宠物</text>
          </view>
        </view>
      </view>

      <!-- 商品结果 -->
      <view class="result-section" v-if="searchType === 'all' || searchType === 'product'">
        <view class="section-header" v-if="searchType === 'all'">
          <text class="section-title">商品</text>
          <text class="section-more" @tap="switchType('product')">查看更多 ></text>
        </view>
        <view class="product-list">
          <view class="product-item" v-for="(product, index) in filteredProducts" :key="index" @tap="goToProductDetail(product.id)">
            <image :src="product.image" class="product-image"></image>
            <view class="product-info">
              <text class="product-name">{{product.name}}</text>
              <text class="product-price">¥{{product.price}}</text>
            </view>
          </view>
          <view class="empty-result" v-if="filteredProducts.length === 0">
            <text>没有找到相关商品</text>
          </view>
        </view>
      </view>

      <!-- 文章结果 -->
      <view class="result-section" v-if="searchType === 'all' || searchType === 'article'">
        <view class="section-header" v-if="searchType === 'all'">
          <text class="section-title">文章</text>
          <text class="section-more" @tap="switchType('article')">查看更多 ></text>
        </view>
        <view class="article-list">
          <view class="article-item" v-for="(article, index) in filteredArticles" :key="index" @tap="goToArticle(article.id)">
            <image :src="article.image" class="article-image"></image>
            <view class="article-info">
              <text class="article-title">{{article.title}}</text>
              <text class="article-desc">{{article.desc}}</text>
            </view>
          </view>
          <view class="empty-result" v-if="filteredArticles.length === 0">
            <text>没有找到相关文章</text>
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
      searchKeyword: '',
      searchType: 'all',
      hasSearched: false,
      searchHistory: [],
      hotTags: ['金毛', '猫粮', '猫咪行为', '狗狗训练', '宠物玩具', '英短', '柯基', '兔子'],
      pets: [
        {
          id: 1,
          name: '奶糖',
          breed: '英短银渐层',
          distance: 0.5,
          avatar: '/static/images/pet-cat1.jpg'
        },
        {
          id: 2,
          name: '可可',
          breed: '金毛',
          distance: 0.8,
          avatar: '/static/images/pet-dog1.jpg'
        },
        {
          id: 3,
          name: '豆豆',
          breed: '荷兰垂耳兔',
          distance: 1.5,
          avatar: '/static/images/pet-rabbit.jpg'
        }
      ],
      products: [
        {
          id: 1,
          name: '优质猫粮 10kg',
          price: 299,
          image: '/static/images/product-cat-food.jpg'
        },
        {
          id: 2,
          name: '狗狗磨牙玩具',
          price: 49,
          image: '/static/images/product-dog-toy.jpg'
        },
        {
          id: 3,
          name: '猫咪按摩梳',
          price: 68,
          image: '/static/images/product-cat-brush.jpg'
        }
      ],
      articles: [
        {
          id: 1,
          title: '如何照顾新生小猫',
          desc: '新手养猫必读指南，让它的小猫健康成长',
          image: '/static/images/cat-care.jpg'
        },
        {
          id: 2,
          title: '狗狗的日常训练',
          desc: '专业训犬师分享训练技巧和方法',
          image: '/static/images/dog-training.jpg'
        },
        {
          id: 3,
          title: '宠物营养搭配指南',
          desc: '科学的宠物饮食计划',
          image: '/static/images/pet-nutrition.jpg'
        }
      ]
    };
  },
  computed: {
    filteredPets() {
      if (!this.searchKeyword) return [];
      return this.pets.filter(pet => 
        pet.name.includes(this.searchKeyword) || 
        pet.breed.includes(this.searchKeyword)
      );
    },
    filteredProducts() {
      if (!this.searchKeyword) return [];
      return this.products.filter(product => 
        product.name.includes(this.searchKeyword)
      );
    },
    filteredArticles() {
      if (!this.searchKeyword) return [];
      return this.articles.filter(article => 
        article.title.includes(this.searchKeyword) || 
        article.desc.includes(this.searchKeyword)
      );
    }
  },
  methods: {
    doSearch() {
      if (!this.searchKeyword.trim()) return;
      
      this.hasSearched = true;
      
      // 保存到搜索历史
      if (!this.searchHistory.includes(this.searchKeyword)) {
        this.searchHistory.unshift(this.searchKeyword);
        // 只保留最近10条搜索记录
        if (this.searchHistory.length > 10) {
          this.searchHistory.pop();
        }
        // 保存到本地存储
        uni.setStorageSync('searchHistory', JSON.stringify(this.searchHistory));
      }
    },
    clearSearch() {
      this.searchKeyword = '';
      this.hasSearched = false;
    },
    goBack() {
      uni.navigateBack();
    },
    switchType(type) {
      this.searchType = type;
      if (this.searchKeyword) {
        this.doSearch();
      }
    },
    clearHistory() {
      this.searchHistory = [];
      uni.removeStorageSync('searchHistory');
    },
    useHistoryItem(item) {
      this.searchKeyword = item;
      this.doSearch();
    },
    useHotTag(tag) {
      this.searchKeyword = tag;
      this.doSearch();
    },
    goToPetDetail(id) {
      uni.navigateTo({
        url: `/pages/pet-detail/pet-detail?id=${id}`
      });
    },
    goToProductDetail(id) {
      uni.navigateTo({
        url: `/pages/product-detail/product-detail?id=${id}`
      });
    },
    goToArticle(id) {
      uni.navigateTo({
        url: `/pages/article/article?id=${id}`
      });
    }
  },
  onLoad(options) {
    // 获取搜索类型
    if (options.type) {
      this.searchType = options.type;
    }
    
    // 获取搜索历史
    const history = uni.getStorageSync('searchHistory');
    if (history) {
      this.searchHistory = JSON.parse(history);
    }
  }
};
</script>

<style lang="scss">
.container {
  background-color: #fff;
  min-height: 100vh;
}

.search-header {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
}

.search-box {
  flex: 1;
  display: flex;
  align-items: center;
  height: 70rpx;
  background-color: #f5f5f5;
  border-radius: 35rpx;
  padding: 0 30rpx;
}

.search-box .iconfont {
  font-size: 32rpx;
  color: #999;
  margin-right: 10rpx;
}

.search-box input {
  flex: 1;
  height: 70rpx;
  font-size: 28rpx;
}

.clear-icon {
  font-size: 40rpx;
  color: #ccc;
  padding: 0 10rpx;
}

.cancel-btn {
  padding: 0 20rpx;
  font-size: 28rpx;
  color: #666;
}

.search-tabs {
  display: flex;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
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

.search-history, .hot-search {
  padding: 20rpx;
}

.history-header, .hot-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.history-title, .hot-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.clear-history {
  font-size: 24rpx;
  color: #999;
}

.history-list {
  display: flex;
  flex-direction: column;
}

.history-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
}

.history-item .iconfont {
  font-size: 32rpx;
  color: #999;
  margin-right: 20rpx;
}

.history-text {
  font-size: 28rpx;
  color: #333;
}

.hot-tags {
  display: flex;
  flex-wrap: wrap;
}

.hot-tag {
  font-size: 26rpx;
  color: #666;
  background-color: #f5f5f5;
  padding: 10rpx 30rpx;
  border-radius: 30rpx;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
}

.search-results {
  padding: 20rpx;
}

.result-section {
  margin-bottom: 30rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.section-more {
  font-size: 24rpx;
  color: #999;
}

.pet-list, .product-list, .article-list {
  display: flex;
  flex-direction: column;
}

.pet-item, .product-item, .article-item {
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
}

.pet-avatar, .product-image, .article-image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 10rpx;
  margin-right: 20rpx;
}

.pet-info, .product-info, .article-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.pet-name, .product-name, .article-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.pet-breed, .article-desc {
  font-size: 24rpx;
  color: #666;
}

.pet-distance {
  font-size: 24rpx;
  color: #999;
}

.product-price {
  font-size: 28rpx;
  color: #FF6B6B;
  font-weight: bold;
}

.empty-result {
  padding: 40rpx 0;
  text-align: center;
  color: #999;
  font-size: 28rpx;
}

.icon-time:before {
  content: "\e60a";
}
</style> 