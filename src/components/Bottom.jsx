import React from 'react'
import { Menu, Item } from "semantic-ui-react"

const Bottom = (props) => {
  return (
    <div style={{marginBottom: "10px", marginTop: "10px"}}>
    <Menu borderless inverted color="blue">
      <Menu.Item icon="copyright outline" name="BudiMladBudiLud ltd."/>
    </Menu>
  </div>
  )
}

export default Bottom
