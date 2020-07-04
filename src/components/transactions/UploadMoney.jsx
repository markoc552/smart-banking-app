import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button, Input, Loader, Label } from "semantic-ui-react";
import history from "../../history";
import { getContract } from "../../ethereum/instances/factory";
import { getEthStatus } from "../../redux/actions";
import { connect } from "react-redux";

const UploadMoney = props => {
  const [money, setMoney] = useState(0);

  useEffect(() => {
    const id = props.match.params.id;

    props.getEthStatus(id);
  }, []);

  const Id = props.match.params.id;

  const uploadMoney = async () => {
    const contractAddress = props.ethUser["ethAddress"];

    const contract = getContract(contractAddress);

    const owner = props.ethUser.wallet;

    await contract.methods
      .addMoneyToAccount()
      .send({
        from: String(owner.address),
        value: String(money)
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
        style={{ textAlign: "center" }}
      >
        <div class="header">Upload money to account</div>
        <div className="content">
          <Input
            onChange={e => setMoney(e.target.value)}
            label={{ basic: true, content: "HRK" }}
            labelPosition="right"
            placeholder="Amount of money..."
          />
        </div>
        <div className="actions" style={{ textAlign: "center" }}>
          <Button primary circular onClick={uploadMoney}>
            Send money
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

export default connect(mapStateToProps, { getEthStatus })(UploadMoney);
