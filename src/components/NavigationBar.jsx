import React from "react";
import { Grid, Icon, Button, Label } from "semantic-ui-react";

const NavigationBar = props => {
  return (
    <div>
      <Grid padded="vertically" stackable>
        <Grid.Row columns={2}>
          <Grid.Column>
            <div>
              <Icon
                name="align justify"
                circular
                size="large"
                color="blue"
                link
                onClick={() => props.setVisible(true)}
              />
            </div>
          </Grid.Column>
          <Grid.Column stretched textAlign="right">
            <div>
              <Button as="div" labelPosition="right">
                <Button basic color="blue">
                  <Icon name="btc" size="large" />
                  Money
                </Button>
                <Label as="a" basic color="blue" pointing="left">
                  2,048
                </Label>
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default NavigationBar;
