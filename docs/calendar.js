(function(window) {

	var Calendar = function(id, options) {
		this.main = document.getElementById(id);
		this.options = options;

		this.today = new Date(options.curDate);
		this.year = this.today.getFullYear();
		this.month = this.today.getMonth() + 1;
		this.day = this.today.getDay();
		this.date = this.today.getDate();
	};

	Calendar.prototype.init = function(dayArr) {
		var me = this;
		me.main.innerHTML = me.getCalendar(dayArr);

		me.main.querySelector('#nextMonth').addEventListener('click', function(e) {
			me.nextMonth(me.options.getNextMonthArr());
		});
		me.main.querySelector('#prevMonth').addEventListener('click', function(e) {
			me.prevMonth(me.options.getPrevMonthArr());
		});
	};
	Calendar.prototype.getCalendarTime = function() {
		return this.year + '-' + this.month + '-' + this.day;
	};
	//判断是否是闰年
	Calendar.prototype.isLeap = function() {
		var year = this.year;
		if(year % 4 == 0 && year % 100 > 0) {
			return true;
		}else if(year % 400 == 0 && year % 3200 > 0) {
			return true;
		}else {
			return false;
		}
	};
	//判断一个月多少天
	Calendar.prototype.getLen = function() {
		var month = this.month;
		if(month == 2) {
			if(this.isLeap) {
				return 29;
			}else {
				return 28;
			}
		}else {
			if(month < 8) {
				if(month % 2 > 0) {
					return 31;
				}else {
					return 30;
				}
			}else {
				if(month % 2 > 0) {
					return 30;
				}else {
					return 31;
				}
			}
		}
	};
	Calendar.prototype.getCalendar = function(dayArr) {
		var len = this.getLen();
		var d = new Date(this.year, this.month - 1, 1);
		var dfw = d.getDay();
		var arr = new Array();
		var tem = 0;
		var str = "";
		for (var i = 0; i < 6; i++) {
			arr[i] = new Array();
			for (var j = 0; j < 7; j++) {
				tem++;
				if (tem - dfw > 0 && tem - dfw <= len) {
					arr[i][j] = tem - dfw;
				} else {
					arr[i][j] = "";
				}
			}
		}
		str += '<button class="month-less" id="prevMonth"></button><h4>'+this.year + '年' + this.month + '月'+ this.date + '日</h4><button class="month-add" id="nextMonth"></button>';
		str += '<table class="sign_tab" border="0px" cellpadding="0px" cellspacing="0px">';
		str += '<thread><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr></thread>';
		str += '<tbody>';
		for (var k = 0; k < 6; k++) {
			if (k == 5 && arr[k][0] == "")
				continue;
			str += '<tr>';
			for (var m = 0; m < arr[k].length; m++) {
				dayArr.contains = function(element) {
					for (var i = 0; i < this.length; i++) {
						if (element && this[i] == element) {
							return true;
						}
					}
					return false;
				}
				if(dayArr.contains(arr[k][m])){
					str += '<td class="red_tbg">' + arr[k][m] + '<span class="ui-state-default">已签</span>' + '</td>';
				}else{
					//判断是否是当日
					if(arr[k][m] == this.date){
						str += '<td class="cur_day">' + arr[k][m] + '</td>';
						continue;
					}
					if(arr[k][m] == ""){
						str += '<td class="over">' + arr[k][m] + '</td>';
						continue;
					}
					str += '<td>' + arr[k][m] + '</td>';
				}
			}
			str += '</tr>';
		}
		str += '</tbody>';
		str += '</table>';
		return str;
	};

	Calendar.prototype.nextMonth = function(dayArr) {
		if(this.month == 12) {
			this.year ++;
			this.month = 1;
		}else {
			this.month ++;
		};
		this.init(dayArr);
	};
	Calendar.prototype.prevMonth = function(dayArr) {
		if(this.month == 1) {
			this.year --;
			this.month = 12;
		}else {
			this.month --;
		}
		this.init(dayArr);
	};

	window.Calendar = Calendar;
})(window);