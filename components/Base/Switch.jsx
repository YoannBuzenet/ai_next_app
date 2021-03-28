import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export default function SwitchLabels({
  description,
  state,
  setState,
  state1,
  state2,
}) {
  const [stateEx, setStateEx] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setStateEx({ ...stateEx, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={stateEx.checkedA}
            onChange={handleChange}
            name="checkedA"
          />
        }
        label={description}
      />
    </FormGroup>
  );
}
