import ButtonComponent from '.';

export default {
  title: 'Components/Button',
  component: ButtonComponent,
  argTypes: {
    children: {
      control: 'text',
      description: '버튼 내부의 텍스트',
    },
    variant: {
      control: { type: 'select', options: ['confirm', 'cancel', 'error'] },
      description: '버튼의 스타일 용도에 맞게 변경',
    },
    disabled: {
      control: 'boolean',
      description: '버튼을 비활성화 상태로 설정',
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 시 실행되는 함수',
    },
    'aria-label': {
      control: 'text',
      description: '접근성을 위한 ARIA Label',
    },
  },
  tags: ['autodocs'],
};

export const Confirm = {
  args: {
    children: '확인',
    variant: 'confirm',
  },
};

export const Cancel = {
  args: {
    children: '취소',
    variant: 'cancel',
  },
};

export const Error = {
  args: {
    children: '에러',
    variant: 'error',
  },
};

export const Disabled = {
  args: {
    children: 'Disabled Button',
    variant: 'confirm',
    disabled: true,
  },
};

export const Accessible = {
  args: {
    children: 'Accessible Button',
    variant: 'confirm',
    'aria-label': '스크린 리더를 위한 접근성 버튼',
  },
};
