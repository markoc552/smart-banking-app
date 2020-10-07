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

const profile1 =
  "https://www.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png";
const profile2 = "https://www.flaticon.com/svg/static/icons/svg/145/145867.svg";
const profile3 =
  "https://www.flaticon.com/svg/static/icons/svg/3048/3048176.svg";
const profile4 = "https://www.flaticon.com/svg/static/icons/svg/560/560216.svg";
const profile5 = "https://www.flaticon.com/svg/static/icons/svg/949/949635.svg";
const profile6 =
  "https://www.flaticon.com/svg/static/icons/svg/3463/3463779.svg";
const profile7 = "https://www.flaticon.com/svg/static/icons/svg/147/147144.svg";
const profile8 = "https://www.flaticon.com/svg/static/icons/svg/168/168734.svg";

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
          <Image
            bordered
            onClick={() => {
              props.chooseProfilePicture(profile1);
              props.setOpen(false);
            }}
            src={profile1}
          />
          <Image
            bordered
            onClick={() => {
              props.chooseProfilePicture(profile2);
              props.setOpen(false);
            }}
            src={profile2}
          />
          <Image
            bordered
            onClick={() => {
              props.chooseProfilePicture(profile3);
              props.setOpen(false);
            }}
            src={profile3}
          />
          <Image
            bordered
            onClick={() => {
              props.chooseProfilePicture(profile4);
              props.setOpen(false);
            }}
            src={profile4}
          />
        </Image.Group>
        <Image.Group size="tiny">
          <Image
            bordered
            onClick={() => {
              props.chooseProfilePicture(profile5);
              props.setOpen(false);
            }}
            src={profile5}
          />
          <Image
            bordered
            onClick={() => {
              props.chooseProfilePicture(profile6);
              props.setOpen(false);
            }}
            src={profile6}
          />
          <Image
            bordered
            onClick={() => {
              props.chooseProfilePicture(profile7);
              props.setOpen(false);
            }}
            src={profile7}
          />
          <Image
            bordered
            onClick={() => {
              props.chooseProfilePicture(profile8);
              props.setOpen(false);
            }}
            src={profile8}
          />
        </Image.Group>
      </Segment>
    </Portal>
  );
};

export default connect(null, {chooseProfilePicture})(ProfilePictureChooser);
