import ResponsiveAppBar from "../NavBar";
import * as React from "react";
import {Box, Button, Card, Tab, Tabs, Typography,Dialog,AppBar,Toolbar,IconButton,Slide, Grid} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Sankey from "./RelationGraph/Sankey"
import Network from './RelationGraph/Network'
import Story from './RelationGraph/Story'
import PASTTable from './PASTTable'
import Filter from "../VoyagePage/Filter/Filter";
import {PASTContext} from "./PASTApp";
import {useContext, useState} from "react";
import Modal from "../VoyagePage/Result/Table/TableModal";

import Grow from '@mui/material/Grow';
import Gallery from "./Gallery.js"
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import TocIcon from '@mui/icons-material/Toc';

function TabPanel(props) {
  const {children, value, index} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      style={{width: '100%'}}
    >{value === index && (
      <Box sx={{p: 3}}>
        {children}
      </Box>
    )}
    </div>
  );
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function PAST() {
  const [value, setValue] = useState(0);
  const [dialogopen, setdialogOpen] = useState(false);
  const { windowRef, typeForTable, setTypeForTable, search_object, set_search_object, dataSet, setDataSet, data, setQueryData, setChipData, chipData, queryData} = useContext(PASTContext)
  const [scroll, setScroll] = useState('body');
  const [checked, setChecked] = useState(false);

  function handleChange(e) {
    if((e == "table" && checked) || (e =="story" && !checked)) setChecked((prev) => !prev);
  };

  //console.log(endpoint);
  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });
  const handleClickOpen = (scrollType) => () => {
    setdialogOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setdialogOpen(false);
  };

  return (
    <div>
      {/* <button onClick={"search object: ", search_object}>print</button> */}
      <ResponsiveAppBar context={PASTContext}/>

      {/* <Button onClick={()=>console.log("options_tree:", options_tree)}>print options_tree</Button>
      <Button onClick={()=>console.log("options_flat:", options_flat)}>print options_flat</Button>
      <Button onClick={()=>console.log("search_object:", search_object)}>print search_object</Button> */}

      <Filter context={PASTContext}/>
      <Button variant="contained" startIcon={<TocIcon/>} size="large" color="grey" onClick={() => handleChange("table")} sx={{ ml: 3, mt:3, mb:5, mr: 1 }}>
        Table
      </Button>
      <a> </a>
      <Button variant="contained" endIcon={<DashboardCustomizeIcon />} size="large" color="grey" onClick={() => handleChange("story")} sx={{ mt:3, mb:5}}>
      Stories
      </Button>

      {/*for fading/growing effect, you have to wrap all things in an div*/}
      {!checked && 
      <Box>
        <Grow
        in={!checked}
        style={{ transformOrigin: '0 0 0' }}
        {...(checked ? { timeout: 500 } : {})}
        >
          <div><PASTTable context={PASTContext} handleClickOpen={handleClickOpen}/></div>
        </Grow>
      </Box>}

      {checked &&<Box sx={{ display: 'flex' }}>
        <Grow in={checked}>
          <div>
          <Gallery dataChange = {setQueryData} remoteControl = {handleClickOpen} setChipData = {setChipData} />
          </div>
        </Grow>
      </Box>}

      
      <Dialog
        fullScreen
        open={dialogopen}
        onClose={handleClose}
        scroll="body"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        TransitionComponent={Transition}
        ref={windowRef}
      >
        <AppBar sx={{ position: 'relative', background: 'white'}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon color="action"/>
            </IconButton>
            <Tabs
              variant="scrollable"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue)
              }}
              sx={{borderRight: 1, borderColor: 'divider'}}
            >
              <Tab label="Sankey"/>
              <Tab label="Network"/>
              <Tab label="Story"/>
            </Tabs>
          </Toolbar>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Sankey/>
          <Modal context={PASTContext} endpoint="voyage/"/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Network/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Grid  container spacing={{ xs: 6, md: 4, lg:5}} padding={{ xs: 4, md: 3, lg:4 }} paddingTop={{ xs: 0, md: 0, lg:0 }}  >
            {queryData["type"] == "slaves" && data.map((item, key) => {
              return <Grid key={'grid-' + key}item xs={12} sm={6} md={4} lg={3}><Story target={item} dynamic={true}/></Grid>
            })}
            {/* <button onClick={() => console.log("query: ", queryData)}>print</button> */}
            {queryData["type"] != "slaves" && data.map((item, key) => {
              return <Grid key={'grid-' + key}item xs={12} sm={6} md={4} lg={3}><Story target={item} dynamic={true} slavery="slaver"/></Grid>
            })}
          </Grid>
        </TabPanel>
      </Dialog>

    </div>
  )
}