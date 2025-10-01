import { useState } from "react";
import { API } from "@/api/axios";

export interface FILE_RESPONSE {
  id: number;
  name: string;
  path: string;
  size: number;
  thumbnailPath?: string;
}

interface FileUploadResponse {
  code: number;
  message: string;
  data: FILE_RESPONSE[];
}

interface UseFileUploadReturn {
  uploadFile: (file: File, type: string) => Promise<FILE_RESPONSE[] | null>;
  isUploading: boolean;
  error: string | null;
}

export const useFileUpload = (): UseFileUploadReturn => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (
    file: File,
    type: string
  ): Promise<FILE_RESPONSE[] | null> => {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      // 썸네일이 있는 경우 추가 (선택사항)
      // formData.append('thumbnail', thumbnailFile);

      const response = await API.post<FileUploadResponse>(
        `/file/${type}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        return response.data.data;
      } else {
        throw new Error(response.data || "파일 업로드 실패");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "파일 업로드 중 오류가 발생했습니다.";
      setError(errorMessage);
      console.error("파일 업로드 실패:", err);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadFile,
    isUploading,
    error,
  };
};
