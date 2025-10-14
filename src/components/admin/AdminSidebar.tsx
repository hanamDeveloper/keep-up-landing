"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import {
  Trophy,
  CreditCard,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { API } from "@/api/axios";

const SidebarContainer = styled.div`
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  @media (min-width: 1024px) {
    position: relative;
    padding: 1rem 2rem;
    border-bottom: none;
    background: transparent;
  }
`;

const Sidebar = styled(motion.div)<{ isOpen: boolean }>`
  width: 280px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 999;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;

  @media (min-width: 1024px) {
    position: relative;
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    height: 100vh;
  }
`;

const SidebarHeader = styled.div`
  padding: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Logo = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const Nav = styled.nav`
  padding: 1rem;
  flex: 1;
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

const LogoutButton = styled(motion.button)`
  margin: 2rem;
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

const Overlay = styled(motion.div)<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  display: ${(props) => (props.isOpen ? "block" : "none")};

  @media (min-width: 1024px) {
    display: none;
  }
`;

const ToggleButton = styled(motion.button)`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 1);
    color: #374151;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 1023px) {
    display: none;
  }
`;

const SidebarStyles = styled.div`
  .pc-close-btn {
    @media (min-width: 1024px) {
      display: block !important;
    }
  }
`;

interface AdminSidebarProps {
  activePage?: "challenges" | "payments" | "users";
}

export default function AdminSidebar({ activePage }: AdminSidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true); // PC에서는 기본적으로 열림
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await API.post("/admin/logout");
      router.push("/admin");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      router.push("/admin");
    }
  };

  return (
    <SidebarStyles>
      <SidebarContainer>
        {/* 모바일 헤더 */}
        <Header>
          <h1
            style={{
              fontSize: "1.25rem",
              fontWeight: "700",
              color: "#1f2937",
              margin: 0,
            }}
          >
            KeepUp 관리자
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
        </Header>

        {/* PC용 토글 버튼 (사이드바가 닫혔을 때만 표시) */}
        {!sidebarOpen && (
          <ToggleButton
            onClick={() => setSidebarOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu size={24} />
          </ToggleButton>
        )}

        {/* 오버레이 (모바일 전용) */}
        <Overlay
          isOpen={sidebarOpen}
          onClick={() => setSidebarOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: sidebarOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />

        {/* 사이드바 */}
        <Sidebar
          isOpen={sidebarOpen}
          initial={{ x: -280 }}
          animate={{ x: sidebarOpen ? 0 : -280 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <SidebarHeader>
            <Logo>KeepUp 관리자</Logo>
            <button
              onClick={() => setSidebarOpen(false)}
              style={{
                padding: "0.5rem",
                borderRadius: "0.5rem",
                color: "#6b7280",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                position: "absolute",
                top: "1rem",
                right: "1rem",
                display: "none",
              }}
              className="pc-close-btn"
            >
              <X size={20} />
            </button>
          </SidebarHeader>

          <Nav>
            <NavItem 
              href="/admin/challenges"
              active={activePage === "challenges"}
            >
              <Trophy size={20} style={{ marginRight: "0.75rem" }} />
              챌린지 관리
            </NavItem>
            <NavItem 
              href="/admin/payments"
              active={activePage === "payments"}
            >
              <CreditCard size={20} style={{ marginRight: "0.75rem" }} />
              결제 관리
            </NavItem>
            <NavItem 
              href="/admin/users"
              active={activePage === "users"}
            >
              <Users size={20} style={{ marginRight: "0.75rem" }} />
              유저 관리
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
      </SidebarContainer>
    </SidebarStyles>
  );
}
