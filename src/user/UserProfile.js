import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import { BASE_URL } from "../api";
import Form from "react-bootstrap/Form";

const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #323234;
`;
const UserBox = styled.div`
  border: 1px solid black;
`;

function UserProfile() {
  const [user, setUser] = useState({});
  const [iamge, setImage] = useState();

  const { register, handleSubmit } = useForm();
  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/user/profile`);
        console.log("유저 정보", res.data);
        // const image = await axios.get(
        //   `${BASE_URL}/api/user/image/${res.data.imagePath}`
        // );
        // console.log(image);

        setUser(res.data);
      } catch (error) {
        console.log("프로필가져오기 에러");
      }
    };
    getProfile();
  }, []);

  const createFormData = (data) => {
    const { profileImg } = data;
    console.log(data);
    const formData = new FormData();
    formData.append("img", profileImg[0]);
    return formData;
  };

  const sendImg = async (data) => {
    const formData = createFormData(data);
    try {
      const res = await axios.post(`${BASE_URL}/api/user/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("사진 전송", res.data);
    } catch (error) {
      console.log("사진전송에러", error);
    }
  };

  return (
    <UserContainer>
      <UserBox>사진</UserBox>
      <form onSubmit={handleSubmit(sendImg)}>
        <input {...register("profileImg")} type="file" />
      </form>

      <UserBox>이름 {user.userName}</UserBox>
      <UserBox>돈 {user.money}</UserBox>
    </UserContainer>
  );
}

export default UserProfile;
