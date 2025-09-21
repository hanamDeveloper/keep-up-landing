'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { 
  Trophy, 
  Search, 
  LogOut,
  Menu,
  X,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { API } from '@/api/axios';

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
  display: ${props => props.isOpen ? 'block' : 'none'};
  
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
  background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent'};
  color: ${props => props.active ? 'white' : '#6b7280'};
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(102, 126, 234, 0.1)'};
    color: ${props => props.active ? 'white' : '#374151'};
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
  margin-bottom: 1.5rem;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const SearchInput = styled.div`
  flex: 1;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 0.75rem;
  font-size: 0.875rem;
  background: white;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 0.75rem;
  font-size: 0.875rem;
  background: white;
  min-width: 150px;
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
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
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

const TableHead = styled.thead`
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
`;

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

const Thumbnail = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  object-fit: cover;
`;

const ChallengeDetails = styled.div``;

const ChallengeTitle = styled.div`
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
`;

const ChallengeCategory = styled.div`
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
  background: ${props => {
    switch (props.status) {
      case 'START': return 'rgba(16, 185, 129, 0.1)';
      case 'END': return 'rgba(59, 130, 246, 0.1)';
      case 'WAIT': return 'rgba(245, 158, 11, 0.1)';
      case 'APPROVE': return 'rgba(16, 185, 129, 0.1)';
      case 'REJECT': return 'rgba(239, 68, 68, 0.1)';
      case 'REMITTANCE': return 'rgba(139, 92, 246, 0.1)';
      default: return 'rgba(107, 114, 128, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'START': return '#10b981';
      case 'END': return '#3b82f6';
      case 'WAIT': return '#f59e0b';
      case 'APPROVE': return '#10b981';
      case 'REJECT': return '#ef4444';
      case 'REMITTANCE': return '#8b5cf6';
      default: return '#6b7280';
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
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  color: white;
  font-size: 1.125rem;
  margin-top: 1rem;
  text-align: center;
`;

interface Challenge {
  rowNo: number;
  id: number;
  categoryType: 'EXERCISE' | 'STUDY' | 'IMPROVEMENT' | 'ETC';
  thumbnail: {
    id: number;
    name: string;
    path: string;
    thumbnailPath: string | null;
    size: number;
  };
  status: 'WAIT' | 'APPROVE' | 'REJECT' | 'START' | 'END' | 'REMITTANCE';
  title: string;
  userCount: number;
  price: number;
  fee: number;
  needCheck: boolean;
}

interface ChallengeListResponse {
  result: boolean;
  code: number;
  data: {
    pagination: {
      page: number;
      pageCount: number;
      perPage: number;
      totalCount: number;
    };
    contents: Challenge[];
  };
  message: string;
}

