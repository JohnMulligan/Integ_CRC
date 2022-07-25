import ColSelector from "./ColSelector";
import ColSelector11 from "./ColSelector11";
import Table from "./Table";
import Modal from "./TableModal";
import React, { useState, useContext } from "react";
import { columnOptions, voyage_default_list } from "./tableVars";
import * as labels from "../../../util/options.json";
import { VoyageContext } from "../../VoyageApp";

export const ColContext = React.createContext({});

function TableApp(props) {
  const [cols, setCols] = React.useState(voyage_default_list);
  const {
    endpoint,
    totalResultsCount,
    setTotalResultsCount,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,

    sortingReq,
    setSortingReq,
    field,
    setField,
    direction,
    setDirection,
  } = React.useContext(props.context);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const [info, setInfo] = useState([]);
  const { search_object } = useContext(VoyageContext);

  // const [totalResultsCount, setTotalResultsCount] = useState(0);
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10);

  // // Sorting
  // const [sortingReq, setSortingReq] = useState(false);
  // const [field, setField] = useState([]);
  // const [direction, setDirection] = useState("asc");

  return (
    <div>
      {/* <Button onClick={()=>console.log("options_tree:", endpoint)}>print options_tree</Button> */}
      <ColContext.Provider
        value={{
          cols,
          setCols,
          endpoint,
          checkbox: false,
          modal: true,
          id,
          setId,
          open,
          setOpen,
          info,
          setInfo,
          columnOptions,
          options_flat: labels,
          search_object,
          totalResultsCount,
          setTotalResultsCount,
          page,
          setPage,
          rowsPerPage,
          setRowsPerPage,
          sortingReq,
          setSortingReq,
          field,
          setField,
          direction,
          setDirection,
        }}
      >
        <ColSelector11 context={ColContext} />
        <Table context={ColContext} />
        <Modal context={ColContext} endpoint="voyage/" />
      </ColContext.Provider>
    </div>
  );
}
export default TableApp;
