import React, { useEffect, useState } from "react";
import {
  Grid,
  Segment,
  Container,
  Image,
  Divider
} from "semantic-ui-react";
import TransactionCard from "../components/transactions/TransactionsCard";
import Navigation from "../components/utils/NavigationBar";
import SideNavigation from "../components/utils/SideNavigation";
import Bottom from "../components/home/HomeBottom";
import {getAccountName} from "../redux/actions"
import {connect} from "react-redux"
import {SBABackground, SBADiv} from "../components/utils/StyledComponents"

const Transactions = props => {
  const [id, setId] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = props.match.params.id;

    setId(id);
    props.getAccountName(id)
  }, []);

  return (
    <SBABackground>
      <SBADiv>
        <SideNavigation visible={visible} setVisible={setVisible} id={id} user={props.user}>
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
                    src={window.ENVIRONMENT.TRANSACTIONS_IMAGE}
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
      </SBADiv>
    </SBABackground>
  );
};

const mapStateToProps = (state) => {
  return {user: state.accounts.user}
}

export default connect(mapStateToProps, {getAccountName})(Transactions);
