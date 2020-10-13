import React, { useEffect, useState, lazy } from "react";
import { Grid, Image, Loader } from "semantic-ui-react";
import Spinner from "react-bootstrap/Spinner";
import Navigation from "../components/utils/NavigationBar";
import SideNavigation from "../components/utils/SideNavigation";
import Bottom from "../components/home/HomeBottom";
import { getAccountName, getEthStatus } from "../redux/actions";
import { connect } from "react-redux";
import { UtilSection } from "../components/utils/StyledComponents";
import { motion } from "framer-motion";
import TransactionDashboard from "../components/transactions/TransactionDashboard";

const variants = {
  initial: { opacity: 0, scale: 1.2 },
  final: { opacity: 1, scale: 1 },
};

const Transactions = (props) => {
  const [id, setId] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = props.match.params.id;

    setId(id);
    props.getEthStatus(id);
    props.getAccountName(id);

    console.log(props);
  }, []);

  if (props.ethUser === undefined) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }
  return (
    <UtilSection>
      <SideNavigation id={id} name={props.name}>
        <Navigation id={id} />
        <TransactionDashboard />
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
  Transactions
);
