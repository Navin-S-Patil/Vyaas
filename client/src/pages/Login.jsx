import { useState, useEffect } from "react";
import styled from "styled-components";

import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link as Linked, useNavigate } from "react-router-dom";

import { useLoginMutation } from "../features/userApiSlice";
import { setCredential } from "../features/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

const Container = styled.div`
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5rem 0rem;
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
  border-radius: 0 0.5rem;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
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

const Box = styled.div`
  height: 100vh;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ username, password }).unwrap();
      dispatch(setCredential({ ...res }));
      toast.success(`${res.fname} Logged in successfully!`);
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.error);

      //custom error handler
      setError(true);
      setErrorMessage(error?.data?.message || error.error);
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <Box>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>SIGN IN</Title>
          <Form>
            <Input
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleClick}>LOGIN</Button>
            {isLoading && <Loader />}
            {error && <Error>{errorMessage}</Error>}
            Want to create a new account
            <Link>
              <Linked to="/register">CREATE A NEW ACCOUNT</Linked>
            </Link>
          </Form>
        </Wrapper>
      </Container>
    </Box>
  );
};

export default Login;
