import React, { useState, useEffect } from "react";
import EthereumStack from "../components/home/EthereumStack";
import MobileBankingStack from "../components/home/MobileBankingStack";
import HomeBottom from "../components/home/HomeBottom";
import HomeHeader from "../components/home/HomeHeader";
import SideNavigation from "../components/utils/SideNavigation";
import { connect } from "react-redux";
import { getAccountName, getEthStatus } from "../redux/actions";
import { HomeSection, Background } from "../components/utils/StyledComponents";
import { Loader } from "semantic-ui-react";

const Home = props => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    const id = props.match.params.id;
    setId(id);
    props.getAccountName(id);
    props.getEthStatus(id);
  }, []);

  if (props.eth === undefined && props.name === undefined) {
    return <Loader />;
  } else {
    return (
      <HomeSection>
        <SideNavigation
          id={id}
          setId={setId}
          setVisible={setVisible}
          visible={visible}
        >
          <HomeHeader setVisible={setVisible} id={id} />
          <Background>
            <EthereumStack />
            <MobileBankingStack />
          </Background>
          <HomeBottom />
        </SideNavigation>
      </HomeSection>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    name: state.accounts.name,
    eth: state.accounts[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, { getAccountName, getEthStatus })(
  Home
);
