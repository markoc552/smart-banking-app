import React, { useState, useEffect } from "react";
import SideNavigation from "../components/utils/SideNavigation";
import { connect } from "react-redux";
import { getAccountName, getEthStatus } from "../redux/actions";
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

const Home = (props) => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(null);

  const [selectedForm, setSelected] = useState("");
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const id = props.match.params.id;
    setId(id);
    props.getAccountName(id);
    props.getEthStatus(id);
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
          <Navigation id={id} />
          <motion.div initial="hidden" animate="visible" variants={variants}>
            <Grid>
              <Grid.Row></Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column textAlign="center">
                  <InovativeDialog>
                    INOVATIVE SOLUTION FOR FUTURE OF BANKING
                  </InovativeDialog>
                </Grid.Column>
                <Grid.Column></Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column textAlign="center" verticalAlign="top">
                  <WelcomeDialog>Welcome to SBA Banking app!</WelcomeDialog>
                </Grid.Column>
                <Grid.Column textAlign="center">
                  <AvailableMoney
                    eth={props.eth}
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
              show={modalShow}
              onHide={() => setModalShow(false)}
              setSelected={setSelected}
              title="How much money do you want to deposit?"
              action="Deposit"
              ethUser={props.eth}
            />
          ) : selectedForm === "withdraw" ? (
            <Modal
              show={modalShow}
              onHide={() => setModalShow(false)}
              setSelected={setSelected}
              title="How much money do you want to withdraw?"
              action="Withdraw"
              ethUser={props.eth}
            />
          ) : (
            <div></div>
          )}
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

export default connect(mapStateToProps, { getAccountName, getEthStatus })(Home);
