import { confirm } from 'react-confirm-box';

const customConfirm = (message: string) => {
  return confirm(message, {
    labels: {
      confirmable: '예',
      cancellable: '아니오',
    },
  });
};

export default customConfirm;
