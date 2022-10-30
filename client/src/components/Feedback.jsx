import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #2194ffcc;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: #d9d9d9;
  box-shadow: 0px -4px 15px 5px rgba(0, 0, 0, 0.25);
  padding: 2rem;
`;

const Text = styled.span`
  /* padding: 0 10px; */
  font-size: 2.8rem;
  font-weight: 1000;
  font-family: "Inter";
  font-style: normal;
  /* font-weight: 700; */
  /* font-size: 46px; */
  line-height: 56px;
  color: #036ad1;
`;

const SmallText = styled.span`
  font-size: 1.8rem;
  font-weight: 1000;
  font-family: "Inter";
  font-style: normal;
  color: rgba(3, 106, 209, 0.74);
`;

const Coloumn = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  margin: 2rem 0rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

const Email = styled.input`
  color: #797979;
  border: none;
  font-size: 1.5rem;
  font-weight: 1000;
  font-family: "Inter";
  font-style: normal;
  outline: none;
  padding: 5% 20% 5% 10%;
  background: #ffffff;
  box-shadow: 0px 4px 16px 4px rgba(180, 180, 180, 0.86);
  border-radius: 15px;
  margin: 1rem 0rem;
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: 0px 4px 16px 4px rgba(180, 180, 180, 0.86);
    transform: scale(1.05);
  }
`;

const Message = styled.textarea`
  color: #797979;
  border: none;
  font-size: 1.5rem;
  font-weight: 1000;
  font-family: "Inter";
  font-style: normal;
  outline: none;
  padding: 5% 35% 5% 10%;
  padding-bottom: 30%;
  background: #ffffff;
  box-shadow: 0px 4px 16px 4px rgba(180, 180, 180, 0.86);
  border-radius: 15px;
  margin: 1rem 0rem;
  resize : none;
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: 0px 4px 16px 4px rgba(180, 180, 180, 0.86);
    transform: scale(1.05);
  }
`;

const Submit = styled.button`
  color: #ffffff;
  background: rgba(3, 106, 209, 0.74);
  border-radius: 20px;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  font-weight: 1000;
  font-family: "Inter";
  font-style: normal;
  border: none;
  outline: none;
  cursor: pointer;
  &:hover {
    background: #036ad1;
  }
  /* margin: 1rem; */
  margin-top: 2rem;
  transition: all 0.3s ease-in-out;
`;

function Feedback() {
  return (
    <Container>
      <Coloumn>
        <Text>
          Haveing any questions ? <br />
          Or suggestion{" "}
        </Text>
        <SmallText>
          Leave a message <br /> Thank You!!
        </SmallText>
      </Coloumn>

      <Form>
        <Email type="email" placeholder="Email" />
        <Message placeholder="Message" />
        <Submit type="submit">Submit</Submit>
      </Form>
    </Container>
  );
}

export default Feedback;
