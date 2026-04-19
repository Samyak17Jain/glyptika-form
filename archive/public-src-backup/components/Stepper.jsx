/**
 * Stepper
 * Visual step progress indicator.
 *
 * Props:
 *   steps   — string[]  step labels
 *   current — number    zero-based active index
 */
export default function Stepper({ steps, current }) {
  return (
    <div className="stepper">
      {steps.map((label, i) => (
        <div className="step-item" key={i}>
          <div>
            <div className={`step-circle ${i < current ? "done" : i === current ? "active" : ""}`}>
              {i < current ? "✓" : i + 1}
            </div>
            <div className="step-label">{label}</div>
          </div>
          {i < steps.length - 1 && (
            <div className={`step-line ${i < current ? "done" : ""}`} />
          )}
        </div>
      ))}
    </div>
  );
}
