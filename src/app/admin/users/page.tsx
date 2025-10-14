"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { Search, User, Mail, Calendar, Filter } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { API } from "@/api/axios";

// 스타일드 컴포넌트
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  @media (max-width: 1023px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  margin-top: 0;
  transition: margin-left 0.3s ease;

  @media (max-width: 1023px) {
    padding: 1rem;
    margin-top: 4rem; /* 모바일 헤더 높이만큼 */
  }
`;

const Header = styled(motion.div)`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchInput = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: none;
  }
`;

const SearchField = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: none;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  font-size: 1rem;
  color: #374151;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  size: 20;
`;

const FilterButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 0.75rem;
  color: #374151;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const TableContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const TableContent = styled.div`
  overflow-x: auto;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TableBody = styled.tbody``;

const TableRow = styled(motion.tr)`
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.05);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  color: #374151;
  font-size: 0.875rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const UserAvatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
`;

const UserEmail = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const DateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #6b7280;
  font-size: 0.75rem;
`;

// 모바일 카드 뷰
const MobileCardList = styled.div`
  display: none;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileCard = styled(motion.div)`
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const MobileCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const MobileCardTitle = styled.div`
  font-weight: 600;
  color: #1f2937;
  font-size: 0.875rem;
`;

const MobileCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MobileCardItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MobileCardLabel = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
`;

const MobileCardValue = styled.span`
  font-size: 0.75rem;
  color: #374151;
  font-weight: 600;
`;

// 유저 타입 정의
interface User {
  rowNo: number;
  id: number;
  nickname: string;
  email: string;
  username: string;
  profileFile: {
    id: number | null;
    name: string | null;
    path: string;
    thumbnailPath: string | null;
    size: number | null;
  };
  keepCount: number;
  successCount: number;
  failCount: number;
  totalCount: number;
  successPercent: number;
  totalCertifyCount: number;
  totalPrice: number;
  depositorName: string;
  bankName: string;
  bankNumber: string;
  bankUserName: string;
  pushAlert: boolean;
  challengeAlert: boolean;
  certifyAlert: boolean;
  eventAlert: boolean;
  emailAlert: boolean;
  communityAlert: boolean;
}

// 상태 텍스트 변환 함수
const getUserStatusText = (user: User) => {
  if (user.totalCount === 0) {
    return "신규";
  } else if (user.successPercent >= 80) {
    return "우수";
  } else if (user.successPercent >= 50) {
    return "보통";
  } else {
    return "미흡";
  }
};

// 상태 배지 색상
const getStatusColor = (user: User) => {
  if (user.totalCount === 0) {
    return { bg: "rgba(59, 130, 246, 0.1)", color: "#2563eb" }; // 신규 - 파란색
  } else if (user.successPercent >= 80) {
    return { bg: "rgba(16, 185, 129, 0.1)", color: "#059669" }; // 우수 - 초록색
  } else if (user.successPercent >= 50) {
    return { bg: "rgba(245, 158, 11, 0.1)", color: "#d97706" }; // 보통 - 주황색
  } else {
    return { bg: "rgba(239, 68, 68, 0.1)", color: "#dc2626" }; // 미흡 - 빨간색
  }
};

// 통화 포맷 함수
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(amount);
};

