$(function () {
    /*轮播图，动态加载图片*/
    slider();

    /*产品区块标题*/
    mTab();
});

var slider = function () {
    //模拟一组数据
    var data = [
        {
            pcUrl:'images/slide_01_2000x410.jpg',
            mUrl:'images/slide_01_640x340.jpg'
        },
        {
            pcUrl:'images/slide_02_2000x410.jpg',
            mUrl:'images/slide_02_640x340.jpg'
        },
        {
            pcUrl:'images/slide_03_2000x410.jpg',
            mUrl:'images/slide_03_640x340.jpg'
        },
        {
            pcUrl:'images/slide_04_2000x410.jpg',
            mUrl:'images/slide_04_640x340.jpg'
        }
    ];


    /*利用template模板引擎*/
    //渲染页面
    var render = function () {
        //定义圆点模板
        //获取模板内容
        var pointHtml = $("#point_template").html();
        //将模板内容转换成模板函数
        var pointFunc = _.template(pointHtml);//返回值是一个函数
        //将数据添加至模板函数中，转换成html字符串
        var pointContent = pointFunc({list:data});
        //渲染到页面
        $(".carousel-indicators").html(pointContent);


        //判断是否是移动端
        var screenWidth = $(window).width();
        var isM = screenWidth < 768 ? true : false;
        //定义图片模板
        var imgHtml = $("#img_template").html();
        var imgFunc = _.template(imgHtml);
        var imgContent = imgFunc({map:data,isM:isM});
        $(".carousel-inner").html(imgContent);
    };

    //浏览器尺寸改变触发该事件
    $(window).on('resize', function () {
        render();
    }).trigger('resize');//主动触发该事件来执行回调函数

    //轮播图滑动
    var startX = 0;
    var moveX = 0;
    var distance = 0;
    var isMove = false;

    $(".wjs_slider").on("touchstart", function (e) {
        startX = e.originalEvent.touches[0].clientX;
    }).on("touchmove", function (e) {
        moveX = e.originalEvent.touches[0].clientX;
        distance = moveX - startX;
        isMove = true;
    }).on("touchend", function (e) {
        if(isMove&&Math.abs(distance) > 50){
            if(distance > 0){
                /*初始化*/
                //右滑
                $("[class='carousel slide']").carousel("prev");
            }else{
                //左滑
                $("[class='carousel slide']").carousel("next");
            }
        }
        //重置参数
        startX = 0;
        moveX = 0;
        distance = 0;
        isMove = false;
    });

};
var mTab = function () {
    var $tab = $(".wjs_product .nav-tabs");
    var $lists = $tab.find("li");
    var ulWidth = 0;

    $lists.each(function (index, item) {
        ulWidth += $(item).width();
        console.log(ulWidth);
    });
    //console.log(ulWidth);
    $tab.width(ulWidth);

    /*tab滑动*/
    itcast.iScroll({
        swipeDom:$('.wjs_tab_box')[0],
        swipeType:'x',
        swipeDistance:50
    });
};