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

  // 이미지 파일인지 확인
  const isImageFile = (file: File) => file.type.startsWith("image/");

  // File명을 확장자를 유지하며 새 이름으로 변환
  const renameKeepingExt = (name: string, prefix: string) => {
    const idx = name.lastIndexOf(".");
    const ext = idx >= 0 ? name.slice(idx) : ".jpg";
    const base = idx >= 0 ? name.slice(0, idx) : name;
    return `${prefix}_${base}${ext.toLowerCase().includes('jpg') || ext.toLowerCase().includes('jpeg') ? '' : '.jpg'}`;
  };

  // canvas toBlob Promise 래퍼
  const canvasToBlob = (canvas: HTMLCanvasElement, quality: number) =>
    new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));

  // 원본 최적화: 긴 변 1920px 유지, JPEG 0.8
  const createOptimizedImageBlob = async (file: File): Promise<Blob> => {
    const objectUrl = URL.createObjectURL(file);
    try {
      const img = document.createElement("img");
      await new Promise<void>((res, rej) => {
        img.onload = () => res();
        img.onerror = (e) => rej(e);
        img.src = objectUrl;
      });

      const maxSide = 1920;
      const ratio = Math.min(1, maxSide / Math.max(img.width, img.height));
      const targetW = Math.max(1, Math.round(img.width * ratio));
      const targetH = Math.max(1, Math.round(img.height * ratio));

      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas 2D context not available");
      ctx.drawImage(img, 0, 0, targetW, targetH);

      const blob = await canvasToBlob(canvas, 0.8);
      if (!blob) throw new Error("Failed to create optimized image blob");
      return blob;
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  };

  // 썸네일 생성: 중앙 크롭 정사각형 후 400x400, JPEG 0.6
  const createThumbnailBlob = async (file: File): Promise<Blob> => {
    const objectUrl = URL.createObjectURL(file);
    try {
      const img = document.createElement("img");
      await new Promise<void>((res, rej) => {
        img.onload = () => res();
        img.onerror = (e) => rej(e);
        img.src = objectUrl;
      });

      const size = Math.min(img.width, img.height);
      const sx = Math.max(0, Math.floor((img.width - size) / 2));
      const sy = Math.max(0, Math.floor((img.height - size) / 2));

      const cropCanvas = document.createElement("canvas");
      cropCanvas.width = size;
      cropCanvas.height = size;
      const cropCtx = cropCanvas.getContext("2d");
      if (!cropCtx) throw new Error("Canvas 2D context not available");
      cropCtx.drawImage(img, sx, sy, size, size, 0, 0, size, size);

      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas 2D context not available");
      ctx.drawImage(cropCanvas, 0, 0, 400, 400);

      const blob = await canvasToBlob(canvas, 0.6);
      if (!blob) throw new Error("Failed to create thumbnail blob");
      return blob;
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  };

  const uploadFile = async (
    file: File,
    type: string
  ): Promise<FILE_RESPONSE[] | null> => {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      // 이미지일 경우: 원본 최적화 + 썸네일 생성 후 함께 업로드
      if (isImageFile(file) && typeof window !== "undefined") {
        const ts = Date.now();
        const optimizedBlob = await createOptimizedImageBlob(file);
        const thumbBlob = await createThumbnailBlob(file);

        const optimizedName = renameKeepingExt(file.name, `${ts}`);
        const thumbName = renameKeepingExt(file.name, `${ts}_thumb`);

        formData.append(
          "image",
          new File([optimizedBlob], optimizedName, { type: "image/jpeg" })
        );
        formData.append(
          "thumbnail",
          new File([thumbBlob], thumbName, { type: "image/jpeg" })
        );
      } else {
        // 일반 파일은 기존 방식으로 업로드
        formData.append("image", file);
      }

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
