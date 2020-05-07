import React from 'react'
import { Menu, Item, Input, Icon, Label, Button, Image } from "semantic-ui-react"
const Navigation = (props) => {
  return (
    <Menu style={{marginTop: "15px"}} color="blue" inverted stackable fluid floated borderless>
      <Menu.Item as="a" onClick={() => props.setVisible(true)}>
        <Icon name="align justify" size="large"/>
      </Menu.Item>
      <Menu.Item as='a'>
      <Icon name='exchange' size="large"/> Transactions
      <Label color='blue' floating size="small">
        22
      </Label>
    </Menu.Item>
    <Menu.Item position="right">
      <Image size="mini" src={require("../logo.png")}/>SMART BANKING APP
    </Menu.Item>
      <Menu.Item position='right'>
        <Button as='div' labelPosition='right' inverted>
      <Button basic color='white' inverted>
        <Icon name='circle notch loading' color="white" size="large" />
        Account money
      </Button>
      <Label as='a' basic color='white' pointing='left'>
        2,048
      </Label>
    </Button>
      </Menu.Item>
    </Menu>
  )
}

export default Navigation
