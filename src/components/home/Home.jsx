import React, { useState, useEffect } from "react";
import { Sidebar, Container } from "semantic-ui-react";
import styled from "styled-components";
import EthereumStack from "./EthereumStack";
import MobileBankingStack from "./MobileBankingStack";
import HomeBottom from "./HomeBottom";
import SidebarMenu from "./SidebarMenu";
import HomeHeader from "./HomeHeader";
import SideNavigation from "./SideNavigation";
import { connect } from "react-redux";
import { getAccountInfo } from "../../redux/actions";

const HomeSection = styled.div`
  position: absolute;
  right: 0%;
  left: 0%;
  font-family: "Lato", sans-serif;
`;

const Background = styled.div`
  background-position: 17% 50%;
`;

const Home = props => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    const id = props.match.params.id;
    setId(id);
    props.getAccountInfo(id);
  }, []);

  return (
    <HomeSection>
      <SideNavigation
        id={id}
        setId={setId}
        setVisible={setVisible}
        visible={visible}
        user={props.user}
      >
        <HomeHeader setVisible={setVisible} />
        <Background>
          <EthereumStack />
          <MobileBankingStack />
        </Background>
        <HomeBottom />
      </SideNavigation>
    </HomeSection>
  );
};

const mapStateToProps = state => {
  return { user: state.accounts.user };
};

export default connect(mapStateToProps, { getAccountInfo })(Home);
