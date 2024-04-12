import React, { useState, ChangeEvent } from "react";
import { PasswordInput } from "../input/PasswordInput";
import { Button } from "../button/Button";

export interface MyAuthFormProps {
  accountState: boolean;
}

export const MyAuthForm: React.FC<MyAuthFormProps> = ({ accountState }) => {
  const [password, setPassword] = useState<string>("");

  const handleInputPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Password submitted: ", password);
  };

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="w-full max-w-xs">
        {accountState ? (
          <>
            <h2 className="text-2xl font-bold mb-4">정보 수정</h2>
            <h4 className="text-xl mb-4">비밀번호 변경</h4>
            <PasswordInput
              placeholder="새로운 비밀번호를 입력해주세요"
              onChange={handleInputPassword}
            />
            <Button label="변경하기" onClick={handleSubmit} />
          </>
        ) : (
          <>
            <h4 className="mb-4">정보 수정을 위해 본인을 인증해주세요.</h4>
            <PasswordInput
              placeholder="현재 비밀번호를 입력해주세요"
              onChange={handleInputPassword}
            />
            <Button label="인증하기" onClick={handleSubmit} />
          </>
        )}
      </div>
    </div>
  );
};
