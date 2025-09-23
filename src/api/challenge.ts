import { API } from './axios';
import { z } from 'zod';

// 성공 챌린지 상세 스키마
export const SuccessChallengeDetailSchema = z.object({
  attainmentDate: z.number(),
  attainmentPercent: z.number(),
  categoryType: z.string(),
  endDate: z.string(),
  id: z.number(),
  price: z.number(),
  startDate: z.string(),
  title: z.string(),
  totalDate: z.number(),
  totalPrice: z.number(),
  userCount: z.number(),
  currentUserCount: z.number(),
});

export type SuccessChallengeDetail = z.infer<typeof SuccessChallengeDetailSchema>;

export interface SuccessChallengeDetailResponse {
  result: boolean;
  code: number;
  data: SuccessChallengeDetail;
  message: string;
}

// 성공 챌린지 상세
export const getSuccessChallengeDetail = async (
  challengeId: number
): Promise<SuccessChallengeDetailResponse> => {
  const response = await API.get(`/my/challenge/success/${challengeId}`);
  return response.data;
};