export default function AdminChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchChallenges();
  }, []);

  useEffect(() => {
    filterChallenges();
  }, [challenges, searchTerm, categoryFilter, statusFilter]);

  const fetchChallenges = async () => {
    try {
      const response = await API.get<ChallengeListResponse>('/admin/challenge', {
        params: {
          page: 1,
          perPage: 50,
          categoryType: categoryFilter === 'all' ? '' : categoryFilter,
          challengeStatus: statusFilter === 'all' ? '' : statusFilter
        }
      });

      if (response.data && response.data.result && response.data.data) {
        setChallenges(response.data.data.contents);
      }
    } catch (error) {
      console.error('챌린지 목록 로드 실패:', error);
      setChallenges([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterChallenges = () => {
    let filtered = challenges;

    // 검색어 필터
    if (searchTerm) {
      filtered = filtered.filter(challenge =>
        challenge.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredChallenges(filtered);
  };

  const handleLogout = async () => {
    try {
      await API.post('/admin/logout');
      router.push('/admin');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      router.push('/admin');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'WAIT': return '대기';
      case 'APPROVE': return '승인';
      case 'REJECT': return '거절';
      case 'START': return '진행중';
      case 'END': return '종료';
      case 'REMITTANCE': return '송금완료';
      default: return '알 수 없음';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'EXERCISE': return '운동';
      case 'STUDY': return '공부';
      case 'IMPROVEMENT': return '자기계발';
      case 'ETC': return '기타';
      default: return '알 수 없음';
    }
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <div style={{ textAlign: 'center' }}>
          <LoadingSpinner />
          <LoadingText>챌린지 목록을 불러오는 중...</LoadingText>
        </div>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      {/* 모바일 헤더 */}
      <MobileHeader>
        <h1 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', margin: 0 }}>
          챌린지 관리
        </h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            padding: '0.5rem',
            borderRadius: '0.5rem',
            color: '#6b7280',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </MobileHeader>

      <Sidebar
        isOpen={sidebarOpen}
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <SidebarHeader>
          <Logo>KeepUp 관리자</Logo>
        </SidebarHeader>
        
        <Nav>
          <NavItem href="/admin/challenges" active>
            <Trophy size={20} style={{ marginRight: '0.75rem' }} />
            챌린지 관리
          </NavItem>
          <NavItem href="/admin/payments">
            <Trophy size={20} style={{ marginRight: '0.75rem' }} />
            결제 관리
          </NavItem>
        </Nav>
        
        <LogoutButton
          onClick={handleLogout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut size={20} style={{ marginRight: '0.5rem' }} />
          로그아웃
        </LogoutButton>
      </Sidebar>

      <MainContent>
        <Header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>챌린지 관리</Title>
          <Subtitle>전체 챌린지 목록을 확인하고 관리하세요</Subtitle>
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
                placeholder="챌린지 제목으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchInput>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">전체 카테고리</option>
              <option value="EXERCISE">운동</option>
              <option value="STUDY">공부</option>
              <option value="IMPROVEMENT">자기계발</option>
              <option value="ETC">기타</option>
            </Select>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">전체 상태</option>
              <option value="WAIT">대기</option>
              <option value="APPROVE">승인</option>
              <option value="REJECT">거절</option>
              <option value="START">진행중</option>
              <option value="END">종료</option>
              <option value="REMITTANCE">송금완료</option>
            </Select>
          </SearchContainer>
        </SearchCard>

        <TableCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <TableHeader>
            <TableTitle>챌린지 목록 ({filteredChallenges.length}개)</TableTitle>
          </TableHeader>
          <Table>
            <TableContent>
              <TableHead>
                <tr>
                  <Th>챌린지</Th>
                  <Th>카테고리</Th>
                  <Th>참가비</Th>
                  <Th>참가자</Th>
                  <Th>상태</Th>
                  <Th>액션</Th>
                </tr>
              </TableHead>
              <Tbody>
                {filteredChallenges.map((challenge, index) => (
                  <Tr
                    key={challenge.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Td>
                      <ChallengeInfo>
                        <Thumbnail 
                          src={challenge.thumbnail?.path || ''} 
                          alt={challenge.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder-image.png';
                          }}
                        />
                        <ChallengeDetails>
                          <ChallengeTitle>{challenge.title}</ChallengeTitle>
                          <ChallengeCategory>{getCategoryText(challenge.categoryType)}</ChallengeCategory>
                        </ChallengeDetails>
                      </ChallengeInfo>
                    </Td>
                    <Td>{getCategoryText(challenge.categoryType)}</Td>
                    <Td>{formatCurrency(challenge.price)}</Td>
                    <Td>{challenge.userCount}명</Td>
                    <Td>
                      <StatusBadge status={challenge.status}>
                        {getStatusText(challenge.status)}
                      </StatusBadge>
                    </Td>
                    <Td>
                      <ActionButton 
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => router.push(`/admin/challenges/${challenge.id}`)}
                      >
                        <Eye size={16} color="#3b82f6" />
                      </ActionButton>
                      {challenge.status === 'WAIT' && (
                        <>
                          <ActionButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <CheckCircle size={16} color="#10b981" />
                          </ActionButton>
                          <ActionButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <XCircle size={16} color="#ef4444" />
                          </ActionButton>
                        </>
                      )}
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
