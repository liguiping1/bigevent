$(function(){
    getUserInfo()

    var layer = layui.layer

    $('#btnLogout').on('click', function () {
        
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            
            console.log('ok')
            // 1.清空本地存储中的token
            localStorage.removeItem('token')
            // 2.重新跳转登录页
            location.href = '/login.html'
            // 3.关闭confirm 提示框
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token' || '')
        // },
        success: function (res) {
            // console.log(res)e
            if(res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        },
        // 不论成功失败最终都会调用complete回调函数
        // complete: function (res) {
        //     console.log(res)
        //     // // 在complete 回调函数总，可以使用 responseJSON 拿到服务器返回来的数据
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1. 强制清空token
        //         localStorage.removeItem('token')
        //         // 2. 强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
        
    })
}

// 渲染用户的头像
function renderAvatar(user) {
    // 1. 获取用户的名称
    var name = user.nickname || user.username
    // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3.渲染用户的头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}