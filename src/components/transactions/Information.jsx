import React from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Segment,
  Container,
  Image,
  Divider,
  Loader,
  Tab
} from "semantic-ui-react";

const Information = (props) => {
  return (
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
  )
}

export default Information
