import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Segment,
  Container,
  Image,
  Divider,
  Loader
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
              src={window.ENVIRONMENT.WAULT_IMAGE}
              style={{ borderRadius: "20px", margin: "0 auto" }}
            ></Image>
          </Grid.Column>
          <Grid.Column
            as="div"
            style={{
              textAlign: "center",
              fontFamily: "Roboto Slab, serif",
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
              A bank vault is a secure space where money, valuables, records,
              and documents are stored. It is intended to protect their contents
              from theft, unauthorized use, fire, natural disasters, and other
              threats, much like a safe.
            </Container>
            <Divider hidden />
            <Container>
              Digital Vault is a flexible, scalable, cloud-based platform that
              reaches across silos to gather data from disparate sources, stores
              it securely and standardizes the data. It enables you to have a
              streamlined, more productive day-to-day experience.
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Information;
