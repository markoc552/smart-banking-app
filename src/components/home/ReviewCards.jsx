import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

const CardExampleGroups = () => (
  <Card.Group centered>
    <Card>
      <Card.Content>
        <Image
          floated='left'
          size='tiny'
          src='https://www.flaticon.com/svg/static/icons/svg/145/145867.svg'
        />
        <Card.Header>John Doe</Card.Header>
        <Card.Meta>Long time user</Card.Meta>
        <Card.Description>
          I am very happy with this app. I can recommend it to anyone!
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='blue'>
            Was this helpful?
          </Button>
        </div>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Image
          floated='left'
          size='tiny'
          src='https://www.flaticon.com/svg/static/icons/svg/3048/3048176.svg'
        />
        <Card.Header>Steve Sanders</Card.Header>
        <Card.Meta>New user</Card.Meta>
        <Card.Description>
          I am new to this kind of apps. But all I can say is that their simplicity made it easier for me to adapt.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='blue'>
            Was this helpful?
          </Button>
        </div>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Image
          floated='left'
          size='tiny'
          src='https://www.flaticon.com/svg/static/icons/svg/560/560216.svg'
        />
        <Card.Header>Elliot Baker</Card.Header>
        <Card.Meta>Software developer</Card.Meta>
        <Card.Description>
          This app is awesome!
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='blue'>
            Was this helpful?
          </Button>
        </div>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Image
          floated='left'
          size='tiny'
          src='https://www.flaticon.com/svg/static/icons/svg/949/949635.svg'
        />
        <Card.Header>Molly Thomas</Card.Header>
        <Card.Meta>New User</Card.Meta>
        <Card.Description>
          In the first it was not easy to use, but over time it became much easier. Best regards!
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='blue'>
            Was this helpful?
          </Button>
        </div>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Image
          floated='left'
          size='tiny'
          src='https://www.flaticon.com/svg/static/icons/svg/3463/3463779.svg'
        />
      <Card.Header>Jenny Doe</Card.Header>
        <Card.Meta>Long time user</Card.Meta>
        <Card.Description>
          I have few remarks on this app.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='blue'>
            Was this helpful?
          </Button>
        </div>
      </Card.Content>
    </Card>
  </Card.Group>
)

export default CardExampleGroups
