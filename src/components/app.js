import React from "react";
import Header from "./header";
import Activity from "./activity";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      activities: [],
    };
  }

  componentDidMount() {
    if (localStorage.activities) {
      this.setState({
        activities: JSON.parse(localStorage.activities) || [],
      });
    }
    window.addEventListener("beforeunload", this.localStorage);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.localStorage);
  }

  handleCurrent = () => {
    const date = new Date();
    var days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    var currentMonth = new Date().getMonth() + 1;
    var month = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCOTBER",
      "NOVEMBER",
      "DECEMBER",
    ];
    var current = {
      days: days,
      month: month[currentMonth],
    };
    return current;
  };

  handleDelete = (activity) => {
    this.setState({
      activities: this.state.activities.filter((a) => a.name !== activity),
    });
  };

  handleDone = (dayId, activityName) => {
    const final = this.state.activities.map((activity) => {
      if (activity.name === activityName) {
        activity.days.map((day) => {
          if (day.id == dayId) {
            return { ...day, isDone: !day.isDone };
          }
          return day;
        });
      }
      return activity;
    });
    this.setState({
      activities: final,
    });
  };

  addActivity = (activityName, days = this.handleCurrent) => {
    if (
      this.state.activities.find((activityy) => activityy.name === activityName)
    ) {
      return alert("already added activity");
    }
    var arr = [];
    for (let i = 1; i < days().days + 1; i++) {
      arr.push({
        id: i,
        isDone: false,
      });
    }
    var object = {
      name: activityName,
      days: arr,
    };
    this.setState((prevState) => ({
      activity: [...prevState.activity, object],
    }));
  };
  localStorage = () => {
    localStorage.setItem("activities", JSON.stringify(this.state.activities));
  };

  render() {
    return [
      <Header addActivity={this.addActivity} />,
      <Activity
        thisState={this.state}
        handleCurrent={this.handleCurrent}
        handleDone={this.handleDone}
        handleDelete={this.handleDelete}
        handleData={this.handleData}
      />,
    ];
  }
}

export default App;
