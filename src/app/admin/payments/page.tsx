"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import {
  CreditCard,
  Search,
  LogOut,
  Menu,
  X,
  CheckCircle,
  Trophy,
} from "lucide-react";
import { API } from "@/api/axios";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
`;

const Sidebar = styled(motion.div)<{ isOpen: boolean }>`
  width: 280px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  display: ${(props) => (props.isOpen ? "block" : "none")};

  @media (min-width: 1024px) {
    display: block;
  }
`;

const SidebarHeader = styled.div`
  padding: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const Nav = styled.nav`
  padding: 1rem;
`;

const NavItem = styled(motion.a)<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  margin: 0.25rem 0;
  border-radius: 0.75rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "transparent"};
  color: ${(props) => (props.active ? "white" : "#6b7280")};

  &:hover {
    background: ${(props) =>
      props.active
        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        : "rgba(102, 126, 234, 0.1)"};
    color: ${(props) => (props.active ? "white" : "#374151")};
    transform: translateX(4px);
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
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
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
`;

const SearchCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const SearchInput = styled.div`
  position: relative;
  flex: 1;
  min-width: 200px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 0.75rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 0.75rem;
  font-size: 0.875rem;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const TableCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TableHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const TableTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const Table = styled.div`
  overflow-x: auto;
`;

const TableContent = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead``;

const Th = styled.th`
  padding: 1rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Tbody = styled.tbody``;

const Tr = styled(motion.tr)`
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.05);
  }
