import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { getMonth } from "date-fns";
import styled from "@emotion/styled";
import { color } from "@/styles/color";
import Image from "next/image";

interface CalenderProps {
  date: Date | null;
  onChange: (date: Date) => void;
}

const Calender = ({ date, onChange }: CalenderProps) => {
  const MONTHS = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  return (
    <Container>
      <Image
        src='/images/icons/calendar.svg'
        width={20}
        height={20}
        alt='icon'
      />
      <StyledDatePicker // DatePicker의 styled-component명
        locale={ko} //한글
        dateFormat='yyyy.MM.dd'
        selected={date}
        closeOnScroll={false} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
        onChange={(date: Date) => onChange(date)}
        /////////////////////
        renderCustomHeader={({
          date,
          changeYear,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className='customHeaderContainer'>
            <div className='monthWrap'>
              <button
                type='button'
                onClick={decreaseMonth}
                className='monthButton'
                disabled={prevMonthButtonDisabled}
              >
                <Image
                  src='/images/icons/arrow_left.svg'
                  alt='arrow'
                  width={10}
                  height={14}
                />
              </button>
              <span className='month'>{MONTHS[getMonth(date)]}</span>
              <button
                type='button'
                onClick={increaseMonth}
                className='monthButton'
                disabled={nextMonthButtonDisabled}
              >
                <Image
                  src='/images/icons/arrow_right.svg'
                  alt='arrow'
                  width={10}
                  height={14}
                />
              </button>
            </div>
          </div>
        )}
        ///////////////////////
        dayClassName={(_date: Date) => {
          // 현재 선택된 월의 날짜인지 확인
          const isCurrentMonth = _date.getMonth() === date!.getMonth();

          // 현재 선택된 월의 날짜가 아닌 경우 클래스 이름 반환
          if (!isCurrentMonth) {
            return "otherMonthDay";
          }

          // 현재 선택된 월의 날짜인 경우
          // 선택된 날짜인 경우 'selectedDay', 선택되지 않은 날짜인 경우 'unselectedDay' 반환
          return date?.getDate() === _date.getDate()
            ? "selectedDay"
            : "unselectedDay";
        }}
      />
    </Container>
  );
};

export default Calender;

const Container = styled.div`
  display: flex;
  align-items: center;
  .react-datepicker__month-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .customHeaderContainer {
    width: 233px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;

    margin-bottom: 4px;
    background-color: ${color.gray};
  }
  .dateButtonWrap {
    display: flex;
    gap: 4px;
  }
  .dateButton {
    display: flex;
    padding: 4px 8px;
    justify-content: center;
    align-items: center;

    border-radius: 6px;
    background: ${color.deepGray};

    color: ${color.white};
    font-size: 12px;
    font-weight: 400;

    border: none;

    cursor: pointer;
  }

  .monthWrap {
    display: flex;
    justify-content: center;
  }
  .month {
    font-size: 12px;
  }

  .monthButton {
    border: none;
    background: none;
    cursor: pointer;
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker {
    padding: 10px 16px;
    position: absolute;
    top: -6px;
    left: -133px;
    width: 265px;
    box-sizing: border-box;

    border: 1px solid ${color.deepGray};

    background: ${color.gray};

    color: ${color.black};

    .react-datepicker__header {
      padding: 0;

      box-sizing: border-box;
      background: inherit;

      border: none;
      background-color: ${color.gray};

      .react-datepicker__day-names {
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 23px;

        margin-bottom: 4px;

        .react-datepicker__day-name {
          color: ${color.black};
          font-size: 12px;
          font-weight: 400;

          width: auto;
          margin: 0;
        }
      }
    }
  }

  .react-datepicker__month {
    display: flex;
    flex-direction: column;
    margin: 0;
    box-sizing: border-box;
    gap: 4px;
    background-color: ${color.gray};
  }

  .react-datepicker__week {
    width: 233px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 19px;
    box-sizing: border-box;
  }

  .react-datepicker__day {
    width: 19px;
    height: 19px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${color.black};

    &:hover {
      width: 19px;
      height: 19px;
      padding: 2px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      border-radius: 4px;
      background: ${color.blue};
      color: ${color.white};

      box-sizing: border-box;

      cursor: pointer;
    }
  }

  .react-datepicker__day--outside-month {
    color: ${color.deepGray};
    font-size: 12px;
    font-weight: 400;

    &:hover {
      background-color: ${color.deepGray};
    }
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background: ${color.gray};
    border-radius: 0;
  }

  .selectedDay {
    width: 19px;
    height: 19px;
    display: flex;
    padding: 2px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background: ${color.blue};

    color: ${color.black};
    font-size: 12px;
    font-weight: 400;

    box-sizing: border-box;
  }

  .unselectedDay {
    font-size: 12px;
    font-weight: 400;

    &:hover {
      width: 19px;
      height: 19px;
      padding: 2px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      border-radius: 4px;
      background: ${color.blue};
      color: ${color.white};

      box-sizing: border-box;
    }
  }

  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    display: flex;
    align-items: center;
  }

  .react-datepicker__day--today {
    font-weight: bold;
    color: ${color.white};
    background: ${color.green};
    border-radius: 4px;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  position: relative;
  width: 100px;
  border: none;
  background-color: transparent;

  font-size: 14px;
  font-weight: 400;
  color: ${color.black};
  text-align: center;

  &:focus {
    color: ${color.blue};
    outline: none;
  }
`;
