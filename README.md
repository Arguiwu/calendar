# 带签到功能的移动端日历
### 示例

 [![demo](https://github.com/Arguiwu/calendar/blob/master/img/demo.png)]()

 ### 使用
 ```
   var Calendar = new Calendar('box', {		// box 容器ID
   	curDate: new Date(),					// 当前日期
   	getNextMonthArr: function() {			// 下一月签到时间
   		return [1,2,6,8]
   	},
   	getPrevMonthArr: function() {			// 上一月签到时间
   		return [1,5,9,11,25]
   	}
   });
   Calendar.init([1,3,5]);					// 当月签到时间

   Calendar.getCalendarTime()  				// 获取当前年月日

 ```