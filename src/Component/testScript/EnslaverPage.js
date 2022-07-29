import ResponsiveAppBar from "./NavBar";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import PASTTable from "./PASTTable";
import {enslaver_default_list} from "../PAST/vars";
import * as options_flat from "../util/enslaver_options.json";

const AUTH_TOKEN = process.env.REACT_APP_AUTHTOKEN;
axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
const endpoint = "past/enslavers/";

export default function EnslaverPage(props) {
  const [search_object, set_search_object] = useState({})
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({currPage: 0, rowsPerPage:20})
  const [dataList, setDataList] = useState([]);

  useEffect(()=>{
    // console.log("fetching...", pagination)
    setIsLoading(true);
    setDataList([]);
    let queryData = new FormData();
    queryData.append("hierarchical", "False");
    queryData.append("results_page", pagination.currPage + 1);
    queryData.append("results_per_page", pagination.rowsPerPage);
    axios
      .post("/" + endpoint, queryData)
      .then(res => {
        setTotalRows(Number(res.headers.total_results_count))
        setDataList(res.data)
        setIsLoading(false);
      })
  }, [pagination])

  return (
    <div style={{height: "100%"}}>
      <ResponsiveAppBar state={{pageType: "enslaver", search_object, set_search_object}}/>
      {/*<Button onClick={()=>console.log(dataList)}>Print Data</Button>*/}
      <PASTTable state={{dataList, totalRows, pagination, setPagination, isLoading, set_search_object}}/>
    </div>
  )
}