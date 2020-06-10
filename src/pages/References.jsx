import React, { useEffect, useState } from "react";
import { Segment, Divider } from "semantic-ui-react";
import Navigation from "../components/utils/NavigationBar";
import SideNavigation from "../components/utils/SideNavigation";
import Bottom from "../components/home/HomeBottom";

import YTPlayer from "../components/references/YTPlayer";
import { connect } from "react-redux";
import { getAccountName } from "../redux/actions";
import {
  ReferencesDiv,
  ReferencesBG,
  Message
} from "../components/utils/StyledComponents";

const References = props => {
  const [id, setId] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = props.match.params.id;

    props.getAccountName(id);
    setId(id);
  }, []);

  return (
    <ReferencesBG>
      <ReferencesDiv>
        <SideNavigation
          visible={visible}
          setVisible={setVisible}
          id={id}
          user={props.user}
        >
          <Navigation setVisible={setVisible} />
          <Segment raised color="blue" textAlign="center" vertical>
            <Message>
              Here you have embedded Youtube player so you can educate yourself
              about ethereum technology.
              <Divider hidden />
              Search something like: ethereum technology, solidity, smart
              contracts...
            </Message>
          </Segment>
          <YTPlayer term="ethereum technology" />
          <Bottom />
        </SideNavigation>
      </ReferencesDiv>
    </ReferencesBG>
  );
};

const mapStateToProps = state => {
  return { user: state.accounts.user };
};

export default connect(mapStateToProps, { getAccountName })(References);
