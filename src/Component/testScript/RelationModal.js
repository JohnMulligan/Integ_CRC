import {AppBar, Box, Dialog, IconButton, Tab, Tabs, Toolbar} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";

function TabPanel(props) {
  const {children, value, index} = props;

  return (
    <div
      role="tabPanel"
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

export default function RelationModal(props) {
  const [open, setOpen] = useState(false)
  const [tabId, setTabId] = useState(0)
  return(
    <div>
      <div onClick={()=>setOpen(true)}>
        {props.children}
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={()=>setOpen(false)}
      >
        <AppBar sx={{ position: 'relative', background: 'white'}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>setOpen(false)}
              aria-label="close"
            >
              <CloseIcon color="action"/>
            </IconButton>
            <Tabs
              variant="scrollable"
              value={tabId}
              onChange={(event, newValue) => {
                setTabId(newValue)
              }}
              sx={{borderRight: 1, borderColor: 'divider'}}
            >
              <Tab label="Sankey"/>
              <Tab label="Network"/>
              <Tab label="Story"/>
            </Tabs>
          </Toolbar>
        </AppBar>
        <TabPanel value={tabId} index={0}>
          <p>tab1</p>
        </TabPanel>
        <TabPanel value={tabId} index={1}>
          <p>tab2</p>
        </TabPanel>
        <TabPanel value={tabId} index={2}>
          <p>tab3</p>
        </TabPanel>
      </Dialog>
    </div>
    )
}