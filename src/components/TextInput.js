import React from 'react'

const TextInput = props => {
  return (
    <div className="field">
      <label className="label">Hospital or City Name</label>
      <div className="control">
        <input className="input" 
          type="text" 
          placeholder="Hospital or City Name" 
          onChange={props.handleTextChange}
          />
      </div>
    </div>

  )
};

export default TextInput;