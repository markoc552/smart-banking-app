import React from "react";
import { Grid, Icon } from "semantic-ui-react";
import styled from "styled-components";

const HomeBottom = props => {
  const Bottom = styled.div`
    margin-top: 15px;
    height: 35px;
    padding-top: 10px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    box-shadow: 3px 3px 5px 6px #ccc;
    position: relative;
    bottom: 0;
  `;

  return (
    <Bottom>
      <Icon name="copyright outline" />
      SBA ltd. All rights reserved.
    </Bottom>
  );
};

export default HomeBottom;
