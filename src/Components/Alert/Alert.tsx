import { color } from "@/styles/color";
import styled from "@emotion/styled";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

type Props = {
  handleClickDelete: (id: number) => void;
  id: number;
  handleClickBack?: () => void;
};

const ShowAlert = ({ handleClickDelete, id, handleClickBack }: Props) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <Container>
          <Wrap>
            <div className='question'>삭제 하시겠습니까?</div>
            <ButtonWrap>
              <Button
                className='yes'
                onClick={() => {
                  handleClickDelete(id);
                  if (handleClickBack) {
                    handleClickBack();
                  }
                  onClose();
                }}
              >
                예
              </Button>
              <Button className='no' onClick={onClose}>
                아니오
              </Button>
            </ButtonWrap>
          </Wrap>
        </Container>
      );
    },
  });
};

export default ShowAlert;

const Container = styled.div``;

const Wrap = styled.div`
  border: 1px solid ${color.black};
  border-radius: 4px;
  padding: 20px;
  background-color: ${color.white};

  .question {
    font-size: 16px;
    font-weight: bold;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;

  .yes {
    background-color: ${color.green};
  }

  .no {
    background-color: ${color.red};
  }
`;

const Button = styled.div`
  font-size: 14px;
  padding: 4px 10px;

  border-radius: 4px;
  cursor: pointer;
`;
