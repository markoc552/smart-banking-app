import React, { useState, useEffect } from "react";
import SideNavigation from "../components/utils/SideNavigation";
import { connect } from "react-redux";
import { getAccountName, getEthStatus, getWaults } from "../redux/actions";
import {
  HomeSection,
  Background,
  WelcomeDialog,
  InovativeDialog,
} from "../components/utils/StyledComponents";
import { Loader, Grid } from "semantic-ui-react";
import Navigation from "../components/utils/NavigationBar";
import Bottom from "../components/home/HomeBottom";
import Modal from "../components/utils/Modal";
import HomeBenefits from "../components/home/HomeBenefits";
import AvailableMoney from "../components/home/AvailableMoney";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";
import history from "../history"

const Home = (props) => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(null);

  const [selectedForm, setSelected] = useState("");
  const [modalShow, setModalShow] = useState(false);

  let [amount, setAmount] = useState(props.eth === undefined ? 0 : props.eth.money)

  useEffect(() => {
    const id = props.match.params.id;
    setId(id);
    props.getAccountName(id);
    props.getEthStatus(id);
    props.getWaults(id);
  }, []);

  const variants = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35 },
    },
    hidden: { opacity: 0, scale: 1.05 },
  };

  if (props.eth === undefined || props.name === undefined) {
    return <Loader />;
  } else {
    return (
      <HomeSection>
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
          <Navigation id={id} onLangChange={props.onLangChange} />
          <motion.div initial="hidden" animate="visible" variants={variants}>
            <Grid>
              <Grid.Row></Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column textAlign="center">
                  <InovativeDialog>
                    <FormattedMessage
                      id="home.inovative"
                      defaultMessage="INOVATIVE SOLUTION FOR FUTURE OF BANKING"
                    />
                  </InovativeDialog>
                </Grid.Column>
                <Grid.Column></Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column textAlign="center" verticalAlign="top">
                  <WelcomeDialog>
                    <FormattedMessage
                      id="home.welcome"
                      defaultMessage="Welcome to SBA Banking app!"
                    />
                  </WelcomeDialog>
                </Grid.Column>
                <Grid.Column textAlign="center">
                  <AvailableMoney
                    eth={amount}
                    setSelected={setSelected}
                    setModalShow={setModalShow}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row></Grid.Row>
              <Grid.Row></Grid.Row>
              <Grid.Row columns={1} centered>
                <Grid.Column stretched centered textAlign="center">
                  <HomeBenefits />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </motion.div>
          {selectedForm === "deposit" ? (
            <Modal
              id={id}
              show={modalShow}
              onHide={() => setModalShow(false)}
              setSelected={setSelected}
              amount={amount}
              setAmount={setAmount}
              title={
                <FormattedMessage
                  id="home.dialog.deposit"
                  defaultMessage="How much money do you want to deposit?"
                />
              }
              action="Deposit"
              ethUser={props.eth}
            />
          ) : selectedForm === "withdraw" ? (
            <Modal
              id={id}
              show={modalShow}
              onHide={() => setModalShow(false)}
              setSelected={setSelected}
              amount={amount}
              setAmount={setAmount}
              title={
                <FormattedMessage
                  id="home.dialog.withdraw"
                  defaultMessage="How much money do you want to withdraw?"
                />
              }
              action="Withdraw"
              ethUser={props.eth}
            />
          ) : (
            <div></div>
          )}
          <Bottom />
        </SideNavigation>
      </HomeSection>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    name: state.accounts.name,
    eth: state.accounts[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, {
  getAccountName,
  getEthStatus,
  getWaults,
})(Home);