`;

const Td = styled.td`
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
`;

const ChallengeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ChallengeDetails = styled.div``;

const ChallengeTitle = styled.div`
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
`;

const UserInfo = styled.div`
  color: #6b7280;
  font-size: 0.75rem;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${(props) => {
    switch (props.status) {
      case "START":
        return "rgba(16, 185, 129, 0.1)";
      case "END":
        return "rgba(59, 130, 246, 0.1)";
      case "WAIT":
        return "rgba(245, 158, 11, 0.1)";
      case "APPROVE":
        return "rgba(16, 185, 129, 0.1)";
      case "REJECT":
        return "rgba(239, 68, 68, 0.1)";
      case "KEEP":
        return "rgba(139, 92, 246, 0.1)";
      case "FAIL":
        return "rgba(239, 68, 68, 0.1)";
      default:
        return "rgba(107, 114, 128, 0.1)";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "START":
        return "#10b981";
      case "END":
        return "#3b82f6";
      case "WAIT":
        return "#f59e0b";
      case "APPROVE":
        return "#10b981";
      case "REJECT":
        return "#ef4444";
      case "KEEP":
        return "#8b5cf6";
      case "FAIL":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  }};
`;

const ActionButton = styled(motion.button)`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 0.5rem;

  &:hover {
    background: rgba(102, 126, 234, 0.1);
    transform: scale(1.1);
  }
`;

const MobileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  @media (min-width: 1024px) {
    display: none;
  }
`;

const LogoutButton = styled(motion.button)`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 0.75rem;
  color: #dc2626;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.2);
    transform: translateY(-2px);
  }
`;

const LoadingContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingSpinner = styled.div`
  width: 3rem;
  height: 3rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  color: white;
  font-size: 1.125rem;
  margin-top: 1rem;
  text-align: center;
`;

interface PaymentData {
  rowNo: number;
  userId: number;
  challengeId: number;
  title: string;
  depositorName: string;
  nickName: string;
  price: number;
  requestAt: string;
  startDate: string;
  userStatus: "WAIT" | "KEEP" | "FAIL";
  challengeStatus: "APPROVE" | "START" | "END";
}

interface PaymentListResponse {
  result: boolean;
  code: number;
  data: {
    pagination: {
      page: number;
      pageCount: number;
      perPage: number;
      totalCount: number;
    };
    contents: PaymentData[];
  };
  message: string;
}

export default function AdminPayments() {
  const [payments, setPayments] = useState<PaymentData[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<PaymentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [userStatusFilter, setUserStatusFilter] = useState<string>("all");
  const [challengeStatusFilter, setChallengeStatusFilter] = useState<string>("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    filterPayments();
  }, [payments, searchTerm, userStatusFilter, challengeStatusFilter]);

  const fetchPayments = async () => {
    try {
      const response = await API.get<PaymentListResponse>("/admin/challenge/pay", {
        params: {
          page: 1,
          perPage: 50,
          categoryType: "",
          userStatus: userStatusFilter === "all" ? "" : userStatusFilter,
          challengeStatus: challengeStatusFilter === "all" ? "" : challengeStatusFilter,
        },
      });

      if (response.data && response.data.result && response.data.data) {
        setPayments(response.data.data.contents);
      }
    } catch (error) {
      console.error("결제 내역 로드 실패:", error);
      setPayments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterPayments = () => {
    let filtered = payments;

    // 검색어 필터
    if (searchTerm) {
      filtered = filtered.filter(payment =>
        payment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.depositorName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPayments(filtered);
  };

  const handleConfirmDeposit = async (userId: number, challengeId: number) => {
    try {
      await API.put(`/admin/challenge/${challengeId}/${userId}/pay`);
      // 성공 후 목록 새로고침
      fetchPayments();
    } catch (error) {
      console.error("입금 확인 실패:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await API.post("/admin/logout");
      router.push("/admin");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      router.push("/admin");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR");
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("ko-KR");
  };

  const getUserStatusText = (status: string) => {
    switch (status) {
      case "WAIT":
        return "입금대기";
      case "KEEP":
        return "진행중";
      case "FAIL":
        return "실패";
      default:
        return "알 수 없음";
    }
  };

  const getChallengeStatusText = (status: string) => {
    switch (status) {
      case "APPROVE":
        return "승인";
      case "START":
        return "진행중";
      case "END":
        return "종료";
      default:
        return "알 수 없음";
    }
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <div style={{ textAlign: "center" }}>
          <LoadingSpinner />
          <LoadingText>결제 내역을 불러오는 중...</LoadingText>
        </div>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      {/* 모바일 헤더 */}
      <MobileHeader>
        <h1
          style={{
            fontSize: "1.25rem",
            fontWeight: "700",
            color: "#1f2937",
            margin: 0,
          }}
        >
          결제 관리
        </h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            padding: "0.5rem",
            borderRadius: "0.5rem",
            color: "#6b7280",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </MobileHeader>

      <Sidebar
        isOpen={sidebarOpen}
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        <SidebarHeader>
          <Logo>KeepUp 관리자</Logo>
        </SidebarHeader>

        <Nav>
          <NavItem href="/admin/challenges">
            <Trophy size={20} style={{ marginRight: "0.75rem" }} />
            챌린지 관리
          </NavItem>
          <NavItem href="/admin/payments" active>
            <CreditCard size={20} style={{ marginRight: "0.75rem" }} />
            결제 관리
          </NavItem>
        </Nav>

        <LogoutButton
          onClick={handleLogout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut size={20} style={{ marginRight: "0.5rem" }} />
          로그아웃
        </LogoutButton>
      </Sidebar>

      <MainContent>
        <Header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>결제 관리</Title>
          <Subtitle>챌린지 참여 신청자 입금 확인 목록</Subtitle>
        </Header>

        <SearchCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <SearchContainer>
            <SearchInput>
              <SearchIcon>
                <Search size={20} />
              </SearchIcon>
              <Input
                type="text"
                placeholder="챌린지 제목 또는 입금자명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchInput>
            <Select
              value={userStatusFilter}
              onChange={(e) => setUserStatusFilter(e.target.value)}
            >
              <option value="all">전체 사용자 상태</option>
              <option value="WAIT">입금대기</option>
              <option value="KEEP">진행중</option>
              <option value="FAIL">실패</option>
            </Select>
            <Select
              value={challengeStatusFilter}
              onChange={(e) => setChallengeStatusFilter(e.target.value)}
            >
              <option value="all">전체 챌린지 상태</option>
              <option value="APPROVE">승인</option>
              <option value="START">진행중</option>
              <option value="END">종료</option>
            </Select>
          </SearchContainer>
        </SearchCard>

        <TableCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <TableHeader>
            <TableTitle>
              입금 확인 목록 ({filteredPayments.length}개)
            </TableTitle>
          </TableHeader>
          <Table>
            <TableContent>
              <TableHead>
                <tr>
                  <Th>챌린지</Th>
                  <Th>입금자</Th>
                  <Th>입금자 닉네임</Th>
                  <Th>참가비</Th>
                  <Th>신청일시</Th>
                  <Th>시작일</Th>
                  <Th>사용자 상태</Th>
                  <Th>챌린지 상태</Th>
                  <Th>액션</Th>
                </tr>
              </TableHead>
              <Tbody>
                {filteredPayments.map((payment, index) => (
                  <Tr
                    key={`${payment.userId}-${payment.challengeId}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Td>
                      <ChallengeInfo>
                        <ChallengeDetails>
                          <ChallengeTitle>{payment.title}</ChallengeTitle>
                          <UserInfo>ID: {payment.challengeId}</UserInfo>
                        </ChallengeDetails>
                      </ChallengeInfo>
                    </Td>
                    <Td>
                      <div>
                        <div style={{ fontWeight: 600, color: "#1f2937" }}>
                          {payment.depositorName}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                          ID: {payment.userId}
                        </div>
                      </div>
                    </Td>
                    <Td>{payment.nickName}</Td>
                    <Td>{formatCurrency(payment.price)}</Td>
                    <Td>{formatDateTime(payment.requestAt)}</Td>
                    <Td>{formatDate(payment.startDate)}</Td>
                    <Td>
                      <StatusBadge status={payment.userStatus}>
                        {getUserStatusText(payment.userStatus)}
                      </StatusBadge>
                    </Td>
                    <Td>
                      <StatusBadge status={payment.challengeStatus}>
                        {getChallengeStatusText(payment.challengeStatus)}
                      </StatusBadge>
                    </Td>
                    <Td>
                      <ActionButton
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleConfirmDeposit(payment.userId, payment.challengeId)}
                        disabled={payment.userStatus !== "WAIT"}
                        style={{
                          opacity: payment.userStatus !== "WAIT" ? 0.5 : 1,
                          cursor: payment.userStatus !== "WAIT" ? "not-allowed" : "pointer"
                        }}
                      >
                        <CheckCircle size={16} color={payment.userStatus === "WAIT" ? "#10b981" : "#6b7280"} />
                      </ActionButton>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </TableContent>
          </Table>
        </TableCard>
      </MainContent>
    </Container>
  );
}
