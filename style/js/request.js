
var httpAddress='https://www.tiantianboke.com/';
var url=httpAddress+'api/';
function doBeforeSend(xhr)
{
    var token=localStorage.getItem('token');
    xhr.setRequestHeader('Authorization', 'Bearer ' + token); 
    // xhr.setRequestHeader('requestIp',returnCitySN["cip"]);  
    // xhr.setRequestHeader('requestAddress',returnCitySN["cid"]); 
}
function doComplete(xhr)
{
    var resfrshToken=xhr.getResponseHeader('refreshToken');
    if (resfrshToken!=null&&resfrshToken!='isExpires') {
        localStorage.setItem("token",resfrshToken );
    } 
    else
    {
        localStorage.removeItem('token') ;
    }
}
layui.use('layer',function(){
    var layer=layui.layer;
    $.ajaxSetup({
        cache:false,
        beforeSend: function (xhr) {
            doBeforeSend(xhr);
        },
        error:function(request){
            layer.msg('响应服务器失败', {
                icon: 7
            });
        },
        complete: function (xhr) {
            doComplete(xhr);
        }
    });
})
