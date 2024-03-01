import { postDeleteMemberInfo } from '@/application/api/my/postDeleteMemberInfo';

export const deleteMemberInfo = async (token, password) => {
  if (token && password) {
    const postToServer = {
      pw: password,
    };

    const response = await postDeleteMemberInfo(token, postToServer);

    if (response) {
      alert('회원 탈퇴가 완료되었습니다.');
      return;
    }
  } else {
    alert('비밀번호를 다시 입력해주세요.');
    return;
  }
};
