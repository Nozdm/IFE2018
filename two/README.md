# css学院任务简要笔记

预览地址 

| 预览地址                                                     | 预览地址                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [任务一](https://sanshiliuxiao.github.io/IFE2018/two/1.html) | [任务二](https://sanshiliuxiao.github.io/IFE2018/two/2.html) |
| [任务三](https://sanshiliuxiao.github.io/IFE2018/two/2.html) | [任务四](https://sanshiliuxiao.github.io/IFE2018/two/4.html) |
| [任务五](https://sanshiliuxiao.github.io/IFE2018/two/1.html) | [任务六](https://sanshiliuxiao.github.io/IFE2018/two/1.html) |
| [任务七](https://sanshiliuxiao.github.io/IFE2018/two/1.html) | 任务八（暂没做）                                             |



## 1、简单菜单动画效果

`html`

当时想到的是添加为`p`标签上添加一个伪类，后来发现伪类元素无法使用`js`进行选取，所以添加了一个`span`标签。

```
  <div class="layout">
    <div class="main">
        <p>前端学院<span></span></p> 
    </div>
    <button>切换样式</button>
  </div>
```



`css`

既然是css学院，那自然是主要还是考察css，并且是考察css3里面的新的动画属性。

`transform` 属性是 2D/3D 变形（主要包括  rotate**、**skew**、**scale、translate、matrix。）， `transition`属性允许css的属性值在一定的时间区间内平滑地过渡。这种效果可以在鼠标单击、获得焦点、被点击或对元素任何改变中触发，并圆滑地以动画效果改变CSS的属性值。

```css
/*部分css*/
p{
  
  transition: color 2s;
}
span {
   transform: scale(0);
   transition: transform 2s;
}
```

`js`

监听`button` 的 `click` 事件， 因为是点第一次样式改变，点第二次，样式又变为原来的样子。

设置 一个 标志符， 通过它判断样式的变化情况

```javascript
 // 选择对应的dom节点。
 var flag = true;
 button.addEventListener('click', function(){
   if (flag){
     // 添加变化
     p.style.color = 'blue';
     span.style.transform = 'scale(1)';
     flag = false;
   } else {
     // 变回来
     p.style.color = 'black';
     span.style.transform = 'scale(0)';
     flag = true;
   }
 })
```

## 2、3 transform 和transition

任务2和任务3 ，`transform `属性的基本用法，穿插了一点 `transition`属性的用法。

理清楚， 三维坐标轴的概念，对应的`transform` 各个属性的作用，大致能明白。

## 4、卡片翻转

`html结构`

很显然，需要使用绝对定位，将其重合，接着`.back` 需要绕着Y轴旋转180度，翻到后面去。这就是初始情况了。

当鼠标放到 容器上的时候， 触发效果， 也就是，两张卡片同时绕Y轴旋转。

```
  <div class="main">
    <div class="front card"></div>
    <div class="back card"></div>
  </div>
```



`css`

```css
/*部分css*/
.card {
 	position: absolute;
}
.front {
  transform: rotateY(0deg);
  backface-visibility: hidden;
  transition: transform 1s;
}
.back {
  transform:  rotateY(180deg);
  backface-visibility: hidden;
  transition: transform 1s;
}
.main:hover .front {
  transform: rotateY(180deg);
}
.main:hover .back {
  transform: rotateY(0deg);
}
```

值得注意的地方，是 有一个 这样的属性 `backface-visibility` 顾名思义，背部可见性。 

如下假设 ，只有一张图片，且绕Y轴旋转180度。

`html`

```
<img src='imageUrl'> </img>
```

`css`

```
img {
	// 绕Y轴旋转180度
   transform: rotateY(180deg);
}
```

那么， 你将会发现，这幅图片是反着的（很好理解吧。就像一张透明的纸）。

如果 设置 `backface-visibility: hidden;` ， 就看不见图片了 （就像在透明的纸前面，又加了什么东西，给挡住了）



## 5、 正方体旋转效果

得益于 张旭鑫大佬的文章[CSS3 3D transform 详解](http://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/)。 真的令人印象深刻，通俗易懂，真的，真的，就是这篇行文的风格，可以说非常六了。

里面有提到，对于没有`rotateX`以及`rotateY`的元素，`translateZ`的功能就是让元素在自己的眼前或近或远。 

那么有`rotateX`和`rotateY`的元素呢， 其实也很简单，因为`translateZ`是表示距离Z轴的距离，当元素有`rotateX`或`rotateY`时，旋转后其自身的Z轴方向发生改变了（也就是其本身的坐标系发生变化了。）。

## 6、animation 做一个炫酷的Slider

每一次点击不同的图片，就根据动效标注发生改变。 很明显， 就是通过 js， 通过改变 `animation`的属性，进而改变每一次的动画效果。 而且动画效果只需要一次，然后停留在最后一个关键帧。其他的鼠标放在图片上变亮了，都是小细节，用伪元素就可以完成了。

`html`

使用了两个自定义的属性，用于存储第几章图片和动画过渡的时间。

```html
<div class="footer">
      <span><img src="url" alt="#" data-index='first' data-animation-time='0.5s'></span>
      <span><img src="url" alt="#" data-index='second' data-animation-time='0.5s'></span>
      <span><img src="url" alt="#" data-index='third' data-animation-time='1.0s'></span>
      <span><img src="url" alt="#" data-index='fourth' data-animation-time='1.0s'></span>
      <span><img src="url" alt="#" data-index='fifth' data-animation-time='0.7s'></span>
  </div>
```



`css`

利用伪元素`::before`为图片遮上一层阴影效果， 利用 `:hover` 伪元素触发效果。

 `@keyframes` 规则通过在动画序列中定义关键帧（或waypoints）的样式来控制*CSS*动画序列中的中间步骤 。

要与`animation`属性联用。

```
/*部分css*/
/*遮布效果*/
.footer span {
  display: inline-block;
  position: relative;
  cursor: pointer;
}
.footer span::before {
  content: '';
  display: block;
  background: rgba(0,0,0,0.6);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
}
.footer span:hover::before{
  background: rgba(0,0,0,0.2);
}
/*动画关键帧*/
@keyframes first {
  from {
    left: -100%;
  } to {
    left: 0;
  }
}
/*...*/
@keyframes fifth {
  from {
  	transform: scale(0.1) rotateZ(-360deg) ;
  } to {
  	transform: scale(1) rotateZ(0deg);
  }
}
```

`js`

监听`footer`元素，使用事件代理。 但因为存在遮布效果，导致了在点击图片的时候，得到的dom，并不是图片元素， 那么有两种方式去获取图片dom节点。

第一种， 为遮布元素添加css属性 ` pointer-events: none ` ， IE11+支持。

第二种，虽然是点击了遮布元素（因为是一个伪元素），那么他就会获取到它的父元素，在这里也就是`SPAN`，然后向下查找需要的图片元素即可。（选择了第二种，实际上是当时是根据打印得到的值，才想出这个方法。）

```javascript
    var footer = document.querySelector('.footer');
    var main = document.querySelector('.main');
     // var now = null;在写代码的时候，方便在控制台调试
    footer.addEventListener('click',function(e){
      console.log(e.target.nodeName) // 当前元素节点名
      if (e.target.nodeName == 'SPAN') {
        var img = e.target.querySelector('img');
        // now = img;
        var imgSrc =img.getAttribute('src');
        var index = img.dataset.index; // dataset 是一个包含data- 自定义属性的对象
        var time = img.dataset.animationTime; 
        main.style.backgroundImage = `url(${imgSrc})`; //es6的模版语法
        main.style.animation =`${index} ${time} 1 alternate forwards`;
      }
    })
```

## 7、登录框效果

主要是监听`.form__input` 的 `blur`焦点事件， 为其添加 一个名为`form--filled`的类， 而css部分的代码，

```css
.form__label__content {
    position: absolute;
    transform-origin: left top;
    transition: all 0.2s ease-in;
}
.form__input:focus ~ .form__label:after {
  width: 100%;
  transition: none;
}
.form__input:focus ~ .form__label .form__label__content,
.form--filled  ~ .form__label .form__label__content {
  transform: translateY(-20%) scale(.8);
}
```

这样就实现了，输入框获得焦点之后，标签的过渡效果。

接着使用`jquery` 和 `animate.css`， 去实现用户名和密码，输入完成后，按钮的动画效果

```javascript
if (!$('.form__input').not('.form--filled').length) {
	$('.form__wrapper__submit').addClass('animated');
}
```

## 8、AE动画转Web原生动画

没做 



