import { Metadata } from 'next';
import styled from '@emotion/styled';
import { colors, spacing, typography, borderRadius } from '@/styles';

export const metadata: Metadata = {
  title: '개인정보처리방침 - KeepUp',
  description: 'KeepUp 개인정보처리방침입니다.',
  robots: {
    index: true,
    follow: true,
  },
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${spacing.xxl}px ${spacing.lg}px;
  background: ${colors.background};
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${spacing.xxl}px;
`;

const Title = styled.h1`
  font-size: ${typography.h1.fontSize}px;
  font-weight: ${typography.h1.fontWeight};
  line-height: ${typography.h1.lineHeight}px;
  color: ${colors.text};
  margin-bottom: ${spacing.md}px;
`;

const Subtitle = styled.p`
  font-size: ${typography.body.fontSize}px;
  color: ${colors.textSecondary};
`;

const Content = styled.div`
  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.lg}px;
  padding: ${spacing.xl}px;
`;

const Section = styled.section`
  margin-bottom: ${spacing.xl}px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: ${typography.h3.fontSize}px;
  font-weight: ${typography.h3.fontWeight};
  line-height: ${typography.h3.lineHeight}px;
  color: ${colors.text};
  margin-bottom: ${spacing.md}px;
`;

const SectionContent = styled.div`
  font-size: ${typography.body.fontSize}px;
  line-height: ${typography.body.lineHeight}px;
  color: ${colors.textSecondary};
  
  p {
    margin-bottom: ${spacing.md}px;
  }
  
  ul, ol {
    margin-bottom: ${spacing.md}px;
    padding-left: ${spacing.lg}px;
  }
  
  li {
    margin-bottom: ${spacing.sm}px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: ${spacing.md}px;
  }
  
  th, td {
    border: 1px solid ${colors.border};
    padding: ${spacing.sm}px;
    text-align: left;
  }
  
  th {
    background: ${colors.surfaceVariant};
    font-weight: ${typography.bodyBold.fontWeight};
  }
`;

export default function PrivacyPage() {
  return (
    <Container>
      <Header>
        <Title>개인정보처리방침</Title>
        <Subtitle>KeepUp 개인정보처리방침</Subtitle>
      </Header>
      
      <Content>
        <Section>
          <SectionTitle>제1조 (개인정보의 처리목적)</SectionTitle>
          <SectionContent>
            <p>
              KeepUp(이하 &quot;회사&quot;)은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ul>
              <li>회원 가입 및 관리: 회원 식별, 가입의사 확인, 본인확인, 회원자격 유지·관리</li>
              <li>서비스 제공: 챌린지 참가, 인증 관리, 보너스 지급, 고객상담</li>
              <li>마케팅 및 광고: 신규 서비스 개발, 이벤트 정보 제공</li>
            </ul>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>제2조 (개인정보의 처리 및 보유기간)</SectionTitle>
          <SectionContent>
            <p>회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
            
            <table>
              <thead>
                <tr>
                  <th>구분</th>
                  <th>보유기간</th>
                  <th>근거</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>회원정보</td>
                  <td>회원 탈퇴 시까지</td>
                  <td>정보주체 동의</td>
                </tr>
                <tr>
                  <td>챌린지 인증 자료</td>
                  <td>챌린지 종료 후 7일</td>
                  <td>정보주체 동의</td>
                </tr>
                <tr>
                  <td>결제 정보</td>
                  <td>5년</td>
                  <td>전자상거래법</td>
                </tr>
                <tr>
                  <td>고객상담 기록</td>
                  <td>3년</td>
                  <td>전자상거래법</td>
                </tr>
              </tbody>
            </table>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>제3조 (처리하는 개인정보의 항목)</SectionTitle>
          <SectionContent>
            <p>회사는 다음의 개인정보 항목을 처리하고 있습니다:</p>
            
            <h4>필수항목</h4>
            <ul>
              <li>이메일 주소</li>
              <li>이름 (선택사항)</li>
              <li>결제 정보 (결제 시)</li>
            </ul>
            
            <h4>자동 수집 항목</h4>
            <ul>
              <li>IP 주소, 쿠키, 서비스 이용 기록, 접속 로그</li>
              <li>챌린지 인증 자료 (사진, 영상, 스크린샷)</li>
            </ul>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>제4조 (개인정보의 제3자 제공)</SectionTitle>
          <SectionContent>
            <p>
              회사는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
            </p>
            <p>
              회사는 다음과 같이 개인정보를 제3자에게 제공하고 있습니다:
            </p>
            <table>
              <thead>
                <tr>
                  <th>제공받는 자</th>
                  <th>제공목적</th>
                  <th>제공항목</th>
                  <th>보유기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PG사</td>
                  <td>결제 처리</td>
                  <td>결제 정보</td>
                  <td>결제 완료 시까지</td>
                </tr>
              </tbody>
            </table>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>제5조 (개인정보처리의 위탁)</SectionTitle>
          <SectionContent>
            <p>
              회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:
            </p>
            <table>
              <thead>
                <tr>
                  <th>위탁받는 자</th>
                  <th>위탁업무</th>
                  <th>위탁기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Amazon Web Services</td>
                  <td>서버 운영 및 데이터 저장</td>
                  <td>서비스 제공 기간</td>
                </tr>
                <tr>
                  <td>PG사</td>
                  <td>결제 처리</td>
                  <td>결제 처리 시</td>
                </tr>
              </tbody>
            </table>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>제6조 (정보주체의 권리·의무 및 행사방법)</SectionTitle>
          <SectionContent>
            <p>정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:</p>
            <ul>
              <li>개인정보 처리현황 통지요구</li>
              <li>개인정보 열람요구</li>
              <li>개인정보 정정·삭제요구</li>
              <li>개인정보 처리정지요구</li>
            </ul>
            <p>
              권리 행사는 회사에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.
            </p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>제7조 (개인정보의 안전성 확보조치)</SectionTitle>
          <SectionContent>
            <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:</p>
            <ul>
              <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등</li>
              <li>기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 개인정보의 암호화, 보안프로그램 설치</li>
              <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
            </ul>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>제8조 (개인정보보호책임자)</SectionTitle>
          <SectionContent>
            <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보보호책임자를 지정하고 있습니다:</p>
            <ul>
              <li>개인정보보호책임자: 홍길동</li>
              <li>연락처: support@keepup.kr</li>
            </ul>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>제9조 (개인정보처리방침의 변경)</SectionTitle>
          <SectionContent>
            <p>
              이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
            </p>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>부칙</SectionTitle>
          <SectionContent>
            <p>이 개인정보처리방침은 2024년 1월 1일부터 시행합니다.</p>
          </SectionContent>
        </Section>
      </Content>
    </Container>
  );
}
