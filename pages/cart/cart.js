// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    totalPrice: 0,
    selectedAll: true,
    isEdit: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 页面加载时初始化购物车数据
    this.getCartList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 确保每次显示页面时都刷新购物车数据
    this.getCartList();
  },

  // 获取购物车列表
  getCartList() {
    // 模拟购物车数据，实际应用中应该从服务器或本地存储获取
    // 注意：需要在static/images目录下添加对应的图片文件
    // 或者替换为实际的图片URL
    const cartList = [
      {
        id: 1,
        name: '精致猫咪SPA护理',
        desc: '包洗护+按摩+毛发护理',
        price: 258.00,
        num: 1,
        selected: true,
        image: 'https://img.freepik.com/free-photo/grooming-specialist-taking-care-dog_23-2149190967.jpg'
      },
      {
        id: 2,
        name: '高级造型设计',
        desc: '个性化造型设计，打造爱宠专属形象',
        price: 388.00,
        num: 1,
        selected: true,
        image: 'https://img.freepik.com/free-photo/groomer-cutting-dog-with-scissors_23-2148581704.jpg'
      }
    ];
    
    this.setData({
      cartList: cartList
    });
    
    this.calculateTotal();
    this.checkSelectAll();
  },
  
  // 计算总价
  calculateTotal() {
    let total = 0;
    this.data.cartList.forEach(item => {
      if (item.selected) {
        total += item.price * item.num;
      }
    });
    
    this.setData({
      totalPrice: total.toFixed(2)
    });
  },
  
  // 选择商品
  selectItem(e) {
    const index = e.currentTarget.dataset.index;
    const selected = `cartList[${index}].selected`;
    
    this.setData({
      [selected]: !this.data.cartList[index].selected
    });
    
    this.calculateTotal();
    this.checkSelectAll();
  },
  
  // 全选/取消全选
  toggleSelectAll() {
    const selectedAll = !this.data.selectedAll;
    const cartList = this.data.cartList.map(item => {
      return {
        ...item,
        selected: selectedAll
      };
    });
    
    this.setData({
      selectedAll: selectedAll,
      cartList: cartList
    });
    
    this.calculateTotal();
  },
  
  // 检查是否全选
  checkSelectAll() {
    const selectedAll = this.data.cartList.length > 0 && this.data.cartList.every(item => item.selected);
    this.setData({
      selectedAll: selectedAll
    });
  },
  
  // 增加数量
  addNum(e) {
    const index = e.currentTarget.dataset.index;
    const num = this.data.cartList[index].num + 1;
    const numPath = `cartList[${index}].num`;
    
    this.setData({
      [numPath]: num
    });
    
    this.calculateTotal();
  },
  
  // 减少数量
  minusNum(e) {
    const index = e.currentTarget.dataset.index;
    const num = this.data.cartList[index].num;
    
    if (num <= 1) {
      return;
    }
    
    const numPath = `cartList[${index}].num`;
    
    this.setData({
      [numPath]: num - 1
    });
    
    this.calculateTotal();
  },
  
  // 删除商品
  deleteItem(e) {
    const index = e.currentTarget.dataset.index;
    const cartList = this.data.cartList.filter((_, i) => i !== index);
    
    this.setData({
      cartList: cartList
    });
    
    this.calculateTotal();
    this.checkSelectAll();
  },
  
  // 切换编辑模式
  toggleEditMode() {
    this.setData({
      isEdit: !this.data.isEdit
    });
  },
  
  // 结算
  checkout() {
    const selectedItems = this.data.cartList.filter(item => item.selected);
    
    if (selectedItems.length === 0) {
      wx.showToast({
        title: '请选择商品',
        icon: 'none'
      });
      return;
    }
    
    // 模拟结算过程
    wx.showLoading({
      title: '正在结算...'
    });
    
    setTimeout(() => {
      wx.hideLoading();
      
      // 跳转到订单确认页面
      wx.navigateTo({
        url: '/pages/order/order'
      });
    }, 1500);
  },
  
  // 去购物
  goShopping() {
    wx.switchTab({
      url: '/pages/store/store'
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 删除选中商品
  deleteSelected() {
    const newCartList = this.data.cartList.filter(item => !item.selected);
    
    if (newCartList.length === this.data.cartList.length) {
      wx.showToast({
        title: '请选择要删除的商品',
        icon: 'none'
      });
      return;
    }
    
    wx.showModal({
      title: '提示',
      content: '确定要删除选中的商品吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            cartList: newCartList
          });
          
          this.calculateTotal();
          this.checkSelectAll();
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  },
})