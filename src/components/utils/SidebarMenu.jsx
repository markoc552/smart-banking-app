import React, { useState, useEffect } from "react";
import { Grid, Image, Button, Icon, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { SideText, SideName, SideItem } from "../utils/StyledComponents";
import { getContract } from "../../ethereum/instances/factory";
import { connect, useSelector } from "react-redux";
import history from "../../history";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import { blue, purple } from "@material-ui/core/colors";
import "../../index.css";

const SidebarMenu = (props) => {
  const styled = {
    borderLeft: "5px solid black",
  };

  const profile = useSelector((state) => {
    console.log(state.accounts.profile);
    return state.accounts.profile;
  });

  const location = window.location.href;

  const [selected, setSelected] = useState("");
  const [menuColor, setMenuColor] = useState("#f5f5f5")

  const PurpleSwitch = withStyles({
    switchBase: {
      color: blue[300],
      "&$checked": {
        color: blue[700],
      },
      "&$checked + $track": {
        backgroundColor: blue[400],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const [checked, setChecked] = useState({
    checkedA: true,
    checkedB: true,
  });
  const [inverted, setInverted] = useState(true);

  const handleChange = (event) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });

    event.target.checked ? setMenuColor("#f5f5f5") : setMenuColor("#424242");
  };

  if (props.ethUser === undefined) {
    return <Loader />;
  } else {
    return (
      <div
        style={{ height: "100vh", width: "19vw", backgroundColor: `${menuColor}` }}
      >
        <Grid centered padded textAlign="center" verticalAlign="middle">
          <Grid.Row>
            <Grid.Column>
              <Image centered size="tiny" src={profile} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <SideText>{props.name}</SideText>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Button
                color="instagram"
                circular
                onClick={() => history.push(`/home/${props.id}/profile`)}
                size="small"
              >
                <Icon name="user" /> View profile
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row></Grid.Row>
        </Grid>

        <SideItem
          className={`${selected == "home" ? "selected" : undefined}`}
          onClick={() => {
            setSelected("home");
            history.push(`/home/home/${props.id}`);
          }}
        >
          <Icon name="home" color="black" size="small" />
          <SideText>Home</SideText>
        </SideItem>

        <SideItem
          className={`${selected == "transactions" ? "selected" : undefined}`}
          onClick={() => {
            setSelected("transactions");
            history.push(`/home/transactions/${props.id}`);
            console.log(selected)
          }}
        >
          <Icon name="exchange" color="black" size="small" />
          <SideText>Transactions</SideText>
        </SideItem>

        <SideItem
          className={`${selected == "waults" ? "selected" : undefined}`}
          onClick={() => {
            setSelected("waults");
            history.push(`/home/waults/${props.id}`);
          }}
        >
          <Icon name="archive" color="black" size="small" />
          <SideText>Waults</SideText>
        </SideItem>

        <SideItem
          className={`${selected == "references" ? "selected" : undefined}`}
          onClick={() => {
            setSelected("waults");
            history.push(`/home/references/${props.id}`);
          }}
        >
          <Icon name="file" color="black" size="small" />
          <SideText>Reference</SideText>
        </SideItem>

        <div
          style={{
            position: "fixed",
            bottom: "0",
            marginLeft: "15%",
            marginBottom: "10px",
          }}
        >
          <PurpleSwitch
            checked={checked.checkedA}
            onChange={handleChange}
            name="checkedA"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    ethUser: state.accounts[ownProps.id],
    name: state.accounts.name,
  };
};

export default connect(mapStateToProps, null)(SidebarMenu);
