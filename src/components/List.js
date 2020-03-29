import React, { useState, useEffect } from 'react'
import firebase from '../firebase';

const useList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('ppe')
      .onSnapshot(snapshot => {
        const newList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setList(newList);
      });

      return () => unsubscribe;
  }, []);


  return list;
}

const List = props => {
  const list = useList();

  return (
    <div>
      <ul>
        {list.map(item =>
          <li key={item.id}>
            <p>{item.testing_availability}</p>
            <p>{item.average}</p>
            <p>{item.aerosolizing}</p>
            <p>{item.confirmed}</p>
            <p>{item.location}</p>
            <p>{item.provider_quarantined}</p>
            <p>{item.suspected}</p>
            <p>{item.turnaround_time}</p>
            <p>{item.ventilator_assisteda_rationing}</p>
          </li>
        )}
        <br />
      </ul>
    </div>
  )
};

export default List;