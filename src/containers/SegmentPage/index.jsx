import React, { Component } from "react";
import Button from "../../components/FormControls/Button";
import SegmentPopup from "../../components/SegmentPopup";
import "./SegmentPage.scss";

class SegmentPage extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
  }
  initialState() {
    return {
      popup: false,
      showDropdown: true,
      fields: {
        segment_Name: "",
        schema: [],
      },
    };
  }

  handlePopup = (bool) => {
    this.setState({
      popup: bool,
    });
  };

  handleFieldsChange = (e) => {
    let { fields } = this.state;
    fields.segment_Name = e.target.value;
    this.setState({ fields });
  };

  setSchema = (name, areas) => {
    this.setState({ fields: { ...this.state.fields, [name]: areas } });
  };

  handleSubmit = () => {
    let { fields } = this.state;
    fetch("https://webhook.site/acaa6c43-dfe7-45df-9b46-c3dbd602ada9", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(fields),
    });
    this.setState({ ...this.initialState() });
    window.location.reload(false);
  };

  render() {
    const { popup, fields } = this.state;
    return (
      <div className="main-body container">
        <SegmentPopup
          show={popup}
          handlePopup={() => this.handlePopup(false)}
          handleFieldsChange={this.handleFieldsChange}
          fields={fields}
          addSchema={this.addSchema}
          setSchema={this.setSchema}
          handleSubmit={this.handleSubmit}
        />
        <div className="segment-flex">
          <Button
            className="btn-green"
            onClick={() => this.handlePopup(true)}
            type="button"
          >
            Save segment
          </Button>
        </div>
      </div>
    );
  }
}
export default SegmentPage;
