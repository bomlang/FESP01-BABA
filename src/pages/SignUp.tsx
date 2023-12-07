import Logo from '@/components/Logo'
import Input from '@/components/Input'
import styled from 'styled-components'
import Button from '@/components/Button'
import CheckAccount from '@/components/CheckAccount'

function SignUp() {
  return (
    <SignUpWrapperDiv>
      <SrOnlyH2>회원가입</SrOnlyH2>
      <Logo />
      <Button $bgcolor="#FFDC00" color="#1E1E1E" text="KaKao 로그인" />
      <FormWrapper>
        <label htmlFor="email"></label>
        <Input id="emaiil" type="input" placeholder="이메일" />
        <label htmlFor="userName"></label>
        <Input id="userName" type="input" placeholder="사용자 이름" />
        <label htmlFor="nickName"></label>
        <Input id="nickName" type="input" placeholder="닉네임" maxlength={5} />
        <label htmlFor="password"></label>
        <Input id="password" type="password" placeholder="패스워드" />
        <label htmlFor="checkPassword"></label>
        <Input type="checkPassword" placeholder="패스워드 확인" />
        <AllAgreeDiv>
          <label htmlFor="allAgree"></label>
          <input id="allAgree" type="checkbox" />
          전체 약관 동의
        </AllAgreeDiv>
        <AgreeDiv>
          <label htmlFor="useAgree"></label>
          <input id="useAgree" type="checkbox" />
          이용 약관 동의
        </AgreeDiv>
        <AgreeDiv>
          <label htmlFor="personalAgree"></label>
          <input id="personalAgree" type="checkbox" />
          개인정보 수집 및 이용 동의
        </AgreeDiv>
        <Button type="submit" text="가입하기" />
      </FormWrapper>
      <CheckAccount text1="이미 계정이 있으신가요?" text2="로그인" />
    </SignUpWrapperDiv>
  )
}

export default SignUp

export const SignUpWrapperDiv = styled.div`
  width: 390px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SrOnlyH2 = styled.h2`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`
export const FormWrapper = styled.form`
  padding: 30px 0 20px 0;
  border-top: 1px solid #bcbcbc;
  border-bottom: 1px solid #bcbcbc;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const AgreeDiv = styled.div`
  display: flex;
  gap: 10px;
  justify-content: start;
  align-items: center;
  width: 260px;
  padding-left: 10px;
  margin: auto;
  margin-bottom: 10px;
`

const AllAgreeDiv = styled(AgreeDiv)`
  height: 32px;
  background: #ebfaf8;
  border: 1px solid #bcbcbc;
  border-radius: 5px;
`