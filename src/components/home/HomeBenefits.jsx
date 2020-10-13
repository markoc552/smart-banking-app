import React from "react";
import {
  BenefitsDialog,
  BenefitsTitle,
  BenefitsDescription,
} from "../utils/StyledComponents";
import { Grid, Icon } from "semantic-ui-react";

const HomeBenefits = (props) => {
  return (
    <BenefitsDialog>
      <Grid>
        <Grid.Row>
          <Grid.Column textAlign="left">
            <BenefitsTitle>Benefits of smart banking apps!</BenefitsTitle>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column textAlign="center">
            <Icon name="database" color="white" inverted size="big" />
            <BenefitsDescription style={{ color: "white" }}>
              All your data is encrypted and safely stored
            </BenefitsDescription>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Icon name="home" color="violet" size="big" />
            <BenefitsDescription>
              You can send money directly from your couch
            </BenefitsDescription>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column textAlign="center">
            <Icon name="building" color="violet" size="big" />
            <BenefitsDescription>
              You can make any contract without going to bank
            </BenefitsDescription>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Icon name="envelope" color="violet" size="big" />
            <BenefitsDescription>
              All transactions for recent month is sent directly on your app
            </BenefitsDescription>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </BenefitsDialog>
  );
};

export default HomeBenefits;
