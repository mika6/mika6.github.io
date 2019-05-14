class Tabs {
    constructor(options){
        let defaultSettings = {
            tabs:'',
            tabsNav:'',
            tabsDetail: '',
            activeClassName: 'active'
        }
        this.options = Object.assign({}, defaultSettings, options)
        this.checkOptions().bindEvent().setDefault()
    }
    // 检查参数是否完整
    checkOptions(){
        if(!this.options.tabs || !this.options.tabsNav || !this.options.tabsDetail){
            throw new Error('options are not complete!')
        }
        return this
    }
    // 绑定事件
    bindEvent(){
        let childrenNav=this.options.tabsNav.children
        let childrenDetail=this.options.tabsDetail.children
        for(let i=0,len=childrenNav.length; i<len; i++){
            utils.addEvent(childrenNav[i],'click',()=>{
                utils.addUniqueClass(childrenNav[i], this.options.activeClassName)
                utils.addUniqueClass(childrenDetail[i], this.options.activeClassName)
            },false)
        }
        
        return this
    }
    // 设置默认选中
    setDefault(){
        this.options.tabsNav.children[0].click()
        return this
    }
    
}