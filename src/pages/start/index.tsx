import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import type { Member } from "@/types/Member";
import { SignUpModal } from "@/pages/start/modal/signUpModal";
import KakaoLogin from "@/pages/start/kakaoLogin";
import { postLoginJwt } from "@/services/postLoginJwt";
import { createEncryptToken } from "@/lib/crypto/createEncryptToken";
import { createRandomKey } from "@/lib/crypto/createRandomKey";

import { setToken } from "@/store/token";
import { postEmailConfirm } from "@/services/postEmailConfirm";
import { postEmailSend } from "@/services/postEmailSend";
import { postMemberRegister } from "@/services/postMemberRegister";

import LoginButton from "@/components/common/button/LoginButton";

function StartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedPreferenceList = useSelector((state: any) => state.types.types);
  const secretKey: string = createRandomKey();

  const [user, setUser] = useState<Member>({
    name: "",
    gender: "",
    email: "",
    pw: "",
    types: [],
  });

  const [emailCode, setEmailCode] = useState<string>(""); //이메일 인증 코드
  const [, setConfirmPassword] = useState<string>(""); // 비밀번호 확인

  const handleNameChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      name: event.target.value,
    }));
  };

  const handleGenderChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      gender: event.target.value,
    }));
  };

  const handleEmailChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      email: event.target.value,
    }));
  };

  const handlePasswordChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      pw: event.target.value,
    }));
  };

  const handleEmailCodeChange = (event) => {
    setEmailCode(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSendEmailToServer = async (event) => {
    event.preventDefault();
    try {
      if (user.email) {
        await postEmailSend(user.email);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendEmailCodeToServer = async (event) => {
    event.preventDefault();

    try {
      if (user.email) {
        await postEmailConfirm(user.email, emailCode);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccessToService = async (event) => {
    event.preventDefault();

    try {
      if (user.email && user.pw) {
        const response = await postLoginJwt(user.email, user.pw);
        const token: string | null = response.data.token;
        if (token) {
          const encryptedToken = createEncryptToken(token, secretKey);
          console.log(encryptedToken);
          dispatch(setToken(token));
          alert(`${user.name}님. 반갑습니다!`);
          navigate("/main");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitUserInfoToServer = async (event) => {
    event.preventDefault();

    try {
      user.types = selectedPreferenceList;

      if (user.name && user.gender && user.email && user.pw && user.types) {
        await postMemberRegister(
          user.name,
          user.gender,
          user.email,
          user.pw,
          user.types
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-blue-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="https://images.unsplash.com/photo-1444313431167-e7921088a9d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1441&q=100"
          alt="시작 이미지"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-white w-full md:max-w-md lg:max-w-full md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        <div className="w-full h-100">
          <h1 className="text-xl font-bold">TripPlannerZ</h1>
          <input
            type="email"
            name=""
            id=""
            placeholder="이메일을 입력하세요."
            onChange={handleEmailChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            required
          />
          <div className="mt-4">
            <input
              type="password"
              name=""
              id=""
              placeholder="비밀번호를 입력하세요."
              onChange={handlePasswordChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
              required
            />
          </div>
          <LoginButton onClick={handleAccessToService} />
          <hr />
          <SignUpModal
            onSubmit={handleSubmitUserInfoToServer}
            onChange={{
              handleNameChange,
              handleGenderChange,
              handleEmailChange,
              handleEmailCodeChange,
              handlePasswordChange,
              handleConfirmPasswordChange,
            }}
            onClick={{
              handleSendEmailToServer,
              handleSendEmailCodeToServer,
            }}
          />
          <KakaoLogin />
        </div>
      </div>
    </section>
  );
}

export default StartPage;
