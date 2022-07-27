import * as React from 'react';
import { useEffect, useState } from 'react';
import { CircularProgress } from "@mui/material";
import { useQuery } from "react-query";
import Voyage from "./Voyage";
import { columnOptions } from './Result/Table/tableVars';
import * as options_flat from '../util/options.json'

const auth_token = process.env.REACT_APP_AUTHTOKEN
const base_url = process.env.REACT_APP_BASEURL;

export const VoyageContext = React.createContext({});

export default function VoyageApp(props) {
  const endpoint = "voyage/"
  const [dataSet, setDataSet] = useState("0")
  const [search_object, set_search_object] = useState({
    'dataset': ["0", "0"]
  })

  const [labels, setLabels] = React.useState([]);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // Handle Drawer Open and Close
  const handleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(!drawerOpen);
  };

  // if (error_flat) return 'An error has occurred on option flat: ' + error_flat.message
  // if (error_tree) return 'An error has occurred on option tree: ' + error_tree.message
  // if (isLoading_flat || isLoading_tree) return <CircularProgress/>
  // Pagination

  const [totalResultsCount, setTotalResultsCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [sortingReq, setSortingReq] = useState(false);
  const [field, setField] = useState([]);
  const [direction, setDirection] = useState("asc");
  
  return (
    <VoyageContext.Provider value={{
      options_flat,
      search_object, set_search_object,
      drawerOpen, setDrawerOpen, handleDrawerOpen, handleDrawerClose,
      endpoint, nested_tree: columnOptions,
      dataSet, setDataSet, labels, setLabels, pageType: "voyage",
      sortingReq, setSortingReq,
      field, setField,
      direction, setDirection,
      totalResultsCount, setTotalResultsCount,
      page, setPage,
      rowsPerPage, setRowsPerPage
    }}>
      <Voyage />
    </VoyageContext.Provider>
  );
}
