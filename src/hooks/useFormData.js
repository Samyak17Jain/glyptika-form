import { useState } from "react";
import { validatePersonal, isValid } from "../utils/validators";

// ── Initial State ─────────────────────────────────────────────────────────────
const INIT = {
  batchNumber: "",
  personal: {
    name: "", rollNo: "", email: "", thaparEmail: "",
    dob: "", address: "", parentName: "", parentOccupation: "",
    primaryDept: "", secondaryDept: "", tertiaryDept: "",
  },
  interests: "",
  hobbies: "",
  education: {
    course: "", yearOfJoining: "", cgpa: "",
    backlogs: "", class10: "", class12: "",
  },
  coCurriculars: [{ name: "", duration: "", achievement: "" }],
  societies:     [{ name: "", role: "",     achievement: "" }],
  projects:      [{ description: "", duration: "", achievement: "" }],
  sports:        [{ name: "", duration: "", achievement: "" }],
  photo: null,
};

const EMPTY_ROW = {
  coCurriculars: { name: "", duration: "", achievement: "" },
  societies:     { name: "", role: "",     achievement: "" },
  projects:      { description: "", duration: "", achievement: "" },
  sports:        { name: "", duration: "", achievement: "" },
};

/**
 * useFormData
 * All form state and setters in one place.
 * Validation logic is imported from utils/validators.js.
 */
export function useFormData() {
  const [data, setData]     = useState(INIT);
  const [errors, setErrors] = useState({});

  // ── Setters ───────────────────────────────────────────────────────────────
  const setField = (key, value) =>
    setData((d) => ({ ...d, [key]: value }));

  const setPersonal = (key, value) =>
    setData((d) => ({ ...d, personal: { ...d.personal, [key]: value } }));

  const setEducation = (key, value) =>
    setData((d) => ({ ...d, education: { ...d.education, [key]: value } }));

  // ── Dynamic section helpers ───────────────────────────────────────────────
  const setDynItem = (section, index, key, value) =>
    setData((d) => ({
      ...d,
      [section]: d[section].map((row, i) =>
        i === index ? { ...row, [key]: value } : row
      ),
    }));

  const addDynItem = (section) =>
    setData((d) => ({
      ...d,
      [section]: [...d[section], { ...EMPTY_ROW[section] }],
    }));

  const removeDynItem = (section, index) =>
    setData((d) => ({
      ...d,
      [section]: d[section].filter((_, i) => i !== index),
    }));

  // ── Photo ─────────────────────────────────────────────────────────────────
  const handlePhoto = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setData((d) => ({ ...d, photo: e.target.result }));
    reader.readAsDataURL(file);
  };

  const removePhoto = () => setData((d) => ({ ...d, photo: null }));

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = (step) => {
    let errs = {};
    if (step === 0) errs = validatePersonal(data.personal, data);
    setErrors(errs);
    return isValid(errs);
  };

  return {
    data, errors,
    setField, setPersonal, setEducation,
    setDynItem, addDynItem, removeDynItem,
    handlePhoto, removePhoto,
    validate,
  };
}
