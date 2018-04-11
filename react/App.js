import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			today: new Date(),
			year: new Date().getFullYear(),
			month: new Date().getMonth() + 1,
			day: new Date().getDay(),
			date: new Date().getDate(),
			dateArr: [],
			checkin: [1, 3, 5, 7, 20]
		}
	}
	componentDidMount() {
		this.getCalendar()
	}
	isLeap() {
		const year = this.state.year
		if (year % 4 === 0 && year % 100 > 0) {
			return true
		} else if (year % 400 === 0 && year % 3200 > 0) {
			return true
		} else {
			return false
		}
	}
	getLen() {
		const month = this.state.month
		if (month === 2) {
			if (this.isLeap) {
				return 29
			} else {
				return 28
			}
		} else {
			if (month < 8) {
				if (month % 2 > 0) {
					return 31
				} else {
					return 30
				}
			} else {
				if (month % 2 > 0) {
					return 30
				} else {
					return 31
				}
			}
		}
	}
	getCalendarTime() {
		return this.state.year + "-" + this.state.month + "-" + this.state.date
	}
	getCalendar() {
		var len = this.getLen()
		var d = new Date(this.state.year, this.state.month - 1, 1)
		var dfw = d.getDay()
		var arr = []
		var tem = 0
		for (var i = 0; i < 6; i++) {
			arr[i] = []
			for (var j = 0; j < 7; j++) {
				tem++
				if (tem - dfw > 0 && tem - dfw <= len) {
					arr[i][j] = tem - dfw
				} else {
					arr[i][j] = ""
				}
			}
		}
		this.setState({
			dateArr: arr
		})
	}
	nextMonth() {
		if (this.state.month === 12) {
			this.setState({
				year: this.state.year + 1,
				month: 1
			}, () => {
				this.getCalendar()
			})
		} else {
			this.setState({
				month: this.state.month + 1
			}, () => {
				this.getCalendar()
			})
		}
	}
	prevMonth() {
		if (this.state.month === 1) {
			this.setState({
				year: this.state.year - 1,
				month: 12
			}, () => {
				this.getCalendar()
			})
		} else {
			this.setState({
				month: this.state.month - 1
			}, () => {
				this.getCalendar()
			})
		}
	}
	contains(arr) {
		if (
			arr[0] === "" &&
			arr[1] === "" &&
			arr[2] === "" &&
			arr[3] === "" &&
			arr[4] === "" &&
			arr[5] === "" &&
			arr[6] === ""
		) {
			return false
		} else {
			return true
		}
	}
	isCheck(index) {
		for (let i in this.state.checkin) {
			if (index === this.state.checkin[i]) {
				return true
			}
		}
		return false
	}
	render() {
		const items = []
		const dateArr = this.state.dateArr
		for(let i = 0; i < dateArr.length; i++) {
			const itemDate = dateArr[i]
			const tds = []
			for(let j = 0; j < itemDate.length; j++) {
				const data = itemDate[j]
				if(this.isCheck(data)) {
					tds.push(<td className={"ui-state-default" + (data === this.state.date ? "cur_day" : "")} key={"td" + j} />)
				}else {
					tds.push(<td className={data === this.state.date ? "cur_day" : ""} key={"td" + j}>{data}</td>)
				}
			}
			items.push(<tr key={'tr' + i}>{tds}</tr>)
		}
		return <div className="content-page uk-body">
				<div className="calendar">
					<button className="month-less" onClick={this.prevMonth.bind(this)} />
					<h4>
						{this.state.year}年{this.state.month}月{this.state.date}日
					</h4>
					<button className="month-add" onClick={this.nextMonth.bind(this)} />
					<table className="sign_tab" border="0px" cellPadding="0px" cellSpacing="0px">
						<thead>
							<tr>
								<th>日</th>
								<th>一</th>
								<th>二</th>
								<th>三</th>
								<th>四</th>
								<th>五</th>
								<th>六</th>
							</tr>
						</thead>
						<tbody>{items}</tbody>
					</table>
				</div>
			</div>
	}
}

export default App
