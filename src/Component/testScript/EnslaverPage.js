import ResponsiveAppBar from "./NavBar";
import {useState} from "react";

export default function EnslaverPage(props) {
  const [search_object, set_search_object] = useState({
    'dataset': ["0", "0"]
  })
  const [dataset, setDataset] = useState("0");
  return (
    <div>
      <ResponsiveAppBar state={{pageType: "enslaver", dataset, setDataset}}/>
    </div>
  )
}