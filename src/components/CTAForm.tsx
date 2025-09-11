'use client';

import { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, spacing, borderRadius, typography } from '@/styles';
import Button from './Button';
import { CheckCircle, AlertCircle } from 'lucide-react';

const FormContainer = styled.div`
  max-width: 400px;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md}px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm}px;
`;

const Label = styled.label`
  font-size: ${typography.caption.fontSize}px;
  font-weight: ${typography.captionBold.fontWeight};
  color: ${colors.textSecondary};
`;

const Input = styled.input`
  padding: ${spacing.sm}px ${spacing.md}px;
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.sm}px;
  background: ${colors.surface};
  color: ${colors.text};
  font-size: ${typography.body.fontSize}px;
  line-height: ${typography.body.lineHeight}px;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
  
  &::placeholder {
    color: ${colors.textTertiary};
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spacing.sm}px;
  margin-top: ${spacing.sm}px;
`;

const Checkbox = styled.input`
  margin-top: 2px;
`;

const CheckboxLabel = styled.label`
  font-size: ${typography.small.fontSize}px;
  color: ${colors.textSecondary};
  line-height: ${typography.small.lineHeight}px;
  cursor: pointer;
`;

const Message = styled(motion.div)<{ type: 'success' | 'error' }>`
  display: flex;
  align-items: center;
  gap: ${spacing.sm}px;
  padding: ${spacing.sm}px ${spacing.md}px;
  border-radius: ${borderRadius.sm}px;
  font-size: ${typography.caption.fontSize}px;
  
  ${props => props.type === 'success' ? css`
    background: rgba(16, 185, 129, 0.1);
    color: ${colors.success};
    border: 1px solid rgba(16, 185, 129, 0.2);
  ` : css`
    background: rgba(239, 68, 68, 0.1);
    color: ${colors.error};
    border: 1px solid rgba(239, 68, 68, 0.2);
  `}
`;

interface CTAFormProps {
  onSubmit?: (data: { email: string; name?: string; marketingConsent?: boolean }) => Promise<void>;
  className?: string;
}

export default function CTAForm({ onSubmit, className }: CTAFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage({ type: 'error', text: '이메일을 입력해주세요.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      if (onSubmit) {
        await onSubmit({ email: email.trim(), name: name.trim() || undefined, marketingConsent });
      } else {
        // 기본 API 호출
        const response = await fetch('/api/lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.trim(),
            name: name.trim() || undefined,
            marketingConsent,
          }),
        });

        if (!response.ok) {
          throw new Error('등록에 실패했습니다.');
        }
      }

      setMessage({ type: 'success', text: '대기자 등록이 완료되었습니다! 감사합니다.' });
      setEmail('');
      setName('');
      setMarketingConsent(false);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : '등록 중 오류가 발생했습니다.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer className={className}>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="email">이메일 *</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="name">이름 (선택사항)</Label>
          <Input
            id="name"
            type="text"
            placeholder="홍길동"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
          />
        </InputGroup>

        <CheckboxGroup>
          <Checkbox
            id="marketing"
            type="checkbox"
            checked={marketingConsent}
            onChange={(e) => setMarketingConsent(e.target.checked)}
            disabled={isSubmitting}
          />
          <CheckboxLabel htmlFor="marketing">
            마케팅 정보 수신에 동의합니다 (선택사항)
          </CheckboxLabel>
        </CheckboxGroup>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? '등록 중...' : '대기자 등록'}
        </Button>

        <AnimatePresence>
          {message && (
            <Message
              type={message.type}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {message.type === 'success' ? (
                <CheckCircle size={16} />
              ) : (
                <AlertCircle size={16} />
              )}
              {message.text}
            </Message>
          )}
        </AnimatePresence>
      </Form>
    </FormContainer>
  );
}
