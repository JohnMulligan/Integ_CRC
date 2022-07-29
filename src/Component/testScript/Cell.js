import {Button} from "@mui/material";

export default function Cell(props) {
  const {row, field} = props
  switch (field) {
    case "id":
      return <Button onClick={()=>alert(row.id)}>{row.id}</Button>
    default:
      return row[field];
  }
}