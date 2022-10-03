import React from "react";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
  }
  render() {
    return (
      <div className="app">
        <h1 className="text-center fw-700 margin-2 text-cap fs-28 blue">
          monthly activity tracker
        </h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            this.props.addActivity(this.state.input);
            this.setState({
              input: "",
            });
          }}
        >
          <div className="flex justify-center margin-2">
            <input
              type="text"
              id="activity"
              name="activity"
              placeholder=" eg. coding"
              className="fs-16 form-control"
              value={this.state.input}
              onChange={(event) => {
                this.setState({
                  input: event.target.value,
                });
              }}
            ></input>
            <button type="submit" className="fs-16 text-cap white nobtn btn">
              Add activity
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default Header;
