import React, { useState, Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import Nav from '../components/Nav';
import Axios from 'axios';
// import "./CalendarStyles.css";

const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1",
    overflow: "hidden"
  }
};

class CalendarPage extends Component {

  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.startDate = new Date().toISOString().substring(0, 10);
    this.state = {
      viewType: "Week",
      durationBarVisible: false,
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: async args => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
        dp.clearSelection();
        if (!modal.result) { return; }
        dp.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result
        });
        Axios.post('http://localhost:3100/addEvent', {
          userId: this.props.userInfo.userId,
          start: args.start,
          end: args.end,
          text: modal.result,
          backColor: "#6aa84f"
        }).then(() => {
          Axios.get(`http://localhost:3100/getEvents/${'jlJKa2YGEabg0BlccyBMGpk9rI82'}`).then((response) => {
            this.calendar.update({events: response.data, startDate: new Date().toISOString().substring(0, 10)})
          })
        })
      },
      eventDeleteHandling: "Update",
      onEventClick: async args => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
        if (!modal.result) { return; }
        const e = args.e;
        e.data.text = modal.result;
        dp.events.update(e);
      },
    };
  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  componentDidMount() {
    Axios.get(`http://localhost:3100/getEvents/${'jlJKa2YGEabg0BlccyBMGpk9rI82'}`).then((response) => {
      this.calendar.update({events: response.data, startDate: new Date().toISOString().substring(0, 10)})
    })
    let elems = document.getElementsByClassName("nav__section")
    Array.from(elems).forEach(elem => elem.style.color = "var(--opaqueWhite)")
    document.querySelector(".nav__section--Calendar").style.color = "var(--light)"
  }

  render() {
    return (
        <div id="calendar">
            <Nav user={this.props.user} userInfo={this.props.userInfo} />
            <div className="calendar__container">
                <h1>My Calendar</h1>
                <div style={styles.wrap}>
                    <div style={styles.left}>
                    <DayPilotNavigator
                        selectMode={"week"}
                        showMonths={3}
                        skipMonths={3}
                        startDate={"2023-03-07"}
                        selectionDay={"2023-03-07"}
                        onTimeRangeSelected={ args => {
                        this.calendar.update({
                            startDate: args.day
                        });
                        }}
                    />
                    </div>
                    <div style={styles.main}>
                    <DayPilotCalendar
                        {...this.state}
                        ref={this.calendarRef}
                    />
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default CalendarPage;