# KeepUp 챌린지 앱 API 명세서

## 개요

KeepUp은 사용자가 챌린지에 참가하고 인증하여 상금을 받는 앱입니다. 이 문서는 프론트엔드에서 사용하는 모든 API의 명세를 포함합니다.

## 인증

- 모든 API는 JWT 토큰을 Authorization 헤더에 포함해야 합니다.
- 토큰 형식: `Authorization: Bearer {token}`

categoryType : EXERCISE, STUDY, IMPROVEMENT, ETC
status : WAIT, APPROVE, REJECT, START, END, REMITTANCE
certifyTypeCode : PICTURE, VIDEO

---

**GET** `/admin/challenge`

**목적**: 챌린지 목록 (테이블)

**요청**:

```typescript
{

  "page": 1,
  "perPage": 50,
  "categoryType": "string",
  "challengeStatus": "string"

}
```

**응답**:

```typescript
{
  "result": true,
  "code": 1,
  "data": {
    "pagination": {
      "page": 1,
      "pageCount": 1,
      "perPage": 50,
      "totalCount": 10
    },
    "contents": [
      {
        "rowNo": 10,
        "id": 7,
        "categoryType": "EXERCISE",
        "thumbnail": {
          "id": 8,
          "name": "dont.gif",
          "path": "https://file.keep-up.me/local-product/test/fd5791ec2d0e476e95803f1fc1dd18af",
          "thumbnailPath": null,
          "size": 7262006
        },
        "status": "START",
        "title": "챌린지 제목6",
        "userCount": 1,
        "price": 6000,
        "fee": 5,
        "needCheck": true
      },
    ]
  },
  "message": "정상적으로 처리되었습니다."
}
```

/////

**GET** `/admin/challenge/{challengeId}`

**목적**: 챌린지 목록 상세

**요청**:

**응답**:

```typescript
{
  "rowNo": 0,
  "id": 0,
  "categoryType": "string",
  "thumbnailFile": {
    "id": 0,
    "name": "string",
    "path": "string",
    "thumbnailPath": "string",
    "size": 0
  },
  "title": "string",
  "content": "string",
  "price": 0,
  "guidelineList": [
    "string"
  ],
  "needCheck": true
}
```

/////

**PUT** `/admin/challenge/{challengeId}`

**목적**: 챌린지 승인/거절

**요청**:
```typescript
{
  "title": "string",
  "content": "string",
  "categoryCode": "string",
  "certifyTypeCode": "string",
  "startDate": "2025-09-19",
  "endDate": "2025-09-19",
  "price": 0,
  "guidelineList": [
    "string"
  ],
  "reason": "string",
  "approved": true,
  "thumbnailFile": {
    "id": 0
  },
  "link": "string",
  "fee": 0
}
```

**응답**:

```typescript
{
  "rowNo": 0,
  "id": 0,
  "categoryType": "string",
  "thumbnailFile": {
    "id": 0,
    "name": "string",
    "path": "string",
    "thumbnailPath": "string",
    "size": 0
  },
  "title": "string",
  "content": "string",
  "price": 0,
  "guidelineList": [
    "string"
  ],
  "needCheck": true
}
```

/////

**PUT** `/admin/challenge/{challengeId}/{challengeCertifyId}`

**목적**: 이의 신청 승인 및 거절 처리

**요청**:
```typescript
{
  "approved": true,
  "reason": "string"
}
```

**응답**:

```typescript
```

/////


**PUT** `/admin/challenge/{challengeId}/{challengeCertifyId}/certify`

**목적**: 인증 승인 및 거부

**요청**:
```typescript
{
  "approved": true,
  "reason": "string"
}
```

**응답**:

```typescript
```


/////

**PUT** `/admin/challenge/{challengeId}/{userId}/pay`

**목적**: 보증금 입금 확인 처리

**요청**:
```typescript
```

**응답**:

```typescript
```

/////


**GET** `/admin/challenge/{challengeId}/certify`

**목적**: 챌린지 상세 > 인증 목록 불러오기

**요청**:
```typescript
```

**응답**:

```typescript
{
  "rowNo": 0,
  "id": 0,
  "categoryType": "string",
  "thumbnailFile": {
    "id": 0,
    "name": "string",
    "path": "string",
    "thumbnailPath": "string",
    "size": 0
  },
  "title": "string",
  "content": "string",
  "price": 0,
  "guidelineList": [
    "string"
  ],
  "needCheck": true
}
```

/////

**PUT** `/admin/challenge/{challengeId}/remittance`

**목적**: 챌린지 참여 인원 일괄 송금 완료 처리

**요청**:
```typescript
```

**응답**:

```typescript
{
  "rowNo": 0,
  "id": 0,
  "categoryType": "string",
  "thumbnailFile": {
    "id": 0,
    "name": "string",
    "path": "string",
    "thumbnailPath": "string",
    "size": 0
  },
  "title": "string",
  "content": "string",
  "price": 0,
  "guidelineList": [
    "string"
  ],
  "needCheck": true
}
```

/////



**GET** `/admin/challenge/pay`

**목적**: 챌린지 참여 신청자 입금 확인 목록

**요청**:
```typescript
{
  "page": 1,
  "perPage": 50,
  "categoryType": "string",
  "userStatus": "string",
  "challengeStatus": "string"
}
```

**응답**:

```typescript
{
  "rowNo": 0,
  "id": 0,
  "categoryType": "string",
  "thumbnail": {
    "id": 0,
    "name": "string",
    "path": "string",
    "thumbnailPath": "string",
    "size": 0
  },
  "status": "string",
  "title": "string",
  "userCount": 0,
  "price": 0,
  "totalPrice": 0,
  "startDate": "2025-09-19",
  "endDate": "2025-09-19"
}
```

/////




**POST** `/admin/sign`

**목적**: 관리자 로그인

**요청**:
```typescript
{
  "username": "keepUpAdmin",
  "password": "ee123123"
}
```

**응답**:

```typescript
{
  "result": true,
  "code": 1,
  "data": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMSIsInNjcCI6IlJPTEVfVVNFUiBST0xFX0FETUlOIiwiaXNzIjoiYWciLCJpYXQiOjE3NTgyNTM5MTQsImV4cCI6NjAwMDAwMTc1ODI1MzkxNH0.gf3xKmWCW9NNro_9H4R69AFB7F07plmEGg5CZRUak_k", // 리프레쉬토큰 을 로컬스토리지에 저장 후 해당리프레쉬토큰을 이용하여 accessToken 발급 api 사용하기
  "message": "정상적으로 처리되었습니다."
}
```

/////

