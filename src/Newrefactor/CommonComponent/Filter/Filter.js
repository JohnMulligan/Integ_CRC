import { Grid, Button, IconButton, AppBar, Toolbar, Drawer, Divider } from "@mui/material";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import SwitchRightIcon from '@mui/icons-material/SwitchRight';
import ComponentFac from './ComponentFac';
import FilterSelector from './FilterSelector'
import BoundingBoxFilter from "../../VoyageApp/Component/BoundingBoxFilter";

export default function Filter(props) {

    const { filter_obj, set_filter_obj, variables_tree, options_flat, drawerOpen, setDrawerOpen, pageType, dataset } = props.state;

    const [fullScreen, setFullScreen] = React.useState(false);
    const [rightScreen, setRightScreen] = React.useState(false);

    const [openBoundingBox, setOpenBoundingBox] = React.useState(false);

    // Handle Full Screen and Exit
    const handleFullScreen = () => {
        setFullScreen(!fullScreen);
    };

    // Handle Screen LR switch
    const handleSwitchScreen = () => {
        setRightScreen(!rightScreen);
    };

    // Handle Filter Reset Action
    const handleFilterReset = () => {
        set_filter_obj({})
    };


    const handleDelete = (key) => {
        let temp = { ...filter_obj };
        if (key === "voyage_itinerary__imp_principal_place_of_slave_purchase__geo_location__name") {
            delete temp["voyage_itinerary__imp_principal_place_of_slave_purchase__geo_location__latitude"];
            delete temp["voyage_itinerary__imp_principal_place_of_slave_purchase__geo_location__longitude"];
        }
        else if (key === "voyage_itinerary__imp_principal_port_slave_dis__geo_location__name") {
            delete temp["voyage_itinerary__imp_principal_port_slave_dis__geo_location__latitude"];
            delete temp["voyage_itinerary__imp_principal_port_slave_dis__geo_location__longitude"];
        }
        else {
            delete temp[key];
        }
        set_filter_obj(temp)
    };

    const color = (() =>{
        if(pageType === "voyage") {
          if(dataset==="0") {
            return "voyageTrans"
          }else{
            return "voyageIntra"
          }
        }
        if(dataset==="0") {
          return "primary"
        }else{
          return "secondary"
        }
      })()

    const key = "voyage_itinerary__imp_principal_place_of_slave_purchase__geo_location__name"
    const OpenBoundingBoxFilter = ()=>{
        return (
        <AccordionDetails key={'accordDet'+key}>
            <BoundingBoxFilter  state={{key, filter_obj, set_filter_obj, options_flat, pageType, dataset}}/>
       </AccordionDetails>
        )
     
    }

    // const OpenBoundingBoxFilter = (event) => {
    //     if (!labels.some(e => e.option == "voyage_itinerary__imp_principal_place_of_slave_purchase__geo_location__name")) {
    //         setLabels([...labels, { option: "voyage_itinerary__imp_principal_place_of_slave_purchase__geo_location__name", type: "<class 'rest_framework.fields.Map'>", label: "" }])
    //     }
    // }


    return (
        <div>
            {drawerOpen ?
                <AppBar key="menu_appbar"
                    position="fixed" 
                    color={color} 
                    elevation={0} 
                    style={{ zIndex: 3, marginTop: "68px" }}
                >
                    <Toolbar key="menu_toolbar">
                        <Grid container key="menu_items" direction="row" spacing={1}>
                            {
                                Object.keys(variables_tree).map((key) => {
                                    return (
                                        <FilterSelector key={"menu_items_"+key} state={{ key, filter_obj, set_filter_obj, variables_tree, options_flat}} />
                                    )
                                })
                            }
                        </Grid>
                    </Toolbar>
                </AppBar>
                : null}
            <Drawer
                key="filter_drawer"
                className={"Selected Fields Drawer"}
                variant="persistent"
                anchor={rightScreen ? "right" : "left"}
                open={drawerOpen}
                PaperProps={{ sx: { width: fullScreen ? "100%" : "25%", background: "#EAECEE" } }}
                style={{ position: 'relative', zIndex: 2 }}
            >
                <Toolbar />
                <Toolbar />
                <Divider />
                <Grid container key="top_grid" justifyContent="center" sx={{ mb: "10px" }}>
                    <Grid container item justifyContent={rightScreen ? "flex-start" : "flex-end"}>
                        <IconButton onClick={handleFilterReset}>
                            <RestartAltIcon />
                        </IconButton>
                        <IconButton onClick={handleSwitchScreen}>
                            {rightScreen ? <SwitchLeftIcon /> : <SwitchRightIcon />}
                        </IconButton>
                        <IconButton onClick={handleFullScreen}>
                            {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                        </IconButton>
                    </Grid>
                    
                    {
                        pageType == 'voyage' ?
                            <Button variant="contained" 
                                    color={color} 
                                    onClick={
                                        // OpenBoundingBoxFilter
                                        () => { setOpenBoundingBox(true) }
                                    }
                            >
                                <Typography color="white">Add Visual Filter</Typography>
                            </Button> 
                            
                            : null
                    }
                    {
                        openBoundingBox ? 
                        // variables_for_map.map(key => {

                            // return (
                                <Accordion>
                                    <AccordionSummary>
                                        <Typography key={'typo'}>{"Select Location"}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails >
                                        {/* <BoundingBoxFilter state={{ key, filter_obj, set_filter_obj, options_flat, pageType, dataset }} /> */}
                                        Bounding Box Here
                                    </AccordionDetails>
                                </Accordion>
                                // )
                        // })
                            : null
                    }
                </Grid>
                <Divider />
                <Grid
                    container
                    item
                    key="main_grid"
                    direction="row"
                    rowSpacing={1} columnSpacing={0.5}
                    justifyContent="center"
                    sx={{ mt:"5px", mb:"15px"}}
                >
                    {Object.keys(filter_obj).length === 0 ?
                        <Grid container item key="empty_filter" justifyContent="center">
                            <Typography color="#808B96">No Filter</Typography>
                        </Grid>
                        :
                        Object.keys(filter_obj).map((key) => {
                            return (
                                <Grid container item key={'container'+key} xs={fullScreen ? 5 : 10}>
                                    <Grid item key={'item1'+key} xs={10}>
                                        <Accordion key={'accord'+key}>
                                            <AccordionSummary key={'accordSum'+key}>
                                                <Typography key={'typo'+key}>{options_flat[key].flatlabel}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails key={'accordDet' + key}>
                                                <ComponentFac key={'compFac' + key} state={{ filter_obj, set_filter_obj, options_flat, pageType, key }} />
                                            </AccordionDetails>
                                        </Accordion>
                                    </Grid>
                                    <Grid item key={'item2'+key} align="center" xs={2}>
                                        <IconButton key={'iconB'+key} onClick={() => { handleDelete(key) }}>
                                            <RemoveCircleOutlineIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            )
                        })
                    }
                </Grid>
                <Divider />
                <Grid container item justifyContent={rightScreen ? "flex-start" : "flex-end"}>
                    <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
                        {rightScreen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </Grid>
            </Drawer>
            {drawerOpen ?
                <Toolbar />
                : null}
        </div>

    )
}