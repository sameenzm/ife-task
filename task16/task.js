/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 监听"添加按钮"的点击事件
 * 从用户输入中获取数据，对数据进行有效性验证，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var cityReg = /^[\u4e00-\u9fa5aa-zA-Z]+$/; 
  var qltReg = /^[\d]+$/;
  var btn = document.getElementById('add-btn');
  var tip = document.getElementById('tip');
  btn.onclick = function() {
    var city = document.getElementById('aqi-city-input').value;
    var quality = document.getElementById('aqi-value-input').value;
    if(!cityReg.test(city)){
      tip.innerHTML = '<span style="color: red">输入有误，请输入中文或者英文字母</span>';
      document.getElementById('aqi-city-input').value = '';
      return;
    }
    if(!qltReg.test(quality)){
      tip.innerHTML = '<span style="color: red">输入有误，请输入一个合法的正整数</span>';
      document.getElementById('aqi-value-input').value = '';
      return;
    }
    tip.innerHTML = '';
    aqiData[city] = quality;
    document.getElementById('aqi-city-input').value = '';
    document.getElementById('aqi-value-input').value = '';
    renderAqiList();
  }
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var html = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
  for(var i in aqiData) {
    if(aqiData.hasOwnProperty(i)){
      html += '<tr><td>'+ i +'</td><td>'+ aqiData[i] +'</td><td><button data-city="'+ i +'">删除</button></td></tr>';
    }
  }
  document.getElementById('aqi-table').innerHTML = html;
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  delete aqiData[city];
  renderAqiList();
}

function init() {

  addAqiData();
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var del = document.getElementById('aqi-table');
  del.addEventListener('click', function(e) {
    (e.target.nodeName.toLowerCase() === 'button') && delBtnHandle.call(this, e.target.dataset.city);
  })
}

init();

/* 
 * 知识点总结：
 * 1、正则 - 中文：/^[\u4e00-\u9fa5a]+$/
 * 2、正则 - test()的使用 - 匹配模式.test(要匹配的东东)
 * 3、使用 hasOwnProperty() 方法可以检测一个属性是存在于实例中，还是存在于原型中，可以排除掉原型方法
 * 4、触发事件：可以btn.onclick = function(){};也可以btn.addEventListener('click',function(){},false);  false:决定不冒泡;IE:btn.attachEvent('onclick',function(){});
 *5、删除按钮是用js后面渲染上去的，so，它是未来元素，那么要抓取它，就需要用到事件冒泡（事件代理/事件委托）。在删除按钮的外面找一个实际存在的元素，绑定事件，然后用event.target可以找到最终事件的目标元素。nodeName可以知道这个元素的名字。不过这里是大写的BUTTON，so我们要用toLowerCase方法转小写。[相反： toUpperCase()]
 *6、第48行代码处：data-city,可以通过data-xxx来把某个值传出来。外面可以用e.target.dataset.xxx接收
 *7、call()方法可以调用函数。call(作用域,参数1,参数2);
 *
 */