// 퍼센트 포맷 함수
const formatPercent = (percent: number) => {
  return `${percent}%`;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 유저 목록 조회
  const fetchUsers = async (page: number = 1, search: string = "") => {
    try {
      setLoading(true);
      const response = await API.get("/admin/user", {
        params: {
          page,
          perPage: 350,
          search,
        },
      });

      if (response.data.result) {
        setUsers(response.data.data.contents || []);
        setTotalPages(response.data.data.pagination.pageCount || 1);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("유저 목록 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 검색 핸들러
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers(1, searchTerm);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    fetchUsers(page, searchTerm);
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchUsers();
  }, []);

  // 검색어로 필터링된 유저 목록
  const filteredUsers = users.filter((user) =>
    user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <AdminSidebar activePage="users" />
      <MainContent>
        <Header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>유저 관리</Title>
          <Subtitle>전체 유저 목록 및 관리</Subtitle>
        </Header>

        <SearchContainer>
          <SearchInput>
            <SearchIcon size={20} />
            <SearchField
              type="text"
              placeholder="닉네임 또는 이메일로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
            />
          </SearchInput>
          <FilterButton
            onClick={() => fetchUsers(currentPage, searchTerm)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Filter size={20} />
            필터 적용
          </FilterButton>
        </SearchContainer>

        <TableContainer>
          {/* 데스크톱 테이블 뷰 */}
          <TableContent>
            <Table>
              <TableHead>
                <tr>
                  <TableHeader>유저 정보</TableHeader>
                  <TableHeader>챌린지 현황</TableHeader>
                  <TableHeader>성공률</TableHeader>
                  <TableHeader>총 금액</TableHeader>
                  <TableHeader>계좌 정보</TableHeader>
                </tr>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} style={{ textAlign: "center", padding: "2rem" }}>
                      로딩 중...
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} style={{ textAlign: "center", padding: "2rem" }}>
                      유저가 없습니다.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user, index) => {
                    const statusColor = getStatusColor(user);
                    return (
                      <TableRow
                        key={user.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <TableCell>
                          <UserInfo>
                            <UserAvatar>
                              <img 
                                src={user.profileFile.path} 
                                alt={user.nickname}
                                style={{ 
                                  width: "100%", 
                                  height: "100%", 
                                  borderRadius: "50%",
                                  objectFit: "cover"
                                }}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = "none";
                                //   target.nextElementSibling!.style.display = "flex";
                                }}
                              />
                              <div style={{ 
                                display: "none", 
                                width: "100%", 
                                height: "100%", 
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                fontWeight: "600",
                                fontSize: "0.875rem"
                              }}>
                                {user.nickname.charAt(0).toUpperCase()}
                              </div>
                            </UserAvatar>
                            <UserDetails>
                              <UserName>{user.nickname}</UserName>
                              <UserEmail>
                                <Mail size={12} />
                                {user.email || user.username}
                              </UserEmail>
                            </UserDetails>
                          </UserInfo>
                        </TableCell>
                        <TableCell>
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                            <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                              성공: {user.successCount} | 실패: {user.failCount}
                            </div>
                            <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                              총 참여: {user.totalCount}회
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <StatusBadge 
                            style={{ 
                              background: statusColor.bg, 
                              color: statusColor.color 
                            }}
                          >
                            {getUserStatusText(user)} ({formatPercent(user.successPercent)})
                          </StatusBadge>
                        </TableCell>
                        <TableCell>
                          <div style={{ fontSize: "0.875rem", fontWeight: "600", color: "#059669" }}>
                            {formatCurrency(user.totalPrice)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {user.bankName && user.bankNumber ? (
                            <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                              <div>{user.bankName}</div>
                              <div>{user.bankNumber}</div>
                              <div>{user.bankUserName}</div>
                            </div>
                          ) : (
                            <span style={{ color: "#9ca3af", fontSize: "0.75rem" }}>
                              미등록
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContent>

          {/* 모바일 카드 뷰 */}
          <MobileCardList>
            {loading ? (
              <MobileCard>
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  로딩 중...
                </div>
              </MobileCard>
            ) : filteredUsers.length === 0 ? (
              <MobileCard>
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  유저가 없습니다.
                </div>
              </MobileCard>
            ) : (
              filteredUsers.map((user, index) => {
                const statusColor = getStatusColor(user);
                return (
                  <MobileCard
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <MobileCardHeader>
                      <MobileCardTitle>{user.nickname}</MobileCardTitle>
                      <StatusBadge 
                        style={{ 
                          background: statusColor.bg, 
                          color: statusColor.color 
                        }}
                      >
                        {getUserStatusText(user)}
                      </StatusBadge>
                    </MobileCardHeader>

                    <MobileCardContent>
                      <MobileCardItem>
                        <MobileCardLabel>이메일/아이디</MobileCardLabel>
                        <MobileCardValue>{user.email || user.username}</MobileCardValue>
                      </MobileCardItem>

                      <MobileCardItem>
                        <MobileCardLabel>챌린지 현황</MobileCardLabel>
                        <MobileCardValue>
                          성공: {user.successCount} | 실패: {user.failCount} | 총 {user.totalCount}회
                        </MobileCardValue>
                      </MobileCardItem>

                      <MobileCardItem>
                        <MobileCardLabel>성공률</MobileCardLabel>
                        <MobileCardValue>{formatPercent(user.successPercent)}</MobileCardValue>
                      </MobileCardItem>

                      <MobileCardItem>
                        <MobileCardLabel>총 금액</MobileCardLabel>
                        <MobileCardValue style={{ color: "#059669", fontWeight: "700" }}>
                          {formatCurrency(user.totalPrice)}
                        </MobileCardValue>
                      </MobileCardItem>

                      <MobileCardItem>
                        <MobileCardLabel>계좌 정보</MobileCardLabel>
                        <MobileCardValue>
                          {user.bankName && user.bankNumber ? (
                            `${user.bankName} ${user.bankNumber} (${user.bankUserName})`
                          ) : (
                            "미등록"
                          )}
                        </MobileCardValue>
                      </MobileCardItem>
                    </MobileCardContent>
                  </MobileCard>
                );
              })
            )}
          </MobileCardList>
        </TableContainer>
      </MainContent>
    </Container>
  );
}
