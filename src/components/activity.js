import React from "react";

function Activity(props) {
  console.log(props);
  return (
    <div className="acitvites">
      {props.activities.map((activity, i) => {
        return (
          <div key={i} className="activity flex">
            <div className="flex fs-20 fw-600 title justify-center align-center width-30">
              {activity.name}
              <br></br>
              <span className="month-name margin-5px white fs-12 padding-5px">
                {props.handleCurrent().month}
              </span>
            </div>
            <div className="flex width-70 days">
              {activity.days.map((day) => {
                return (
                  <button
                    onClick={() => {
                      props.handleDone(day.id, activity.name);
                    }}
                    className={`button flex align-center justify-center ${
                      day.isDone ? "active" : ""
                    }`}
                    key={day.id}
                    id={day.id}
                  >
                    {day.id}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => {
                props.handleDelete(activity.name);
              }}
              className="cross flex justify-center align-center"
            >
              x
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Activity;
