import React from 'react'

const Dropdown = props => {
  return (
    <div className="field">
      <label className="label">{props.subject}</label>
      <div className="control">
        <div className="select">
          <select onChange={props.handleDropChange}>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
      </div>
    </div>

  )
};

export default Dropdown;