/**
 * pdfGenerator.js
 * Handles dynamic loading of html2pdf.js and PDF generation.
 * Plain utility — no React hooks, no state.
 *
 * Usage:
 *   import { generatePDF } from "../utils/pdfGenerator";
 *   await generatePDF(elementRef, data);
 */

/**
 * Dynamically loads html2pdf.js from CDN if not already loaded.
 * @returns {Promise<void>}
 */
function loadHtml2pdf() {
  return new Promise((resolve, reject) => {
    if (window.html2pdf) { resolve(); return; }
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.onload = resolve;
    script.onerror = () => reject(new Error("Failed to load html2pdf.js"));
    document.head.appendChild(script);
  });
}

/**
 * Generates and downloads a PDF from a DOM element.
 *
 * @param {HTMLElement} element   - The DOM node to capture (PDFTemplate ref)
 * @param {object}      data      - Form data (used only for filename)
 * @param {function}    onStart   - Called when generation begins
 * @param {function}    onSuccess - Called on successful download
 * @param {function}    onError   - Called on failure
 */
export async function generatePDF(element, data, { onStart, onSuccess, onError } = {}) {
  onStart?.();

  // Reveal element for html2canvas
  element.classList.add("rendering");

  // Wait for browser to paint
  await new Promise((r) => setTimeout(r, 500));

  try {
    await loadHtml2pdf();
    // Extra tick after first-time script load
    await new Promise((r) => setTimeout(r, 200));
  } catch (err) {
    element.classList.remove("rendering");
    onError?.(err);
    return;
  }

  const safeName = (data.personal?.name || "candidate")
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "");
  const safeRoll = (data.personal?.rollNo || "")
    .replace(/[^a-zA-Z0-9]/g, "");

  window
    .html2pdf()
    .set({
      margin: [10, 10, 10, 10],
      filename: `PIQ_${safeName}_${safeRoll}.pdf`,
      image: { type: "jpeg", quality: 0.97 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        imageTimeout: 15000,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 794,
      },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css"] },
    })
    .from(element)
    .save()
    .then(() => {
      element.classList.remove("rendering");
      onSuccess?.();
    })
    .catch((err) => {
      element.classList.remove("rendering");
      onError?.(err);
    });
}
