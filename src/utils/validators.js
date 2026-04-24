/**
 * validators.js
 * Pure validation functions — no React, no state.
 * Returns an errors object: { fieldKey: "message" } or {} if valid.
 */

/**
 * Validates Personal Information (Step 0).
 * @param {object} personal - data.personal
 * @param {object} data - full form state
 * @returns {object} errors
 */
export function validatePersonal(personal, data = {}) {
  const errors = {};

  // Full Name
  if (!personal.name?.trim())
    errors.name = "Required";

  // Roll Number
  if (!personal.rollNo?.trim())
    errors.rollNo = "Required";

  // Personal Email
  if (!personal.email?.trim()) {
    errors.email = "Required";
  } else if (!/\S+@\S+\.\S+/.test(personal.email)) {
    errors.email = "Invalid email address";
  }

  // Thapar Email
  if (!personal.thaparEmail?.trim()) {
    errors.thaparEmail = "Required";
  } else if (!/\S+@\S+\.\S+/.test(personal.thaparEmail)) {
    errors.thaparEmail = "Invalid email address";
  }

  // DOB
  if (!personal.dob?.trim())
    errors.dob = "Required";

  // Batch Number
  if (!data.batchNumber?.trim())
    errors.batchNumber = "Required";

  // Address
  if (!personal.address?.trim())
    errors.address = "Required";

  // Parent's Name
  if (!personal.parentName?.trim())
    errors.parentName = "Required";

  // Parent's Occupation
  if (!personal.parentOccupation?.trim())
    errors.parentOccupation = "Required";

  // Department Choices
  if (!personal.primaryDept?.trim())
    errors.primaryDept = "Required";

  if (!personal.secondaryDept?.trim())
    errors.secondaryDept = "Required";

  if (!personal.tertiaryDept?.trim())
    errors.tertiaryDept = "Required";

  // Interests
  if (!data.interests?.trim())
    errors.interests = "Required";

  // Hobbies
  if (!data.hobbies?.trim())
    errors.hobbies = "Required";

  // Photo
  if (!data.photo)
    errors.photo = "Required";

  return errors;
}

/**
 * Validates the full form before PDF generation.
 * @param {object} data
 * @returns {object} errors
 */
export function validateForDownload(data) {
  return validatePersonal(data.personal, data);
}

/**
 * Returns true if an errors object has no keys.
 * @param {object} errors
 * @returns {boolean}
 */
export function isValid(errors) {
  return Object.keys(errors).length === 0;
}