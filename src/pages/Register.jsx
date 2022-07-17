import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import styled from "styled-components"
import { signin } from "../redux/apiCalls";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
    ),
    url("https://static.wixstatic.com/media/9ee29c_fe144176b6d94e1e9291741d58781d65~mv2_d_4520_3666_s_4_2.jpg/v1/fill/w_602,h_480,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/IIT%20BHU.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [username, setusername] = useState(null);
  const [emailid, setemailid] = useState(null);
  const [password, setpassword] = useState(null);
  const [Cpassword, setCpassword] = useState(null);
  const [error, seterror] = useState(false);
  const dispatch = useDispatch();
  const { loading, errors } = useSelector(state => state.user);
  // const history = useHistory();


    const cruse = useSelector((state) => state.user.currentUser);
    // if (cruse !== null) {
    //     history.push("/");
    // }
  const handleSignin = (e) => {
    e.preventDefault();
    if (username === null || emailid === null || password === null || Cpassword === null || (password !== Cpassword)) {
      seterror(true);
      setemailid(null);
      setpassword(null);
      setCpassword(null);
      setusername(null);
    }
    else {
      signin(dispatch,
        {
          username: username,
          email: emailid,
          password: password,
        }
      );
      if(errors){
        seterror(true);
      }
    }
    // call user sign in
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input type="text" placeholder="Name"  onChange={(e) => setusername(e.target.value)}/>
          <Input type="text" placeholder="Last Name" />
          <Input type="text" placeholder="Username" />
          <Input type="email" placeholder="Email" onChange={(e) => setemailid(e.target.value)}  />
          <Input type="password" placeholder="Password" onChange={(e) => setpassword(e.target.value)} />
          <Input  type="password" placeholder="Confirm Password" onChange={(e) => setCpassword(e.target.value)}  />
          {
            error && <>
              <Agreement>
                entered wrong feild
              </Agreement>
            </>
          }
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button  onClick={handleSignin} disabled={loading}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;