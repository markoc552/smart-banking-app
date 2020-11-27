import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Portal,
  Button,
  Segment,
  Header,
  Image,
} from "semantic-ui-react";
import { connect, useSelector } from "react-redux";
import { chooseProfilePicture } from "../../redux/actions";
import {motion} from "framer-motion"
import "../../index.css"

const imageGroup1 = [
  {
    url:
      "https://www.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png",
  },
  { url: "https://www.flaticon.com/svg/static/icons/svg/145/145867.svg" },
  { url: "https://www.flaticon.com/svg/static/icons/svg/3048/3048176.svg" },
  { url: "https://www.flaticon.com/svg/static/icons/svg/560/560216.svg" },
];

const imageGroup2 = [
  { url: "https://www.flaticon.com/svg/static/icons/svg/949/949635.svg" },
  { url: "https://www.flaticon.com/svg/static/icons/svg/3463/3463779.svg" },
  { url: "https://www.flaticon.com/svg/static/icons/svg/147/147144.svg" },
  { url: "https://www.flaticon.com/svg/static/icons/svg/168/168734.svg" },
];

const ProfilePictureChooser = (props) => {
  return (
    <Portal open={props.open}>
      <Segment
        style={{
          left: "55%",
          position: "fixed",
          top: "30%",
          zIndex: 1000,
        }}
      >
        <Header>Choose your profile picture</Header>
        <Image.Group size="tiny">
          {imageGroup1.map((index) => (
            <Image
              className="registerImage"
              bordered
              onClick={() => {
                props.chooseProfilePicture(index.url);
                props.setOpen(false);
              }}
              src={index.url}
            />
          ))}
        </Image.Group>
        <Image.Group size="tiny">
          {imageGroup2.map((index) => (
            <Image
              className="registerImage"
              bordered
              onClick={() => {
                props.chooseProfilePicture(index.url);
                props.setOpen(false);
              }}
              src={index.url}
            />
          ))}
        </Image.Group>
      </Segment>
    </Portal>
  );
};

export default connect(null, { chooseProfilePicture })(ProfilePictureChooser);
