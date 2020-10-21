import React, { useEffect, useState } from "react";
import { Grid, Image, Loader } from "semantic-ui-react";
import Navigation from "../components/utils/NavigationBar";
import SideNavigation from "../components/utils/SideNavigation";
import Bottom from "../components/home/HomeBottom";
import { getAccountName, getEthStatus, getWaults } from "../redux/actions";
import { connect, useSelector } from "react-redux";
import {
  SBADiv,
  SBABackground,
  UtilsBottom,
  UtilSection,
} from "../components/utils/StyledComponents";
import { motion } from "framer-motion";
import WaultsDashboard from "../components/waults/WaultsDashboard";

const Waults = (props) => {
  const [id, setId] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = props.match.params.id;

    setId(id);
    props.getEthStatus(id);
    props.getWaults(id);
  }, []);

  const variants = {
    visible: { opacity: 1, transition: { duration: 0.35 } },
    hidden: { opacity: 0, scale: 1.05 },
  };

  if (props.ethUser === undefined) {
    return <Loader />;
  }

  return (
    <UtilSection>
      <SideNavigation id={id} name={props.name}>
        <Navigation id={id} />
        <motion.div initial="hidden" animate="visible" variants={variants}>
          <WaultsDashboard id={id} />
        </motion.div>
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

export default connect(mapStateToProps, {
  getEthStatus,
  getWaults,
})(Waults);
