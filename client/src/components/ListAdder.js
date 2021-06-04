import React, { useState } from "react";
import { faTrashAlt, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import console from "node:console";

function ListAdder(props) {
    const [fields, setFields] = useState(props.value);
    


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
    <table className="ListAdder">
     <button type="button" onClick={() => handleAdd()}>
        <FontAwesomeIcon icon={faPlusCircle} />
    </button>

    {props.value.map((name, id) => {
        console.log(name);
        console.log(id);
        return (
          <tr key={`${name}-${id}`}>
            <input
              type="text"
              placeholder="Enter text"
              value={name || "Add your " + props.type}
              onChange={(e) => handleChange(id, e)}
            />
            <input
              type="number"
              placeholder="€"
              value={name.value || 0}
            />
            <button type="button" onClick={() => handleRemove(id)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </tr>
        );
      })}
    </table>
  );
}
export default ListAdder;
