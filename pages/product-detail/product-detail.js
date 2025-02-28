// pages/product-detail/product-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productId: null,
    product: null,
    currentImageIndex: 0,
    quantity: 1,
    selectedSpec: null,
    showSpecSelector: false,
    isCollected: false,
    specs: [
      { id: 1, name: '小包装', price: 0 },
      { id: 2, name: '中包装', price: 50 },
      { id: 3, name: '大包装', price: 100 }
    ],
    relatedProducts: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const productId = options.id;
    if (productId) {
      this.setData({
        productId: productId
      });
      this.getProductDetail(productId);
      this.getRelatedProducts();
    } else {
      wx.showToast({
        title: '商品信息不存在',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  /**
   * 获取商品详情
   */
  getProductDetail(productId) {
    // 模拟获取商品详情数据
    // 实际应用中应该从服务器获取
    const product = {
      id: productId,
      name: '优质猫粮 10kg',
      price: 299,
      originalPrice: 399,
      sales: 256,
      rating: 4.8,
      stock: 999,
      images: [
        'https://img.freepik.com/free-photo/cat-food-wooden-floor_1150-18079.jpg',
        'https://img.freepik.com/free-photo/cat-eating-her-food-kitchen_23-2148955134.jpg',
        'https://img.freepik.com/free-photo/closeup-shot-cat-eating-food-bowl_181624-57587.jpg'
      ],
      description: '本产品采用优质食材，营养均衡，适合各年龄段猫咪食用。富含蛋白质、维生素和矿物质，有助于猫咪健康成长和毛发亮丽。',
      details: [
        '品牌：PetMatch宠遇',
        '产地：中国',
        '净含量：10kg',
        '保质期：18个月',
        '适用对象：全阶段猫咪',
        '主要成分：鸡肉、三文鱼、糙米、蔬菜'
      ],
      comments: [
        {
          id: 1,
          user: '猫咪爱好者',
          avatar: 'https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg',
          content: '我家猫咪很喜欢吃，毛发变得更加亮丽了！',
          rating: 5,
          time: '2023-12-15'
        },
        {
          id: 2,
          user: '铲屎官',
          avatar: 'https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg',
          content: '包装很好，猫粮粒大小适中，猫咪吃了没有肠胃问题。',
          rating: 4,
          time: '2023-12-10'
        }
      ]
    };

    this.setData({
      product: product,
      selectedSpec: this.data.specs[0]
    });
  },

  /**
   * 获取相关商品
   */
  getRelatedProducts() {
    // 模拟获取相关商品数据
    const relatedProducts = [
      {
        id: 2,
        name: '猫咪零食罐头',
        price: 15,
        image: 'https://img.freepik.com/free-photo/canned-cat-food-isolated-white-background_123827-22907.jpg'
      },
      {
        id: 3,
        name: '猫咪饮水机',
        price: 129,
        image: 'https://img.freepik.com/free-photo/cat-drinking-water-fountain_23-2148955133.jpg'
      },
      {
        id: 4,
        name: '猫砂盆',
        price: 89,
        image: 'https://img.freepik.com/free-photo/cat-litter-box-isolated-white-background_123827-22908.jpg'
      }
    ];

    this.setData({
      relatedProducts: relatedProducts
    });
  },

  /**
   * 切换商品图片
   */
  changeImage(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentImageIndex: index
    });
  },

  /**
   * 增加商品数量
   */
  increaseQuantity() {
    if (this.data.quantity < this.data.product.stock) {
      this.setData({
        quantity: this.data.quantity + 1
      });
    } else {
      wx.showToast({
        title: '已达到最大库存',
        icon: 'none'
      });
    }
  },

  /**
   * 减少商品数量
   */
  decreaseQuantity() {
    if (this.data.quantity > 1) {
      this.setData({
        quantity: this.data.quantity - 1
      });
    }
  },

  /**
   * 显示规格选择器
   */
  showSpecSelector() {
    this.setData({
      showSpecSelector: true
    });
  },

  /**
   * 隐藏规格选择器
   */
  hideSpecSelector() {
    this.setData({
      showSpecSelector: false
    });
  },

  /**
   * 选择规格
   */
  selectSpec(e) {
    const specId = e.currentTarget.dataset.id;
    const selectedSpec = this.data.specs.find(item => item.id === specId);
    
    this.setData({
      selectedSpec: selectedSpec
    });
  },

  /**
   * 收藏/取消收藏商品
   */
  toggleCollect() {
    this.setData({
      isCollected: !this.data.isCollected
    });
    
    wx.showToast({
      title: this.data.isCollected ? '已收藏' : '已取消收藏',
      icon: 'success'
    });
  },

  /**
   * 加入购物车
   */
  addToCart() {
    if (!this.data.selectedSpec) {
      wx.showToast({
        title: '请选择规格',
        icon: 'none'
      });
      return;
    }
    
    // 实际应用中应该将商品添加到购物车
    // 这里仅做模拟
    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    });
    
    this.hideSpecSelector();
  },

  /**
   * 立即购买
   */
  buyNow() {
    if (!this.data.selectedSpec) {
      wx.showToast({
        title: '请选择规格',
        icon: 'none'
      });
      return;
    }
    
    // 实际应用中应该跳转到订单确认页面
    // 这里仅做模拟
    wx.navigateTo({
      url: '/pages/order-confirm/order-confirm'
    });
    
    this.hideSpecSelector();
  },

  /**
   * 查看商品评论
   */
  viewComments() {
    wx.navigateTo({
      url: `/pages/product-comments/product-comments?id=${this.data.productId}`
    });
  },

  /**
   * 前往相关商品详情
   */
  goToRelatedProduct(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/product-detail/product-detail?id=${id}`
    });
  },

  /**
   * 分享商品
   */
  onShareAppMessage() {
    return {
      title: this.data.product ? this.data.product.name : 'PetMatch宠遇商城',
      path: `/pages/product-detail/product-detail?id=${this.data.productId}`,
      imageUrl: this.data.product ? this.data.product.images[0] : ''
    };
  }
})