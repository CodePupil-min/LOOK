window.onload=function(){
    var PageSet={
        /*状态表
            0->搜索引擎:0 bing、1 baidu、2 google
            1->是否显示时间:0不显示、1显示
        */
        state:[0,1],
        //搜索引擎
        surl : "https://cn.bing.com/search?q=",   
        //更新状态表
        updateState:function(states){
            this.state=states;
        },
        //获取状态
        getState:function(index){
            return this.state[index];
        },
        //用cookie更新状态表
        readCookie:function(){
            let str=document.cookie.split("=");
            this.state=Array.from(str[1]).map(Number);
        },
        //用状态表写cookie
        writeCookie:function(){
            let str=this.state.join('');
            str='setting='+str+';expires=Sat, 20 Nov 2286 17:46:39 GMT';
            document.cookie=str;
        },
        //删除cookie
        removeCookie:function(){
            str='setting=1;expires=Thu, 01 Jan 1970 00:00:00 GMT';
            document.cookie=str;
        }
    };

    if(document.cookie==''){
        PageSet.writeCookie();
    }
    //同步状态表
    PageSet.readCookie();


    //设置鼠标点到搜索框里时的事件   
    document.getElementById("content").onfocus=function(){
        let content_box=document.getElementById("content");
        this.onkeydown=function(e){
            let content=content_box.value;
            if(e.key=="Enter") {
                window.location.href=search(PageSet.surl,content);
            }    
        }
        //设置搜索框所在的div的style
        document.getElementById("search").style="opacity:100%;transform: translateY(-30vh);";
    }

    // 清除鼠标点到搜索框里时的事件
    document.getElementById("content").onblur=function(){
        this.onkeydown = null;
        document.getElementById("search").style="opacity:40%;transform: translateY(0vh);"; 
    }
    
    //搜索按钮事件
    delTextChildNode(document.getElementById("search"))[1].onclick=function(){
        let content=document.getElementById("content").value;
        window.location.href=search(PageSet.surl,content);
    }
    //搜索
    function search(surl,value,mode){
        return surl+value;
    }

    //清除按钮点击的效果
    document.onclick=function(){
        menu_card.close();
        date_card.close();
        show_slist.close();
    }

    //menu
    var menu_card={
        button:delTextChildNode(document.getElementById('menu'))[0],
        card:delTextChildNode(document.getElementById('menu'))[1],
        state:0,
        close:function(){
            this.card.style="opacity: 0%;transform:scale(0,0);";
            this.state=0;
        },
        open:function(){
            this.card.style="opacity:100%;transform:scale(1,1);";
            this.state=1;
        }
    }
    document.getElementById("menu").onclick=function(event){
        event.stopPropagation();
        let path = event.path || (event.composedPath && event.composedPath());//兼容性
        //点到按钮
        if(path.includes(menu_card.button)){
            if(menu_card.state==1)menu_card.close();
            else menu_card.open();
        }
    }

    //date
    var date_card={
        button:delTextChildNode(document.getElementById('clock'))[0],
        card:delTextChildNode(document.getElementById('clock'))[1],
        state:0,
        close:function(){
            this.card.style="opacity: 0%;transform:scale(0,0);";
            this.state=0;
        },
        open:function(){
            this.card.style="opacity:100%;transform:scale(1,1);";
            this.state=1;
        }
    }
    document.getElementById("clock").onclick=function(event){
        event.stopPropagation();
        let path = event.path || (event.composedPath && event.composedPath());//兼容性
        //点到按钮
        if(path.includes(date_card.button)){
            if(date_card.state==1)date_card.close();
            else date_card.open();
        }
    }

    //开关时间
    var timer={
        button:document.getElementById("show_time"),
        control1:document.getElementById("show_time").getElementsByClassName('right')[0],//按键图标
        control2:document.getElementById("clock"),//时间
        state:PageSet.getState(1),
        init:function(){
            this.state==1?this.open():this.close();
        },
        close:function(){
            this.control1.innerHTML="<i class='bi bi-toggle-off'></i>";
            this.control2.style='visibility: hidden;'
            this.state=0;
        },
        open:function(){
            this.control1.innerHTML="<i class='bi bi-toggle-on'></i>";
            this.control2.style='visibility: visible;'
            this.state=1;
        }
    };
    timer.init();    
    document.getElementById("show_time").onclick=function(){
        timer.state==1?timer.close():timer.open();
    };   

    //搜索引擎
    var show_slist={
        button:delTextChildNode(document.getElementById("show_slist"))[0],
        control1:document.getElementById("show_slist").getElementsByClassName('right')[0],//按键图标
        control2:document.getElementById('slist'),//搜索方式列表
        state:0,
        close:function(){
            this.control1.innerHTML="<i class='bi bi-chevron-compact-down'></i>";
            this.control2.style='display:none';
            this.state=0;
        },
        open:function(){
            this.control1.innerHTML="<i class='bi bi-chevron-compact-up'></i>";
            this.control2.style='display:block';
            this.state=1;
        }
    };
    var search_mode={
        surls:["https://cn.bing.com/search?q=",
                "https://www.baidu.com/s?wd=",
                "https://www.google.com/search?q=",
                "https://s.weibo.com/weibo?q=",
                "https://quark.sm.cn/s?q=",],
        buttons:delTextChildNode(document.getElementById("slist")),
        state:PageSet.getState(0),
        init:function(){
            this.choose(this.state);
        },
        choose:function(i){
            for(let i=0;i<this.buttons.length;i++)
                this.buttons[i].style.color='black';
            this.buttons[i].style.color='blue';
            PageSet.surl=this.surls[i];
            this.state=i;
        },
    };
    search_mode.init();
    document.getElementById("show_slist").onclick=function(event){
        let path = event.path || (event.composedPath && event.composedPath());
        if(path.includes(show_slist.button)){
            show_slist.state==1?show_slist.close():show_slist.open();
        }
        for(let i=0;i<search_mode.buttons.length;i++){
            if(event.target==search_mode.buttons[i])
                search_mode.choose(i);
        }  
    }

    //保存配置
    var saver={
        button:document.getElementById("save"),
        control1:document.getElementById("save").getElementsByClassName('right')[0],//按键图标
        state:0,
        save:function(states){
            //样式部分
            this.control1.innerHTML="<i class='bi bi-check2-all'></i>";
            //逻辑部分
            PageSet.updateState(states);
            PageSet.writeCookie();
            this.state=0;
        },
    }    
    document.getElementById("save").onclick=function(){
        saver.save([search_mode.state,timer.state]);
    }

    //时钟
    printClock();
    window.setInterval(printClock,1000);
    function printClock(){
        let date=new Date();
        let t={
            'year':date.getFullYear(),
            'month':date.getMonth()+1,
            'day':date.getDate(),
            'hour':date.getHours(),
            'min':date.getMinutes(),
            'sec':date.getSeconds(),
            'dayW':date.getDay()
        }
        let clk1=delTextChildNode(document.getElementById('clock'))[0];
        clk1.innerHTML=pZ(t['hour'])+':'+pZ(t['min'])
        let clk2=delTextChildNode(document.getElementById('clock'))[1];
        clk2.innerHTML=t['year']+'.'+pZ(t['month'])+'.'+pZ(t['day'])+
                        ' '+pZ(t['hour'])+':'+pZ(t['min'])+':'+pZ(t['sec'])+
                        '<br> week'+t['dayW'];
        function pZ(num){
            return num>9?num:'0'+num;
        }
    }

    // 设置随机背景色
    // var bs=document.body.style;
    // setBodyColor(bs);
    // function setBodyColor(bs){
    //     let color1=randomColor();
    //     let color2=randomColor();
    //     let deg=Math.floor(Math.random()*360);
    //     bs.backgroundImage='linear-gradient('+deg+'deg,'+color1+','+color2+')';
    // }
    //返回随机颜色十六进制
    function randomColor(){
        let s='#';
        for(let i=0;i<6;i++){
            s=s+Math.floor(Math.random()*16).toString(16);
        }
        return s;
    }

    
    function delTextChildNode(element) {
        let bros=element.parentNode.childNodes;
        //找到自己本体
        let _elem=null;
        for(let i=0;i<bros.length;i++){
            if(bros[i]==element){
                _elem=bros[i];
                break;
            }
        }
        //删掉没用的
        let _child=_elem.childNodes;
        for (let i=0; i < _child.length; i++) {
            if (_child[i].nodeName === "#text") {
                _elem.removeChild(_elem.childNodes[i]);
            }
        }
        return _child;
    }


}

