import { forwardRef } from "react";

const PDFTemplate = forwardRef(function PDFTemplate({ data }, ref) {

  const dynamicRows = (arr = [], fields = []) => {
    const filled = arr.filter((row) =>
      fields.some((f) => String(row[f] ?? "").trim() !== "")
    );
    if (filled.length === 0) {
      const dash = Object.fromEntries(fields.map((f) => [f, "—"]));
      return { rows: [dash], empty: true };
    }
    return { rows: filled, empty: false };
  };

  const coCurr   = dynamicRows(data.coCurriculars, ["name", "duration", "achievement"]);
  const societies = dynamicRows(data.societies,     ["name", "role",     "achievement"]);
  const projects  = dynamicRows(data.projects,      ["description", "duration", "achievement"]);
  const sports    = dynamicRows(data.sports,        ["name", "duration", "achievement"]);

  return (
    <div ref={ref} className="pdf-template">

      {/* Logo + Title */}
      <div className="pdf-logo-row">
        <img
          src="/Glyptika_Logo.png"
          alt="Glyptika Logo"
          style={{ width: 42, height: 42, objectFit: "contain" }}
        />
        <div className="pdf-title-main">
          Personal Information Questionnaire
        </div>
      </div>

      {/* Batch */}
      <table className="pdf-table pdf-marks-row" style={{ marginBottom: 0 }}>
        <tbody>
          <tr>
            <td style={{ width: "50%", fontWeight: 700 }}>
              Batch Number: {data.batchNumber}
            </td>
            <td style={{ width: "50%" }} />
          </tr>
        </tbody>
      </table>

      {/* ✅ NEW MARKS ROW */}
      <table className="pdf-table" style={{ marginBottom: 0 }}>
        <tbody>
          <tr>
            <td style={{ width: "18%" }}></td>
            <td style={{ width: "18%" }}></td>
            <td style={{ width: "18%" }}></td>
            <td style={{ width: "23%" }}></td>
            <td style={{ width: "23%" }}></td>
          </tr>
        </tbody>
      </table>

      {/* Personal Information */}
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

      {/* Educational */}
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
              <td>Class 10 Board & Marks</td><td>{data.education.class10}</td>
              <td>Class 12 Board & Marks</td><td>{data.education.class12}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Co-Curricular */}
      <div className="pdf-section-block">
        <div className="pdf-section-header">Co-Curriculars</div>
        <table className="pdf-table">
          <thead>
            <tr>
              <th style={{ width: "5%" }}>#</th>
              <th style={{ width: "40%" }}>Name of Activity</th>
              <th style={{ width: "25%" }}>Duration</th>
              <th style={{ width: "30%" }}>Achievement</th>
            </tr>
          </thead>
          <tbody>
            {coCurr.rows.map((row, i) => (
              <tr key={i}>
                <td>{coCurr.empty ? "—" : i + 1}</td>
                <td>{row.name}</td>
                <td>{row.duration}</td>
                <td>{row.achievement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pdf-section-block">
  <div className="pdf-section-header">Projects / Internships</div>
  <table className="pdf-table">
    <thead>
      <tr>
        <th style={{ width: "5%" }}>#</th>
        <th style={{ width: "45%" }}>Description</th>
        <th style={{ width: "20%" }}>Duration</th>
        <th style={{ width: "30%" }}>Achievement</th>
      </tr>
    </thead>
    <tbody>
      {projects.rows.map((row, i) => (
        <tr key={i}>
          <td>{projects.empty ? "—" : i + 1}</td>
          <td>{row.description}</td>
          <td>{row.duration}</td>
          <td>{row.achievement}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
<div className="pdf-section-block">
  <div className="pdf-section-header">Societies</div>
  <table className="pdf-table">
    <thead>
      <tr>
        <th style={{ width: "5%" }}>#</th>
        <th style={{ width: "35%" }}>Society</th>
        <th style={{ width: "25%" }}>Role</th>
        <th style={{ width: "35%" }}>Achievement</th>
      </tr>
    </thead>
    <tbody>
      {societies.rows.map((row, i) => (
        <tr key={i}>
          <td>{societies.empty ? "—" : i + 1}</td>
          <td>{row.name}</td>
          <td>{row.role}</td>
          <td>{row.achievement}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
<div className="pdf-section-block">
  <div className="pdf-section-header">Sports</div>
  <table className="pdf-table">
    <thead>
      <tr>
        <th style={{ width: "5%" }}>#</th>
        <th style={{ width: "40%" }}>Sport</th>
        <th style={{ width: "25%" }}>Duration</th>
        <th style={{ width: "30%" }}>Achievement</th>
      </tr>
    </thead>
    <tbody>
      {sports.rows.map((row, i) => (
        <tr key={i}>
          <td>{sports.empty ? "—" : i + 1}</td>
          <td>{row.name}</td>
          <td>{row.duration}</td>
          <td>{row.achievement}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {/* Declaration */}
      <div className="pdf-declaration">
        <strong>Declaration:</strong> I hereby declare that the information is correct.
      </div>

    </div>
  );
});

export default PDFTemplate;