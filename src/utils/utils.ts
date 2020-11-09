import cuid from 'cuid';
import { CUID } from '@/constants/storage';
// 获取cuid
export const getCuid = (): string => {
  const currentCuid = localStorage.getItem(CUID);
  if (currentCuid) return currentCuid;
  const newCuid = cuid();
  localStorage.setItem(CUID, newCuid);
  return newCuid;
};
