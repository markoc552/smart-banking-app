import React, { useEffect, useState, lazy } from "react";
import { Grid, Image, Loader } from "semantic-ui-react";
import Spinner from "react-bootstrap/Spinner";
import Navigation from "../components/utils/NavigationBar";
import SideNavigation from "../components/utils/SideNavigation";
import Bottom from "../components/home/HomeBottom";
import { getAccountName, getEthStatus, getWaultStatus } from "../redux/actions";
import { connect, useSelector } from "react-redux";
import { UtilSection } from "../components/utils/StyledComponents";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import TransactionDashboard from "../components/transactions/TransactionDashboard";

const Transactions = (props) => {
  const [id, setId] = useState(null);
  const [visible, setVisible] = useState(false);

  const address = useSelector((state) => state.waults.active);
  const waults = useSelector((state) => state.waults.status);

  useEffect(() => {
    const id = props.match.params.id;
    setId(id);
    props.getEthStatus(id);
    props.getAccountName(id);
    props.getWaultStatus(address)
  }, []);

  const variants = {
    visible: { opacity: 1, scale: 1.05, transition: { duration: 0.35 } },
    hidden: { opacity: 0 },
  };

  return props.ethUser === undefined ? (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    <UtilSection>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <SideNavigation id={id} name={props.name}>
        <Navigation id={id} onLangChange={props.onLangChange}/>
        <motion.div initial="hidden" animate="visible" variants={variants}>
          <TransactionDashboard eth={props.ethUser} id={id} />
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

export default connect(mapStateToProps, { getEthStatus, getAccountName, getWaultStatus })(
  Transactions
);
