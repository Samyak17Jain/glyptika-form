/**
 * validators.js
 * Pure validation functions — no React, no state.
 * Returns an errors object: { fieldKey: "message" } or {} if valid.
 */

/**
 * Validates Personal Information (Step 0).
 * @param {object} personal - data.personal
 * @returns {object} errors
 */
export function validatePersonal(personal) {
  const errors = {};

  if (!personal.name?.trim())
    errors.name = "Required";

  if (!personal.rollNo?.trim())
    errors.rollNo = "Required";

  if (!personal.email?.trim()) {
    errors.email = "Required";
  } else if (!/\S+@\S+\.\S+/.test(personal.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
}

/**
 * Validates the full form before PDF generation.
 * @param {object} data - full form state
 * @returns {object} errors
 */
export function validateForDownload(data) {
  const errors = {};

  if (!data.personal.name?.trim())
    errors.name = "Name is required";

  if (!data.personal.email?.trim())
    errors.email = "Email is required";

  return errors;
}

/**
 * Returns true if an errors object has no keys.
 * @param {object} errors
 * @returns {boolean}
 */
export function isValid(errors) {
  return Object.keys(errors).length === 0;
}
