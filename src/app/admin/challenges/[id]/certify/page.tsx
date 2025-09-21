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
  AlertCircle,
  Calendar,
  MessageCircle,
  Minus,
  Ban
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

const DateSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const DateHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(102, 126, 234, 0.1);
`;

const DateTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NeedCheckBadge = styled.span<{ needCheck: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => props.needCheck ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)'};
  color: ${props => props.needCheck ? '#f59e0b' : '#10b981'};
`;

const CertifyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const CertifyCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ProfileImage = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.125rem;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
`;

const UserId = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

const CertifyImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
  }
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
      case 'NONE':
        return 'rgba(107, 114, 128, 0.1)';
      case 'WAIT':
        return 'rgba(245, 158, 11, 0.1)';
      case 'APPROVE':
        return 'rgba(16, 185, 129, 0.1)';
      case 'REJECT':
        return 'rgba(239, 68, 68, 0.1)';
      case 'DISMISSAL':
        return 'rgba(139, 92, 246, 0.1)';
      case 'OBJECTION':
        return 'rgba(59, 130, 246, 0.1)';
      default:
        return 'rgba(107, 114, 128, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'NONE':
        return '#6b7280';
      case 'WAIT':
        return '#f59e0b';
      case 'APPROVE':
        return '#10b981';
      case 'REJECT':
        return '#ef4444';
      case 'DISMISSAL':
        return '#8b5cf6';
      case 'OBJECTION':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  }};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const ActionButton = styled(motion.button)<{ variant: 'approve' | 'reject' | 'secondary' | 'info' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  font-size: 0.875rem;
  
  ${props => {
    switch (props.variant) {
      case 'approve':
        return `
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          }
        `;
      case 'reject':
        return `
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          }
        `;
      case 'info':
        return `
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          }
        `;
      case 'secondary':
        return `
          background: rgba(107, 114, 128, 0.1);
          color: #374151;
          border: 1px solid rgba(107, 114, 128, 0.2);
          &:hover {
            background: rgba(107, 114, 128, 0.2);
            transform: translateY(-1px);
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
  max-width: 500px;
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

interface CertifyFile {
  id: number;
  name: string;
  path: string;
  thumbnailPath: string | null;
  size: number;
}

interface ProfileImageFile {
  id: number;
  name: string;
  path: string;
  thumbnailPath: string | null;
  size: number;
}

interface CertifyItem {
  userId: number;
  certifyId: number;
  nickname: string;
  username: string;
  profileImageFile: ProfileImageFile | null;
  certifyFile: CertifyFile;
  certifyStatus: 'NONE' | 'WAIT' | 'APPROVE' | 'REJECT' | 'DISMISSAL' | 'OBJECTION';
  objectionReason: string | null;
}

interface CertifyDateData {
  date: string;
  needCheck: boolean;
  certifyResultList: CertifyItem[];
}

interface CertifyListResponse {
  result: boolean;
  code: number;
  data: CertifyDateData[];
  message: string;
}

export default function CertifyListPage() {
  const [certifyData, setCertifyData] = useState<CertifyDateData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'approve' | 'reject' | 'appeal-approve' | 'appeal-reject' | null>(null);
  const [selectedCertify, setSelectedCertify] = useState<CertifyItem | null>(null);
  const [reason, setReason] = useState('');
  const router = useRouter();
  const params = useParams();
  const challengeId = params.id as string;

  useEffect(() => {
    if (challengeId) {
      fetchCertifyList();
    }
  }, [challengeId]);

  const fetchCertifyList = async () => {
    try {
      const response = await API.get<CertifyListResponse>(`/admin/challenge/${challengeId}/certify`);
      if (response.data && response.data.result && response.data.data) {
        setCertifyData(response.data.data);
      }
    } catch (error) {
      console.error('인증 목록 로드 실패:', error);
      setCertifyData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = (certify: CertifyItem) => {
    setSelectedCertify(certify);
    setModalType('approve');
    setShowModal(true);
  };

  const handleReject = (certify: CertifyItem) => {
    setSelectedCertify(certify);
    setModalType('reject');
    setShowModal(true);
  };

  const handleAppealApprove = (certify: CertifyItem) => {
    setSelectedCertify(certify);
    setModalType('appeal-approve');
    setShowModal(true);
  };

  const handleAppealReject = (certify: CertifyItem) => {
    setSelectedCertify(certify);
    setModalType('appeal-reject');
    setShowModal(true);
  };

  const handleModalSubmit = async () => {
    if (!selectedCertify || !modalType) return;

    try {
      if (modalType === 'approve' || modalType === 'reject') {
        // 일반 인증 승인/거절
        await API.put(`/admin/challenge/${challengeId}/${selectedCertify.certifyId}/certify`, {
          approved: modalType === 'approve',
          reason: reason
        });
      } else if (modalType === 'appeal-approve' || modalType === 'appeal-reject') {
        // 이의신청 승인/거절
        await API.put(`/admin/challenge/${challengeId}/${selectedCertify.certifyId}`, {
          approved: modalType === 'appeal-approve',
          reason: reason
        });
      }

      setShowModal(false);
      setReason('');
      setSelectedCertify(null);
      // 목록 새로고침
      fetchCertifyList();
    } catch (error) {
      console.error('처리 실패:', error);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'NONE': return '없음';
      case 'WAIT': return '대기';
      case 'APPROVE': return '승인';
      case 'REJECT': return '거절';
      case 'DISMISSAL': return '기각';
      case 'OBJECTION': return '이의신청';
      default: return '알 수 없음';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'NONE': return <Minus size={12} />;
      case 'WAIT': return <AlertCircle size={12} />;
      case 'APPROVE': return <CheckCircle size={12} />;
      case 'REJECT': return <XCircle size={12} />;
      case 'DISMISSAL': return <Ban size={12} />;
      case 'OBJECTION': return <MessageCircle size={12} />;
      default: return <AlertCircle size={12} />;
    }
  };

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'approve': return '인증 승인';
      case 'reject': return '인증 거절';
      case 'appeal-approve': return '이의신청 승인';
      case 'appeal-reject': return '이의신청 거절';
      default: return '';
    }
  };

  const getModalIcon = () => {
    switch (modalType) {
      case 'approve':
      case 'appeal-approve':
        return <CheckCircle size={20} color="#10b981" />;
      case 'reject':
      case 'appeal-reject':
        return <XCircle size={20} color="#ef4444" />;
      default:
        return null;
    }
  };

  const getModalButtonText = () => {
    switch (modalType) {
      case 'approve': return '승인';
      case 'reject': return '거절';
      case 'appeal-approve': return '이의신청 승인';
      case 'appeal-reject': return '이의신청 거절';
      default: return '';
    }
  };

  const canTakeAction = (certify: CertifyItem) => {
    // WAIT 상태이거나 OBJECTION 상태인 경우에만 액션 가능
    return certify.certifyStatus === 'WAIT' || certify.certifyStatus === 'OBJECTION';
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <div style={{ textAlign: 'center' }}>
          <LoadingSpinner />
          <LoadingText>인증 목록을 불러오는 중...</LoadingText>
        </div>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      {/* 모바일 헤더 */}
      <MobileHeader>
        <h1 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', margin: 0 }}>
          인증 목록
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
            onClick={() => router.push(`/admin/challenges/${challengeId}`)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft size={20} />
            챌린지 상세
          </BackButton>
          <Title>인증 목록</Title>
        </Header>

        {certifyData.length === 0 ? (
          <DateSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <AlertCircle size={48} color="#6b7280" style={{ marginBottom: '1rem' }} />
              <h3 style={{ color: '#6b7280', margin: '0 0 0.5rem 0' }}>인증이 없습니다</h3>
              <p style={{ color: '#9ca3af', margin: 0 }}>아직 제출된 인증이 없습니다.</p>
            </div>
          </DateSection>
        ) : (
          certifyData.map((dateData, dateIndex) => (
            <DateSection
              key={dateData.date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: dateIndex * 0.1 }}
            >
              <DateHeader>
                <DateTitle>
                  <Calendar size={24} />
                  {formatDate(dateData.date)}
                </DateTitle>
                <NeedCheckBadge needCheck={dateData.needCheck}>
                  {dateData.needCheck ? '검수 필요' : '검수 완료'}
                </NeedCheckBadge>
              </DateHeader>

              <CertifyGrid>
                {dateData.certifyResultList.map((certify, certifyIndex) => (
                  <CertifyCard
                    key={certify.certifyId}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: certifyIndex * 0.1 }}
                  >
                    <UserInfo>
                      <ProfileImage>
                        {certify.profileImageFile ? (
                          <img 
                            src={certify.profileImageFile.path} 
                            alt={certify.nickname}
                            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                          />
                        ) : (
                          getInitials(certify.nickname)
                        )}
                      </ProfileImage>
                      <UserDetails>
                        <UserName>{certify.nickname}</UserName>
                        <UserId>@{certify.username} (ID: {certify.userId})</UserId>
                      </UserDetails>
                      <StatusBadge status={certify.certifyStatus}>
                        {getStatusIcon(certify.certifyStatus)}
                        {getStatusText(certify.certifyStatus)}
                      </StatusBadge>
                    </UserInfo>

                    <CertifyImage
                      src={certify.certifyFile.path}
                      alt={`${certify.nickname}의 인증`}
                      onClick={() => window.open(certify.certifyFile.path, '_blank')}
                    />

                    {certify.objectionReason && (
                      <div style={{ 
                        padding: '0.75rem', 
                        background: 'rgba(239, 68, 68, 0.1)', 
                        borderRadius: '0.5rem', 
                        marginBottom: '1rem',
                        border: '1px solid rgba(239, 68, 68, 0.2)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <MessageCircle size={16} color="#ef4444" />
                          <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#ef4444' }}>이의신청</span>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: '#374151', margin: 0 }}>
                          {certify.objectionReason}
                        </p>
                      </div>
                    )}

                    <ActionButtons>
                      {canTakeAction(certify) && (
                        <>
                          {certify.certifyStatus === 'WAIT' && (
                            <>
                              <ActionButton
                                variant="approve"
                                onClick={() => handleApprove(certify)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <CheckCircle size={16} />
                                승인
                              </ActionButton>
                              <ActionButton
                                variant="reject"
                                onClick={() => handleReject(certify)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <XCircle size={16} />
                                거절
                              </ActionButton>
                            </>
                          )}
                          {certify.certifyStatus === 'OBJECTION' && (
                            <>
                              <ActionButton
                                variant="approve"
                                onClick={() => handleAppealApprove(certify)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <CheckCircle size={16} />
                                이의신청 승인
                              </ActionButton>
                              <ActionButton
                                variant="reject"
                                onClick={() => handleAppealReject(certify)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <XCircle size={16} />
                                이의신청 거절
                              </ActionButton>
                            </>
                          )}
                        </>
                      )}
                      {!canTakeAction(certify) && (
                        <ActionButton
                          variant="info"
                          disabled
                          style={{ opacity: 0.6, cursor: 'not-allowed' }}
                        >
                          {getStatusIcon(certify.certifyStatus)}
                          {getStatusText(certify.certifyStatus)}
                        </ActionButton>
                      )}
                    </ActionButtons>
                  </CertifyCard>
                ))}
              </CertifyGrid>
            </DateSection>
          ))
        )}
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
              {getModalIcon()}
              {getModalTitle()}
            </ModalTitle>
            
            <FormGroup>
              <FormLabel>
                {modalType?.includes('approve') ? '승인' : '거절'} 사유
              </FormLabel>
              <FormTextarea
                placeholder={`${modalType?.includes('approve') ? '승인' : '거절'} 사유를 입력하세요...`}
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
                  setSelectedCertify(null);
                }}
              >
                취소
              </ModalButton>
              <ModalButton
                variant="primary"
                onClick={handleModalSubmit}
              >
                {getModalButtonText()}
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}
