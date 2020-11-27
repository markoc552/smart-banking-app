import React, { useEffect, useState } from "react";
import { Segment, Divider, Loader } from "semantic-ui-react";
import Navigation from "../components/utils/NavigationBar";
import SideNavigation from "../components/utils/SideNavigation";
import Bottom from "../components/home/HomeBottom";
import YTPlayer from "../components/references/YTPlayer";
import { connect } from "react-redux";
import { getAccountName, getEthStatus } from "../redux/actions";
import {
  ReferencesDiv,
  ReferencesBG,
  Message,
  UtilSection,
} from "../components/utils/StyledComponents";
import { motion } from "framer-motion";

const References = (props) => {
  const [id, setId] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = props.match.params.id;

    setId(id);
    props.getEthStatus(id);
    props.getAccountName(id);
  }, []);

  if (props.ethUser === undefined) {
    return <Loader />;
  }

  const variants = {
    visible: { opacity: 1, scale: 1.05 },
    hidden: { opacity: 0 },
  };

  return (
    <UtilSection>
      <SideNavigation id={id} user={props.user}>
        <Navigation id={id} onLangChange={props.onLangChange}/>
        <motion.div initial="hidden" animate="visible" variants={variants}>
          <YTPlayer term="adele" style={{paddingTop: "700px"}}/>
        </motion.div>
        <Bottom />
      </SideNavigation>
    </UtilSection>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ethUser: state.accounts[ownProps.match.params.id],
    name: state.accounts.name,
  };
};

export default connect(mapStateToProps, { getEthStatus, getAccountName })(
  References
);
