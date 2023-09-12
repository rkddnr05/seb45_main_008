import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import MemberInfoModal from './memberInfoModal'; 
import MemberWithdrawalModal from './memberWithdrawalModal';
import CashModal from './cashModal'; 
import { RootState } from '../../store/config'; 

const ProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {

    const memberInfoText = "회원정보";
    const cashText = "현금";
    const memberWithdrawText = "회원탈퇴"
    const [selectedTab, setSelectedTab] = useState<number>(1);
    const cashId = useSelector((state: RootState) => state.cash.cashId); // Get cashId from Redux store

    const handleTabChange = (tabNumber: number) => {
        setSelectedTab(tabNumber);
    };

    return (
        <ModalBackground>
            <ModalContainer>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <Tabs>
                    <TabButton active={selectedTab === 1} onClick={() => handleTabChange(1)}>{memberInfoText}</TabButton>
                    <TabButton active={selectedTab === 2} onClick={() => handleTabChange(2)}>{cashText}</TabButton>
                    <TabButton active={selectedTab === 3} onClick={() => handleTabChange(3)}>{memberWithdrawText}</TabButton>
                </Tabs>
                <TabContent>
                    {selectedTab === 1 && <MemberInfoModal onClose={onClose}/>}
                    {selectedTab === 2 && <CashModal onClose={onClose} cashId={cashId} />}
                    {selectedTab === 3 && <MemberWithdrawalModal onClose={onClose}/>}
                </TabContent>
            </ModalContainer>
        </ModalBackground>
    );
}

interface ProfileModalProps {
    onClose: () => void;
}


// 모달 배경 스타일
const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

// 모달 컨테이너 스타일
const ModalContainer = styled.div`
  position: relative;
  background-color: white;
  padding: 20px;
  width: 400px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Tabs = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
`;

// 모달 닫기 버튼 스타일
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #FFFFFF;
  border: 1px solid lightgray;
  font-size: 1.5rem;
  cursor: pointer;
`;

interface TabButtonProps {
    active?: boolean;
}

const TabButton = styled.button<TabButtonProps>`
    flex: 1;
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${({ active }) => (active ? 'darkslategray' : '#FFFFFF')};
    color: ${({ active }) => (active ? '#FFFFFF' : 'darkslategray')};
`;

const TabContent = styled.div`
    width: 100%;
`;


export default ProfileModal;