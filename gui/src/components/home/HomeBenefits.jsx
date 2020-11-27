import React from "react";
import {
  BenefitsDialog,
  BenefitsTitle,
  BenefitsDescription,
} from "../utils/StyledComponents";
import { Grid, Icon } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";

const HomeBenefits = (props) => {
  return (
    <BenefitsDialog>
      <Grid>
        <Grid.Row>
          <Grid.Column textAlign="left">
            <BenefitsTitle>
              <FormattedMessage
                id="home.benefits.headline"
                defaultMessage="Benefits of smart banking apps!"
              />
            </BenefitsTitle>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column textAlign="center"></Grid.Column>
          <Grid.Column textAlign="center">
            <Icon name="home" color="blue" size="big" />
            <BenefitsDescription>
              <FormattedMessage
                id="home.benefits.home"
                defaultMessage="You can send money directly from your couch"
              />
            </BenefitsDescription>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column textAlign="center">
            <Icon name="building" color="blue" size="big" />
            <BenefitsDescription>
              <FormattedMessage
                id="home.benefits.bank"
                defaultMessage="You can make any contract without going to bank"
              />
            </BenefitsDescription>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Icon name="envelope" color="blue" size="big" />
            <BenefitsDescription>
              <FormattedMessage
                id="home.benefits.envelope"
                defaultMessage="All transactions for recent month is sent directly on your app"
              />
            </BenefitsDescription>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </BenefitsDialog>
  );
};

export default HomeBenefits;
