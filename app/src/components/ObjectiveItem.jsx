import React, {Component} from 'react';

export default class ObjectiveItem extends Component {
  render() {
    return (
      <li className="feed-item">{this.props.title} - {this.props.detail}</li>
    );
  }
}
