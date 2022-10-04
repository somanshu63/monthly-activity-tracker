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
    window.addEventListener("beforeunload", this.handleLocalStorage);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.handleLocalStorage);
  }

  handleCurrent = () => {
    const date = new Date();
    let days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    let currentMonth = new Date().getMonth() + 1;
    let month = [
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
    let current = {
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
          if (day.id === dayId) {
            day.isDone = !day.isDone;
            return day;
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
    let arr = [];
    for (let i = 1; i < days().days + 1; i++) {
      arr.push({
        id: i,
        isDone: false,
      });
    }
    let object = {
      name: activityName,
      days: arr,
    };
    this.setState((prevState) => ({
      activities: [...prevState.activities, object],
    }));
  };
  handleLocalStorage = () => {
    localStorage.setItem("activities", JSON.stringify(this.state.activities));
  };

  render() {
    return [
      <Header addActivity={this.addActivity} />,
      <Activity
        activities={this.state.activities}
        handleCurrent={this.handleCurrent}
        handleDone={this.handleDone}
        handleDelete={this.handleDelete}
        handleData={this.handleData}
      />,
    ];
  }
}

export default App;
