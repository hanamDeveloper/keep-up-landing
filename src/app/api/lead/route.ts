import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, marketingConsent } = body;

    // 이메일 유효성 검사
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: '유효한 이메일을 입력해주세요.' },
        { status: 400 }
      );
    }

    // 실제 구현에서는 여기서 데이터베이스에 저장하거나
    // 외부 서비스(이메일 마케팅 도구 등)에 전송합니다
    console.log('Lead registration:', {
      email,
      name,
      marketingConsent,
      timestamp: new Date().toISOString(),
    });

    // 성공 응답
    return NextResponse.json(
      { 
        message: '대기자 등록이 완료되었습니다!',
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Lead registration error:', error);
    
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
