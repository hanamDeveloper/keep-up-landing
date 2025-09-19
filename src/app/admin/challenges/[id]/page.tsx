'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { 
  ArrowLeft,
  Trophy, 
  LogOut,
  Menu,
  X,
  CheckCircle,
  XCircle,
  DollarSign,
  FileText,
  AlertCircle,
  MessageCircle,
  Eye
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
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BackButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.75rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChallengeDetailCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const ChallengeHeader = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Thumbnail = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 1rem;
  object-fit: cover;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const ChallengeInfo = styled.div`
  flex: 1;
`;

const ChallengeTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
`;

const ChallengeCategory = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ChallengeContent = styled.p`
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
`;

const ChallengeStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 0.75rem;
  border: 1px solid rgba(102, 126, 234, 0.1);
`;

const StatIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatContent = styled.div``;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const StatValue = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
`;

const GuidelinesSection = styled.div`
  margin-top: 2rem;
`;

const GuidelinesTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const GuidelinesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const GuidelineItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
`;

const GuidelineIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 0.125rem;
`;

const GuidelineText = styled.div`
  color: #374151;
  line-height: 1.5;
`;

const ActionSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const ActionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1.5rem 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ActionButton = styled(motion.button)<{ variant: 'approve' | 'reject' | 'secondary' | 'info' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  
  ${props => {
    switch (props.variant) {
      case 'approve':
        return `
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
          }
        `;
      case 'reject':
        return `
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);
          }
        `;
      case 'info':
        return `
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
          }
        `;
      case 'secondary':
        return `
          background: rgba(107, 114, 128, 0.1);
          color: #374151;
          border: 1px solid rgba(107, 114, 128, 0.2);
          &:hover {
            background: rgba(107, 114, 128, 0.2);
            transform: translateY(-2px);
          }
        `;
    }
  }}
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
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

const FormTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 0.75rem;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 0.75rem;
  font-size: 0.875rem;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const FormHelp = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0.25rem 0 0 0;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

const ModalButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          &:hover {
            transform: translateY(-2px);
          }
        `;
      case 'secondary':
        return `
          background: rgba(107, 114, 128, 0.1);
          color: #374151;
          &:hover {
            background: rgba(107, 114, 128, 0.2);
          }
        `;
    }
  }}
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

interface ChallengeDetail {
  rowNo: number | null;
  id: number;
  categoryType: string;
  thumbnailFile: {
    id: number;
    name: string;
    path: string;
    thumbnailPath: string;
    size: number;
  };
  title: string;
  content: string;
  price: number;
  guidelineList: string[];
  needCheck: boolean;
}

interface ChallengeDetailResponse {
  result: boolean;
  code: number;
  data: ChallengeDetail;
  message: string;
}

