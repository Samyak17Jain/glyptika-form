/**
 * DynSection  (DynamicSection)
 * Reusable add/remove row section for co-curriculars,
 * societies, projects, and sports.
 *
 * Props:
 *   title    — string        section heading
 *   items    — object[]      current rows
 *   fields   — FieldDef[]    { key, label, textarea? }
 *   onChange — (i, key, val) update a cell value
 *   onAdd    — ()            append empty row
 *   onRemove — (i)           remove row at index i
 */
export default function DynSection({ title, items, fields, onChange, onAdd, onRemove }) {
  return (
    <div>
      <div className="section-title">{title}</div>

      {items.map((item, i) => (
        <div className="dyn-row dyn-row-3" key={i}>
          <span className="row-num">{i + 1}</span>

          {i > 0 && (
            <button className="btn-remove" onClick={() => onRemove(i)}>
              ✕ Remove
            </button>
          )}

          {fields.map((f) => (
            <div className="field" key={f.key}>
              <label>{f.label}</label>
              {f.textarea ? (
                <textarea
                  value={item[f.key]}
                  placeholder={f.placeholder || ""}
                  onChange={(e) => onChange(i, f.key, e.target.value)}
                  rows={2}
                />
              ) : (
                <input
                  value={item[f.key]}
                  placeholder={f.placeholder || ""}
                  onChange={(e) => onChange(i, f.key, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      ))}

      <button className="btn-add" onClick={onAdd}>+ Add Entry</button>
    </div>
  );
}
