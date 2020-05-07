import React, { useState } from 'react'
import { Card, Image, Button, List, Icon } from "semantic-ui-react"

const WaultsCard = (props) => {

  const [waults, setWaults] = useState(null);

  const renderWaults = () => {
    if (waults === null) {
      return <div><div><Icon name="archive" size="massive" aria-label="No waults"/></div>You don't have any active waults</div>
    } else {
      return (<List.Item>
        <Image avatar src='/images/avatar/small/helen.jpg' />
        <List.Content>
          <List.Header>Snickerdoodle</List.Header>
          An excellent companion
        </List.Content>
      </List.Item>);
    }
  }

  return (
    <div>
    <Card fluid color="blue">
    <Card.Content>
        <Card.Header>Waults</Card.Header>
        <Card.Meta>Currently active waults</Card.Meta>
      </Card.Content>
      <Card.Content extra textAlign="center">
        <List celled>
          {renderWaults()}
        </List>
      </Card.Content>
      <Card.Content extra textAlign="center">
        <Button primary>Create new wault</Button>
      </Card.Content>
    </Card>
  </div>
  )
}

export default WaultsCard
