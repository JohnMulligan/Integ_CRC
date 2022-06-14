import React, { Component, PureComponent, useState, useEffect } from "react";
// import { Form, Input, InputNumber, Radio, Modal, Cascader ,Tree} from 'antd'
import axios from "axios";
import Plot from "react-plotly.js";
import { Box, Typography, Card, CardContent } from "@mui/material";
import {
  donut_value_vars,
  donut_name_vars,
} from "../../VoyagePage/Result/vars";
const AUTH_TOKEN = process.env.REACT_APP_AUTHTOKEN;
axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

const featuredPosts = {
  title: "Data Visualization - Pie",
  date: "June 14, Tue",
  description:
    "The sobriquet was first applied around 1879. While it was not intended as flattering, it washardly inappropriate. The Academicians at whom it was aimed had worked and socialized in NewYork, the Hudson's port city, and had painted the river and its shores with varying frequency.Most important, perhaps, was that they had all maintained with a certain fidelity a manner oftechnique and composition consistent with those of America's first popular landscape artist,Thomas Cole, who built a career painting the Catskill Mountain scenery bordering the HudsonRiver. A possible implication in the term applied to the group of landscapists was that many ofthem had, like Cole, lived on or near the banks of the Hudson. Further, the river had long servedas the principal route to other sketching grounds favored by the Academicians, particularly theAdirondacks and the mountains of Vermont and New Hampshire.different ways.",
};

function PieComponent() {
  const [plot_field, setarrx] = useState([]);
  const [plot_value, setarry] = useState([]);
  const [option, setOption] = useState({
    field: donut_name_vars[0],
    value: donut_value_vars[1],
  });
  const [aggregation, setAgg] = React.useState("sum");
  useEffect(() => {
    var value = option.value;
    var data = new FormData();
    data.append("hierarchical", "False");
    data.append("groupby_fields", option.field);
    data.append("groupby_fields", option.value);
    data.append("agg_fn", "sum");
    data.append("cachename", "voyage_export");

    axios
      .post("/voyage/groupby", (data = data))
      .then(function (response) {
        setarrx(Object.keys(response.data[value]));
        setarry(Object.values(response.data[value]));
        console.log(plot_value);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [option.field, option.value, aggregation]);

  return (

    <div>
      <Card sx={{ display: "flex" }}>
        <Box>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <div>
              <CardContent>
                <Typography component="h2" variant="h5">
                  {featuredPosts.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {featuredPosts.date}
                </Typography>https://github.com/jirany/Integ_CRC/pull/2/conflict?name=src%252FComponent%252FHomePage%252FHomePagePlotly%252FPieHome.js&ancestor_oid=1b88acfb7c29775a6dafd8c6a2578704000aa78d&base_oid=60c82b8d1304f47e9a69437f9ac14d2f7298456f&head_oid=8022ed7e9b3c5f758331ddcb4796082c8b01dc33
                <Typography variant="subtitle1" paragraph>
                  {featuredPosts.description}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  Continue reading...
                </Typography>
              </CardContent>
            </div>
          </CardContent>
        </Box>

        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Plot
              data={[
                {
                  labels: plot_field,
                  values: plot_value,
                  type: "pie",
                  mode: "lines+markers",
                },
              ]}
              layout={{ title: "Pie Plot" }}
              config={{ responsive: true }}
            />
          </CardContent>
        </Box>
      </Card>
    </div>
  );
}

export default PieComponent;
