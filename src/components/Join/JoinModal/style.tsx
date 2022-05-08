import styled from '@emotion/styled';

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type isSatisfiedProps = {
  isOk: boolean;
};
export const IsSatisfied = styled('div')((props: isSatisfiedProps) => ({
  fontSize: '12px',
  marginLeft: '5%',
  color: props.isOk ? 'black' : 'red',
}));
