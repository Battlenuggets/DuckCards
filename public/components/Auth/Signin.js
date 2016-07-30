import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { changeAuthField, signUserIn } from '../../actions';
import { signin } from '../../auth';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField, RaisedButton } from 'material-ui';
import {greenA200} from 'material-ui/styles/colors';

const styles = {
  floatingLabelFocusStyle: {
      color: greenA200
  }
};

class Signin extends Component {
  constructor(props) {
    super(props);
  }

  postSignin (e) {
    e.preventDefault();

    const { username, password, router, dispatch } = this.props;

    signin(username, password)
      .then(() => {
        dispatch(signUserIn(username));
        router.replace('/project');
      });
  }

  onFieldChange(e) {
    const action = changeAuthField(e.target.name, e.target.value);
    this.props.dispatch(action);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <form className="form" onSubmit={
            this.postSignin.bind(this)
          }>
            <h2> Sign In Page</h2>
            <TextField
              type="email"
              name="username"
              floatingLabelText="Enter Your Email"
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              value={this.props.username}
              onChange={this.onFieldChange.bind(this)}
            />
            <TextField
              type="password"
              name="password"
              floatingLabelText="Enter Your Password"
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              value={this.props.password}
              onChange={this.onFieldChange.bind(this)}
            />
            <RaisedButton
              type="submit"
              primary={true}
              label="Sign In"
            />
          </form>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => state.authForm;

export default connect(
  mapStateToProps
)(withRouter(Signin));
