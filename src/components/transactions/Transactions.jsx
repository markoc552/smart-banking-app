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
import TransactionCard from "./TransactionsCard";
import Navigation from "../NavigationBar";
import SideNavigation from "../home/SideNavigation";
import Bottom from "../home/HomeBottom";
import styled from "styled-components";

const TransactionDiv = styled.div`
  position: absolute;
  left: 5%;
  right: 5%;
  top: 0;
  bottom: 0;
  background-color: white;
  opacity: 0.97;
`;

const Background = styled.div`
  position: absolute;
  height: 153vh;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-image: url("https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const Transactions = props => {
  const [id, setId] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setId(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <Background>
      <TransactionDiv>
        <SideNavigation visible={visible} setVisible={setVisible} id={id}>
          <Navigation setVisible={setVisible} />
          <Segment raised color="blue" textAlign="center">
            <div
              style={{ fontFamily: "'Lato', sans-serif", fontWeight: "500" }}
            >
              On this page you can view your recent transactions and sent new
              ones.
            </div>
          </Segment>
          <div style={{ paddingBottom: "20px" }}>
            <Grid centered padded>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Image
                    size="large"
                    as="img"
                    src="https://cdn.pixabay.com/photo/2018/01/13/18/55/leather-3080553_1280.jpg"
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
                    Ethereum Transactions
                  </Container>
                  <Divider />
                  <Container>
                    Transaction is the way the external world interacting with
                    the Ethereum network. Transaction is used when we wish to
                    modify or update the state stored in the Ethereum network.
                    Within an Ethereum network circulates a native currency:
                    ether. Besides a native currency, ether is mainly used as
                    the transaction fee or service charge (called gas in
                    Ethereum) when Ethereum network is processing the
                    transaction.
                  </Container>
                  <Divider hidden />
                  <Container>
                    Ethereum is an account-based blockchain implementation.
                    There are two types of account: Externally-Owned Account and
                    Contract Account. We will introduce them in a logical way.
                  </Container>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
          <TransactionCard id={id} />
          <Bottom />
        </SideNavigation>
      </TransactionDiv>
    </Background>
  );
};

export default Transactions;
