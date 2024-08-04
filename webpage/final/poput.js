function poputMove(poputOBJ) {
    // 实现默认值的需求
    poputOBJ = {
        ...{
            title: '标题',
            body: '内容',
            // 取消
            cancel: function () {
                close()
                console.log('cancel');
            },
            // 确认 
            confirm: function () {
                close()
                console.log('confirm');
            },
        }, ...poputOBJ
    }

    // 渲染弹框
    let poputBox = createDOM({
        el: 'div',
        className: 'poput-box',
        elChildren: [
            {
                el: 'div', className: 'poput-content',
                elChildren: [
                    {
                        el: 'div',
                        className: 'title',
                        innerText: poputOBJ.title
                    }, {
                        el: 'div',
                        className: 'body',
                        innerHTML: poputOBJ.body
                    }, {
                        el: 'div',
                        className: 'btn-box',
                        elChildren: [
                            { el: 'button', innerText: '取消', onclick: () => { poputOBJ.cancel() } },
                            { el: 'button', innerText: '确认', onclick: () => { poputOBJ.confirm() } }
                        ]
                    },
                ]
            },
            { el: 'div', className: 'cover' }
        ]
    }, document.body);

    // 渲染弹框样式
    let style = document.createElement('style');
    style.innerHTML = `body {
     position: relative;
    min-height: 100vh;
    background-color: #fff;
}

.poput-box {
    position: relative;
    user-select: none;
}

.poput-box .cover {
    position: relative;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .5);
}

.poput-box .poput-content {
    position: relative;
    width: 300px;
    min-height: 200px;
    background-color: #fff;
    border-radius: 15px;
    position: fixed;
    z-index: 999;
    padding: 20px 30px;
}
.poput-box .poput-content img {
     position: relative;
    width: 100%;
}

.poput-box .poput-content .title {
    position: relative;
    text-align: center;
    font-size: 25px;
    font-weight: 700;
}

.poput-box .poput-content .body {
     position: relative;
    min-height: 100px;
    padding: 20px 0;
}

.poput-box .poput-content .btn-box {
     position: relative;
    display: flex;
    justify-content: space-between;
}

.poput-box .poput-content .btn-box button {
     position: relative;
    width: 100px;
    font-size: 15px;
    }`;
    document.head.appendChild(style);

    // 弹框的交互
    // 监听 变化
    class Move {
        constructor(moveBox) {
            this.moverBTime;
            this.moveBox = moveBox;
            this._left = 30;
            this._top = 0;
        }
        // 监听
        get left() {
            return this._left;
        }
        set left(val) {
            this.moverB();
            this._left = val;
        }
        get top() {
            return this._top;
        }
        set top(val) {
            this.moverB();
            this._top = val;
        }
        moverB() {
            clearTimeout(this.moverBTime);
            this.moverBTime = setTimeout(() => {
                this.moveBox.style.left = `${this.left}px`
                this.moveBox.style.top = `${this.top}px`
            }, 10);
        }
    }
    let poput = document.querySelector('.poput-content');
    let m = new Move(poput);
    poput.style.left = `calc(50% - ${poput.clientWidth / 2}px)`;
    poput.style.top = `30%`;
    poput.onmousedown = function (e) { // event
        if (e.target.className != "poput-content") return;
        let lx = null, ly = null;
        document.body.onmousemove = function (e) {
            if (!lx && !ly) {
                lx = e.layerX;
                ly = e.layerY;
            }
            m.left = e.clientX - lx;
            m.top = e.clientY - ly;
        }
    }
    poput.onmouseup = function () {
        document.body.onmousemove = null;
    }

    // 构建DOM的函数
    function createDOM(DOMOBJ, root) {
        let d = document.createElement(DOMOBJ.el);
        for (const key in DOMOBJ) {
            d[key] = DOMOBJ[key];
        }
        for (const key in DOMOBJ.style) {
            d.style[key] = DOMOBJ.style[key];
        }
        if (DOMOBJ.elChildren && typeof (DOMOBJ.elChildren) == 'object') {
            if (Array.isArray(DOMOBJ.elChildren)) {
                DOMOBJ.elChildren.forEach(element => {
                    createDOM(element, d);
                });
            } else {
                createDOM(DOMOBJ.elChildren, d);
            }
        } else {
            DOMOBJ.elChildren && console.error('注意数据格式，别瞎传`DOMOBJ.elChildren`属性。');
        }
        if (root) {
            root.appendChild(d);
        }
        return d;
    }

    // 页面关闭方法
    function close() {
        document.body.removeChild(poputBox);
    }

    return {
        close: close
    }
}