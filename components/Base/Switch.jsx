import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export default function SwitchLabels({
  description,
  state,
  setState,
  classToAdd,
  color = "primary",
}) {
  console.log("state", state);

  const handleChange = (event) => {
    setState(!state);
  };

  return (
    <FormGroup row className={classToAdd}>
      <FormControlLabel
        control={
          <Switch checked={state} onChange={handleChange} color={color} />
        }
      />
    </FormGroup>
  );
}
