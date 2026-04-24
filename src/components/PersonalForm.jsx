import { useRef } from "react";

export default function PersonalForm({ data, errors, setField, setPersonal, handlePhoto, removePhoto }) {
  const fileRef = useRef(null);
  const errorClass = (field) => (errors[field] ? "error" : "");

  return (
    <div className="card">
      <div className="section-title">Personal Information</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "start" }}>
        <div>
          <div className="field-grid" style={{ marginBottom: 18 }}>
            <div className="field">
              <label>Full Name *</label>
              <input className={errorClass("name")} value={data.personal.name} onChange={(e)=>setPersonal("name",e.target.value)} placeholder="Your full name"/>
              {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>

            <div className="field">
              <label>Thapar Roll No *</label>
              <input className={errorClass("rollNo")} value={data.personal.rollNo} onChange={(e)=>setPersonal("rollNo",e.target.value)} placeholder="e.g. 102117XXX"/>
              {errors.rollNo && <span className="error-msg">{errors.rollNo}</span>}
            </div>

            <div className="field">
              <label>Personal Email *</label>
              <input className={errorClass("email")} type="email" value={data.personal.email} onChange={(e)=>setPersonal("email",e.target.value)} placeholder="you@gmail.com"/>
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            <div className="field">
              <label>Thapar Email ID *</label>
              <input className={errorClass("thaparEmail")} type="email" value={data.personal.thaparEmail} onChange={(e)=>setPersonal("thaparEmail",e.target.value)} placeholder="you@thapar.edu"/>
              {errors.thaparEmail && <span className="error-msg">{errors.thaparEmail}</span>}
            </div>

            <div className="field">
              <label>Date of Birth *</label>
              <input className={errorClass("dob")} type="date" value={data.personal.dob} onChange={(e)=>setPersonal("dob",e.target.value)}/>
              {errors.dob && <span className="error-msg">{errors.dob}</span>}
            </div>

            <div className="field">
              <label>Batch Number *</label>
              <input className={errorClass("batchNumber")} value={data.batchNumber} onChange={(e)=>setField("batchNumber",e.target.value)} placeholder="e.g. 2025-A"/>
              {errors.batchNumber && <span className="error-msg">{errors.batchNumber}</span>}
            </div>
          </div>

          <div className="field" style={{ marginBottom: 18 }}>
            <label>Permanent Residence *</label>
            <input className={errorClass("address")} value={data.personal.address} onChange={(e)=>setPersonal("address",e.target.value)} placeholder="City, State"/>
            {errors.address && <span className="error-msg">{errors.address}</span>}
          </div>

          <div className="field-grid" style={{ marginBottom: 18 }}>
            <div className="field">
              <label>Parent's Name *</label>
              <input className={errorClass("parentName")} value={data.personal.parentName} onChange={(e)=>setPersonal("parentName",e.target.value)}/>
              {errors.parentName && <span className="error-msg">{errors.parentName}</span>}
            </div>

            <div className="field">
              <label>Parent's Occupation *</label>
              <input className={errorClass("parentOccupation")} value={data.personal.parentOccupation} onChange={(e)=>setPersonal("parentOccupation",e.target.value)}/>
              {errors.parentOccupation && <span className="error-msg">{errors.parentOccupation}</span>}
            </div>
          </div>

          {[
            { key: "primaryDept", label: "Choice of Primary Department *" },
            { key: "secondaryDept", label: "Choice of Secondary Department *" },
            { key: "tertiaryDept", label: "Choice of Tertiary Department *" },
          ].map(({ key, label }) => (
            <div className="field" style={{ marginBottom: 18 }} key={key}>
              <label>{label}</label>
              <input className={errorClass(key)} value={data.personal[key]} onChange={(e)=>setPersonal(key,e.target.value)}/>
              {errors[key] && <span className="error-msg">{errors[key]}</span>}
            </div>
          ))}

          <div className="field-grid">
            <div className="field">
              <label>Interests *</label>
              <textarea className={errorClass("interests")} value={data.interests} onChange={(e)=>setField("interests",e.target.value)} rows={3}/>
              {errors.interests && <span className="error-msg">{errors.interests}</span>}
            </div>

            <div className="field">
              <label>Hobbies *</label>
              <textarea className={errorClass("hobbies")} value={data.hobbies} onChange={(e)=>setField("hobbies",e.target.value)} rows={3}/>
              {errors.hobbies && <span className="error-msg">{errors.hobbies}</span>}
            </div>
          </div>
        </div>

        <div style={{ paddingTop: 22, minWidth: 120 }}>
          <label style={{ display: "block", marginBottom: 8 }}>Photo *</label>
          <div className={`photo-zone ${errors.photo ? "error" : ""}`} onClick={()=>fileRef.current.click()}>
            {data.photo ? (
              <img src={data.photo} alt="preview" className="photo-preview" />
            ) : (
              <>
                <div style={{ fontSize: 28, opacity: .35 }}>🖼</div>
                <div className="photo-hint">Click to upload<br/>JPG / PNG</div>
              </>
            )}
          </div>

          <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={(e)=>handlePhoto(e.target.files[0])}/>

          {errors.photo && <span className="error-msg" style={{display:'block',marginTop:8}}>{errors.photo}</span>}

          {data.photo && (
            <button onClick={removePhoto} style={{marginTop:8,fontSize:11,background:"transparent",border:"none",color:"var(--muted)",cursor:"pointer"}}>
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}