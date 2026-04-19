import { useState, useRef } from "react";

// ── Styles ────────────────────────────────────────────────────────────────────
import "./styles/global.css";

// ── Components ────────────────────────────────────────────────────────────────
import Header        from "./components/Header";
import Stepper       from "./components/Stepper";
import PersonalForm  from "./components/PersonalForm";
import EducationForm from "./components/EducationForm";
import DynSection    from "./components/DynSection";
import Review        from "./components/Review";
import PDFTemplate   from "./components/PDFTemplate";

// ── Hooks & Utils ─────────────────────────────────────────────────────────────
import { useFormData }       from "./hooks/useFormData";
import { generatePDF }       from "./utils/pdfGenerator";
import { validateForDownload, isValid } from "./utils/validators";

// ── Constants ─────────────────────────────────────────────────────────────────
const STEPS = ["Personal", "Education", "Co-Curriculars", "Societies", "Projects", "Sports", "Review"];

const DYN_STEPS = {
  2: {
    title: "Co-Curricular Activities",
    section: "coCurriculars",
    fields: [
      { key: "name",        label: "Name of Activity" },
      { key: "duration",    label: "Duration of Participation" },
      { key: "achievement", label: "Outstanding Achievement", textarea: true },
    ],
  },
  3: {
    title: "College Societies",
    section: "societies",
    fields: [
      { key: "name",        label: "Name of Society" },
      { key: "role",        label: "Appointment / Role" },
      { key: "achievement", label: "Outstanding Achievement", textarea: true },
    ],
  },
  4: {
    title: "Projects / Internship Experience",
    section: "projects",
    fields: [
      { key: "description", label: "Activity & Description", textarea: true },
      { key: "duration",    label: "Duration of Participation" },
      { key: "achievement", label: "Outstanding Achievement", textarea: true },
    ],
  },
  5: {
    title: "Sports Played",
    section: "sports",
    fields: [
      { key: "name",        label: "Name of Sport" },
      { key: "duration",    label: "Duration of Participation" },
      { key: "achievement", label: "Outstanding Achievement", textarea: true },
    ],
  },
};

// ── Toast hook ────────────────────────────────────────────────────────────────
function useToast() {
  const [toast, setToast] = useState(null);
  const show = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };
  return { toast, show };
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [step, setStep]           = useState(0);
  const [generating, setGenerating] = useState(false);
  const pdfRef                    = useRef(null);
  const { toast, show: showToast } = useToast();

  const {
    data, errors,
    setField, setPersonal, setEducation,
    setDynItem, addDynItem, removeDynItem,
    handlePhoto, removePhoto,
    validate,
  } = useFormData();

  // ── Navigation ──────────────────────────────────────────────────────────────
  const goNext = () => {
    if (validate(step)) {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goBack = () => {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── PDF Download ─────────────────────────────────────────────────────────────
  const handleDownload = () => {
    const errs = validateForDownload(data);
    if (!isValid(errs)) {
      showToast("⚠ Please fill in Name and Email before downloading");
      return;
    }

    generatePDF(pdfRef.current, data, {
      onStart:   () => { setGenerating(true); showToast("Generating PDF…"); },
      onSuccess: () => { setGenerating(false); showToast("✓ PDF downloaded!"); },
      onError:   (err) => {
        console.error("PDF error:", err);
        setGenerating(false);
        showToast(err.message?.includes("load")
          ? "Failed to load PDF library. Check your connection."
          : "Error generating PDF. Try again."
        );
      },
    });
  };

  const progress = (step / (STEPS.length - 1)) * 100;

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="app-wrap">
        <div className="aurora" />

        <div className="main-container">
          <Header />

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <Stepper steps={STEPS} current={step} />

          {/* Step 0 — Personal */}
          {step === 0 && (
            <PersonalForm
              data={data}
              errors={errors}
              setField={setField}
              setPersonal={setPersonal}
              handlePhoto={handlePhoto}
              removePhoto={removePhoto}
            />
          )}

          {/* Step 1 — Education */}
          {step === 1 && (
            <EducationForm
              data={data}
              setEducation={setEducation}
            />
          )}

          {/* Steps 2–5 — Dynamic sections */}
          {[2, 3, 4, 5].includes(step) && (() => {
            const { title, section, fields } = DYN_STEPS[step];
            return (
              <div className="card">
                <DynSection
                  title={title}
                  items={data[section]}
                  fields={fields}
                  onChange={(i, k, v) => setDynItem(section, i, k, v)}
                  onAdd={() => addDynItem(section)}
                  onRemove={(i) => removeDynItem(section, i)}
                />
              </div>
            );
          })()}

          {/* Step 6 — Review */}
          {step === 6 && (
            <Review
              data={data}
              generating={generating}
              onDownload={handleDownload}
            />
          )}

          {/* Nav Buttons */}
          <div className="nav-row">
            {step > 0 && (
              <button className="btn-back" onClick={goBack}>← Back</button>
            )}
            {step < STEPS.length - 1 && (
              <button className="btn-next" onClick={goNext}>Next →</button>
            )}
          </div>

        </div>
      </div>

      {/* Hidden PDF capture target */}
      <PDFTemplate ref={pdfRef} data={data} />

      {/* Toast notification */}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
