/**
 * pdfGenerator.js
 * Generates a PDF from a DOM element using jsPDF + html2canvas directly.
 * Replaces html2pdf.js wrapper which silently produces blank pages.
 */

const JSPDF_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
const HTML2CANVAS_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error(`Failed to load: ${src}`));
    document.head.appendChild(s);
  });
}

async function loadLibraries() {
  await loadScript(HTML2CANVAS_CDN);
  await loadScript(JSPDF_CDN);
}

/**
 * Generates and downloads a PDF from a DOM element.
 *
 * @param {HTMLElement} element   - The DOM node to capture
 * @param {object}      data      - Form data (used for filename)
 * @param {object}      callbacks - { onStart, onSuccess, onError }
 */
export async function generatePDF(element, data, { onStart, onSuccess, onError } = {}) {
  onStart?.();

  try {
    await loadLibraries();
  } catch (err) {
    onError?.(err);
    return;
  }

  // -- Make element capturable no matter its current visibility --
  const prevStyle = {
    position: element.style.position,
    top: element.style.top,
    left: element.style.left,
    width: element.style.width,
    visibility: element.style.visibility,
    display: element.style.display,
    zIndex: element.style.zIndex,
  };

  Object.assign(element.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "794px",       // A4 at 96 dpi
    visibility: "visible",
    display: "block",
    zIndex: "-9999",      // behind everything — user won't see it flash
  });

  // Let the browser reflow and paint before we capture
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  await new Promise((r) => setTimeout(r, 150));

  let canvas;
  try {
    canvas = await window.html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: 794,
    });
  } catch (err) {
    // Restore styles before surfacing the error
    Object.assign(element.style, prevStyle);
    onError?.(err);
    return;
  }

  // Restore original styles immediately after capture
  Object.assign(element.style, prevStyle);

  // -- Build PDF from canvas --
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });

  const pageWidth  = pdf.internal.pageSize.getWidth();   // 595.28 pt
  const pageHeight = pdf.internal.pageSize.getHeight();  // 841.89 pt

  const imgData   = canvas.toDataURL("image/jpeg", 0.97);
  const imgWidth  = pageWidth;
  const imgHeight = (canvas.height * pageWidth) / canvas.width;

  // If content is taller than one page, split across pages
  let yOffset = 0;
  while (yOffset < imgHeight) {
    if (yOffset > 0) pdf.addPage();
    pdf.addImage(imgData, "JPEG", 0, -yOffset, imgWidth, imgHeight);
    yOffset += pageHeight;
  }

  const safeName = (data.personal?.name || "candidate")
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "");
  const safeRoll = (data.personal?.rollNo || "")
    .replace(/[^a-zA-Z0-9]/g, "");

  pdf.save(`PIQ_${safeName}_${safeRoll}.pdf`);
  onSuccess?.();
}