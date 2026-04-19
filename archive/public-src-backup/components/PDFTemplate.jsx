import { forwardRef } from "react";

/**
 * PDFTemplate
 * Hidden component that html2pdf captures on download.
 * Uses forwardRef so App.jsx can pass the ref to pdfGenerator.
 *
 * Props:
 *   data — full form data object
 */
const PDFTemplate = forwardRef(function PDFTemplate({ data }, ref) {
  // Pads an array to `count` items with empty objects
  const pad = (arr, count) =>
    [...arr, ...Array(Math.max(0, count - arr.length)).fill({})].slice(0, count);

  return (
    <div ref={ref} className="pdf-template">

      {/* Logo + Title */}
      <div className="pdf-logo-row">
        <div className="pdf-logo-circle">G</div>
        <div className="pdf-title-main">Personal Information Questionnaire</div>
      </div>

      {/* Batch */}
      <table className="pdf-table" style={{ marginBottom: 0 }}>
        <tbody>
          <tr>
            <td style={{ width: "50%", fontWeight: 700 }}>
              Batch Number: {data.batchNumber}
            </td>
            <td style={{ width: "50%" }} />
          </tr>
        </tbody>
      </table>

      {/* ── Personal Information ── */}
      <div className="pdf-section-block">
        <div className="pdf-section-header">Personal Information</div>
        <table className="pdf-table">
          <tbody>
            <tr>
              <td style={{ width: "15%" }}>Name</td>
              <td style={{ width: "35%" }}>{data.personal.name}</td>
              <td style={{ width: "15%" }}>Thapar Roll No</td>
              <td style={{ width: "20%" }}>{data.personal.rollNo}</td>
              <td className="pdf-photo-cell" rowSpan={7}>
                {data.photo ? (
                  <img src={data.photo} alt="Photo" className="pdf-photo" />
                ) : (
                  <div style={{
                    width: 85, height: 100, border: "1px solid #aaa",
                    display: "grid", placeItems: "center", fontSize: 10, color: "#999",
                  }}>
                    Photo
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>Email ID</td><td>{data.personal.email}</td>
              <td>Thapar Email ID</td><td>{data.personal.thaparEmail}</td>
            </tr>
            <tr>
              <td>D.O.B.</td><td>{data.personal.dob}</td>
              <td>Permanent Residence</td><td>{data.personal.address}</td>
            </tr>
            <tr>
              <td>Parent's Name</td><td>{data.personal.parentName}</td>
              <td>Parent's Occupation</td><td>{data.personal.parentOccupation}</td>
            </tr>
            <tr>
              <td>Choice of Primary Department</td>
              <td colSpan={3}>{data.personal.primaryDept}</td>
            </tr>
            <tr>
              <td>Choice of Secondary Department</td>
              <td colSpan={3}>{data.personal.secondaryDept}</td>
            </tr>
            <tr>
              <td>Choice of Tertiary Department</td>
              <td colSpan={3}>{data.personal.tertiaryDept}</td>
            </tr>
            <tr>
              <td>Interests</td><td colSpan={4}>{data.interests}</td>
            </tr>
            <tr>
              <td>Hobbies</td><td colSpan={4}>{data.hobbies}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Educational Information ── */}
      <div className="pdf-section-block">
        <div className="pdf-section-header">Educational Information</div>
        <table className="pdf-table">
          <tbody>
            <tr>
              <td style={{ width: "20%" }}>Course</td>
              <td style={{ width: "30%" }}>{data.education.course}</td>
              <td style={{ width: "20%" }}>Year of Joining</td>
              <td style={{ width: "30%" }}>{data.education.yearOfJoining}</td>
            </tr>
            <tr>
              <td>CGPA</td><td>{data.education.cgpa}</td>
              <td>No. of Backlogs</td><td>{data.education.backlogs}</td>
            </tr>
            <tr>
              <td>Class 10 Board &amp; Marks</td><td>{data.education.class10}</td>
              <td>Class 12 Board &amp; Marks</td><td>{data.education.class12}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Co-Curriculars ── */}
      <div className="pdf-section-block">
        <div className="pdf-section-header">Co-Curriculars</div>
        <table className="pdf-table">
          <thead>
            <tr>
              <th style={{ width: "5%" }}>#</th>
              <th style={{ width: "40%" }}>Name of Activity</th>
              <th style={{ width: "25%" }}>Duration of Participation</th>
              <th style={{ width: "30%" }}>Outstanding Achievement</th>
            </tr>
          </thead>
          <tbody>
            {pad(data.coCurriculars, 5).map((row, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{row.name || ""}</td>
                <td>{row.duration || ""}</td>
                <td>{row.achievement || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── College Societies ── */}
      <div className="pdf-section-block">
        <div className="pdf-section-header">College Societies</div>
        <table className="pdf-table">
          <thead>
            <tr>
              <th style={{ width: "5%" }}>#</th>
              <th style={{ width: "40%" }}>Name of Society</th>
              <th style={{ width: "25%" }}>Appointment</th>
              <th style={{ width: "30%" }}>Outstanding Achievement</th>
            </tr>
          </thead>
          <tbody>
            {pad(data.societies, 4).map((row, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{row.name || ""}</td>
                <td>{row.role || ""}</td>
                <td>{row.achievement || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Projects / Internship ── */}
      <div className="pdf-section-block">
        <div className="pdf-section-header">Projects / Internship Experience</div>
        <table className="pdf-table">
          <thead>
            <tr>
              <th style={{ width: "5%" }}>#</th>
              <th style={{ width: "40%" }}>Activity &amp; Description</th>
              <th style={{ width: "25%" }}>Duration of Participation</th>
              <th style={{ width: "30%" }}>Outstanding Achievement</th>
            </tr>
          </thead>
          <tbody>
            {pad(data.projects, 5).map((row, i) => (
              <tr key={i}>
                <td style={{ paddingTop: 14, paddingBottom: 14 }}>{i + 1}</td>
                <td style={{ paddingTop: 14, paddingBottom: 14 }}>{row.description || ""}</td>
                <td style={{ paddingTop: 14, paddingBottom: 14 }}>{row.duration || ""}</td>
                <td style={{ paddingTop: 14, paddingBottom: 14 }}>{row.achievement || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Sports ── */}
      <div className="pdf-section-block">
        <div className="pdf-section-header">Sports Played</div>
        <table className="pdf-table">
          <thead>
            <tr>
              <th style={{ width: "5%" }}>#</th>
              <th style={{ width: "40%" }}>Name of Sport</th>
              <th style={{ width: "25%" }}>Duration of Participation</th>
              <th style={{ width: "30%" }}>Outstanding Achievement</th>
            </tr>
          </thead>
          <tbody>
            {pad(data.sports, 4).map((row, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{row.name || ""}</td>
                <td>{row.duration || ""}</td>
                <td>{row.achievement || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Declaration ── */}
      <div className="pdf-declaration">
        <strong>Declaration:</strong> I hereby declare that the information
        provided above in this Personal Information Questionnaire is true and
        correct to the best of my knowledge and belief.
        <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
          <div style={{ textAlign: "center", minWidth: 150 }}>
            <div style={{ borderBottom: "1px solid #555", marginBottom: 4, height: 30 }} />
            <div style={{ fontSize: 10, color: "#555" }}>Signature</div>
          </div>
        </div>
      </div>

    </div>
  );
});

export default PDFTemplate;
