import React, { useState } from "react";
import ReactDOM from "react-dom";
import { faTrashAlt, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ListAdder() {
  const [fields, setFields] = useState([{ value: null }]);

  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
  }

  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }

  return (
    <div className="ListAdder">
     

      {fields.map((field, idx) => {
        return (
          <div key={`${field}-${idx}`}>
            <input
              type="text"
              placeholder="Enter text"
              value={field.value || ""}
              onChange={(e) => handleChange(idx, e)}
            />
            <button type="button" onClick={() => handleAdd()}>
              <FontAwesomeIcon icon={faPlusCircle} />
            </button>
            <button type="button" onClick={() => handleRemove(idx)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
export default ListAdder;
