// Require React and ReactDOMServer for isomorphic/Universal rendering
var React = require('react');
var ReactDOMServer = require('react-dom/server');

// Create DOM variables for use in the isomorphic server response below
var DOM = React.DOM;
var body = DOM.body;
var div = DOM.div;
var script = DOM.script;

// Require Express for serving content
var express = require('express');
var app = express();
var path = require('path')
require('babel-register');

// Default data
// TODO replace with data from MongoDB
var data = [
  {title: 'Shopping', detail: "Shopping detail"},
  {title: 'Hair cut', detail: "Hair cut detail"},
  {title: 'Ronny', detail: "Do Ronny"},
  {title: 'Umm buy oranges', detail: "Imperial Mandarin"}
];

// Set the static path for the web server
app.use(express.static(path.join(__dirname, 'public')));

// Set the port argument
app.set('port', (process.argv[2] || 3000));

// Import the ObjectiveList component
// Right now I need to put .default at the end as I don't know how to get
// import statements to work..
var ObjectiveList = require('./src/components/ObjectiveList').default;

// Add default server response
app.get('/', (req, res) => {
  // Stringify the default data
  var initialData = JSON.stringify(data);

  // Create a React Element with data
  var objectiveList = React.createElement(ObjectiveList, {data: data});

  // Turn React Element to a string
  var markup = ReactDOMServer.renderToString(objectiveList);

  // Render to static markup so additional elements can be added
  // -- script element including bundle.js
  // -- script element initialising data-json
  var html = ReactDOMServer.renderToStaticMarkup(
    body(
      null,
      div({id: 'objectiveList', dangerouslySetInnerHTML: {__html: markup}}),
      script({
        id: 'initial-data',
        type: 'text/plain',
        'data-json': initialData
      }),
      script({src: '/js/bundle.js'})
    )
  );

  res.setHeader('Content-Type', 'text/html');
  res.end(html);
});

// Start the Express web server
app.listen(app.get('port'));
console.log('The magic happens on port ' + app.get('port'));
