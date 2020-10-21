import React, { useState, useEffect } from "react";
import NavigationBar from "../components/utils/NavigationBar";
import SideNavigation from "../components/utils/SideNavigation";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAccountName, getAllAccounts, getEthStatus } from "../redux/actions";
import Bottom from "../components/home/HomeBottom";
import {
  UserDescription,
  StyledName,
  UtilsBottom,
  UtilSection,
} from "../components/utils/StyledComponents";
import { Card, Image, Divider, Grid, Button, Loader, Icon } from "semantic-ui-react";
import UpdateModal from "../components/utils/UpdateModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const UserProfile = (props) => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState("default");
  const [modalShow, setModalShow] = useState(false);

  const imageSrc = useSelector((state) => state.accounts.profile);

  useEffect(() => {
    const id = props.match.params.id;

    setId(id);
    props.getEthStatus(id);
    props.getAccountName(id);
    props.getAllAccounts();
  }, []);

  if (props.ethUser === undefined) {
    return <Loader />;
  }

  const variants = {
    visible: { opacity: 1, scale: 1.05, transition: { duration: 0.35 } },
    hidden: { opacity: 0 },
  };

  if (id === "default" || props.usersData === undefined) {
    return <Loader />;
  } else {
    return (
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
        <SideNavigation visible={visible} setVisible={setVisible} id={id}>
          <NavigationBar setVisible={setVisible} id={id} />
          <motion.div initial="hidden" animate="visible" variants={variants}>
            <UserDescription>
              <Card centered raised fluid>
                <Card.Content>
                  <Grid>
                    <Grid.Row columns={2}>
                      <Grid.Column width={2}>
                        <Image
                          src={imageSrc}
                          size="large"
                          style={{ marginLeft: "7px" }}
                        />
                      </Grid.Column>
                      <Grid.Column
                        textAlign="left"
                        verticalAlign="middle"
                        width={8}
                      >
                        <Grid.Row>
                          <StyledName>{props.name}</StyledName>
                        </Grid.Row>
                        <Grid.Row verticalAlign="bottom">
                          <Button
                            animated
                            basic
                            circular
                            color="blue"
                            size="small"
                            onClick={() => setModalShow(true)}
                          >
                            <Button.Content visible>Update</Button.Content>
                            <Button.Content hidden>
                              <Icon name="user plus" />
                            </Button.Content>
                          </Button>
                        </Grid.Row>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Card.Content>
                <Card.Content extra>
                  <Divider hidden />
                  <Card.Header>Username</Card.Header>
                  <Card.Description>
                    {props.usersData[id].username}
                  </Card.Description>
                  <Divider hidden />
                  <Card.Header>First name</Card.Header>
                  <Card.Description>
                    {props.usersData[id].firstname}
                  </Card.Description>
                  <Divider hidden />
                  <Card.Header>Last name</Card.Header>
                  <Card.Description>
                    {props.usersData[id].lastname}
                  </Card.Description>
                  <Divider hidden />
                  <Card.Header>Email</Card.Header>
                  <Card.Description>
                    {props.usersData[id].email}
                  </Card.Description>
                  <Divider hidden />
                </Card.Content>
              </Card>
            </UserDescription>
          </motion.div>
          <UpdateModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            setModalShow={setModalShow}
            title="Update profile"
            action="Update"
            id={id}
          />

          <Bottom />
        </SideNavigation>
      </UtilSection>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    name: state.accounts.name,
    usersData: state.accounts.users,
    ethUser: state.accounts[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, {
  getAccountName,
  getAllAccounts,
  getEthStatus,
})(UserProfile);
