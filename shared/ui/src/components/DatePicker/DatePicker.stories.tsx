import DatePickerComponent from '.';

export default {
  title: 'Components/DatePicker',
  component: DatePickerComponent,
  argTypes: {
    selectedDate: { control: 'date', description: '현재 선택된 날짜' },
    onChange: {
      action: 'dateChanged',
      description: '날짜가 변경될 때 호출되는 함수',
    },
    dateFormat: {
      control: 'text',
      description: '날짜 형식을 결정하는 문자열',
    },
    minDate: {
      control: 'date',
      description: '선택 가능한 최소 날짜',
    },
    maxDate: {
      control: 'date',
      description: '선택 가능한 최대 날짜',
    },
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    selectedDate: new Date(),
    onChange: () => {},
  },
};

export const WithDateRange = {
  args: {
    selectedDate: new Date(),
    onChange: () => {},
    minDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    maxDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  },
};

export const CustomFormat = {
  args: {
    selectedDate: new Date(),
    onChange: () => {},
    dateFormat: 'dd/MM/yyyy',
  },
};
