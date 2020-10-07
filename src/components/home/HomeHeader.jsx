import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Icon,
  Label,
  Image,
  Container,
  Menu,
  Dropdown,
  Loader,
  Card,
  Statistic,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Background from "../../images/home.png";
import Search from "../utils/Search";
import { HeaderText, Vector } from "../utils/StyledComponents";
import { getContract } from "../../ethereum/instances/factory";
import history from "../../history";
import { connect } from "react-redux";
import TransactionsCard from "../transactions/TransactionsCard";
import WaultsCard from "../waults/WaultsCard";
import DepositGraph from "./DepositGraph";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import Modal from "../utils/Modal";

const imageVariants = {
  initial: { x: "-100%" },
  final: { x: 0, transition: { duration: 1 } },
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.5 },
  final: { opacity: 1, scale: 1 },
};

const HomeHeader = (props) => {
  const [selectedForm, setSelected] = useState("");
  const [modalShow, setModalShow] = useState(false);

  if (props.ethUser === undefined) {
    return <Loader />;
  } else {
    return (
      <Vector>
        <AnimateSharedLayout type="crossfade">
          <Grid padded="vertically" stackable>
            <Grid.Row columns={4}>
              <Grid.Column width={6}>
                <div style={{ marginLeft: "30px" }}>
                  <Icon
                    name="align justify"
                    circular
                    size="large"
                    color="blue"
                    link
                    onClick={() => props.setVisible(true)}
                  />
                </div>
              </Grid.Column>
              <Grid.Column textAlign="center" width={3}>
                <Image
                  centered
                  src={require("../../images/logo.png")}
                  size="tiny"
                />
              </Grid.Column>
              <Grid.Column textAlign="right" width={2}>
                <Search />
              </Grid.Column>
              <Grid.Column textAlign="right" width={4}></Grid.Column>
              <Grid.Column width={1}>
                <Button
                  color="red"
                  basic
                  floated="right"
                  onClick={() => history.push("/")}
                >
                  Logout
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={5}>
                <motion.div
                  initial="initial"
                  animate="final"
                  variants={cardVariants}
                  transition={{ duration: 0.5 }}
                  layout
                >
                  <Card
                    style={{ width: "400px", height: "385px" }}
                    color="blue"
                    centered
                  >
                    <Card.Content>
                      <Card.Header>Deposit/Withdraw</Card.Header>
                    </Card.Content>
                    <Card.Content>
                      <DepositGraph />
                    </Card.Content>
                  </Card>
                </motion.div>
                <motion.div
                  initial="initial"
                  animate="final"
                  variants={cardVariants}
                  transition={{ duration: 0.7 }}
                  style={{ marginTop: "15px" }}
                  layout
                >
                  <Card centered raised color="blue" style={{ width: "400px" }}>
                    <Card.Content>
                      <Card.Header>Statistics</Card.Header>
                    </Card.Content>
                    <Card.Content textAlign="center">
                      <Statistic.Group
                        size="mini"
                        widths="four"
                        floated="right"
                      >
                        <Statistic>
                          <Statistic.Value>
                            <Icon name="history" />
                            22
                          </Statistic.Value>
                          <Statistic.Label>Transactions</Statistic.Label>
                        </Statistic>
                        <Statistic>
                          <Statistic.Value>
                            <Icon name="archive" />
                            25
                          </Statistic.Value>
                          <Statistic.Label>Waults</Statistic.Label>
                        </Statistic>
                        <Statistic>
                          <Statistic.Value>
                            <Icon name="user plus" />5
                          </Statistic.Value>
                          <Statistic.Label>Visits</Statistic.Label>
                        </Statistic>
                      </Statistic.Group>
                    </Card.Content>
                    <Card.Content textAlign="center">
                      <div>
                        <Button.Group basic color="blue">
                          <Button circular>
                            {props.ethUser["balance"]},00 KN
                          </Button>
                          <Menu borderless compact>
                            <Dropdown
                              className="button icon"
                              floating
                              direction="left"
                              simple
                              item
                              trigger={<></>}
                            >
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={() => {
                                    setSelected("deposit");
                                    setModalShow(true);
                                  }}
                                >
                                  <Icon
                                    name="sort amount up"
                                    circular
                                    inverted
                                    color="orange"
                                  />
                                  Deposit Money
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => {
                                    setSelected("withdraw");
                                    setModalShow(true);
                                  }}
                                >
                                  <Icon
                                    name="sort amount down"
                                    circular
                                    inverted
                                    color="green"
                                  />
                                  Withdraw Money
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Menu>
                        </Button.Group>
                      </div>
                    </Card.Content>
                  </Card>
                </motion.div>
              </Grid.Column>
              <Grid.Column width={5}>
                <motion.div
                  initial="initial"
                  animate="final"
                  variants={cardVariants}
                  transition={{ duration: 0.8 }}
                  layout
                >
                  <WaultsCard />
                </motion.div>
                <motion.div
                  initial="initial"
                  animate="final"
                  variants={cardVariants}
                  transition={{ duration: 1 }}
                  layout
                >
                  <TransactionsCard />
                </motion.div>
              </Grid.Column>
              <Grid.Column width={5} textAlign="center">
                <motion.div
                  initial="initial"
                  animate="final"
                  variants={imageVariants}
                  layout
                >
                  <Image fluid as="img" size="large" src={Background} />
                  <HeaderText>The next level of banking</HeaderText>
                  <Grid.Column textAlign="center">
                    <Link to={`/home/transactions/${props.id}`}>
                      <motion.div whileTap={{ scale: 1.1 }}>
                        <Button basic color="blue">
                          Proceed to transactions
                        </Button>
                      </motion.div>
                    </Link>
                  </Grid.Column>
                </motion.div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <AnimatePresence>
            {selectedForm === "deposit" ? (
              <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                setSelected={setSelected}
                title="How much money do you want to deposit?"
                action="Deposit"
              />
            ) : selectedForm === "withdraw" ? (
              <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                setSelected={setSelected}
                title="How much money do you want to withdraw?"
                action="Withdraw"
              />
            ) : (
              <div></div>
            )}
            )}
          </AnimatePresence>
        </AnimateSharedLayout>
      </Vector>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    ethUser: state.accounts[ownProps.id],
  };
};

export default connect(mapStateToProps, null)(HomeHeader);
