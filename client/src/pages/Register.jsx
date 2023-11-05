import styled from "styled-components";
import { mobile } from "../responsive";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link as Linked } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../features/userApiSlice";
import { setCredential } from "../features/authSlice";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

const Container = styled.div`
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4rem 0rem;
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

const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border-radius: 0.5rem;
  /* border: 1; */
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Box = styled.div`
  height: 100vh;
`;

const Error = styled.span`
  color: red;
  /* padding: 0.5rem; */
`;

const Register = () => {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.auth.userInfo);

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  async function registerHandler(e) {
    e.preventDefault();
    const { fname, lname, username, email, password, reEnterPassword } = user;

    if (password !== reEnterPassword) {
      toast.error("Passwords do not match");
      setUser({ ...user, password: "", reEnterPassword: "" });
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const res = await register({
        fname,
        lname,
        username,
        email,
        password,
      }).unwrap();
      dispatch(setCredential(res));
      toast.success(`${fname} Registered successfully!`);
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.error);

      setError(error?.data?.message || error.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  return (
    <Box>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Form>
            <Input
              name="fname"
              type="text"
              onChange={handleChange}
              placeholder="First name"
              value={user.fname}
            />
            <Input
              name="lname"
              type="text"
              onChange={handleChange}
              placeholder="Last name"
              value={user.lname}
            />
            <Input
              name="username"
              type="text"
              onChange={handleChange}
              placeholder="username"
              value={user.username}
            />
            <Input
              name="email"
              type="email"
              onChange={handleChange}
              value={user.email}
              placeholder="Email"
            />
            <Input
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="password"
              value={user.password}
            />
            <Input
              name="reEnterPassword"
              type="password"
              onChange={handleChange}
              placeholder="confirm password"
              value={user.reEnterPassword}
            />
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <FlexCol>
              {error && <Error>{error}</Error>}
              <Link>
                <Linked to="/logIn">ALREADY HAVE AN ACCOUNT</Linked>
              </Link>
              {isLoading && <Loader />}
              <Button onClick={registerHandler}>CREATE</Button>
            </FlexCol>
          </Form>
        </Wrapper>
      </Container>
    </Box>
  );
};

export default Register;
