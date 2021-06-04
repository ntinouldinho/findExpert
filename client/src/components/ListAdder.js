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
  // console.log(props.value)
  {Object.keys(props.value).map((e, i) => {
      // console.log(e)
      // console.log(props.value[e])
  })}
  return (
    <table className="ListAdder">
      <thead>
        <tr>
          <th>Service</th>
          <th>Price</th>
          <th>
            <button type="button" onClick={() => handleAdd()}>
              <FontAwesomeIcon icon={faPlusCircle} />
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(props.value).map((e, i) => {
          <tr>
            <td>123</td>
            <td>123</td>
            <td>
              <button type="button" onClick={() => handleRemove(i)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </td>
          </tr>
        })}
      </tbody>
    </table>
  );

  //     {props.value.map((name, id) => {
  //       console.log(name);
  //       console.log(id);
  //       return (
  //         <tr key={`${name}-${id}`}>
  //           <input
  //             type="text"
  //             placeholder="Enter text"
  //             value={name || "Add your " + props.type}
  //             onChange={(e) => handleChange(id, e)}
  //           />
  //           <input type="number" placeholder="€" value={name.value || 0} />
  //           <button type="button" onClick={() => handleRemove(id)}>
  //             <FontAwesomeIcon icon={faTrashAlt} />
  //           </button>
  //         </tr>
  //       );
  //     })}
  //
  // );
}
export default ListAdder;
