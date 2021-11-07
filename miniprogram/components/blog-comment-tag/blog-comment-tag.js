Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: { 


    comments:Object

  },
  data:{
    initTreeData:[],
  },
  
  observers: {
    'comments': function(comments) {
       const that = this;
       let tree = []
       comments.forEach(e => {
          if( e.children && e.children.length > 0){
            that.transferData(e,e.children,e.author)
          }
          tree.push(e);
       })
       that.setData({
         initTreeData:tree
       })
     }
  },
  methods: { 
    init(){
      console.log(this.data.initTreeData)
    },
    transferData(e,children,pName){
      const that = this;
      if(!e.childrenWithParent){
        e.childrenWithParent = [];
      }
      children.forEach(e1 => {
        if(e1.children && e1.children.length > 0){
          that.transferData(e,e1.children,e1.author)
        }
        e1.pAuthor = pName;
        e.childrenWithParent.push(e1)
      })
    },
    onComment(e){
      var myEventDetail = e.currentTarget.dataset // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('comment', myEventDetail, myEventOption)
    }
  }
})