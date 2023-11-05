import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredential } from "../features/authSlice";
import { useUpdateUserMutation } from "../features/userApiSlice";
import Loader from "./Loader";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #b4b4b4;
  margin: 1rem 4rem;
  border-radius: 1rem;
  padding: 1rem;
`;
const Text = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #333333;
  margin-bottom: 20px;
`;

const Label = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #333333;
  margin-bottom: 20px;
`;

const Inline = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  align-items: center;
  justify-items: center;
  width: 100%;
  /* margin: 0.5rem 5rem; */
  padding: 0 27rem;
`;

const Input = styled.input`
  width: 300px;
  height: 50px;
  border-radius: 10px;
  border: none;
  padding-left: 20px;
  font-size: 18px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 300px;
  height: 50px;
  border-radius: 10px;
  border: none;
  background-color: #333333;
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
  margin: 0.5rem 0 2rem 0;
  cursor: pointer;
  &:hover {
    background-color: #555555;
  }
`;

const Error = styled.span`
  color: red;
  /* padding: 0.5rem; */
`;

function UserInfo() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [updateProfile, {isLoading}] = useUpdateUserMutation();

  const [user, setUser] = useState({
    fname: userInfo.fname,
    lname: userInfo.lname,
    username: userInfo.username,
    email: userInfo.email,
    password: "",
    reEnterPassword: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { fname, lname, email, password, reEnterPassword } = user;

    if (password !== reEnterPassword) {
      toast.error("Passwords do not match");
      setUser({ ...user, password: "", reEnterPassword: "" });
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const res = await updateProfile({
        fname,
        lname,
        email,
        password,
      }).unwrap();
      dispatch(setCredential(res));
      toast.success(`${fname} Profile Updated successfully!`);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  return (
    <>
      <Container>
        <Text>Welcome</Text>
        <Inline>
          <Label>First Name &nbsp;:</Label>{" "}
          <Input
            type="text"
            placeholder="First Name"
            name="fname"
            value={user.fname}
            onChange={handleChange}
          />
        </Inline>
        <Inline>
          <Label>Last Name &nbsp;: </Label>{" "}
          <Input
            type="text"
            placeholder="Last Name"
            name="lname"
            value={user.lname}
            onChange={handleChange}
          />
        </Inline>
        <Inline>
          <Label>
            Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
          </Label>{" "}
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </Inline>
        {error && <Error>{error}</Error>}
        {/* <Input placeholder="Password" /> */}
        {isLoading && <Loader />}
        <Button onClick={handleSubmit}>Update</Button>
      </Container>
      <br />
      <Container>
        <Text>Change Password</Text>
        <Inline>
          <Label>
            New Password &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
          </Label>{" "}
          <Input type="password" placeholder="Password" name="password" />
        </Inline>
        <Inline>
          <Label>Confirm Password &nbsp;: </Label>{" "}
          <Input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
          />
        </Inline>

        {/* <Input placeholder="Password" /> */}
        <Button onClick={handleSubmit}>Update Password</Button>
      </Container>
    </>
  );
}

export default UserInfo;
