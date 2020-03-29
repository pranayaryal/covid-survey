import React from 'react'

const TextArea = props => {
  return (
    <div className="field">
      <label className="label">{props.heading}</label>
      <div className="control">
        <textarea className="textarea" 
          onChange={props.onChange}
          name={props.name}
          value={props.value}
          ></textarea>
      </div>
    </div>
  )
};

export default TextArea;