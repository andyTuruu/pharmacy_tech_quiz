import { useState } from "react";

function CustomQuestionsAccordion({
  customNum,
  setCustomNum,
  setCustomActive,
}) {
  const [open, setOpen] = useState(false);

  const toggleAccordion = () => {
    const newState = !open;
    setOpen(newState);
    setCustomActive(newState);
  };

  return (
    <div className="accordion">
      {open && (
        <div className="content-box">
          <label htmlFor="customRange">Number of questions: {customNum}</label>
          <input
            id="customRange"
            type="range"
            min={5}
            max={50}
            value={customNum}
            onChange={(e) => setCustomNum(Number(e.target.value))}
          />
        </div>
      )}
      <div className={`item ${open ? "open" : ""}`} onClick={toggleAccordion}>
        <p className="title">Custom number of questions?</p>
        <p className="icon">{open ? "-" : "+"}</p>
      </div>
    </div>
  );
}

export default CustomQuestionsAccordion;
