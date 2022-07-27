import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Icon from '@mui/material/Icon';
import logo from "../../images/sv-logo.png";
import {Chip, Stack, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useContext, useMemo, useState} from "react";
import _ from 'lodash';
import Filter from "../VoyagePage/Filter/Filter"
import RelationModal from "./RelationModal";

export default function ResponsiveAppBar(props) {
  const {pageType, dataset, setDataset} = props.state;
  const color = useMemo(() => {
    if(pageType=== "enslaver"){
      return "success"
    }
    if(dataset==="0") {
      return "primary"
    }else{
      return "secondary"
    }
  }, [dataset])
  return (
    <AppBar position="sticky" color={color} elevation={0} style={{zIndex:4}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Icon>
            <img src={logo} height={30} width={60} />
          </Icon>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            Voyages
          </Typography>
          <RelationModal >
            <Button variant={"contained"} >Open Modal</Button>
          </RelationModal>
          <Chip label={"asdqw"}/>
          <Stack spacing={4} direction={"row"} justifyContent="flex-end"
                 alignItems="flex-end" sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>

          {/*  /!*{pageType !== "home" ? <Filter/>: null}*!/*/}

            {pageType !== "home" ?
              <ToggleButtonGroup
                value={dataset}
                exclusive
                onChange={(event) => {
                  setDataset(event.target.value)
                }}
                sx={{background: dataset === "0" ? "#42a5f5" : "#ab47bc"}}
                size={"small"}

              >
                <ToggleButton sx={{background: "#42a5f5"}} value={"0"} >Trans-Atlantic</ToggleButton>
                <ToggleButton sx={{background: "#ab47bc"}} value={"1"} >Intra-American</ToggleButton>
              </ToggleButtonGroup>:
              null}

            {/*{pageType === "slave" || pageType === "enslaver"?*/}
            {/*  <ToggleButtonGroup*/}
            {/*    value={pageType === "slave"?"0":"1"}*/}
            {/*    size={"small"}*/}
            {/*  >*/}
            {/*    <Link to={"/past/enslaved"} style={{ textDecoration: "none" }}>*/}
            {/*      <ToggleButton sx={{background: dataset === "0"?"#42a5f5":"#ab47bc"}} value={"0"}>Enslaved People</ToggleButton>*/}
            {/*    </Link>*/}
            {/*    <Link to={"/past/enslaver"} style={{ textDecoration: "none" }}>*/}
            {/*      <ToggleButton sx={{background: "#388e3c"}}  value={"1"}>Enslavers</ToggleButton>*/}
            {/*    </Link>*/}
            {/*  </ToggleButtonGroup>:*/}
            {/*  null}*/}
          </Stack>

          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            <Link to={"/voyage/Scatter"} style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  position: "right",
                }}
              >
                Voyages
              </Button>
            </Link>
            <Link to={"/past/enslaved"} style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  position: "right",
                }}
              >
                Past
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
