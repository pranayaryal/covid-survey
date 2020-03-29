import React, { useState, useReducer } from 'react';
import logo from './logo.svg';
import './App.scss';

import Hero from './components/Hero';
import Dropdown from './components/Dropdown';
import TextInput from './components/TextInput';
import TextArea from './components/TextArea';
import Button from './components/Button';
import List from './components/List';

import firebase from './firebase';

const initialState = {
  aerosolizing: "",
  average: "",
  confirmed: "",
  location: "",
  providerQuarantined: "",
  suspected: "",
  testingAvailability: "",
  turnAroundTime: "",
  ventilatorTestingRationing: "",
  successMessage: ""
}

const reducer = (state, action) => {
  if (action.type === "reset") {
    return initialState;
  }
  const result = { ...state }
  result[action.type] = action.value;
  return result;
}

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    aerosolizing,
    average,
    confirmed,
    location,
    providerQuarantined,
    suspected,
    testingAvailability,
    turnAroundTime,
    ventilatorTestingRationing,
    successMessage

  } = state;


  const onChange = e => {
    dispatch({ type: "successMessage", value: "" })
    const { name, value } = e.target
    dispatch({ type: name, value })
  }


  const handleSubmit = (ev) => {
    dispatch({ type: "successMessage", value: "" })
    ev.preventDefault();
    firebase
      .firestore()
      .collection('ppe')
      .add({
        aerosolizing,
        average,
        confirmed,
        location,
        providerQuarantined,
        suspected,
        testingAvailability,
        turnAroundTime,
        ventilatorTestingRationing,

      })
      .then(() => {
        dispatch({ type: "reset"});
        dispatch({ type: "successMessage", value: "Congrats, your data was submitted!" })
      });


  }

  return (
    <div className="container">
      <Hero />
      {successMessage && successMessage}
      <section className="section">
        <div className="columns">
          <div className="column is-one-quarter">
            <TextInput
              name="location"
              value={location}
              onChange={onChange} />
          </div>
        </div>
        <h1>What PPE are you using when you see these patients?</h1>
        <div className="columns">
          <div className="column">
            <TextArea
              name="average"
              value={average}
              heading="An average patient"
              onChange={onChange}
            />
          </div>
          <div className="column">
            <TextArea
              name="suspected"
              value={suspected}
              heading="A patient with suspected COVID-19"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <TextArea
              name="confirmed"
              value={confirmed}
              heading="A patient with known COVID"
              onChange={onChange}
            />
          </div>
          <div className="column">
            <TextArea
              name="aerosolizing"
              value={aerosolizing}
              heading="Aerosolizing procedure (intubation, bronchoscopy) for a patient with COVID-19"
              onChange={onChange}
            />
          </div>
        </div>
        <h1 className="is-uppercase">Testing</h1>
        <div className="columns">
          <div className="column">
            <TextArea
              name="testingAvailability"
              value={testingAvailability}
              heading="Availability of testing for COVID"
              onChange={onChange}
            />
          </div>
          <div className="column">
            <TextArea
              name="turnaroundTime"
              value={turnAroundTime}
              heading="Turn-around time for COVID-19 tests"
              onChange={onChange}
            />
          </div>
          <div className="column">
            <Dropdown
              name="providerQuarantined"
              value={providerQuarantined}
              subject="If a provider is exposed/symptomatic (and if testing is available), are they quarantined for 14 days?"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="columns">
          <div className="column is-one-third">
            <TextArea
              name="ventilatorTestingRationing"
              value={ventilatorTestingRationing}
              heading="How is your institution rationing testing and equipment (ventilators)?"
              onChange={onChange}
            />
          </div>
        </div>
        <Button handleSubmit={handleSubmit} />
      </section>
      <section className="section">
        <h1 className="title">Results</h1>
        <List />
      </section>

    </div>
  );
}

export default App;
