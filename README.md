# 带签到功能的移动端日历
### 示例

 [![demo](https://github.com/Arguiwu/calendar/blob/master/img/demo.png)]()

 ### 使用
 ```
   Calendar.init("2017-03-29"); 	(设置当前日期)

   var data = [1,2,3,4,8,11,28]; 	(当月已签到的日期)

   //将渲染好的DOM插入指定元素
   document.getElementById('box').innerHTML = Calendar.getCalendar();

 ```