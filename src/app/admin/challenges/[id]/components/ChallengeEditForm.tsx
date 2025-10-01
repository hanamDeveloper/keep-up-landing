"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import {
  Plus,
  Trash2,
  Save,
  X,
  Calendar,
  Link,
} from "lucide-react";
import { useFileUpload, FILE_RESPONSE } from "@/hooks/useFileUpload";

const EditFormContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
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
  background: white;
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
  background: white;
  transition: all 0.2s ease;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
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

const DateInputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const ThumbnailContainer = styled.div`
  position: relative;
  width: 8rem;
  height: 8rem;
  margin-bottom: 1rem;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  object-fit: cover;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const ThumbnailUploadOverlay = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.75rem;
`;

const ErrorMessage = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
  right: 0.5rem;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
`;

const DayTypeSection = styled.div`
  margin-top: 1rem;
`;

const DayTypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const DayTypeItem = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 2px solid ${(props) => (props.selected ? "#667eea" : "rgba(102, 126, 234, 0.2)")};
  background: ${(props) => (props.selected ? "rgba(102, 126, 234, 0.1)" : "white")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.05);
  }
`;

const DayTypeCheckbox = styled.input`
  margin: 0;
`;

const DayTypeLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  margin: 0;
`;

const GuidelinesSection = styled.div`
  margin-top: 2rem;
`;

const GuidelinesHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const GuidelinesTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const GuidelinesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const GuidelineItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 0.75rem;
  border: 1px solid rgba(102, 126, 234, 0.1);
`;

const GuidelineInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 0.5rem;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const GuidelineNumber = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  flex-shrink: 0;
`;

const ActionButton = styled(motion.button)<{
  variant: "edit" | "save" | "delete";
}>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  ${(props) => {
    switch (props.variant) {
      case "edit":
        return `
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3);
          }
        `;
      case "save":
        return `
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
          }
        `;
      case "delete":
        return `
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);
          }
        `;
    }
  }}
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

interface ChallengeDetail {
  rowNo: number | null;
  id: number;
  categoryType: string;
  thumbnailFile: FILE_RESPONSE;
  title: string;
  content: string;
  price: number;
  fee: number;
  guidelineList: string[];
  needCheck: boolean;
  startDate: string;
  endDate: string;
  dayTypeList: string[];
  link: string;
  modeType: "DAILY" | "GOAL";
}

interface ChallengeEditFormProps {
  challenge: ChallengeDetail;
  onSave: (editedChallenge: Partial<ChallengeDetail>, editedGuidelines: string[]) => void;
  onCancel: () => void;
}

const DAY_TYPES = [
  { value: "MON", label: "월요일" },
  { value: "TUE", label: "화요일" },
  { value: "WED", label: "수요일" },
  { value: "THU", label: "목요일" },
  { value: "FRI", label: "금요일" },
  { value: "SAT", label: "토요일" },
  { value: "SUN", label: "일요일" },
];

export default function ChallengeEditForm({
  challenge,
  onSave,
  onCancel,
}: ChallengeEditFormProps) {
  const [editedChallenge, setEditedChallenge] = useState<Partial<ChallengeDetail>>(challenge);
  const [editedGuidelines, setEditedGuidelines] = useState<string[]>(challenge.guidelineList || []);
  const [newGuideline, setNewGuideline] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<FILE_RESPONSE | null>(
    challenge.thumbnailFile || null
  );

  const {
    uploadFile,
    isUploading: isFileUploading,
    error: fileUploadError,
  } = useFileUpload();

  const handleThumbnailUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const uploadedFile = await uploadFile(file, "challenge");
    if (uploadedFile) {
      setThumbnailFile(uploadedFile[0]);
      setEditedChallenge({
        ...editedChallenge,
        thumbnailFile: uploadedFile[0],
      });
    }
  };

  const handleDayTypeChange = (dayType: string, checked: boolean) => {
    const currentDayTypes = editedChallenge.dayTypeList || challenge.dayTypeList || [];
    const updatedDayTypes = checked
      ? [...currentDayTypes, dayType]
      : currentDayTypes.filter((day) => day !== dayType);
    
    setEditedChallenge({
      ...editedChallenge,
      dayTypeList: updatedDayTypes,
    });
  };

  const addGuideline = () => {
    if (newGuideline.trim()) {
      setEditedGuidelines([...editedGuidelines, newGuideline.trim()]);
      setNewGuideline("");
    }
  };

  const removeGuideline = (index: number) => {
    setEditedGuidelines(editedGuidelines.filter((_, i) => i !== index));
  };

  const updateGuideline = (index: number, value: string) => {
    const updated = [...editedGuidelines];
    updated[index] = value;
    setEditedGuidelines(updated);
  };

  const handleSave = () => {
    onSave(
      {
        ...editedChallenge,
        thumbnailFile: thumbnailFile || challenge.thumbnailFile,
        modeType: editedChallenge.modeType || challenge.modeType,
      },
      editedGuidelines
    );
  };

  return (
    <EditFormContainer
      // initial={{ opacity: 0, y: 20 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.6 }}
    >
      <FormGroup>
        <FormLabel>썸네일 이미지</FormLabel>
        <ThumbnailContainer>
          <Thumbnail
            src={thumbnailFile?.path || challenge.thumbnailFile?.path || ""}
            alt={challenge.title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-image.png";
            }}
          />
          <ThumbnailUploadOverlay>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailUpload}
              style={{ display: "none" }}
              id="thumbnail-upload"
            />
            <label htmlFor="thumbnail-upload" style={{ cursor: "pointer" }}>
              {isFileUploading ? "업로드 중..." : "썸네일 변경"}
            </label>
          </ThumbnailUploadOverlay>
          {fileUploadError && (
            <ErrorMessage>{fileUploadError}</ErrorMessage>
          )}
        </ThumbnailContainer>
      </FormGroup>

      <FormGroup>
        <FormLabel>챌린지 제목</FormLabel>
        <FormInput
          value={editedChallenge.title || ""}
          onChange={(e) =>
            setEditedChallenge({
              ...editedChallenge,
              title: e.target.value,
            })
          }
          placeholder="챌린지 제목을 입력하세요"
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>카테고리</FormLabel>
        <FormSelect
          value={editedChallenge.categoryType || challenge.categoryType}
          onChange={(e) =>
            setEditedChallenge({
              ...editedChallenge,
              categoryType: e.target.value,
            })
          }
        >
          <option value="EXERCISE">운동</option>
          <option value="STUDY">공부</option>
          <option value="IMPROVEMENT">자기계발</option>
          <option value="ETC">기타</option>
        </FormSelect>
      </FormGroup>

      <FormGroup>
        <FormLabel>챌린지 설명</FormLabel>
        <FormTextarea
          value={editedChallenge.content || ""}
          onChange={(e) =>
            setEditedChallenge({
              ...editedChallenge,
              content: e.target.value,
            })
          }
          placeholder="챌린지 설명을 입력하세요"
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>참가비</FormLabel>
        <FormInput
          type="number"
          value={editedChallenge.price ?? challenge.price ?? 0}
          onChange={(e) =>
            setEditedChallenge({
              ...editedChallenge,
              price: parseInt(e.target.value) || 0,
            })
          }
          placeholder="참가비를 입력하세요"
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>수수료</FormLabel>
        <FormInput
          type="number"
          value={editedChallenge.fee ?? challenge.fee ?? 0}
          onChange={(e) =>
            setEditedChallenge({
              ...editedChallenge,
              fee: parseInt(e.target.value) || 0,
            })
          }
          placeholder="수수료를 입력하세요"
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>
          <Calendar size={16} style={{ marginRight: "0.5rem", display: "inline" }} />
          챌린지 기간
        </FormLabel>
        <DateInputGroup>
          <div>
            <FormLabel style={{ fontSize: "0.75rem", marginBottom: "0.25rem" }}>
              시작일
            </FormLabel>
            <FormInput
              type="date"
              value={editedChallenge.startDate || challenge.startDate || ""}
              onChange={(e) =>
                setEditedChallenge({
                  ...editedChallenge,
                  startDate: e.target.value,
                })
              }
            />
          </div>
          <div>
            <FormLabel style={{ fontSize: "0.75rem", marginBottom: "0.25rem" }}>
              종료일
            </FormLabel>
            <FormInput
              type="date"
              value={editedChallenge.endDate || challenge.endDate || ""}
              onChange={(e) =>
                setEditedChallenge({
                  ...editedChallenge,
                  endDate: e.target.value,
                })
              }
            />
          </div>
        </DateInputGroup>
      </FormGroup>

      <FormGroup>
        <FormLabel>
          <Calendar size={16} style={{ marginRight: "0.5rem", display: "inline" }} />
          챌린지 요일
        </FormLabel>
        <DayTypeSection>
          <DayTypeGrid>
            {DAY_TYPES.map((dayType) => {
              const currentDayTypes = editedChallenge.dayTypeList || challenge.dayTypeList || [];
              const isSelected = currentDayTypes.includes(dayType.value);
              
              return (
                <DayTypeItem
                  key={dayType.value}
                  selected={isSelected}
                  onClick={() => handleDayTypeChange(dayType.value, !isSelected)}
                >
                  <DayTypeCheckbox
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}} // onClick에서 처리
                  />
                  <DayTypeLabel>{dayType.label}</DayTypeLabel>
                </DayTypeItem>
              );
            })}
          </DayTypeGrid>
        </DayTypeSection>
      </FormGroup>

      <FormGroup>
        <FormLabel>
          <Link size={16} style={{ marginRight: "0.5rem", display: "inline" }} />
          링크 (선택사항)
        </FormLabel>
        <FormInput
          type="url"
          value={editedChallenge.link || challenge.link || ""}
          onChange={(e) =>
            setEditedChallenge({
              ...editedChallenge,
              link: e.target.value,
            })
          }
          placeholder="https://example.com"
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>모드 타입</FormLabel>
        <FormSelect
          value={editedChallenge.modeType || challenge.modeType}
          onChange={(e) =>
            setEditedChallenge({
              ...editedChallenge,
              modeType: e.target.value as "DAILY" | "GOAL",
            })
          }
        >
          <option value="DAILY">습관 (DAILY)</option>
          <option value="GOAL">목표 (GOAL)</option>
        </FormSelect>
      </FormGroup>

      <GuidelinesSection>
        <GuidelinesHeader>
          <GuidelinesTitle>챌린지 가이드라인</GuidelinesTitle>
          <ActionButton
            variant="edit"
            onClick={addGuideline}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={16} />
            추가
          </ActionButton>
        </GuidelinesHeader>

        <GuidelinesList>
          {editedGuidelines.map((guideline, index) => (
            <GuidelineItem key={index}>
              <GuidelineNumber>{index + 1}</GuidelineNumber>
              <GuidelineInput
                value={guideline}
                onChange={(e) => updateGuideline(index, e.target.value)}
                placeholder="가이드라인을 입력하세요"
              />
              <ActionButton
                variant="delete"
                onClick={() => removeGuideline(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Trash2 size={16} />
              </ActionButton>
            </GuidelineItem>
          ))}
          <GuidelineItem>
            <GuidelineNumber>+</GuidelineNumber>
            <GuidelineInput
              value={newGuideline}
              onChange={(e) => setNewGuideline(e.target.value)}
              placeholder="새 가이드라인을 입력하세요"
              onKeyPress={(e) => e.key === "Enter" && addGuideline()}
            />
            <ActionButton
              variant="save"
              onClick={addGuideline}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus size={16} />
            </ActionButton>
          </GuidelineItem>
        </GuidelinesList>
      </GuidelinesSection>

      <ActionButtons>
        <ActionButton
          variant="save"
          onClick={handleSave}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Save size={20} />
          저장
        </ActionButton>
        <ActionButton
          variant="delete"
          onClick={onCancel}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <X size={20} />
          취소
        </ActionButton>
      </ActionButtons>
    </EditFormContainer>
  );
}
