import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    // Authorization 헤더에서 토큰 추출
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "인증 토큰이 필요합니다." },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7); // "Bearer " 제거

    // TODO: 실제 API 서버로 계정 삭제 요청
    // 예시: const response = await fetch(`${API_BASE_URL}/account/delete`, {
    //   method: "DELETE",
    //   headers: {
    //     "Authorization": `Bearer ${token}`,
    //     "Content-Type": "application/json",
    //   },
    // });

    // 임시로 성공 응답 반환 (실제 구현 시 위의 API 호출로 대체)
    console.log("Account deletion request for token:", token);

    // 실제 구현 예시:
    /*
    const response = await fetch(`${process.env.API_BASE_URL}/account/delete`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || "계정 삭제에 실패했습니다." },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);
    */

    // 임시 성공 응답
    return NextResponse.json({
      success: true,
      message: "계정이 성공적으로 삭제되었습니다.",
    });

  } catch (error) {
    console.error("Account deletion error:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
