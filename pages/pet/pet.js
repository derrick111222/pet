// pages/pet/pet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    petList: [],
    currentIndex: 0,
    filterOptions: {
      type: '全部', // 宠物类型：全部、猫咪、狗狗、兔子、仓鼠等
      distance: 5, // 距离范围，单位：公里
      age: '全部' // 年龄范围：全部、幼年、成年
    },
    showFilter: false,
    petTypes: ['全部', '猫咪', '狗狗', '兔子', '仓鼠', '其他'],
    distanceOptions: [1, 3, 5, 10, 20],
    ageOptions: ['全部', '幼年', '成年', '老年']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getPetList();
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

  },

  // 获取附近宠物列表
  getPetList() {
    // 模拟获取附近宠物数据
    const petList = [
      {
        id: 1,
        name: '奶糖',
        type: '猫咪',
        breed: '英短银渐层',
        age: 2,
        gender: '母',
        distance: 0.5,
        images: ['https://img.freepik.com/free-photo/cute-domestic-kitten-sits-window-staring-outside-generated-by-ai_188544-15537.jpg'],
        description: '活泼可爱的小猫咪，非常喜欢和人互动，会使用猫砂',
        owner: {
          id: 101,
          name: '小明',
          avatar: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg'
        }
      },
      {
        id: 2,
        name: '皮皮',
        type: '狗狗',
        breed: '柯基',
        age: 1.5,
        gender: '公',
        distance: 0.8,
        images: ['https://img.freepik.com/free-photo/cute-dog-portrait-studio_23-2150141892.jpg'],
        description: '活力十足的狗狗，训练良好，喜欢和其他狗狗玩耍',
        owner: {
          id: 102,
          name: '小红',
          avatar: 'https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg'
        }
      },
      {
        id: 3,
        name: '米粒',
        type: '仓鼠',
        breed: '金丝熊',
        age: 1,
        gender: '公',
        distance: 1.2,
        images: ['https://img.freepik.com/free-photo/hamster-isolated-white-background_53876-32241.jpg'],
        description: '乖巧的小仓鼠，性格温顺，适合新手饲养',
        owner: {
          id: 103,
          name: '小李',
          avatar: 'https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg'
        }
      },
      {
        id: 4,
        name: '豆豆',
        type: '兔子',
        breed: '荷兰垂耳兔',
        age: 3,
        gender: '母',
        distance: 1.5,
        images: ['https://img.freepik.com/free-photo/closeup-shot-cute-brown-white-domestic-rabbit_181624-30823.jpg'],
        description: '温顺的小兔子，很干净，已绝育，会使用兔厕所',
        owner: {
          id: 104,
          name: '小张',
          avatar: 'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg'
        }
      }
    ];

    this.setData({
      petList: petList
    });
  },

  // 切换到下一个宠物
  nextPet() {
    if (this.data.currentIndex < this.data.petList.length - 1) {
      this.setData({
        currentIndex: this.data.currentIndex + 1
      });
    } else {
      wx.showToast({
        title: '已经是最后一个啦',
        icon: 'none'
      });
    }
  },

  // 切换到上一个宠物
  prevPet() {
    if (this.data.currentIndex > 0) {
      this.setData({
        currentIndex: this.data.currentIndex - 1
      });
    } else {
      wx.showToast({
        title: '已经是第一个啦',
        icon: 'none'
      });
    }
  },

  // 联系宠物主人
  contactOwner() {
    const currentPet = this.data.petList[this.data.currentIndex];
    wx.navigateTo({
      url: `/pages/chat/chat?userId=${currentPet.owner.id}&userName=${currentPet.owner.name}`,
    });
  },

  // 显示/隐藏筛选面板
  toggleFilter() {
    this.setData({
      showFilter: !this.data.showFilter
    });
  },

  // 设置宠物类型筛选
  setTypeFilter(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      'filterOptions.type': type
    });
  },

  // 设置距离筛选
  setDistanceFilter(e) {
    const distance = e.currentTarget.dataset.distance;
    this.setData({
      'filterOptions.distance': distance
    });
  },

  // 设置年龄筛选
  setAgeFilter(e) {
    const age = e.currentTarget.dataset.age;
    this.setData({
      'filterOptions.age': age
    });
  },

  // 应用筛选
  applyFilter() {
    // 实际应用中，这里应该根据筛选条件重新请求数据
    // 这里仅做模拟
    wx.showLoading({
      title: '加载中',
    });

    setTimeout(() => {
      wx.hideLoading();
      this.setData({
        showFilter: false,
        currentIndex: 0
      });
      wx.showToast({
        title: '筛选成功',
        icon: 'success'
      });
    }, 1000);
  },

  // 重置筛选
  resetFilter() {
    this.setData({
      filterOptions: {
        type: '全部',
        distance: 5,
        age: '全部'
      }
    });
  },

  // 查看宠物详情
  viewPetDetail() {
    const currentPet = this.data.petList[this.data.currentIndex];
    wx.navigateTo({
      url: `/pages/pet-detail/pet-detail?id=${currentPet.id}`,
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
    // 下拉刷新，重新获取数据
    this.getPetList();
    this.setData({
      currentIndex: 0
    });
    wx.stopPullDownRefresh();
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
    const currentPet = this.data.petList[this.data.currentIndex];
    return {
      title: `看看这只可爱的${currentPet.name}`,
      path: `/pages/pet-detail/pet-detail?id=${currentPet.id}`,
      imageUrl: currentPet.images[0]
    };
  }
})