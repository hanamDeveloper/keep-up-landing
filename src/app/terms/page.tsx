import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관 - KeepUp',
  description: 'KeepUp 서비스 이용약관입니다.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
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
          이용약관
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#a1a1aa',
          margin: '0'
        }}>
          KeepUp 서비스 이용약관
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
            제1조 (목적)
          </h2>
          <div style={{
            fontSize: '16px',
            lineHeight: '24px',
            color: '#a1a1aa'
          }}>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>
              이 약관은 KeepUp(이하 &quot;회사&quot;)이 제공하는 습관 형성 챌린지 서비스(이하 &quot;서비스&quot;)의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
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
            제2조 (정의)
          </h2>
          <div style={{
            fontSize: '16px',
            lineHeight: '24px',
            color: '#a1a1aa'
          }}>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>이 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
            <ul style={{ marginBottom: '16px', paddingLeft: '24px', margin: '0 0 16px 0' }}>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>&quot;서비스&quot;란 회사가 제공하는 습관 형성을 위한 챌린지 플랫폼을 의미합니다.</li>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>&quot;이용자&quot;란 서비스에 접속하여 이 약관에 따라 서비스를 이용하는 회원 및 비회원을 의미합니다.</li>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>&quot;회원&quot;이란 서비스에 개인정보를 제공하여 회원등록을 한 자로서, 서비스의 정보를 지속적으로 제공받으며 서비스를 계속적으로 이용할 수 있는 자를 의미합니다.</li>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>&quot;챌린지&quot;란 이용자가 참가하는 습관 형성을 위한 일정 기간의 인증 활동을 의미합니다.</li>
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
            제3조 (약관의 효력 및 변경)
          </h2>
          <div style={{
            fontSize: '16px',
            lineHeight: '24px',
            color: '#a1a1aa'
          }}>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>
              이 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.
            </p>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>
              회사는 합리적인 사유가 발생할 경우에는 이 약관을 변경할 수 있으며, 약관이 변경되는 경우 변경된 약관의 내용과 시행일을 정하여, 시행일로부터 최소 7일 이전에 공지합니다.
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
            제4조 (서비스의 제공)
          </h2>
          <div style={{
            fontSize: '16px',
            lineHeight: '24px',
            color: '#a1a1aa'
          }}>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>회사는 다음과 같은 서비스를 제공합니다:</p>
            <ul style={{ marginBottom: '16px', paddingLeft: '24px', margin: '0 0 16px 0' }}>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>습관 형성을 위한 챌린지 플랫폼 제공</li>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>챌린지 참가 및 인증 시스템</li>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>보너스 지급 및 정산 서비스</li>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>기타 회사가 정하는 서비스</li>
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
            제5조 (챌린지 참가 및 환불)
          </h2>
          <div style={{
            fontSize: '16px',
            lineHeight: '24px',
            color: '#a1a1aa'
          }}>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>
              챌린지 참가비는 보증금 성격으로, 챌린지 시작 전까지는 전액 환불이 가능합니다.
            </p>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>
              챌린지 시작 후에는 다음의 경우를 제외하고는 환불이 제한됩니다:
            </p>
            <ul style={{ marginBottom: '16px', paddingLeft: '24px', margin: '0 0 16px 0' }}>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>회사의 귀책사유로 인한 서비스 중단</li>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>기타 회사가 인정하는 특별한 사유</li>
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
            제6조 (이용자의 의무)
          </h2>
          <div style={{
            fontSize: '16px',
            lineHeight: '24px',
            color: '#a1a1aa'
          }}>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>이용자는 다음 행위를 하여서는 안 됩니다:</p>
            <ul style={{ marginBottom: '16px', paddingLeft: '24px', margin: '0 0 16px 0' }}>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>타인의 정보를 도용하여 회원가입을 하는 행위</li>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>챌린지 인증 시 허위 정보를 제출하는 행위</li>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>서비스의 안정적 운영을 방해하는 행위</li>
              <li style={{ marginBottom: '8px', margin: '0 0 8px 0' }}>기타 관련 법령에 위반되는 행위</li>
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
            제7조 (개인정보보호)
          </h2>
          <div style={{
            fontSize: '16px',
            lineHeight: '24px',
            color: '#a1a1aa'
          }}>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>
              회사는 이용자의 개인정보를 보호하기 위해 개인정보처리방침을 수립하고 이를 준수합니다.
            </p>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>
              챌린지 인증 자료는 챌린지 종료 후 7일 이내에 파기됩니다.
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
            제8조 (서비스의 중단)
          </h2>
          <div style={{
            fontSize: '16px',
            lineHeight: '24px',
            color: '#a1a1aa'
          }}>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>
              회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
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
            제9조 (손해배상)
          </h2>
          <div style={{
            fontSize: '16px',
            lineHeight: '24px',
            color: '#a1a1aa'
          }}>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>
              회사는 무료로 제공되는 서비스와 관련하여 회원에게 어떠한 손해가 발생하더라도 동 손해가 회사의 고의 또는 중대한 과실에 의한 경우를 제외하고는 이에 대하여 책임을 부담하지 아니합니다.
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
            제10조 (준거법 및 관할법원)
          </h2>
          <div style={{
            fontSize: '16px',
            lineHeight: '24px',
            color: '#a1a1aa'
          }}>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>
              이 약관에 명시되지 않은 사항은 전기통신사업법 등 대한민국의 관련 법령과 상관례에 따릅니다.
            </p>
            <p style={{ marginBottom: '16px', margin: '0 0 16px 0' }}>
              서비스 이용으로 발생한 분쟁에 대해 소송이 제기되는 경우 회사의 본사 소재지를 관할하는 법원을 전속 관할 법원으로 합니다.
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
              이 약관은 2024년 1월 1일부터 시행합니다.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
