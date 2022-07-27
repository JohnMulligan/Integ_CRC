import ResponsiveAppBar from "./NavBar";
import {useEffect, useMemo, useState} from "react";
import {enslaved_default_list} from "../PAST/vars";
import * as options_flat from "../util/enslaved_options.json"
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {useQuery} from "react-query";
import Button from "@mui/material/Button";
import axios from "axios";
import {LinearProgress} from "@mui/material";

const auth_token = process.env.REACT_APP_AUTHTOKEN;
const base_url = process.env.REACT_APP_BASEURL;
const endpoint = "past/enslaved/";

const AUTH_TOKEN = process.env.REACT_APP_AUTHTOKEN;
axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

export default function SlavePage(props) {
  const [search_object, set_search_object] = useState({
    'dataset': ["0", "0"]
  })
  const [dataset, setDataset] = useState("0");
  const defaultColumns = useMemo(()=>{
    const result = []
    enslaved_default_list.forEach((column)=>{
      result.push({field: column, headerName: options_flat[column].flatlabel,
        flex:options_flat[column].flatlabel.length*6, minWidth: options_flat[column].flatlabel.length*6+100})
    })
    return result;
  }, [enslaved_default_list])
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({currPage: 0, rowsPerPage:20})
  const [columns, setColumns] = useState(defaultColumns)
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
      <ResponsiveAppBar state={{pageType: "slave", dataset, setDataset}}/>
      <Button onClick={()=>console.log(dataList)}>Print Data</Button>
      <DataGrid
        columns={columns}
        rows={dataList}
        rowCount={totalRows}
        loading={isLoading}
        components={{
          LoadingOverlay: LinearProgress,
          Toolbar: GridToolbar,
        }}
        rowsPerPageOptions={[10, 20, 50]}
        pagination
        page={pagination.currPage}
        pageSize={pagination.rowsPerPage}
        paginationMode="server"
        onPageChange={(newPage) => {
          setPagination({...pagination, currPage: newPage})
        }}
        onPageSizeChange={(newPageSize) => {
          setPagination({...pagination, rowsPerPage: newPageSize})
        }}
      />
    </div>
  )
}