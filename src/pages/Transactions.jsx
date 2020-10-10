import React, { useEffect, useState } from "react";
import {
  Grid,
  Segment,
  Container,
  Image,
  Divider,
  Loader,
  Tab,
} from "semantic-ui-react";
import Spinner from "react-bootstrap/Spinner";
import TransactionCard from "../components/transactions/TransactionsCard";
import Navigation from "../components/utils/NavigationBar";
import SideNavigation from "../components/utils/SideNavigation";
import Bottom from "../components/home/HomeBottom";
import { getAccountName, getEthStatus } from "../redux/actions";
import { connect } from "react-redux";
import {
  SBABackground,
  SBADiv,
  HomeSection,
  UtilsBottom,
} from "../components/utils/StyledComponents";
import Information from "../components/transactions/Information";
import { motion } from "framer-motion";

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

    console.log(props)
  }, []);

  if (props.ethUser === undefined) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
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
      menuItem: "Transactions",
      render: () => (
        <motion.div initial="initial" animate="final" variants={variants}>
          <Tab.Pane>
            <TransactionCard id={id} />
          </Tab.Pane>
        </motion.div>
      ),
    },
  ];

  return (
    <HomeSection>
      <SideNavigation
        visible={visible}
        setVisible={setVisible}
        id={id}
        name={props.name}
      >
        <Navigation setVisible={setVisible} id={id} />
        <Segment raised color="blue" textAlign="center">
          <div style={{ fontFamily: "'Lato', sans-serif", fontWeight: "500" }}>
            On this page you can view your recent transactions and sent new
            ones.
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
    name: state.accounts.name,
  };
};

export default connect(mapStateToProps, { getEthStatus, getAccountName })(
  Transactions
);
