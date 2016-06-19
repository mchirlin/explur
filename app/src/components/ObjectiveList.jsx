import React, {Component} from 'react';
import ObjectiveItem from './ObjectiveItem'

export default class ObjectiveList extends Component {
  render() {
    let objectives = this.props.data.map(objective => (
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
