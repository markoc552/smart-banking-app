import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Label,
  Icon,
  Segment,
  Container,
  Image,
  Header,
  Divider
} from "semantic-ui-react";
import WaultCard from "./WaultsCard";
import Navigation from "../NavigationBar";
import SideNavigation from "../home/SideNavigation";
import Bottom from "../home/HomeBottom";
import styled from "styled-components";
import {getAccountInfo} from "../../redux/actions";
import {connect} from "react-redux"

const WaultDiv = styled.div`
  position: absolute;
  left: 5%;
  right: 5%;
  top: 0;
  bottom: 0;
  background-color: white;
  opacity: 0.97;
  height: 100vh;
`;

const Background = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 100vh;
  background-color: #fafafa;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const Waults = props => {
  const [id, setId] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = props.match.params.id;

    setId(id);
    props.getAccountInfo(id)
  }, []);

  return (
    <Background>
      <WaultDiv>
        <SideNavigation visible={visible} setVisible={setVisible} id={id} user={props.user}>
          <Navigation setVisible={setVisible} />
          <Segment raised color="blue" textAlign="center">
            <div
              style={{ fontFamily: "'Lato', sans-serif", fontWeight: "500" }}
            >
              On this page you can view and manage your waults.
            </div>
          </Segment>
          <div style={{ paddingBottom: "20px" }}>
            <Grid centered padded>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Image
                    size="large"
                    as="img"
                    src="https://cdn.pixabay.com/photo/2013/07/12/18/56/vault-154023_1280.png"
                    style={{ borderRadius: "20px", margin: "0 auto" }}
                  ></Image>
                </Grid.Column>
                <Grid.Column
                  as="div"
                  style={{
                    textAlign: "center",
                    fontFamily: "Roboto Slab, serif"
                  }}
                >
                  <Container
                    as="div"
                    style={{ fontWeight: "bold", paddingTop: "30px" }}
                  >
                    Digital Waults
                  </Container>
                  <Divider />
                  <Container>
                    A bank vault is a secure space where money, valuables,
                    records, and documents are stored. It is intended to protect
                    their contents from theft, unauthorized use, fire, natural
                    disasters, and other threats, much like a safe.
                  </Container>
                  <Divider hidden />
                  <Container>
                    Digital Vault is a flexible, scalable, cloud-based platform
                    that reaches across silos to gather data from disparate
                    sources, stores it securely and standardizes the data. It
                    enables you to have a streamlined, more productive
                    day-to-day experience.
                  </Container>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
          <WaultCard id={id} />
          <Bottom />
        </SideNavigation>
      </WaultDiv>
    </Background>
  );
};

const mapStateToProps = (state) => {
  return {user: state.accounts.user}
}

export default connect(mapStateToProps, {getAccountInfo})(Waults);
