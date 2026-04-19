/**
 * EducationForm  (Step 1)
 *
 * Props:
 *   data         — full form data object
 *   setEducation — (key, val) education sub-object setter
 */
export default function EducationForm({ data, setEducation }) {
  const fields = [
    { key: "course",        label: "Course" },
    { key: "yearOfJoining", label: "Year of Joining" },
    { key: "cgpa",          label: "CGPA" },
    { key: "backlogs",      label: "No. of Backlogs" },
    { key: "class10",       label: "Class 10 Board & Marks" },
    { key: "class12",       label: "Class 12 Board & Marks" },
  ];

  return (
    <div className="card">
      <div className="section-title">Educational Information</div>
      <div className="field-grid">
        {fields.map(({ key, label }) => (
          <div className="field" key={key}>
            <label>{label}</label>
            <input
              value={data.education[key]}
              onChange={(e) => setEducation(key, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
