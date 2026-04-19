/**
 * Header
 * Glyptika logo badge + page title + subtitle.
 * Purely presentational — no props needed.
 */
export default function Header() {
  return (
    <div className="header">
      <div className="logo-badge">
        <div className="logo-g">G</div>
        <span className="logo-text">Glyptika Studios</span>
      </div>
      <h1 className="page-title">
        Personal Information <span>Questionnaire</span>
      </h1>
      <p className="page-sub">
        Fill in your details to generate your PIQ document
      </p>
    </div>
  );
}
