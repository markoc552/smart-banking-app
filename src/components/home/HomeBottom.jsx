import React from "react";
import { Icon, Grid, Image } from "semantic-ui-react";
import {
  Bottom,
  BottomText,
  BottomHeader,
  BottomCopyright,
} from "../utils/StyledComponents";
import { FormattedMessage } from "react-intl";

const HomeBottom = (props) => {
  return (
    <Bottom>
      <div style={{ position: "relative", margin: "0 auto" }}>
        <Image
          centered
          src={require("../../assets/images/logo.png")}
          size="tiny"
        />
        <BottomCopyright>
          <FormattedMessage
            id="home.bottom"
            defaultMessage="© 2020 SBA Banking Inc. All right reserved"
          />
        </BottomCopyright>
      </div>
    </Bottom>
  );
};

export default HomeBottom;
