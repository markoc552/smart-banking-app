import styled from "styled-components";
import Background from "../../assets/images/background.jpg"
import UtilBackground from "../../assets/images/utilbackground.jpg"

export const Bottom = styled.div`
  height: 100px;
  width: 85vw;
  background-color: #292c33;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  position: fixed;
  bottom: 0;
`;

export const SideItem = styled.div`
position: relative;
width: 100%;
margin: 0 auto;
text-align: center;
padding: 10px;
cursor: auto;
color: #9c9c9c;

&:hover {
  background-color: #dbdbdb;
  border-right: 2px solid blue;
  cursor: pointer;
}

&:target {
  border-left: 5px solid blue;
}
`

export const HomeSection = styled.div`
  background-image: url(${Background});
  background-size: 115% 90%;
  background-repeat: no-repeat;
  position: absolute;
  right: 0%;
  left: 0%;
  font-family: "Lato", sans-serif;
  height: 100vh;
  overflow: hidden;
`;

export const UtilSection = styled.div`
  background-image: url(${UtilBackground});
  background-size: 115% 90%;
  background-repeat: no-repeat;
  position: absolute;
  right: 0%;
  left: 0%;
  font-family: "Lato", sans-serif;
  height: 100vh;
  overflow: hidden;
`;


export const Modal = styled.div`
  border: 1px gray;
  border-radius: 5px;
  background-color: white;
  z-index: 1;
  font-family: 'Lato', serif;
  box-shadow: 0px 3px 7px 0px rgba(0,0,0,0.75);
  top: 25%;
  position: relative;

  @media only screen and (max-width: 600px) {
    width: 90%;
  }
`;

export const ModalContainer = styled.div`
  background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${window.ENVIRONMENT.MODAL_IMAGE});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  padding-top: 15px;
  position: absolute;
  height: 120vh;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export const Image = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100px;
  height: 100px;
`;
export const Header = styled.div`
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 20px;
  margin-top: 10px;
`;

export const WelcomeDialog = styled.div`
  font-family: 'Bree Serif', serif;
  font-size: 30px;
  color: #4d4d4d;
`

export const BenefitsDialog = styled.div`
  width: 50vw;
  height: 30vh;
  positon: relative;
  margin: 0 auto;
  border: 2px solid #5c27d5;
  border-radius: 10px;
  background-image: url(${Background});
  box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.75);
`

export const MoneyDialog = styled.div`
  font-family: 'Bree Serif', serif;
  font-size: 20px;
  color: #4d4d4d;
`

export const TransactionCountDialog = styled.div`
  font-family: 'Bree Serif', serif;
  font-size: 15px;
  color: #4d4d4d;
`

export const BenefitsTitle = styled.div`
  font-family: 'Bree Serif', serif;
  font-size: 20px;
  color: white;
  margin-left: 55px;
  margin-top: 10px;
`
export const BenefitsDescription = styled.div`
  font-family: 'Bree Serif', serif;
  font-size: 15px;
  color: #5c27d5;
  margin-left: 55px;
  margin-top: 10px;
`


export const InovativeDialog = styled.div`
font-family: 'Bree Serif', serif;
font-size: 10px;
color: #bdbdbd;
margin-right: 25%;
margin-top: 10%;
`


export const Message = styled.div`
  font-family: "Lato", sans-serif;
  font-weight: 500;
`;

export const SideText = styled.div`
  font-family: 'Bree Serif', serif;
  font-weight: bold;
  font-size: 15px;
  color: #9c9c9c;
`;

export const BottomText = styled.div`
  font-family: "Open sans", sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #5b89a3;
  margin-top: 10px;
`;

export const BottomCopyright = styled.div`
  font-family: "Open sans", sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #5b89a3;
`;

export const BottomHeader = styled.div`
  font-family: "Open sans", sans-serif;
  font-weight: 800;
  font-size: 15px;
  color: #cfcfcf;
  margin-top: 25px;
`;

export const SideName = styled.div`
  font-family: "Lato", sans-serif;
  font-weight: 700;
  font-size: 15px;
  margin-top: 7px;
  color: black;
  vertical-align: middle;
`;

export const UserDescription = styled.div`
  width: 50vw;
  padding-left: 30px;
  padding-right: 50px;
  padding-top: 10px;
  position: relative;
  margin: 0 auto;
`;

export const StyledName = styled.div`
  color: #a2acbd;
  font-size: 25px;
  font-family: "Lato", sans-serif;
  padding-bottom: 25px;
`;
