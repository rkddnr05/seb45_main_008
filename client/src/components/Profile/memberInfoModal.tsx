import React from 'react';
import styled from 'styled-components'; 
import { useGetMemberInfo } from '../../hooks/useGetMemberInfo.ts';  

const MemberInfoModal: React.FC<MemberInfoModalProps> = ({ onClose }) => {
    
    // memberId 값을 useGetMemberInfo 훅에 전달하여 회원 정보를 가져옵니다.
    const { data: memberInfo } = useGetMemberInfo(); 

    const titleText = "회원정보";
    const nameText = "이름: ";
    const emailText = "이메일: ";
    const createdAtText = "회원 가입 일시: ";

    return (
        <ModalBackground>
            <ModalContainer>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <Title>{titleText}</Title>
                {memberInfo ? (
                    <div>
                        <p>{nameText}{memberInfo.name}</p>
                        <p>{emailText}{memberInfo.email}</p>
                        <p>{createdAtText}{memberInfo.createdAt}</p>
                    </div>
                ) : (
                    <div>Data not available</div>
                )}
            </ModalContainer>
        </ModalBackground>
    );
};

interface MemberInfoModalProps {
    onClose: () => void;
}



// Styled Components Definitions:

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

const ModalContainer = styled.div`
  z-index: 11;
  position: relative;
  background-color: white;
  padding: 20px;
  width: 400px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.6rem;
  font-weight: 400;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #FFFFFF;
  border: 1px solid lightgray;
  font-size: 1.5rem;
  cursor: pointer;
`;

export default MemberInfoModal;