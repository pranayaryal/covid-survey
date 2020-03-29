import React from 'react'

const Button = props => {
    return (
    <div>
      <button className="button is-primary" 
       onClick={props.handleSubmit}>Submit</button>
    </div>
  )
};

export default Button;