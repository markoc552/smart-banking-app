import styled from "styled-components";
import BackgroundVector from "../../images/vector.jpg";

export const Bottom = styled.div`
  margin-top: 15px;
  height: 250px;
  background-color: #292c33;
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

export const Reviews = styled.div`
  margin-top: 15px;
  height: 250px;
  background-color: #41556e;
  padding-top: 10px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  box-shadow: 3px 3px 5px 6px #ccc;
`;

export const HeaderText = styled.div`
  font-size: 40px;
  font-family: "Poppins", sans-serif;
  color: rgb(71, 161, 255);
  z-index: 1;
`;

export const Vector = styled.div`
  background-image: url(${BackgroundVector});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 110vh;
`;

export const HomeSection = styled.div`
  position: absolute;
  right: 0%;
  left: 0%;
  font-family: "Lato", sans-serif;
  height: 100vh;
`;

export const Background = styled.div`
  background-position: 17% 50%;
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

export const ReferencesDiv = styled.div`
  position: absolute;
  height: 100vh;
  left: 2%;
  right: 2%;
  top: 0;
  bottom: 0;
  background-color: white;
  opacity: 0.97;
`;

export const ReferencesBG = styled.div`
  position: absolute;
  height: 100vh;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

export const Message = styled.div`
  font-family: "Lato", sans-serif;
  font-weight: 500;
`;

export const SBADiv = styled.div`
  position: absolute;
  left: 2.5%;
  right: 2.5%;
  top: 0;
  bottom: 0;
  background-color: white;
  box-shadow: -1px -1px 5px -3px rgba(0, 0, 0, 1);
  opacity: 0.97;
  height: 100vh;
  overflow: hidden;
`;

export const SBABackground = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100vh;
  overflow-y: hidden;
`;

export const SideText = styled.div`
  font-family: "Open sans", sans-serif;
  font-weight: 700;
  font-size: 17px;
  color: #5b89a3;
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
  margin-top: -50px;
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
  width: 100vw;
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
