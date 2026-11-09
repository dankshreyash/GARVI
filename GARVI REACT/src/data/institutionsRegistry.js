/**
 * Live Institutional Dataset directly parsed from "GSIRF 2024 FInal Data.xlsx"
 * Contains 469 colleges and universities across all categories in Gujarat.
 */
import excelData from './gsirfExcelData.json';

export const INSTITUTIONS_FROM_EXCEL = excelData;
export const INSTITUTIONS_REGISTRY = excelData;

export function findInstitutionByCredentials(uid, pwd) {
  const cleanUid = (uid || '').trim().toLowerCase();
  const cleanPwd = (pwd || '').trim();

  // 1. Check custom credentials updated in Admin Panel (localStorage)
  try {
    const adminCustom = JSON.parse(localStorage.getItem('garvi_admin_users_v1') || '[]');
    const matchCustom = adminCustom.find(
      (u) => u.uid.toLowerCase() === cleanUid && u.pwd === cleanPwd
    );
    if (matchCustom) {
      // Find full Excel record for this institution
      const foundInExcel = INSTITUTIONS_FROM_EXCEL.find(
        (i) => i.name.toLowerCase().includes(matchCustom.inst.toLowerCase()) || i.uid.toLowerCase() === cleanUid
      );
      if (foundInExcel) {
        return { ...foundInExcel, pwd: matchCustom.pwd };
      }
    }
  } catch {}

  // 2. Direct lookup from Excel dataset (UID or Institution Name)
  return (
    INSTITUTIONS_FROM_EXCEL.find(
      (inst) =>
        (inst.uid.toLowerCase() === cleanUid || inst.name.toLowerCase() === cleanUid) &&
        inst.pwd === cleanPwd
    ) || null
  );
}

export function getAllInstitutions() {
  return INSTITUTIONS_FROM_EXCEL;
}
