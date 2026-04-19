/**
 * Review  (Step 6)
 * Shows a full summary of all entered data and the Download PDF button.
 *
 * Props:
 *   data        — full form data object
 *   generating  — boolean  true while PDF is being built
 *   onDownload  — ()       triggers PDF generation
 */
export default function Review({ data, generating, onDownload }) {
  const dynSections = [
    { label: "Co-Curricular Activities", key: "coCurriculars", cols: ["name", "duration", "achievement"] },
    { label: "College Societies",        key: "societies",     cols: ["name", "role", "achievement"] },
    { label: "Projects / Internship",    key: "projects",      cols: ["description", "duration", "achievement"] },
    { label: "Sports Played",            key: "sports",        cols: ["name", "duration", "achievement"] },
  ];

  const personalFields = [
    ["Name",               data.personal.name],
    ["Roll No",            data.personal.rollNo],
    ["Email",              data.personal.email],
    ["Thapar Email",       data.personal.thaparEmail],
    ["DOB",                data.personal.dob],
    ["Address",            data.personal.address],
    ["Parent",             data.personal.parentName],
    ["Parent Occupation",  data.personal.parentOccupation],
    ["Primary Dept",       data.personal.primaryDept],
    ["Secondary Dept",     data.personal.secondaryDept],
    ["Tertiary Dept",      data.personal.tertiaryDept],
    ["Batch",              data.batchNumber],
  ];

  return (
    <div className="card">
      <div className="section-title">Review &amp; Download</div>

      {/* Personal */}
      <div className="review-section">
        <h3>Personal Information</h3>
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          <div className="review-grid" style={{ flex: 1 }}>
            {personalFields.map(([label, val]) => (
              <div className="review-item" key={label}>
                <label>{label}</label>
                <p>{val || <span style={{ color: "var(--muted)" }}>—</span>}</p>
              </div>
            ))}
          </div>
          {data.photo && (
            <img
              src={data.photo}
              alt="photo"
              style={{
                width: 80, height: 96, objectFit: "cover",
                borderRadius: 8, border: "2px solid var(--border)", flexShrink: 0,
              }}
            />
          )}
        </div>
      </div>

      {/* Education */}
      <div className="review-section">
        <h3>Education</h3>
        <div className="review-grid">
          {Object.entries(data.education).map(([k, v]) => (
            <div className="review-item" key={k}>
              <label>{k.replace(/([A-Z])/g, " $1")}</label>
              <p>{v || <span style={{ color: "var(--muted)" }}>—</span>}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic sections */}
      {dynSections.map(({ label, key, cols }) => (
        <div className="review-section" key={key}>
          <h3>{label}</h3>
          <table className="review-table">
            <thead>
              <tr>
                {cols.map((c) => (
                  <th key={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1).replace(/([A-Z])/g, " $1")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data[key].map((row, i) => (
                <tr key={i}>
                  {cols.map((c) => <td key={c}>{row[c] || "—"}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* Download */}
      <div style={{
        marginTop: 32, padding: 24,
        border: "1px solid var(--border)", borderRadius: 12,
        background: "rgba(233,30,140,.04)", textAlign: "center",
      }}>
        <div style={{
          fontFamily: "var(--font-head)", fontSize: 13,
          letterSpacing: ".1em", textTransform: "uppercase",
          color: "var(--muted)", marginBottom: 12,
        }}>
          Ready to export
        </div>
        <button
          className="btn-submit"
          onClick={onDownload}
          disabled={generating}
          style={{ fontSize: 14, padding: "14px 36px", opacity: generating ? .6 : 1 }}
        >
          {generating ? "⏳ Generating…" : "⬇ Download PDF"}
        </button>
      </div>
    </div>
  );
}
