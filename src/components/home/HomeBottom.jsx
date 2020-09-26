import React from "react";
import { Icon, Grid, Image } from "semantic-ui-react";
import { Bottom, BottomText, BottomHeader, BottomCopyright } from "../utils/StyledComponents";

const HomeBottom = (props) => {
  return (
    <Bottom>
      <Grid padded>
        <Grid.Row columns={3}>
          <Grid.Column width={7}>
            <Image
              centered
              src={require("../../images/logo.png")}
              size="tiny"
            />
          </Grid.Column>
          <Grid.Column width={4} textAlign="left">
            <Grid.Row><BottomHeader>Why ethereum?</BottomHeader></Grid.Row>
            <Grid.Row><BottomText>Cryptocurrency</BottomText></Grid.Row>
            <Grid.Row><BottomText>Smartcontract</BottomText></Grid.Row>
            <Grid.Row><BottomText>Ethreuem technology</BottomText></Grid.Row>
          </Grid.Column>
          <Grid.Column width={4}>
            <Grid.Row><BottomHeader>Popular smart banking apps</BottomHeader></Grid.Row>
            <Grid.Row><BottomText>N26</BottomText></Grid.Row>
            <Grid.Row><BottomText>Transferwise</BottomText></Grid.Row>
            <Grid.Row><BottomText>Monzo</BottomText></Grid.Row>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3}>
          <Grid.Column width={7}>
            <BottomCopyright>© 2020 SBA Banking Inc. All right reserved</BottomCopyright>
          </Grid.Column>
          <Grid.Column width={4} textAlign="left"></Grid.Column>
          <Grid.Column width={4}></Grid.Column>
        </Grid.Row>
      </Grid>
    </Bottom>
  );
};

export default HomeBottom;
