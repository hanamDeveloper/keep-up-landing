export const appConfig = {
  brand: {
    name: 'KeepUp',
    tagline: '습관을 돈으로 지키는 가장 현대적인 방법',
    description: '매일 인증하는 챌린지. 완주하면 보너스를 돌려받고, 실패해도 다시 시도하도록 설계했습니다.',
  },
  
  copy: {
    hero: {
      headline: '습관을 돈으로 지키는 가장 현실적인 방법',
      subheadline: '매일 인증하는 챌린지. 완주하면 보너스를 돌려받고, 실패해도 다시 시도하도록 설계했습니다.',
      cta: {
        primary: '대기자 등록',
        secondary: '카카오채널 추가'
      }
    },
    
    announcement: '🎉 베타 오픈! 지금 대기자 등록 시 얼리버드 혜택 제공',
    
    socialProof: {
      satisfaction: '베타 테스터 만족도 92%',
      certifications: '누적 인증 12,000+'
    },
    
    features: [
      {
        title: '하루 1번 간단 인증',
        description: '사진, 영상, 스크린샷으로 간편하게 인증하세요'
      },
      {
        title: '자동 판정 + 운영팀 검수',
        description: 'AI 자동 판정과 운영팀 검수로 공정성을 강화합니다'
      },
      {
        title: '보너스 분배 구조',
        description: '완주자들끼리 보너스를 나누어 꾸준함을 장려합니다'
      },
      {
        title: '안전한 결제 시스템',
        description: '가상계좌/카드 결제로 안전한 결제 흐름을 제공합니다'
      },
      {
        title: '이의신청 시스템',
        description: '문제가 생기면 언제든 이의신청할 수 있습니다'
      }
    ],
    
    howItWorks: [
      {
        step: 1,
        title: '챌린지 선택',
        description: '원하는 챌린지를 선택하고 참가비를 확인하세요'
      },
      {
        step: 2,
        title: '결제 및 참가',
        description: '안전한 결제 시스템으로 참가비를 납부하세요'
      },
      {
        step: 3,
        title: '매일 인증 & 완주',
        description: '매일 인증하고 완주 시 보너스를 받으세요'
      }
    ],
    
    pricing: [
      { amount: 5000, label: '5천원' },
      { amount: 10000, label: '1만원' },
      { amount: 20000, label: '2만원' },
      { amount: 50000, label: '5만원' },
      { amount: 100000, label: '10만원' }
    ],
    
    compliance: {
      security: [
        '표준 암호화(HTTPS, JWT) 사용',
        'AWS 보안 그룹·IAM 운영',
        'PG사 결제망과 정산 정책 준수',
        '개인정보 최소 수집, 인증 자료는 챌린지 종료 후 7일 이내 파기'
      ]
    },
    
    faq: [
      {
        question: '환불 정책은 어떻게 되나요?',
        answer: '챌린지 시작 전까지는 환불 가능하며, 시작 후에는 환불이 제한됩니다. 자세한 내용은 이용약관을 확인해주세요.'
      },
      {
        question: '도박이나 사행성이 아닌가요?',
        answer: '결과는 개인의 노력과 행동에 의해 결정되며, 도박이나 사행성이 아닙니다. 습관 형성을 위한 동기부여 도구입니다. 챌린지는 운영진의 엄격한 심사를 통해 점검되며, 결코 도박이나 사행성 같은 챌린지는 등록되지 않습니다.'
      },
      {
        question: '인증 실패 시 어떻게 처리되나요?',
        answer: '인증 실패 시 이의신청을 통해 재검토를 요청할 수 있습니다. 운영팀이 공정하게 검토합니다.'
      },
      {
        question: '어떤 결제 수단을 사용할 수 있나요?',
        answer: '현재 가상계좌와 카드 결제를 지원하며, 무통장입금도 도입을 검토 중입니다.'
      }
    ],
    
    cta: {
      headline: '베타 대기자 등록하고 가장 먼저 경험하세요',
      subheadline: '얼리버드 혜택과 함께 KeepUp의 새로운 습관 형성 경험을 만나보세요'
    }
  },
  
  payment: {
    bankName: '농협',
    accountNumber: '351-1375-9674-03',
    accountHolder: '김은미(자브로(jobro))',
    defaultAmount: 10000,
    description: 'KeepUp 챌린지 참가비'
  },
  
  links: {
    kakao: 'https://pf.kakao.com/_keepup',
    terms: '/terms',
    privacy: '/privacy',
    payment: '/payment',
    email: 'jobroapp@gmail.com'
  },
  
  seo: {
    title: 'KeepUp - 습관을 돈으로 지키는 가장 현실적인 방법',
    description: '매일 인증하는 챌린지로 습관을 형성하고 보너스를 받으세요. 완주하면 보너스를 돌려받고, 실패해도 다시 시도하도록 설계된 KeepUp을 만나보세요.',
    keywords: '챌린지, 습관, 공부, 운동, 동기부여, 습관형성, 챌린지앱',
    ogImage: '/og.png'
  }
};
