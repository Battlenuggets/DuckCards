import React from 'react';
import { TextField, RaisedButton } from 'material-ui';

const ProjectCreator = ({ onCreate }) => {
  let input;

  return (
    <div>
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
  );
};

export default ProjectCreator;
