import React from "react";
import { Grid, Image, Container, Divider } from "semantic-ui-react";

const MobileBankingStack = props => {
  return (
    <div style={{ paddingTop: "20px" }}>
      <Grid centered>
        <Grid.Row columns={2}>
          <Grid.Column textAlign="center" centered>
            <Container
              as="div"
              style={{ fontFamily: "'Lato', sans-serif", paddingLeft: "20px" }}
            >
              <Container
                as="div"
                style={{ fontFamily: "Roboto Slab, serif", fontWeight: "bold" }}
              >
                Mobile banking
              </Container>
              <Divider />
              Mobile banking is a service provided by a bank or other financial
              institution that allows its customers to conduct financial
              transactions remotely using a mobile device such as a smartphone
              or tablet. Unlike the related internet banking it uses software,
              usually called an app, provided by the financial institution for
              the purpose.
              <Divider hidden />
              Mobile banking is usually available on a 24-hour basis. Some
              financial institutions have restrictions on which accounts may be
              accessed through mobile banking, as well as a limit on the amount
              that can be transacted. Mobile banking is dependent on the
              availability of an internet or data connection to the mobile
              device.
            </Container>
          </Grid.Column>
          <Grid.Column>
            <Image
              as="img"
              src={window.ENVIRONMENT.MOBILE_IMAGE}
              style={{ borderRadius: "15px", height: "300px" }}
              centered
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default MobileBankingStack;
