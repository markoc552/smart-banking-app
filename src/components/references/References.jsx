import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Label,
  Icon,
  Segment,
  Container,
  Image,
  Header,
  Divider
} from "semantic-ui-react";
import Navigation from "../NavigationBar";
import SideNavigation from "../home/SideNavigation";
import Bottom from "../home/HomeBottom";
import styled from "styled-components";
import _ from "lodash";
import YTPlayer from "./YTPlayer";

const ReferencesDiv = styled.div`
  position: absolute;
  height: 100vh;
  left: 2%;
  right: 2%;
  top: 0;
  bottom: 0;
  background-color: white;
  opacity: 0.97;
`;

const Background = styled.div`
  position: absolute;
  height: 100vh;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const References = props => {
  const [id, setId] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setId(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <Background>
      <ReferencesDiv>
        <SideNavigation visible={visible} setVisible={setVisible} id={id}>
          <Navigation setVisible={setVisible} />
          <Segment raised color="blue" textAlign="center" secondary vertical>
            <div
              style={{ fontFamily: "'Lato', sans-serif", fontWeight: "500" }}
            >
              Here you have embedded Youtube player so you can educate yourself
              about ethereum technology.
              <Divider hidden />
              Maybe try to search: ethereum technology, solidity, smart
              contracts...
            </div>
          </Segment>
          <YTPlayer term="ethereum technology" />
          <Bottom />
        </SideNavigation>
      </ReferencesDiv>
    </Background>
  );
};

export default References;
