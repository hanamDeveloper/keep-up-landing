'use client';

import { Copy, CheckCircle, AlertCircle, CreditCard, Building2, User } from 'lucide-react';
import { appConfig as config } from '@/lib/config';
import { useState } from 'react';

export default function PaymentPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)',
      padding: '24px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '48px 24px'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)'
          }}>
            <CreditCard size={32} color="white" />
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '12px',
            margin: '0 0 12px 0'
          }}>
            결제 정보
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#a1a1aa',
            margin: '0'
          }}>
            아래 계좌로 참가비를 입금해주세요
          </p>
        </div>

        {/* Payment Info Card */}
        <div style={{
          background: '#1a1a2e',
          border: '1px solid #27272a',
          borderRadius: '20px',
          padding: '32px',
          marginBottom: '32px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '24px',
            margin: '0 0 24px 0',
            textAlign: 'center'
          }}>
            입금 계좌 정보
          </h2>

          {/* Bank Name */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
            background: '#16213e',
            borderRadius: '12px',
            marginBottom: '16px',
            border: '1px solid #3f3f46'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Building2 size={20} color="#6366f1" />
              <div>
                <div style={{
                  fontSize: '14px',
                  color: '#a1a1aa',
                  marginBottom: '4px'
                }}>
                  은행명
                </div>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#ffffff'
                }}>
                  {config.payment.bankName}
                </div>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(config.payment.bankName, 'bank')}
              style={{
                background: copiedField === 'bank' ? '#10b981' : '#6366f1',
                border: 'none',
                borderRadius: '8px',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              {copiedField === 'bank' ? (
                <CheckCircle size={16} color="white" />
              ) : (
                <Copy size={16} color="white" />
              )}
            </button>
          </div>

          {/* Account Number */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
            background: '#16213e',
            borderRadius: '12px',
            marginBottom: '16px',
            border: '1px solid #3f3f46'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CreditCard size={20} color="#6366f1" />
              <div>
                <div style={{
                  fontSize: '14px',
                  color: '#a1a1aa',
                  marginBottom: '4px'
                }}>
                  계좌번호
                </div>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#ffffff',
                  fontFamily: 'monospace'
                }}>
                  {config.payment.accountNumber}
                </div>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(config.payment.accountNumber, 'account')}
              style={{
                background: copiedField === 'account' ? '#10b981' : '#6366f1',
                border: 'none',
                borderRadius: '8px',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              {copiedField === 'account' ? (
                <CheckCircle size={16} color="white" />
              ) : (
                <Copy size={16} color="white" />
              )}
            </button>
          </div>

          {/* Account Holder */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
            background: '#16213e',
            borderRadius: '12px',
            marginBottom: '24px',
            border: '1px solid #3f3f46'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <User size={20} color="#6366f1" />
              <div>
                <div style={{
                  fontSize: '14px',
                  color: '#a1a1aa',
                  marginBottom: '4px'
                }}>
                  예금주
                </div>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#ffffff'
                }}>
                  {config.payment.accountHolder}
                </div>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(config.payment.accountHolder, 'holder')}
              style={{
                background: copiedField === 'holder' ? '#10b981' : '#6366f1',
                border: 'none',
                borderRadius: '8px',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              {copiedField === 'holder' ? (
                <CheckCircle size={16} color="white" />
              ) : (
                <Copy size={16} color="white" />
              )}
            </button>
          </div>

          {/* Amount */}
          <div style={{
            padding: '16px',
            background: 'linear-gradient(135deg, #6366f120 0%, #4f46e520 100%)',
            borderRadius: '12px',
            border: '1px solid #6366f140',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '14px',
              color: '#a1a1aa',
              marginBottom: '8px'
            }}>
              기본 참가비
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#6366f1'
            }}>
              {config.payment.defaultAmount.toLocaleString()}원
            </div>
            <div style={{
              fontSize: '12px',
              color: '#a1a1aa',
              marginTop: '4px'
            }}>
              (챌린지별로 금액이 다를 수 있습니다)
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div style={{
          background: '#1a1a2e',
          border: '1px solid #27272a',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '16px',
            margin: '0 0 16px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={20} color="#f59e0b" />
            입금 안내
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: '0',
            margin: '0'
          }}>
            <li style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              marginBottom: '12px',
              fontSize: '14px',
              color: '#a1a1aa',
              lineHeight: '1.5'
            }}>
              <span style={{
                color: '#6366f1',
                fontWeight: '600',
                minWidth: '16px'
              }}>1.</span>
              위 계좌 정보를 정확히 확인하고 참가비를 입금해주세요.
            </li>
            <li style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              marginBottom: '12px',
              fontSize: '14px',
              color: '#a1a1aa',
              lineHeight: '1.5'
            }}>
              <span style={{
                color: '#6366f1',
                fontWeight: '600',
                minWidth: '16px'
              }}>2.</span>
              입금 후 카카오 채널로 입금 완료 메시지를 보내주세요.
            </li>
            <li style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              marginBottom: '12px',
              fontSize: '14px',
              color: '#a1a1aa',
              lineHeight: '1.5'
            }}>
              <span style={{
                color: '#6366f1',
                fontWeight: '600',
                minWidth: '16px'
              }}>3.</span>
              입금 확인 후 챌린지 참가가 승인됩니다.
            </li>
            <li style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              fontSize: '14px',
              color: '#a1a1aa',
              lineHeight: '1.5'
            }}>
              <span style={{
                color: '#6366f1',
                fontWeight: '600',
                minWidth: '16px'
              }}>4.</span>
              문의사항이 있으시면 카카오 채널로 연락주세요.
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div style={{
          textAlign: 'center',
          padding: '24px',
          background: '#1a1a2e',
          border: '1px solid #27272a',
          borderRadius: '16px'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '12px',
            margin: '0 0 12px 0'
          }}>
            문의하기
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#a1a1aa',
            marginBottom: '16px',
            margin: '0 0 16px 0'
          }}>
            입금 관련 문의나 문제가 있으시면 언제든 연락주세요
          </p>
          <a
            href={config.links.kakao}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              color: 'white',
              textDecoration: 'none',
              padding: '12px 24px',
              borderRadius: '12px',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.2s ease'
            }}
          >
            카카오 채널 문의
          </a>
        </div>
      </div>
    </div>
  );
}
