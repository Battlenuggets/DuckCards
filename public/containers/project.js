import React, { Component, PropTypes } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { render } from 'react-dom';
import { fetchProject } from '../actions/projects';
import {
  fetchTasks, receiveTasks,
  fetchTasksIfNeeded, createTask
} from '../actions';

import * as Actions from '../actions';

import '../store/configureStore';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import * as Spacing from 'material-ui/styles/spacing';

import Tasks from '../components/Tasks.js';
import Navbar from '../components/Navbar.js';
import ConfirmDeleteTaskModal from '../components/ConfirmDeleteTaskModal';
import TaskModal from '../components/TaskModal';
import CollabModal from '../components/AddCollabModal';

class Project extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.loadProject();
  }

  loadProject() {
    const { dispatch } = this.props;
    dispatch(fetchProject(this.props.params.projectId));
  }

  addTask(task) {
    dispatch(createTask(task))
  }

  modifyTask() {
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Navbar data={ this.props.data } actions={ this.props.actions } />
          <Tasks data={ this.props.project.tasks } actions={ this.props.actions } />
          <ConfirmDeleteTaskModal />
          <TaskModal />
          <CollabModal />
        </div>
      </MuiThemeProvider>
    )
  }
}

Project.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  project: PropTypes.object.isRequired
}


const mapStateToProps = state => state.project

//pass actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch),
    dispatch: dispatch
  }
}

export default compose(
  DragDropContext(HTML5Backend),
  connect(mapStateToProps, mapDispatchToProps)
)(Project);
