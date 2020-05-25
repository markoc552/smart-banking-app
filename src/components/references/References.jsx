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
import {connect} from "react-redux"
import {getAccountInfo} from "../../redux/actions"

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

const Message = styled.div`
font-family: 'Lato', sans-serif;
font-weight: 500;
`

const References = props => {
  const [id, setId] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = props.match.params.id;

    props.getAccountInfo(id);
    setId(id);
  }, []);

  return (
    <Background>
      <ReferencesDiv>
        <SideNavigation visible={visible} setVisible={setVisible} id={id} user={props.user}>
          <Navigation setVisible={setVisible} />
          <Segment raised color="blue" textAlign="center" vertical>
            <Message>
              Here you have embedded Youtube player so you can educate yourself
              about ethereum technology.
              <Divider hidden />
              Search something like:  ethereum technology, solidity, smart
              contracts...
            </Message>
          </Segment>
          <YTPlayer term="ethereum technology" />
          <Bottom />
        </SideNavigation>
      </ReferencesDiv>
    </Background>
  );
};

const mapStateToProps = (state) => {
  return {user: state.accounts.user}
}

export default connect(mapStateToProps, {getAccountInfo})(References);
