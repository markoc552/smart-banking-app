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
} from "../components/utils/StyledComponents";
import { Card, Image, Divider, Grid, Button, Loader } from "semantic-ui-react";
import Graph from "../components/profile/Graph";
import UpdateModal from "../components/utils/UpdateModal";

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

  if (id === "default" || props.usersData === undefined) {
    return <Loader />;
  } else {
    return (
      <SideNavigation visible={visible} setVisible={setVisible} id={id}>
        <NavigationBar setVisible={setVisible} id={id} />
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
                        basic
                        color="blue"
                        size="small"
                        onClick={() => setModalShow(true)}
                      >
                        Update
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
              <Card.Description>{props.usersData[id].email}</Card.Description>
              <Divider hidden />
            </Card.Content>
          </Card>
        </UserDescription>
        <UpdateModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          title="Update profile"
          action="Update"
          id={id}
        />
        <UtilsBottom>
          <Bottom />
        </UtilsBottom>
      </SideNavigation>
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
