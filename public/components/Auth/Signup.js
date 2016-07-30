import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { changeAuthField } from '../../actions';
import { signup } from '../../auth';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField, RaisedButton } from 'material-ui';
import {greenA200} from 'material-ui/styles/colors';

const styles = {
  floatingLabelFocusStyle: {
      color: greenA200
  }
}

class Signup extends Component {
  constructor(props) {
    super(props);
  }

  postSignup (e) {
    e.preventDefault();

    const { username, password, router } = this.props;

    signup(username, password)
      .then(() => {
        router.replace('/signin');
      });
  }

  onFieldChange(e) {
    const action = changeAuthField(e.target.name, e.target.value);
    this.props.dispatch(action);
  }

  render() {
    return (
      <MuiThemeProvider>
        <form className="form" onSubmit={
          this.postSignup.bind(this)
        }>
          <h2>Sign Up Page</h2>
          <TextField
            type="email"
            name="username"
            floatingLabelText="Enter Your New Email"
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            value={this.props.username}
            onChange={this.onFieldChange.bind(this)}
          />
          <TextField
            type="password"
            name="password"
            floatingLabelText="Enter Your New Password"
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            value={this.props.password}
            onChange={this.onFieldChange.bind(this)}
          />
          <RaisedButton
            type="submit"
            primary={true}
            label="Sign Up"
          />
        </form>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => state.authForm;

export default connect(
  mapStateToProps
)(withRouter(Signup));
