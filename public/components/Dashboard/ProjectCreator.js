import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField, RaisedButton } from 'material-ui';

const ProjectCreator = ({ onCreate }) => {
  let input;

  return (
    <MuiThemeProvider>
      <div className="header">
        <h2>Create project</h2>
          <form>
            <input ref={node => { input = node; }} type="text" name="name" placeholder="Project Name" required/>
          </form>
          <RaisedButton onClick={() => {
            onCreate(input.value);
            input.value = '';
          }}
            type="submit"
            primary={true}
            label="Create"
          />
      </div>
    </MuiThemeProvider>
  );
};

export default ProjectCreator;
