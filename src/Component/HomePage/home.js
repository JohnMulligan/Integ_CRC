import * as React from "react";
import {useEffect, useState} from "react";
import TrackVisibility from "react-on-screen";
import {Animated} from "react-animated-css";
import {Box, Button, Divider, List, ListItem} from "@mui/material";
import ResponsiveAppBar from "../NavBar";
import Container from "@mui/material/Container";
import BarComponent from "./HomePagePlotly/BarHome";
import PieComponent from "./HomePagePlotly/PieHome";
import ScatterComponent from "./HomePagePlotly/ScatterHome";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import TableHome from "./HomePagePlotly/TableHome/TableHome";
// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });


export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    });
  };
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  const sample = [<ScatterComponent/>, <BarComponent/>, <PieComponent/>, < TableHome/>];
  return (
    // <ThemeProvider theme={darkTheme}>
    <div>
      <ResponsiveAppBar/>
      <Container maxWidth={false}>
        <List>
          {sample.map((label, index) => (
            <ListItem key={index}>
              <TrackVisibility partialVisibility>
                {({isVisible}) => (
                  <Animated
                    animationIn="slideInLeft"
                    animationOut="fadeOut"
                    isVisible={isVisible}
                    // animationInDuration ="2000"
                  >
                    {label}
                    <Divider/>
                  </Animated>
                )}
              </TrackVisibility>
            </ListItem>
          ))}

        </List>
        <Box display="flex"
             justifyContent="flex-end"
             alignItems="flex-end" padding={4}>
          {showButton && (
            <Button variant="outlined" onClick={scrollToTop} startIcon={<ArrowDropUpIcon/>}>
              Up
            </Button>
          )}
        </Box>
      </Container>

    </div>


    // </ThemeProvider>
  );
}
