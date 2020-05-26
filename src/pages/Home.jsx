import React, { useState, useEffect } from "react";
import { Sidebar, Container } from "semantic-ui-react";
import styled from "styled-components";
import EthereumStack from "../components/home/EthereumStack";
import MobileBankingStack from "../components/home/MobileBankingStack";
import HomeBottom from "../components/home/HomeBottom";
import SidebarMenu from "../components/utils/SidebarMenu";
import HomeHeader from "../components/home/HomeHeader";
import SideNavigation from "../components/utils/SideNavigation";
import { connect } from "react-redux";
import { getAccountInfo } from "../redux/actions";
import {HomeSection, Background} from "../components/utils/StyledComponents"


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
