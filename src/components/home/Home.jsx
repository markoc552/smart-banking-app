import React, { useState, useEffect } from "react";
import { Sidebar } from "semantic-ui-react";
import styled from "styled-components";
import EthereumStack from "./EthereumStack";
import MobileBankingStack from "./MobileBankingStack";
import HomeBottom from "./HomeBottom";
import SidebarMenu from "./SidebarMenu";
import HomeHeader from "./HomeHeader";

const HomeSection = styled.div`
  position: absolute;
  right: 1%;
  left: 1%;
  font-family: "Lato", sans-serif;
`;

const Home = props => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    setId(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <HomeSection>
      <Sidebar.Pushable as="div">
        <SidebarMenu setVisible={setVisible} id={id} visible={visible} />
        <Sidebar.Pusher>
          <HomeHeader setVisible={setVisible} />
          <EthereumStack />
          <MobileBankingStack />
          <HomeBottom />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </HomeSection>
  );
};

export default Home;
