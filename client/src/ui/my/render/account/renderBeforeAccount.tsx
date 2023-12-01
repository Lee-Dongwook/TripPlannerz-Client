import {Form, Button, Input} from 'antd';
import { RenderBeforeAccountProp } from '@/ui/my/render/account/renderBeforeAccountProp.types';

export const renderBeforeAccountPage = ({onChange, onClick}: RenderBeforeAccountProp) => {
    return (
      <div>
        <div>
          <h4>정보 수정을 위해 본인을 인증해주세요.</h4>
          <Form>
              <Form.Item label="현재 비밀번호" name="Password">
              <Input type="text" onChange={onChange}/>
              </Form.Item>
          </Form>
          <Button type="text" onClick={onClick}>인증하기</Button>
        </div>
      </div>
    );
  };