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
var httpProxy = require('http-proxy');
var path = require('path')
require('babel-register');

// Defining a proxy to point at the API server
const apiURL = 'http://localhost:3030/api/objectives';
const proxy = httpProxy.createProxyServer({
  target: apiURL,
  ws: true
});

// Set the static path for the web server
app.use(express.static(path.join(__dirname, 'public')));

// Set the port argument
app.set('port', (process.argv[2] || 3000));

// Import the ObjectiveList component
// Right now I need to put .default at the end as I don't know how to get
// import statements to work..
var ObjectiveList = require('./src/components/ObjectiveList').default;

app.use('/api', (req, res) => {
  proxy.web(req, res, {target: apiURL});
});

// Add default server response
app.get('/', (req, res) => {
  // Create a React Element with data
  var objectiveList = React.createElement(ObjectiveList, {url: 'http://localhost:3000/api'});

  // Turn React Element to a string
  var markup = ReactDOMServer.renderToString(objectiveList);

  // Render to static markup so additional elements can be added
  // -- script element including bundle.js
  // -- script element initialising data-json
  var html = ReactDOMServer.renderToStaticMarkup(
    body(
      null,
      div({id: 'objectiveList', dangerouslySetInnerHTML: {__html: markup}}),
      script({src: '/js/bundle.js'})
    )
  );

  res.setHeader('Content-Type', 'text/html');
  res.end(html);
});

// Start the Express web server
app.listen(app.get('port'), function() {
  console.log('App server started: http://localhost:' + app.get('port') + '/');
});
