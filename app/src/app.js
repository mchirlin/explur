import React from 'react';
import ReactDOM from 'react-dom';
import ObjectiveList from './components/ObjectiveList';

const apiURL = 'http://localhost:3000/api';
// Render the ObjectiveList
ReactDOM.render(
   <ObjectiveList url={apiURL}/>,
   document.getElementById('objectiveList')
);
