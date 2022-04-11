import React, { useRef, useEffect, useState } from "react";
import TextInput from "../FormControls/TextInput";
import Dropdown from "../FormControls/DropDown";
import Button from "../FormControls/Button";
import "./SegmentPopup.scss";

const SegmentPopup = ({
  show,
  setSchema,
  fields,
  handleFieldsChange,
  handleSubmit,
  handlePopup,
}) => {
  const [showDropdown, handleDropdown] = useState(true);
  const addSchema = () => {
    handleDropdown(true);
  };
  const removeSchema = () => {
    handleDropdown(false);
  };

  return (
    <div className={`modal${show ? " d-block" : " d-none"}`}>
      <section className="modal-main">
        <div className="modal-content">
          <div className="saving-seg">Saving Segment</div>
          <div className="container">
            <div className="segment">
              <div className="segment-inp">
                <p>Enter the Name of the Segment</p>
                <TextInput
                  name="segment_Name"
                  value={fields.segment_Name}
                  onChange={handleFieldsChange}
                  placeholder="Name of the Segment"
                  maxLength="35"
                />
                <p>
                  To Save your segment, you need to add the schemas to build the
                  query
                </p>
              </div>
              <div className="segment-dropdown">
                <Dropdown
                  onChange={setSchema}
                  name="schema"
                  value={fields.schema}
                  removeSchema={removeSchema}
                  showDropdown={showDropdown}
                />
              </div>
              {fields.schema.length === 6 ? (
                ""
              ) : (
                <Button
                  disabled={showDropdown}
                  onClick={addSchema}
                  type="button"
                  className="btn-add"
                >
                  + Add new schema
                </Button>
              )}
            </div>
          </div>
          <div className="btn-fixed">
            <Button
              disabled={!fields.segment_Name || fields.schema.length < 1}
              onClick={handleSubmit}
              type="button"
              className="btn-green"
            >
              Save the Segment
            </Button>
            <Button onClick={handlePopup} type="button" className="btn-white">
              Cancel
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SegmentPopup;
