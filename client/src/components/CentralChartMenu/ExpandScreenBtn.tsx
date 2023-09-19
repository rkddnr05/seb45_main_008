import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "styled-components";
import { changeLeftScreen, changeRightScreen } from "../../reducer/ExpandScreen-Reducer";
import { StateProps } from "../../models/stateProps";

const ExpandScreenBtn = (props: OwnProps) => {
  const { direction } = props;

  const expandState = useSelector((state: StateProps) => state.expandScreen);
  const leftExpandState = expandState.left;
  const rightExpandState = expandState.right;

  const expandLeft: string = leftExpandState ? "축소" : "확장";
  const expandRight: string = rightExpandState ? "축소" : "확장";

  const dispatch = useDispatch();
  const [leftBtnHover, setLetfBtnHover] = useState(false);
  const [rightBtnHover, setRightBtnHover] = useState(false);

  const handleLeftBtnWide = () => {
    setLetfBtnHover(true);
  };

  const handleLeftBtnNarrow = () => {
    setLetfBtnHover(false);
  };

  const handleRightBtnWide = () => {
    setRightBtnHover(true);
  };

  const handleRightBtnNarrow = () => {
    setRightBtnHover(false);
  };

  const handleChangeLeftScreen = () => {
    dispatch(changeLeftScreen());
  };

  const handleChangeRightScreen = () => {
    dispatch(changeRightScreen());
  };

  if (direction === "left") {
    return (
      <Button direction="left" buttonHover={leftBtnHover} onClick={handleChangeLeftScreen} onMouseOver={handleLeftBtnWide} onMouseLeave={handleLeftBtnNarrow}>
        <div className="text">{expandLeft}</div>
      </Button>
    );
  }

  if (direction === "right") {
    return (
      <Button direction="right" buttonHover={rightBtnHover} onClick={handleChangeRightScreen} onMouseOver={handleRightBtnWide} onMouseLeave={handleRightBtnNarrow}>
        <div className="text">{expandRight}</div>
      </Button>
    );
  }
};

export default ExpandScreenBtn;

// type 정의
interface OwnProps {
  direction: string;
  buttonHover?: boolean; //build error 해결을 위해 ?를 붙였습니다
}

// component 생성
const Button = styled.div<OwnProps>`
  width: ${(props) => (props.buttonHover ? "46px" : "8px")};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  background-color: #dce9fc;
  border-right: ${(props) => props.direction === "left" && props.buttonHover && "1px solid #4479c2"};
  border-left: ${(props) => props.direction === "right" && props.buttonHover && "1px solid #4479c2"};

  &:hover {
    background-color: #a3c6fb;
    transition: background-color 0.5s ease, width 0.5s ease;
  }

  .text {
    font-size: ${(props) => (props.buttonHover ? "15px" : "1px")};
    color: ${(props) => (props.buttonHover ? "black" : "#dce9fc")};
    transition: color 1s ease, font-size 1s ease;
  }
`;
