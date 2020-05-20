import React, { useState, useEffect } from "react";
import { Sidebar, Container } from "semantic-ui-react";
import styled from "styled-components";
import EthereumStack from "./EthereumStack";
import MobileBankingStack from "./MobileBankingStack";
import HomeBottom from "./HomeBottom";
import SidebarMenu from "./SidebarMenu";
import HomeHeader from "./HomeHeader";
import SideNavigation from "./SideNavigation";

const HomeSection = styled.div`
  position: absolute;
  right: 1%;
  left: 1%;
  font-family: "Lato", sans-serif;
`;

const Background = styled.div`
  background-image: url("https://www.publicdomainpictures.net/pictures/80000/velka/blue-background-clipart-1392210818CaU.jpg");
  background-position: 30% 50%;
`;

const Home = props => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    setId(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <HomeSection>
      <SideNavigation
        id={id}
        setId={setId}
        setVisible={setVisible}
        visible={visible}
      >
        <HomeHeader setVisible={setVisible} />
        <Background>
          <EthereumStack />
          <MobileBankingStack />
          <HomeBottom />
        </Background>
      </SideNavigation>
    </HomeSection>
  );
};

export default Home;
