import * as React from "react";
import { useEffect } from "react";
import {useContext, useState, useQuery} from "react";
import {PASTContext} from "./PASTApp";
import Story from "./RelationGraph/Story.js";
import Grid from '@mui/material/Grid';
import TablePagination from '@mui/material/TablePagination';
import './RelationGraph/styles.css'



const auth_token = process.env.REACT_APP_AUTHTOKEN
const base_url = process.env.REACT_APP_BASEURL;



export default function Gallery(props){
    const [gData, setGData] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [resPerPage, setResPerPage] = React.useState(12);
    const [total, setTotal] = React.useState(0);
    const [gallery, setGallery] = React.useState([]);
    const {remoteControl, dataChange, setChipData} = props;

    const { search_object, typeForTable } = React.useContext(PASTContext);

    function handleChangePage(event, newPage){
        if(newPage < 0 || newPage > parseInt(total / resPerPage, 10)) return;
        //console.log("newPage: ", newPage)
        setPage(parseInt(newPage, 10));
      };
    
    function handleChangeRowsPerPage(event){
        //console.log("newPer: ", event.target.value)
        setResPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() =>{
      setPage(0);
    }, [typeForTable])


    useEffect(() => {
        console.log("page number data update!");
        let queryData = new FormData();
        for (var property in search_object) {
          search_object[property].forEach((v) => {
            queryData.append(property, v);
          });
        }
        console.log("form: ", queryData);
        fetch(base_url + (typeForTable == "slaves" ? "past/enslaved/" : "past/enslavers/"), {
            method: "POST",
            body: queryData,
            headers: {'Authorization': auth_token}
          }).then(res => setTotal(res.headers.get("total_results_count")));
    }, [search_object, typeForTable])
    

    useEffect(() => {
        let queryData = new FormData();
        queryData.append("results_page", page + 1);
        queryData.append("results_per_page", resPerPage);
        for (var property in search_object) {
          search_object[property].forEach((v) => {
            queryData.append(property, v);
          });
        }
        fetch(base_url + (typeForTable == "slaves" ? "past/enslaved/" : "past/enslavers/"), {
            method: "POST",
            body: queryData,
            headers: {'Authorization': auth_token}
          }).then(res => res.json()).then(res => {
              //console.log("fetch res: ", res)
              setGData(res);
          })

    }, [page, resPerPage, search_object, typeForTable])

    useEffect(() => {
        const oldGallery = [];
        //console.log("gData", gData)
        gData.forEach(item => {
            oldGallery.push(<Grid item xs={12} sm={6} md={4} lg={3}><Story target={item} dynamic={true} remoteControl = {remoteControl("body")} dataChange = {dataChange} setChipData={setChipData} slavery={typeForTable}/></Grid>)
        })
        setGallery(oldGallery);
    }, [gData])
    
  return (
    <div className = "storybackground" marginTop ={{ xs: 2, md: 2, lg:4 }} >
      {/* <button onClick={() => console.log("gallery: ", gallery)}>print</button> */}
    <TablePagination
      component="div"
      count={total}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={resPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[12, 24, 36, 48, 96]}
    />

    <Grid  container spacing={{ xs: 6, md: 4, lg:5}} padding={{ xs: 4, md: 3, lg:4 }} paddingTop={{ xs: 0, md: 0, lg:0 }}  >
        {gallery}
    </Grid>
    </div>
  )

}
