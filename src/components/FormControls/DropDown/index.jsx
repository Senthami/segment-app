import React, { Component } from "react";
import "./Dropdown.scss";

const segments = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

const initialState = {
  showDD: false,
  dataToView: [],
  selectedValues: [],
  selectedValueObject: [],
};

// Class to retrive country code list with search
class Dropdown extends Component {
  state = JSON.parse(JSON.stringify(initialState));

  myRef = React.createRef();

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  componentDidUpdate(nextProps) {
    // remove on clearing form
    if (this.props.value !== nextProps.value && this.props.value === "") {
      this.setState({ ...JSON.parse(JSON.stringify(initialState)) });
    }
  }

  handleClickOutside = (e) => {
    if (!this.myRef.current.contains(e.target)) {
      this.setState({ showDD: false });
    }
  };

  toggleDD = () =>
    this.setState({
      showDD: !this.state.showDD,
      dataToView: [],
    });

  addItem = (c) => {
    const { onChange, name, removeSchema } = this.props;
    let { selectedValues, selectedValueObject } = this.state;

    // check and feed value
    if (selectedValues.indexOf(c.label) === -1) {
      selectedValueObject.push({ [c.value]: c.label });
      selectedValues.push(c.label);
    }
    onChange(name, selectedValueObject);
    removeSchema();
    this.setState({ selectedValues, selectedValueObject });
  };

  handleCheckboxChange = (e, obj) => {
    this.addItem(obj);
  };

  render() {
    let { showDD, dataToView, selectedValueObject, selectedValues } =
      this.state;
    const { name, value, showDropdown } = this.props;
    dataToView = dataToView.length ? dataToView : segments;
    return (
      <>
        {selectedValueObject.map((v) => (
          <div className="oa-dropdown mb-3">
            <div className="btn-oa">{Object.values(v)[0]}</div>
          </div>
        ))}
        {showDropdown && (
          <div ref={this.myRef} className="oa-dropdown">
            <input type="hidden" name={name} value={value} />
            <div
              className={`btn-oa ${showDD ? "bor-ylw" : ""}`}
              onClick={this.toggleDD}
            >
              Add schema in segment
            </div>
            <div className={`oa-menu ${showDD ? "showDD" : "hideDD"}`}>
              <div className="oa-dropdown-list">
                {dataToView &&
                  dataToView.map((c, i) =>
                    !selectedValues.includes(c.label) ? (
                      <label htmlFor={`segment${i}`} className="segment-label">
                        {c.label}
                        <input
                          id={`segment${i}`}
                          type="checkbox"
                          onChange={(e) => this.handleCheckboxChange(e, c)}
                          checked={selectedValues.includes(c.label)}
                        />
                        <span className="segment-check"></span>
                      </label>
                    ) : (
                      ""
                    )
                  )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Dropdown;
