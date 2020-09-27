import React, { useEffect, useState } from "react";
import { Segment, Divider, Loader } from "semantic-ui-react";
import Navigation from "../components/utils/NavigationBar";
import SideNavigation from "../components/utils/SideNavigation";
import Bottom from "../components/home/HomeBottom";

import YTPlayer from "../components/references/YTPlayer";
import { connect } from "react-redux";
import { getAccountName, getEthStatus } from "../redux/actions";
import {
  ReferencesDiv,
  ReferencesBG,
  Message,
  HomeSection
} from "../components/utils/StyledComponents";

const References = props => {
  const [id, setId] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = props.match.params.id;

    setId(id);
    props.getEthStatus(id);
    props.getAccountName(id);
  }, []);

  if(props.ethUser === undefined) {
    return <Loader/>
  }

  return (
    <HomeSection>
        <SideNavigation
          visible={visible}
          setVisible={setVisible}
          id={id}
          user={props.user}
        >
          <Navigation setVisible={setVisible} id={id}/>
          <Segment raised color="blue" textAlign="center" vertical>
            <Message>
              Here you have embedded Youtube player so you can educate yourself
              about ethereum technology.
              <Divider hidden />
              Search something like: ethereum technology, solidity, smart
              contracts...
            </Message>
          </Segment>
          <YTPlayer term="cryptocurrency" />
          <Bottom />
        </SideNavigation>
    </HomeSection>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ethUser: state.accounts[ownProps.match.params.id],
    name: state.accounts.name
  };
};

export default connect(mapStateToProps, {getEthStatus, getAccountName})(References);
