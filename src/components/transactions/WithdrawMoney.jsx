import React, { useState, useEffect } from "react";
import HDWalletProvider from "truffle-hdwallet-provider"
import ReactDOM from "react-dom";
import { Button, Input, Loader } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import history from "../../history";
import { getContract } from "../../ethereum/instances/factory";
import { connect } from "react-redux";
import {getEthStatus} from "../../redux/actions"
import web3 from "../../ethereum/web3"

const WithdrawMoney = props => {
  const [money, setMoney] = useState(0);

  useEffect(() => {
    const id = props.match.params.id;

    props.getEthStatus(id);
  }, []);

  const Id = props.match.params.id;

  const withDrawMoney = async () => {
    const owner = props.ethUser.wallet;

    const mnemonic = props.ethUser.mnemonic;

    const contractAddress = props.ethUser["ethAddress"];

    const contract = getContract(contractAddress, mnemonic);

    await contract.methods
      .withDrawMoney(money, window.ENVIRONMENT.AUTHORITY_ADDRESS)
      .send({
        from: String(owner.address),
        gas: "6721975"
      });

    history.push(`/home/${Id}`);
  };

  if (props.ethUser === undefined) {
    return <Loader />;
  }

  return ReactDOM.createPortal(
    <div
      onClick={() => history.push(`/home/${Id}`)}
      className="ui dimmer modals visible active"
    >
      <div
        onClick={event => event.stopPropagation()}
        className="ui standard modal visible active mini"
        style={{ textAlign: "center", margin: "0 auto" }}
      >
        <div class="header">Withdraw money from account</div>
        <div className="content">
          <Input
            onChange={e => setMoney(e.target.value)}
            label={{ basic: true, content: "HRK" }}
            labelPosition="right"
            placeholder="Amount of money..."
          />
        </div>
        <div className="actions" style={{ textAlign: "center" }}>
          <Button primary circular onClick={withDrawMoney}>
            Take money
          </Button>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ethUser: state.accounts[ownProps.match.params.id]
  };
};


export default connect(mapStateToProps, {getEthStatus})(WithdrawMoney);
