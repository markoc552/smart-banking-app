import React, { useState, useEffect } from 'react'
import { Table, Header, Row, Cell, Image, Content, Flag } from "semantic-ui-react"
import CurrencyAPI from "../currency"

const ExchangeTable = (props) => {

  const [rates, setRates] = useState(null);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await CurrencyAPI.get("/latest");

      setRates(response.data.rates);
    }
    fetchAPI();
  }, [])

  if (rates === null) {
    return <div>Loading...</div>
  } else {
    return (
      <Table basic='very' celled collapsing>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Currency</Table.HeaderCell>
        <Table.HeaderCell>Rate</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Header as='h4'>
            <Flag name="australia"/>
            <Header.Content>
              AUD
              <Header.Subheader>1.0</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>{rates.AUD}</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as='h4'>
            <Flag name="canada"/>
            <Header.Content>
              CAD
              <Header.Subheader>1.0</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>{rates.CAD}</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as='h4'>
            <Flag name="denmark"/>
            <Header.Content>
              DNK
              <Header.Subheader>1.0</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>{rates.DKK}</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as='h4' image>
            <Flag name="norway"/>
            <Header.Content>
              NOK
              <Header.Subheader>1.0</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>{rates.NOK}</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>)
  }
}



export default ExchangeTable
