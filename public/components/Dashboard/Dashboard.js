import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchProjects, createProject } from '../../actions/projects';
import ProjectCreator from './ProjectCreator';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchProjects());
  }

  onCreate(name) {
    this.props.dispatch(createProject(name));
  }

  render () {
    return (
      <List className="list">
        {this.props.projects.map((project) => {
          return (<ListItem><Link to={ '/project/' + project._id }>{ project.name }</Link></ListItem>);
        })}
        <ProjectCreator onCreate={this.onCreate.bind(this)} />
      </List>
    );
  }
}

Dashboard.propTypes = {
  dashboard: React.PropTypes.object
};

const mapStateToProps = state => state.dashboard;

export default connect(mapStateToProps)(Dashboard);
