import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import { Button, Form, Loader } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import history from "../../history";
import { getContract } from "../../ethereum/instances/factory";
import { getEthStatus } from "../../redux/actions";
import { connect } from "react-redux";

const NewTransaction = props => {

  useEffect(() => {
    const id = props.match.params.id;

    props.getEthStatus(id);
  }, []);


  const renderInput = ({ input, label, meta }) => {
    return (
      <Form.Field>
        <label>{label}</label>
        <Form.Input {...input} />
      </Form.Field>
    );
  };

  const Id = props.match.params.id;

  const sendTransaction = async formValues => {
    console.log(formValues);
    const owner = props.ethUser.wallet;

    const mnemonic = props.ethUser.mnemonic;

    const contractAddress = props.ethUser["ethAddress"];

    const contract = getContract(contractAddress, mnemonic);

    await contract.methods.sendMoney(formValues.receiver, formValues.amount).send({
      from: String(owner.address),
      gas: "6721975"
    });

    history.push(`/home/${Id}`);
  };

  if(props.ethUser === undefined){
    return <Loader/>
  }

  return ReactDOM.createPortal(
    <div
      onClick={() => history.push(`/home/transactions/${Id}`)}
      className="ui dimmer modals visible active"
    >
      <div
        onClick={event => event.stopPropagation()}
        className="ui standard modal visible active small"
        style={{ textAlign: "center" }}
      >
        <div className="header">Create new transaction</div>
        <div className="content">
          <form
            className="ui form error formWidth"
            onSubmit={props.handleSubmit(sendTransaction)}
          >
            <Field
              name="receiver"
              type="text"
              label="Receiver"
              component={renderInput}
            />
            <Field
              name="amount"
              type="text"
              label="Amount of money"
              component={renderInput}
            />
            <div className="actions" style={{ textAlign: "center" }}>
              <Button primary circular>
                Send transaction
              </Button>
            </div>
          </form>
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

const wrap = reduxForm({ form: "newTransaction" })(NewTransaction);

export default connect(mapStateToProps, { getEthStatus })(wrap);
