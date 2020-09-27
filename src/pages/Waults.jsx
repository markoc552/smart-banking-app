import React, { useEffect, useState } from "react";
import {
  Grid,
  Segment,
  Container,
  Image,
  Divider,
  Loader,
  Tab
} from "semantic-ui-react";
import WaultCard from "../components/waults/WaultsCard";
import Navigation from "../components/utils/NavigationBar";
import SideNavigation from "../components/utils/SideNavigation";
import Bottom from "../components/home/HomeBottom";
import { getAccountName, getEthStatus } from "../redux/actions";
import { connect } from "react-redux";
import { SBADiv, SBABackground, UtilsBottom, HomeSection } from "../components/utils/StyledComponents";
import Information from "../components/waults/Information"

const Waults = (props) => {
  const [id, setId] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = props.match.params.id;

    setId(id);
    props.getEthStatus(id);
  }, []);

  if (props.ethUser === undefined) {
    return <Loader />;
  }

  const panes = [
    {
      menuItem: "Reference",
      render: () => (
        <Tab.Pane>
          <Information />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Waults",
      render: () => (
        <Tab.Pane>
          <WaultCard id={id} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <HomeSection>
      <SideNavigation visible={visible} setVisible={setVisible} id={id}>
        <Navigation setVisible={setVisible} id={id} />
        <Segment raised color="blue" textAlign="center">
          <div style={{ fontFamily: "'Lato', sans-serif", fontWeight: "500" }}>
            On this page you can view and manage your waults.
          </div>
        </Segment>
        <Tab panes={panes} />
        <UtilsBottom>
          <Bottom />
        </UtilsBottom>
      </SideNavigation>
    </HomeSection>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ethUser: state.accounts[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { getEthStatus })(Waults);
