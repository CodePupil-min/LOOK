function init(){
    //用cookie更新状态表
    function readCookie(){
        let str=document.cookie.split("=");
        state=Array.from(str[1]);
    }
    //用状态表写cookie
    function writeCookie(){
        let str=state.join('');
        str='setting='+str+';expires=Sat, 20 Nov 2286 17:46:39 GMT';
        document.cookie=str;
    }
    //删除cookie
    function removeCookie(){
        str='setting=1;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie=str;
    }
    //更新状态表
    function updateState(index,value){
        state[index]=value;
    }
    function getState(index){
        return state[index];
    }
    if(document.cookie==''){
        writeCookie();
    }
    //同步状态表
    readCookie();
}