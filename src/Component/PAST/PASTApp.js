import * as React from "react";
import PAST from "./PAST";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {CircularProgress} from "@mui/material";

const auth_token = process.env.REACT_APP_AUTHTOKEN
const base_url = process.env.REACT_APP_BASEURL;

export const PASTContext = React.createContext({});

export default function PASTApp(props) {
  const [queryData, setQueryData] = React.useState({
    targets: [500001,500002,500003],
    type: "slave",
  })

  const [data, setData] = useState([]);

  const [endpoint, setEndpoint] = useState((() => {
    switch (queryData.type) {
      case "slave": return "past/enslaved/"
      case "enslaver": return "past/enslavers/"
    }
  })())

  const {isLoading: isLoading_tree, error: error_tree, data: options_tree} = useQuery('past_option_tree',
    () => fetch(base_url + endpoint, {
      method: "OPTIONS",
      headers: {'Authorization': auth_token}
    }).then(res => res.json()), {refetchOnMount: "always"}
  )
  const {isLoading: isLoading_flat, error: error_flat, data: options_flat} = useQuery('past_options_flat',
    () => fetch(base_url + endpoint + "?hierarchical=false", {
      method: "OPTIONS",
      headers: {'Authorization': auth_token}
    }).then(res => res.json()), {refetchOnMount: "always"}
  )

  useEffect(() => {
    setEndpoint((() => {
      switch (queryData.type) {
        case "slave": return "past/enslaved/"
        case "enslaver": return "past/enslavers/"
      }
    })())
    const fetchData = async ()=> {
      const promises = queryData.targets.map(target => {
        let queryData = new FormData();
        queryData.append("id", target.toString());
        queryData.append("id", target.toString());
        return fetch(base_url + endpoint, {
          method: "POST",
          body: queryData,
          headers: {'Authorization': auth_token}
        }).then(res => res.json()).then(res => res[0])
      })
      const response = await Promise.all(promises)
      setData(response)
    }
    fetchData().catch(console.error);
  }, [queryData])

  const menu_label = {
    "post_disembark_location": "Post Disembark Location",
    "voyage": "Voyage",
    "age": "Age",
    "captive_fate": "Captive Fate",
    "captive_status": "Captive Status",
    "documented_name": "name",
    "id": "Id",
    "transactions": "Transactions",
    "sources": "sources"
  }


  const [search_object, set_search_object] = useState({
  })

  if (error_flat) return 'An error has occurred on option flat: ' + error_flat.message
  if (error_tree) return 'An error has occurred on option tree: ' + error_tree.message
  if (isLoading_flat || isLoading_tree) return <CircularProgress/>
  return (
    <PASTContext.Provider value={{queryData, setQueryData, data, options_tree, options_flat, search_object, set_search_object, menu_label, endpoint}}>
      <PAST/>
    </PASTContext.Provider>
  )
}