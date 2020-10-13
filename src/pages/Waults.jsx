import React, { useEffect, useState } from "react";
import { Grid, Image, Loader } from "semantic-ui-react";
import WaultCard from "../components/waults/WaultsCard";
import Navigation from "../components/utils/NavigationBar";
import SideNavigation from "../components/utils/SideNavigation";
import Bottom from "../components/home/HomeBottom";
import { getAccountName, getEthStatus } from "../redux/actions";
import { connect } from "react-redux";
import {
  SBADiv,
  SBABackground,
  UtilsBottom,
  UtilSection,
} from "../components/utils/StyledComponents";
import Information from "../components/waults/Information";
import { motion } from "framer-motion";
import WaultsDashboard from "../components/waults/WaultsDashboard";

const variants = {
  initial: { opacity: 0, scale: 1.2 },
  final: { opacity: 1, scale: 1 },
};

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

  return (
    <UtilSection>
      <SideNavigation id={id} name={props.name}>
        <Navigation id={id} />
        <WaultsDashboard />
        <Bottom />
      </SideNavigation>
    </UtilSection>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ethUser: state.accounts[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { getEthStatus })(Waults);