export default function ChallengeDetailPage() {
  const [challenge, setChallenge] = useState<ChallengeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'approve' | 'reject' | null>(null);
  const [reason, setReason] = useState('');
  const [kakaoLink, setKakaoLink] = useState('');
  const router = useRouter();
  const params = useParams();
  const challengeId = params.id as string;

  useEffect(() => {
    if (challengeId) {
      fetchChallengeDetail();
    }
  }, [challengeId]);

  const fetchChallengeDetail = async () => {
    try {
      const response = await API.get<ChallengeDetailResponse>(`/admin/challenge/${challengeId}`);
      if (response.data && response.data.result && response.data.data) {
        setChallenge(response.data.data);
      }
    } catch (error) {
      console.error('챌린지 상세 정보 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = () => {
    setModalType('approve');
    setShowModal(true);
  };

  const handleReject = () => {
    setModalType('reject');
    setShowModal(true);
  };

  const handleViewCertifications = () => {
    router.push(`/admin/challenges/${challengeId}/certify`);
  };

  const handleModalSubmit = async () => {
    if (!challenge || !modalType) return;

    try {
      await API.put(`/admin/challenge/${challengeId}`, {
        title: challenge.title,
        content: challenge.content,
        categoryCode: challenge.categoryType,
        certifyTypeCode: 'PICTURE', // 기본값
        startDate: '2025-01-01', // 기본값
        endDate: '2025-01-31', // 기본값
        price: challenge.price,
        guidelineList: challenge.guidelineList,
        reason: reason,
        approved: modalType === 'approve',
        thumbnailFile: {
          id: challenge.thumbnailFile.id
        },
        link: modalType === 'approve' ? kakaoLink : '', // 승인시에만 카카오 링크 포함
        fee: 0
      });

      setShowModal(false);
      setReason('');
      setKakaoLink('');
      // 성공 메시지 표시 후 목록으로 이동
      router.push('/admin/challenges');
    } catch (error) {
      console.error('챌린지 처리 실패:', error);
    }
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
          <LoadingText>챌린지 정보를 불러오는 중...</LoadingText>
        </div>
      </LoadingContainer>
    );
  }

  if (!challenge) {
    return (
      <LoadingContainer>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'white', fontSize: '1.125rem' }}>챌린지를 찾을 수 없습니다.</p>
        </div>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      {/* 모바일 헤더 */}
      <MobileHeader>
        <h1 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', margin: 0 }}>
          챌린지 상세
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
          <NavItem href="/admin/challenges">
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
          <BackButton
            onClick={() => router.push('/admin/challenges')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft size={20} />
            목록으로
          </BackButton>
          <Title>챌린지 상세</Title>
        </Header>

        <ChallengeDetailCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <ChallengeHeader>
            <Thumbnail 
              src={challenge?.thumbnailFile?.path || ''} 
              alt={challenge.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-image.png';
              }}
            />
            <ChallengeInfo>
              <ChallengeTitle>{challenge.title}</ChallengeTitle>
              <ChallengeCategory>{getCategoryText(challenge.categoryType)}</ChallengeCategory>
              <ChallengeContent>{challenge.content}</ChallengeContent>
              
              <ChallengeStats>
                <StatItem>
                  <StatIcon>
                    <DollarSign size={20} color="white" />
                  </StatIcon>
                  <StatContent>
                    <StatLabel>참가비</StatLabel>
                    <StatValue>{formatCurrency(challenge.price)}</StatValue>
                  </StatContent>
                </StatItem>
                
                <StatItem>
                  <StatIcon>
                    <FileText size={20} color="white" />
                  </StatIcon>
                  <StatContent>
                    <StatLabel>검수 필요</StatLabel>
                    <StatValue>{challenge.needCheck ? '예' : '아니오'}</StatValue>
                  </StatContent>
                </StatItem>
              </ChallengeStats>
            </ChallengeInfo>
          </ChallengeHeader>

          {challenge.guidelineList && challenge.guidelineList.length > 0 && (
            <GuidelinesSection>
              <GuidelinesTitle>
                <AlertCircle size={20} />
                챌린지 가이드라인
              </GuidelinesTitle>
              <GuidelinesList>
                {challenge.guidelineList.map((guideline, index) => (
                  <GuidelineItem key={index}>
                    <GuidelineIcon>
                      <span style={{ color: 'white', fontSize: '0.75rem', fontWeight: 'bold' }}>
                        {index + 1}
                      </span>
                    </GuidelineIcon>
                    <GuidelineText>{guideline}</GuidelineText>
                  </GuidelineItem>
                ))}
              </GuidelinesList>
            </GuidelinesSection>
          )}
        </ChallengeDetailCard>

        <ActionSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ActionTitle>챌린지 관리</ActionTitle>
          <ActionButtons>
            <ActionButton
              variant="info"
              onClick={handleViewCertifications}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye size={20} />
              인증 목록
            </ActionButton>
            <ActionButton
              variant="approve"
              onClick={handleApprove}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CheckCircle size={20} />
              승인
            </ActionButton>
            <ActionButton
              variant="reject"
              onClick={handleReject}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <XCircle size={20} />
              거절
            </ActionButton>
          </ActionButtons>
        </ActionSection>
      </MainContent>

      {/* 승인/거절 모달 */}
      {showModal && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalTitle>
              {modalType === 'approve' ? (
                <>
                  <CheckCircle size={20} color="#10b981" />
                  챌린지 승인
                </>
              ) : (
                <>
                  <XCircle size={20} color="#ef4444" />
                  챌린지 거절
                </>
              )}
            </ModalTitle>
            
            {modalType === 'approve' && (
              <FormGroup>
                <FormLabel>
                  <MessageCircle size={16} style={{ marginRight: '0.5rem', display: 'inline' }} />
                  카카오톡 오픈채팅 링크
                </FormLabel>
                <FormInput
                  type="url"
                  placeholder="https://open.kakao.com/o/..."
                  value={kakaoLink}
                  onChange={(e) => setKakaoLink(e.target.value)}
                />
                <FormHelp>
                  승인된 챌린지 참가자들이 소통할 수 있는 카카오톡 오픈채팅 링크를 입력해주세요.
                </FormHelp>
              </FormGroup>
            )}
            
            <FormGroup>
              <FormLabel>
                {modalType === 'approve' ? '승인' : '거절'} 사유
              </FormLabel>
              <FormTextarea
                placeholder={`${modalType === 'approve' ? '승인' : '거절'} 사유를 입력하세요...`}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </FormGroup>
            
            <ModalButtons>
              <ModalButton
                variant="secondary"
                onClick={() => {
                  setShowModal(false);
                  setReason('');
                  setKakaoLink('');
                }}
              >
                취소
              </ModalButton>
              <ModalButton
                variant="primary"
                onClick={handleModalSubmit}
                disabled={modalType === 'approve' && !kakaoLink.trim()}
              >
                {modalType === 'approve' ? '승인' : '거절'}
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}
