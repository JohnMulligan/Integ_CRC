import React, { useState, useEffect, useContext, useReducer } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import { idxRelation, skeleton } from "./tableVars";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import * as options_flat from "../../../util/options.json";

const AUTH_TOKEN = process.env.REACT_APP_AUTHTOKEN;
axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

const initialState = [true, true, true, true, true, true, true];

function reducer(state, { type, index }) {
  switch (type) {
    case "expand-all":
      return [true, true, true, true, true, true, true];
    case "collapse-all":
      return [false, false, false, false, false, false, false];
    case "toggle":
      return [...state, (state[index] = !state[index])];
    default:
      throw new Error();
  }
}

function TableModal(props) {
  const endpoint = props.endpoint
  const {open, setOpen, id, info } = useContext(props.context);
  const [content, setContent] = useState([]);
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflow: "scroll",
    maxHeight: 500,
  };

  // Expand/Collapse
  const [isExpanded, setIsExpanded] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);

  // Modal
  useEffect(() => {
    if (id !== 0) {
      var data = new FormData();
      data.append("hierarchical", "False");
      if (endpoint === "voyage/"){
        data.append("voyage_id", id);
        data.append("voyage_id", id);
      }
      // if (endpoint === "past/enslaved/"){
      //   data.append("transactions__transaction__voyage__id", id);
      //   data.append("transactions__transaction__voyage__id", id);
      // }
      axios
        .post("/" + endpoint, data)
        .then(function (response) {
          //console.log(Object.keys(response.data));
          //console.log(Object.values(response.data));
          setContent(Object.values(response.data)[Object.keys(response.data)]);
          //console.log("here=",Object.values(response.data)[Object.keys(response.data)].voyage_id)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [id, endpoint]);

  const handleClose = () => setOpen(false);

  const handleAllExpansion = () => {
    if (isExpanded) {
      dispatch({ type: "collapse-all" });
    } else {
      dispatch({ type: "expand-all" });
    }
    setIsExpanded(!isExpanded);
  };

  const handleSingleExpansion = (event, title) => {
    dispatch({ type: "toggle", index: idxRelation[title] });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            sx={{ fontWeight: "bold" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            <div>
              Full detail: {id}
              <IconButton
                sx={{ float: "right" }}
                onClick={() => setOpen(false)}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </Typography>
          <Typography>
            <div>
              Here are the currently available details for this voyage.
              <Button onClick={handleAllExpansion}>Expand/Collapse</Button>
              to see/hide all.
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {Object.keys(skeleton).map((title) => (
              <div>
                <Accordion
                  expanded={state[idxRelation[title]]}
                  // onClick={(event) => handleSingleExpansion(event, title)}
                  sx={{ margin: "5px" }}
                >
                  <AccordionSummary
                    sx={{ backgroundColor: "#f2f2f2" }}
                    onClick={(event) => handleSingleExpansion(event, title)}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {skeleton[title].map((obj) => (
                        <Grid container spacing={2} columns={16}>
                          <Grid sx={{ fontWeight: "bold" }} item xs={8}>
                            {options_flat[obj].flatlabel}
                          </Grid>
                          <Grid item xs={8}>
                            {content[obj]}
                          </Grid>
                        </Grid>
                      ))}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default TableModal;
