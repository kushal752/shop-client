import { useState } from "react";
import styled from "styled-components"
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.2)
    ),
    url("https://static.wixstatic.com/media/9ee29c_fe144176b6d94e1e9291741d58781d65~mv2_d_4520_3666_s_4_2.jpg/v1/fill/w_602,h_480,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/IIT%20BHU.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
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
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled{
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const cruse = useSelector((state) => state.user.currentUser);

  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const currentUser = user ? JSON.parse(user).currentUser : null;
  const TOKEN = currentUser ? currentUser.accessToken : null;
  
  if ((cruse !== null) && (TOKEN===null)) {
    navigate("/");
  }
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  }

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
          {error && <Error>Something went wrong...</Error>}
          <Link>FORGOT PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>

  );
};

export default Login;