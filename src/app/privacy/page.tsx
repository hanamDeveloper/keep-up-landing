import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침 - KeepUp',
  description: 'KeepUp 개인정보처리방침입니다.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '48px 24px',
      backgroundColor: '#0f0f23',
      minHeight: '100vh',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          lineHeight: '40px',
          color: '#ffffff',
          marginBottom: '16px',
          margin: '0 0 16px 0'
        }}>
          개인정보처리방침
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#a1a1aa',
          margin: '0'
        }}>
          KeepUp 개인정보처리방침
        </p>
      </div>
      
      <div style={{
        background: '#1a1a2e',
        border: '1px solid #27272a',
        borderRadius: '16px',
        padding: '32px'
      }}>
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '32px',
            color: '#ffffff',
            marginBottom: '16px',
            margin: '0 0 16px 0'
          }}>
            제1조 (개인정보의 처리목적)
          </h2>
          <div style={{
            fontSize: '16px',
            lineHeight: '24px',
            color: '#a1a1aa'
          }}>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>
              KeepUp(이하 &quot;회사&quot;)은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ul style={{ marginBottom: '16px', paddingLeft: '24px', margin: '0 0 16px 0' }}>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>회원 가입 및 관리: 회원 식별, 가입의사 확인, 본인확인, 회원자격 유지·관리</li>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>서비스 제공: 챌린지 참가, 인증 관리, 보너스 지급, 고객상담</li>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>마케팅 및 광고: 신규 서비스 개발, 이벤트 정보 제공</li>
            </ul>
          </div>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '32px',
            color: '#ffffff',
            marginBottom: '16px',
            margin: '0 0 16px 0'
          }}>
            제2조 (개인정보의 처리 및 보유기간)
          </h2>
          <div style={{
            fontSize: '16px',
            lineHeight: '24px',
            color: '#a1a1aa'
          }}>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
            
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginBottom: '16px',
              margin: '0 0 16px 0'
            }}>
              <thead>
                <tr>
                  <th style={{
                    border: '1px solid #27272a',
                    padding: '8px',
                    textAlign: 'left',
                    background: '#16213e',
                    fontWeight: '600'
                  }}>구분</th>
                  <th style={{
                    border: '1px solid #27272a',
                    padding: '8px',
                    textAlign: 'left',
                    background: '#16213e',
                    fontWeight: '600'
                  }}>보유기간</th>
                  <th style={{
                    border: '1px solid #27272a',
                    padding: '8px',
                    textAlign: 'left',
                    background: '#16213e',
                    fontWeight: '600'
                  }}>근거</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #27272a', padding: '8px' }}>회원정보</td>
                  <td style={{ border: '1px solid #27272a', padding: '8px' }}>회원 탈퇴 시까지</td>
                  <td style={{ border: '1px solid #27272a', padding: '8px' }}>정보주체 동의</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #27272a', padding: '8px' }}>챌린지 인증 자료</td>
                  <td style={{ border: '1px solid #27272a', padding: '8px' }}>챌린지 종료 후 7일</td>
                  <td style={{ border: '1px solid #27272a', padding: '8px' }}>정보주체 동의</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #27272a', padding: '8px' }}>결제 정보</td>
                  <td style={{ border: '1px solid #27272a', padding: '8px' }}>5년</td>
                  <td style={{ border: '1px solid #27272a', padding: '8px' }}>전자상거래법</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #27272a', padding: '8px' }}>고객상담 기록</td>
                  <td style={{ border: '1px solid #27272a', padding: '8px' }}>3년</td>
                  <td style={{ border: '1px solid #27272a', padding: '8px' }}>전자상거래법</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '32px',
            color: '#ffffff',
            marginBottom: '16px',
            margin: '0 0 16px 0'
          }}>
            제3조 (처리하는 개인정보의 항목)
          </h2>
          <div style={{
            fontSize: '16px',
            lineHeight: '24px',
            color: '#a1a1aa'
          }}>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>회사는 다음의 개인정보 항목을 처리하고 있습니다:</p>
            
            <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#ffffff', marginBottom: '8px', margin: '0 0 8px 0' }}>필수항목</h4>
            <ul style={{ marginBottom: '16px', paddingLeft: '24px', margin: '0 0 16px 0' }}>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>이메일 주소</li>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>이름 (선택사항)</li>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>결제 정보 (결제 시)</li>
            </ul>
            
            <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#ffffff', marginBottom: '8px', margin: '0 0 8px 0' }}>자동 수집 항목</h4>
            <ul style={{ marginBottom: '16px', paddingLeft: '24px', margin: '0 0 16px 0' }}>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>IP 주소, 쿠키, 서비스 이용 기록, 접속 로그</li>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>챌린지 인증 자료 (사진, 영상, 스크린샷)</li>
            </ul>
          </div>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '32px',
            color: '#ffffff',
            marginBottom: '16px',
            margin: '0 0 16px 0'
          }}>
            제4조 (개인정보의 제3자 제공)
          </h2>
          <div style={{
            fontSize: '16px',
            lineHeight: '24px',
            color: '#a1a1aa'
          }}>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>
              회사는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
            </p>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>
              회사는 다음과 같이 개인정보를 제3자에게 제공하고 있습니다:
            </p>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginBottom: '16px',
              margin: '0 0 16px 0'
            }}>
              <thead>
                <tr>
                  <th style={{
                    border: '1px solid #27272a',
                    padding: '8px',
                    textAlign: 'left',
                    background: '#16213e',
                    fontWeight: '600'
                  }}>제공받는 자</th>
                  <th style={{
                    border: '1px solid #27272a',
                    padding: '8px',
                    textAlign: 'left',
                    background: '#16213e',
                    fontWeight: '600'
                  }}>제공목적</th>
                  <th style={{
                    border: '1px solid #27272a',
                    padding: '8px',
                    textAlign: 'left',
                    background: '#16213e',
                    fontWeight: '600'
                  }}>제공항목</th>
                  <th style={{
                    border: '1px solid #27272a',
                    padding: '8px',
                    textAlign: 'left',
                    background: '#16213e',
                    fontWeight: '600'
                  }}>보유기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #27272a', padding: '8px' }}>PG사</td>
                  <td style={{ border: '1px solid #27272a', padding: '8px' }}>결제 처리</td>
                  <td style={{ border: '1px solid #27272a', padding: '8px' }}>결제 정보</td>
                  <td style={{ border: '1px solid #27272a', padding: '8px' }}>결제 완료 시까지</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '32px',
            color: '#ffffff',
            marginBottom: '16px',
            margin: '0 0 16px 0'
          }}>
            제5조 (개인정보처리의 위탁)
          </h2>
          <div style={{
            fontSize: '16px',
            lineHeight: '24px',
            color: '#a1a1aa'
          }}>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>
              회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:
            </p>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginBottom: '16px',
              margin: '0 0 16px 0'
            }}>
              <thead>
                <tr>
                  <th style={{
                    border: '1px solid #27272a',
                    padding: '8px',
                    textAlign: 'left',
                    background: '#16213e',
                    fontWeight: '600'
                  }}>위탁받는 자</th>
                  <th style={{
                    border: '1px solid #27272a',
                    padding: '8px',
                    textAlign: 'left',
                    background: '#16213e',
                    fontWeight: '600'
                  }}>위탁업무</th>
                  <th style={{
                    border: '1px solid #27272a',
                    padding: '8px',
                    textAlign: 'left',
                    background: '#16213e',
                    fontWeight: '600'
                  }}>위탁기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #27272a', padding: '8px' }}>Amazon Web Services</td>
                  <td style={{ border: '1px solid #27272a', padding: '8px' }}>서버 운영 및 데이터 저장</td>
                  <td style={{ border: '1px solid #27272a', padding: '8px' }}>서비스 제공 기간</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #27272a', padding: '8px' }}>PG사</td>
                  <td style={{ border: '1px solid #27272a', padding: '8px' }}>결제 처리</td>
                  <td style={{ border: '1px solid #27272a', padding: '8px' }}>결제 처리 시</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '32px',
            color: '#ffffff',
            marginBottom: '16px',
            margin: '0 0 16px 0'
          }}>
            제6조 (정보주체의 권리·의무 및 행사방법)
          </h2>
          <div style={{
            fontSize: '16px',
            lineHeight: '24px',
            color: '#a1a1aa'
          }}>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:</p>
            <ul style={{ marginBottom: '16px', paddingLeft: '24px', margin: '0 0 16px 0' }}>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>개인정보 처리현황 통지요구</li>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>개인정보 열람요구</li>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>개인정보 정정·삭제요구</li>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>개인정보 처리정지요구</li>
            </ul>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>
              권리 행사는 회사에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '32px',
            color: '#ffffff',
            marginBottom: '16px',
            margin: '0 0 16px 0'
          }}>
            제7조 (개인정보의 안전성 확보조치)
          </h2>
          <div style={{
            fontSize: '16px',
            lineHeight: '24px',
            color: '#a1a1aa'
          }}>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:</p>
            <ul style={{ marginBottom: '16px', paddingLeft: '24px', margin: '0 0 16px 0' }}>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등</li>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 개인정보의 암호화, 보안프로그램 설치</li>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
            </ul>
          </div>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '32px',
            color: '#ffffff',
            marginBottom: '16px',
            margin: '0 0 16px 0'
          }}>
            제8조 (개인정보보호책임자)
          </h2>
          <div style={{
            fontSize: '16px',
            lineHeight: '24px',
            color: '#a1a1aa'
          }}>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보보호책임자를 지정하고 있습니다:</p>
            <ul style={{ marginBottom: '16px', paddingLeft: '24px', margin: '0 0 16px 0' }}>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>개인정보보호책임자: 홍길동</li>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>연락처: support@keepup.kr</li>
            </ul>
          </div>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '32px',
            color: '#ffffff',
            marginBottom: '16px',
            margin: '0 0 16px 0'
          }}>
            제9조 (개인정보처리방침의 변경)
          </h2>
          <div style={{
            fontSize: '16px',
            lineHeight: '24px',
            color: '#a1a1aa'
          }}>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>
              이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
            </p>
          </div>
        </section>

        <section>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '32px',
            color: '#ffffff',
            marginBottom: '16px',
            margin: '0 0 16px 0'
          }}>
            부칙
          </h2>
          <div style={{
            fontSize: '16px',
            lineHeight: '24px',
            color: '#a1a1aa'
          }}>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>
              이 개인정보처리방침은 2024년 1월 1일부터 시행합니다.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
