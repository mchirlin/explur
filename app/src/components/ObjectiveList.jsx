import React, {Component} from 'react';
import Request from 'request';
import ObjectiveItem from './ObjectiveItem'

export default class ObjectiveList extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
    this.loadObjectivesFromServer = this.loadObjectivesFromServer.bind(this);
  }

  // Load the objectives from the API
  loadObjectivesFromServer() {
    console.log('Sending Request to ' +  this.props.url);
    Request(this.props.url, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        this.setState({data: JSON.parse(body)});
      }
    }.bind(this));
  }

  componentDidMount() {
    this.loadObjectivesFromServer();
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }

  render() {
    let objectives = this.state.data.map(objective => (
      <ObjectiveItem
        title={objective.title}
        key={objective.title}
        detail={objective.detail}
      />
    ));
    return (
      <div className="objectiveList">
        {objectives}
      </div>
    )
  }
}
