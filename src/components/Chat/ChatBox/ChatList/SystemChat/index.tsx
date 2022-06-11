import * as React from 'react';

import { IChat } from '@typings/dbTypes';

import { Wrapper } from './style';

type propsType = {
  data: IChat;
};

export default function UserChat({ data }: propsType) {
  const { message, createdAt } = data;

  return (
    <Wrapper>
      <div className="content">
        <span className="message">{message}</span>
      </div>
    </Wrapper>
  );
}
