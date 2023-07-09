// import * as React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectField = ({ label, value, onChange, options, required }) => {
  return (
    <FormControl fullWidth required={required}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectField;
