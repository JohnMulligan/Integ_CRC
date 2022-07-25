import Pivot from "./Pivot";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormControlLabel, RadioGroup } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { pivot_row_vars, pivot_col_vars, pivot_cell_vars } from "../vars";
import * as options_flat from "../../../util/options.json";
import { useWindowSize } from "@react-hook/window-size";

export const PivotContext = React.createContext({});

const AUTH_TOKEN = process.env.REACT_APP_AUTHTOKEN;
axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

const default_object = {
  groupby_fields: [pivot_row_vars[0], pivot_col_vars[1]],
  value_field_tuple: [pivot_cell_vars[0], "sum"],
  cachename: ["voyage_export"],
};

function PivotApp(props) {
  const [width, height] = useWindowSize();
  const { search_object } = useContext(props.context);
  //console.log(search_object);
  const [complete_object, set_complete_object] = useState(default_object);
  const [selected_object, set_selected_object] = useState(default_object);
  const [selected_value, set_selected_value] = useState("sum");
  const [isNormalize, setIsNormalize] = useState(false);

  // Options
  const [option, setOption] = useState({
    0: pivot_row_vars[0],
    1: pivot_col_vars[1],
  });

  const [value, setValue] = useState({
    0: pivot_cell_vars[0],
    1: "sum",
  });

  const handleCell = (event) => {
    value[0] = event.target.value;
    let tmp = selected_object["value_field_tuple"];
    tmp[0] = event.target.value;
    set_selected_object({
      ...selected_object,
      value_field_tuple: tmp,
    });
  };

  const handleGroupby = (event, idx) => {
    setOption({
      ...option,
      [idx]: event.target.value,
    });
    let tmp = selected_object["groupby_fields"];
    tmp[idx] = event.target.value;
    set_selected_object({
      ...selected_object,
      groupby_fields: tmp,
    });
  };

  const handleValueFunction = (event, valueSelected) => {
    set_selected_value(event.target.value); // control the radio
    value[1] = valueSelected;
    let tmp = selected_object["value_field_tuple"];
    tmp[1] = valueSelected;
    if (event.target.value === "mean" || event.target.value === "sum") {
      delete selected_object["normalize"];
      setIsNormalize(false);
    } else {
      selected_object["normalize"] = [event.target.value];
      setIsNormalize(true);
    }
    set_selected_object({
      ...selected_object,
      value_field_tuple: tmp,
    });
  };

  // Combine the filter and the default
  useEffect(() => {
    set_complete_object(Object.assign({}, search_object, selected_object));
  }, [search_object, selected_object]);

  // if (isLoading) {
  //   return <div className="spinner"></div>;
  // }

  return (
    <div>
      <div>
        <Box sx={{ maxWidth: width > 500 ? width * 0.9 : width * 0.7 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Rows</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={option[0]}
              label="Rows"
              name="Rows"
              onChange={(event) => {
                handleGroupby(event, 0);
              }}
            >
              {pivot_row_vars.map((option) => (
                <MenuItem key={option} value={option}>
                  {options_flat[option]["flatlabel"]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ maxWidth: width > 500 ? width * 0.9 : width * 0.7, my: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Columns</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={option[1]}
              name="Columns"
              label="Columns"
              onChange={(event) => {
                handleGroupby(event, 1);
              }}
            >
              {pivot_col_vars.map((option) => (
                <MenuItem key={option} value={option}>
                  {options_flat[option]["flatlabel"]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ maxWidth: width > 500 ? width * 0.9 : width * 0.7, my: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Cells</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value[0]}
              name="Cells"
              label="Cells"
              onChange={(event) => {
                handleCell(event);
              }}
            >
              {pivot_cell_vars.map((option) => (
                <MenuItem key={option} value={option}>
                  {options_flat[option]["flatlabel"]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Value Function
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={selected_value}
            // onChange={(event) => {
            //   handleValueFunction(event, "sum");
            // }}
            row
          >
            <FormControlLabel
              value="sum"
              onChange={(event) => {
                handleValueFunction(event, "sum");
              }}
              control={<Radio />}
              label="Sum"
            />
            <FormControlLabel
              value="mean"
              onChange={(event) => {
                handleValueFunction(event, "mean");
              }}
              control={<Radio />}
              label="Mean"
            />
            <FormControlLabel
              value="columns"
              onChange={(event) => {
                handleValueFunction(event, "sum");
              }}
              control={<Radio />}
              label="Normalize_rows"
            />
            <FormControlLabel
              value="index"
              onChange={(event) => {
                handleValueFunction(event, "sum");
              }}
              control={<Radio />}
              label="Normalize_columns"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div>
        <PivotContext.Provider
          value={{ complete_object, set_complete_object, isNormalize }}
        >
          <Pivot context={PivotContext} />
        </PivotContext.Provider>
      </div>
    </div>
  );
}

export default PivotApp;
