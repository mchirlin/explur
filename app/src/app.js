import React from 'react';
import ReactDOM from 'react-dom';
import ObjectiveList from './components/ObjectiveList';

// Populate inital data
let data = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));

// Render the ObjectiveList
ReactDOM.render(
   <ObjectiveList data={data}/>,
   document.getElementById('objectiveList')
);
