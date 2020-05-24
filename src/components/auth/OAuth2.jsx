import React, { useEffect, useState } from "react";
import { CLIENT_ID } from "../../env";
import { signIn, signOut } from "../../redux/actions";
import { connect } from "react-redux";
import history from "../../history";

const OAuth2 = props => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({ clientId: CLIENT_ID, scope: "email" })
        .then(() => {
          setAuth(window.gapi.auth2.getAuthInstance());
          onAuthChange(auth.isSignedIn.get());
          auth.isSignedIn.listen(onAuthChange);
        });
    });
  }, []);

  const onAuthChange = signedIn => {
    if (signedIn) {
      const ID = auth.currentUser.get().getId();
      props.signIn(ID);
      setTimeout(() => history.push(`/home/${ID}`), 2000);
    } else {
      props.signOut();
    }
  };

  const onSignInClick = () => {
    auth.signIn();
    onAuthChange(auth.isSignedIn.get());
  };

  return (
    <button className="ui red google button" onClick={onSignInClick}>
      <i className="google icon" />
      Sign in
    </button>
  );
};

const mapStateToProps = state => {
  return { userID: state.oauth.userID, isSigned: state.oauth.isSigned };
};

export default connect(mapStateToProps, { signIn, signOut })(OAuth2);
