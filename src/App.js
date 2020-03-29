import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';

import Hero from './components/Hero';
import Dropdown from './components/Dropdown';
import TextInput from './components/TextInput';
import TextArea from './components/TextArea';
import Button from './components/Button';
import List from './components/List';

import firebase from './firebase';

const App = () => {

  const [aerosolizing, setAerosolizing] = useState("");
  const [average, setAverage] = useState("");
  const [confirmed, setConfirmed] = useState("");
  const [location, setLocation] = useState("");
  const [providerQuarantined, setProviderQuarantined] = useState(false);
  const [suspected, setSuspected] = useState("");
  const [testingAvailability, setTestingAvailability] = useState("");
  const [turnAroundTime, setTurnAroundTime] = useState("");
  const [ventilatorTestingRationing, setVentilatorTestingRationing] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (ev) => {
    console.log(aerosolizing);
    setSuccessMessage("");
    ev.preventDefault();
    firebase
      .firestore()
      .collection('ppe')
      .add({
        aerosolizing: aerosolizing,
        average: average,
        confirmed: confirmed,
        location: location,
        provider_quarantined: providerQuarantined,
        suspected: suspected,
        testing_availability: testingAvailability,
        turnaround_time: turnAroundTime,
        ventilator_testing_rationing: ventilatorTestingRationing,

      });

    setSuccessMessage("Congrats, your data was submitted!");
    setAerosolizing("");
    setConfirmed("");
    setConfirmed("");
    setLocation("");
    setProviderQuarantined("");
    setSuspected("");
    setTestingAvailability("");
    setTurnAroundTime("");
    setVentilatorTestingRationing("");


  }

  return (
    <div className="container">
      <Hero />
      {successMessage && successMessage}
      <section className="section">
        <div className="columns">
          <div className="column is-one-quarter">
            <TextInput handleTextChange={e => setLocation(e.target.value)} />
          </div>
        </div>
        <h1>PPE</h1>
        <div className="columns">
          <div className="column">
            <TextArea heading="An average patient"
              handleTextChange={e => setAverage(e.target.value)}
            />
          </div>
          <div className="column">
            <TextArea heading="A patient with suspected COVID-19"
              handleTextChange={e => setSuspected(e.target.value)}
            />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <TextArea heading="A patient with known COVID"
              handleTextChange={e => setConfirmed(e.target.value)}
            />
          </div>
          <div className="column">
            <TextArea heading="Aerosolizing procedure (intubation, bronchoscopy) for a patient with COVID-19"
              handleTextChange={e => setAerosolizing(e.target.value)}
            />
          </div>
        </div>
        <h1 className="is-uppercase">Testing</h1>
        <div className="columns">
          <div className="column">
            <TextArea heading="Availability of testing for COVID"
              handleTextChange={e => setTestingAvailability(e.target.value)}
            />
          </div>
          <div className="column">
            <TextArea heading="Turn-around time for COVID-19 tests"
              handleTextChange={e => setTurnAroundTime(e.target.value)}
            />
          </div>
          <div className="column">
            <Dropdown subject="If a provider is exposed/symptomatic (and if testing is available), are they quarantined for 14 days?"
              handleDropChange={e => setProviderQuarantined(e.target.value)}
            />
          </div>
        </div>
        <div className="columns">
          <div className="column is-one-third">
            <TextArea heading="How is your institution rationing testing and equipment (ventilators)?"
              handleTextChange={e => setVentilatorTestingRationing(e.target.value)}
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
