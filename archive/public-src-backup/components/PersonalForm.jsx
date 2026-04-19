import { useRef } from "react";

/**
 * PersonalForm  (Step 0)
 *
 * Props:
 *   data        — full form data object
 *   errors      — { name, rollNo, email }
 *   setField    — (key, val) top-level field setter
 *   setPersonal — (key, val) personal sub-object setter
 *   handlePhoto — (File) load photo as base64
 *   removePhoto — () clear photo
 */
export default function PersonalForm({ data, errors, setField, setPersonal, handlePhoto, removePhoto }) {
  const fileRef = useRef(null);

  return (
    <div className="card">
      <div className="section-title">Personal Information</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "start" }}>

        {/* ── Fields ── */}
        <div>
          <div className="field-grid" style={{ marginBottom: 18 }}>
            <div className="field">
              <label>Full Name *</label>
              <input
                value={data.personal.name}
                onChange={(e) => setPersonal("name", e.target.value)}
                placeholder="Your full name"
              />
              {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>

            <div className="field">
              <label>Thapar Roll No *</label>
              <input
                value={data.personal.rollNo}
                onChange={(e) => setPersonal("rollNo", e.target.value)}
                placeholder="e.g. 102117XXX"
              />
              {errors.rollNo && <span className="error-msg">{errors.rollNo}</span>}
            </div>

            <div className="field">
              <label>Personal Email *</label>
              <input
                type="email"
                value={data.personal.email}
                onChange={(e) => setPersonal("email", e.target.value)}
                placeholder="you@gmail.com"
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            <div className="field">
              <label>Thapar Email ID</label>
              <input
                type="email"
                value={data.personal.thaparEmail}
                onChange={(e) => setPersonal("thaparEmail", e.target.value)}
                placeholder="you@thapar.edu"
              />
            </div>

            <div className="field">
              <label>Date of Birth</label>
              <input
                type="date"
                value={data.personal.dob}
                onChange={(e) => setPersonal("dob", e.target.value)}
              />
            </div>

            <div className="field">
              <label>Batch Number</label>
              <input
                value={data.batchNumber}
                onChange={(e) => setField("batchNumber", e.target.value)}
                placeholder="e.g. 2025-A"
              />
            </div>
          </div>

          <div className="field" style={{ marginBottom: 18 }}>
            <label>Permanent Residence</label>
            <input
              value={data.personal.address}
              onChange={(e) => setPersonal("address", e.target.value)}
              placeholder="City, State"
            />
          </div>

          <div className="field-grid" style={{ marginBottom: 18 }}>
            <div className="field">
              <label>Parent's Name</label>
              <input
                value={data.personal.parentName}
                onChange={(e) => setPersonal("parentName", e.target.value)}
              />
            </div>
            <div className="field">
              <label>Parent's Occupation</label>
              <input
                value={data.personal.parentOccupation}
                onChange={(e) => setPersonal("parentOccupation", e.target.value)}
              />
            </div>
          </div>

          {[
            { key: "primaryDept",   label: "Choice of Primary Department" },
            { key: "secondaryDept", label: "Choice of Secondary Department" },
            { key: "tertiaryDept",  label: "Choice of Tertiary Department" },
          ].map(({ key, label }) => (
            <div className="field" style={{ marginBottom: 18 }} key={key}>
              <label>{label}</label>
              <input
                value={data.personal[key]}
                onChange={(e) => setPersonal(key, e.target.value)}
              />
            </div>
          ))}

          <div className="field-grid">
            <div className="field">
              <label>Interests</label>
              <textarea
                value={data.interests}
                onChange={(e) => setField("interests", e.target.value)}
                placeholder="e.g. Machine Learning, Photography…"
                rows={3}
              />
            </div>
            <div className="field">
              <label>Hobbies</label>
              <textarea
                value={data.hobbies}
                onChange={(e) => setField("hobbies", e.target.value)}
                placeholder="e.g. Reading, Badminton…"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* ── Photo Upload ── */}
        <div style={{ paddingTop: 22, minWidth: 120 }}>
          <label style={{ display: "block", marginBottom: 8 }}>Photo</label>
          <div className="photo-zone" onClick={() => fileRef.current.click()}>
            {data.photo ? (
              <img src={data.photo} alt="preview" className="photo-preview" />
            ) : (
              <>
                <div style={{ fontSize: 28, opacity: .35 }}>🖼</div>
                <div className="photo-hint">Click to upload<br />JPG / PNG</div>
              </>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handlePhoto(e.target.files[0])}
          />
          {data.photo && (
            <button
              onClick={removePhoto}
              style={{
                marginTop: 8, fontSize: 11,
                background: "transparent", border: "none",
                color: "var(--muted)", cursor: "pointer",
              }}
            >
              Remove
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
