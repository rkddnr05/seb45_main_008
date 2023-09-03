import { useSelector, useDispatch } from "react-redux";
import { orderTypeBuying, orderTypeSelling } from "../../reducer/StockOrderType-Reducer";
import { styled } from "styled-components";
import { StateProps } from "../../models/stateProps";
import { OrderTypeProps } from "../../models/orderTypeProps";

import PriceSetting from "./PriceSetting";
import VolumeSetting from "./VolumeSetteing";
import StockOrderBtn from "./StockOrderBtn";

const orderType01: string = "매수";
const orderType02: string = "매도";

const StockOrderSetting = () => {
  const stockOrderType = useSelector((state: StateProps) => state.stockOrderType);
  const dispatch = useDispatch();

  const handleSetBuying = () => {
    dispatch(orderTypeBuying());
  };

  const handleSetSelling = () => {
    dispatch(orderTypeSelling());
  };

  return (
    <Container>
      <OrderType>
        <Buying onClick={handleSetBuying} ordertype={stockOrderType}>
          {orderType01}
        </Buying>
        <Selling onClick={handleSetSelling} ordertype={stockOrderType}>
          {orderType02}
        </Selling>
      </OrderType>
      <TypeDividingLine />
      <PriceSetting />
      <VolumeSetting />
      <StockOrderBtn />
    </Container>
  );
};

export default StockOrderSetting;

const TypeDividingLine = () => {
  const stockOrderType = useSelector((state: StateProps) => state.stockOrderType);

  return (
    <DividingContainer ordertype={stockOrderType}>
      <DefaultLine ordertype={stockOrderType}>
        <DivdingLine ordertype={stockOrderType} />
      </DefaultLine>
    </DividingContainer>
  );
};

// component 생성
const Container = styled.div`
  width: 51%;
  height: 100%;
`;

const OrderType = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: row;
`;

const Buying = styled.div<OrderTypeProps>`
  flex: 1 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 31px;
  font-size: 14px;
  color: ${(props) => !props.ordertype && "#e22926"};
`;

const Selling = styled.div<OrderTypeProps>`
  flex: 1 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 31px;
  font-size: 14px;
  color: ${(props) => props.ordertype && "#2679ed"};
`;

const DividingContainer = styled.div<OrderTypeProps>`
  background-color: darkgray;
`;

const DefaultLine = styled.div<OrderTypeProps>`
  transform: translateX(${(props) => (props.ordertype ? "50%" : "0")});
  transition: transform 0.3s ease-in-out;
  width: 100%;
  height: 1.2px;
`;

const DivdingLine = styled.div<OrderTypeProps>`
  width: 50%;
  height: 1.2px;
  background-color: ${(props) => (props.ordertype ? "#2679ed" : "#e22926")};
`;
