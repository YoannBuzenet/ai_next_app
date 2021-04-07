import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export default function SwitchLabels({ description, state, setState }) {
  console.log("state", state);

  const handleChange = (event) => {
    setState(!state);
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch checked={state} onChange={handleChange} color="primary" />
        }
      />
    </FormGroup>
  );
}
