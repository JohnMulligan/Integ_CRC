import * as React from 'react';
import {useEffect, useState} from 'react';
import {CircularProgress} from "@mui/material";
import {useQuery} from "react-query";
import Voyage from "./Voyage";

const auth_token = process.env.REACT_APP_AUTHTOKEN
const base_url = process.env.REACT_APP_BASEURL;

export const VoyageContext = React.createContext({});

export default function VoyageApp() {
  const endpoint = "voyage/"

  const menu_label = {
    "voyage_id": "ID",
    "voyage_itinerary": "Itinerary",
    "voyage_dates": "Dates",
    "voyage_crew": "Crew",
    "voyage_ship": "Ship",
    "voyage_captainconnection": "Captain",
    "voyage_shipownerconnection": "Ship Owner",
    "voyage_outcome": "Outcome",
    "voyage_sourceconnection": "Source"
  }

  const {isLoading: isLoading_tree, error: error_tree, data: options_tree} = useQuery('voyage_option_tree',
    () => fetch(base_url + "voyage/", {
      method: "OPTIONS",
      headers: {'Authorization': auth_token}
    }).then(res => res.json()), {refetchOnMount: "always"}
  )
  const {isLoading: isLoading_flat, error: error_flat, data: options_flat} = useQuery('voyage_options_flat',
    () => fetch(base_url + "voyage/?hierarchical=false", {
      method: "OPTIONS",
      headers: {'Authorization': auth_token}
    }).then(res => res.json()), {refetchOnMount: "always"}
  )

  const [search_object, set_search_object] = useState({
  })

  if (error_flat) return 'An error has occurred on option flat: ' + error_flat.message
  if (error_tree) return 'An error has occurred on option tree: ' + error_tree.message
  if (isLoading_flat || isLoading_tree) return <CircularProgress/>

  return (
    <VoyageContext.Provider value={{
      options_tree, options_flat, search_object, set_search_object, endpoint, menu_label}}>
      <Voyage/>
    </VoyageContext.Provider>
  );
}
