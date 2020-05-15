import React from "react";
import { Grid, Icon } from "semantic-ui-react";
import styled from "styled-components";

const HomeBottom = props => {
  const Bottom = styled.div`
    margin-top: 10px;
    height: 35px;
    padding-top: 10px;
    width: 1100px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    border-top: 0.5px solid rgb(81, 147, 252);
    border-left: 0.5px solid rgb(81, 147, 252);
    border-right: 0.5px solid rgb(81, 147, 252);
    color: rgb(81, 147, 252);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  `;

  return (
    <Bottom>
      <Icon name="copyright outline" />
      SBA ltd. All rights reserved.
    </Bottom>
  );
};

export default HomeBottom;
