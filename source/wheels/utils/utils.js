let utils = {
    emitter: {
        // 注册事件
        on(event, fn) {
            let handles = this._handles || (this._handles = {})
            let calls = handles[event] || (handles[event] = [])
            // 将事件处理函数放入对应的事件的处理函数列表中
            calls.push(fn)

            return this
        },

        // 触发事件
        emit(event) {
            let args = [...arguments].sloce(1)
            let handles = this._handles
            let calls
            // 如果没有事件或没有事件处理函数
            if (!handles || !(calls = handles[event])) return this
            //触发全部对应事件
            for (let i = 0, len = calls.length; i < len; i++) {
                calls[i].apply(this, args)
            }

            return this
        },
        // 解绑事件
        off(event, fn) {
            if (!event || !this._handles) this._handles = {}
            if (!this._handles) return

            let handles = this._handles
            let calls
            // 事件存在
            if (calls = handles[event]) {
                // 没有传递fn,清除该事件的所有处理函数
                if (!fn) {
                    handles[event] = []
                    return this
                }
                for (let i = 0, len = calls.length; i < len; i++) {
                    if (fn === calls[i]) {
                        calls.splice(i, 1)
                        return this
                    }
                }
            }
            return this


        }
    },
    addEvent(el, eventType, handler, option) {
        option = option || false
        if (el.addEventListener) {
            el.addEventListener(eventType, handler, option)
        } else if (el.attachEvent) {
            el.attachEvent('on' + eventType, handler)
        } else {
            el["on" + eventType] = handler
        }
    },
    removeEvent(el, eventType, handler, option) {
        option = option || false
        if (el.addEventListener) {
            el.removeEventListener(eventType, handler, option)
        } else if (el.detachEvent) {
            el.detachEvent("on" + type, handler)
        } else {
            el["on" + type] = null
        }
    },
    addUniqueClass(el, className){
        let children = el.parentNode.children
        // 删除所有兄弟元素和自己的类名
        for(let i = 0, len = children.length; i < len; i++){
            children[i].classList.remove(className)
        }
        // 给自己添加类名
        el.classList.add(className)
        return el
    }
}
