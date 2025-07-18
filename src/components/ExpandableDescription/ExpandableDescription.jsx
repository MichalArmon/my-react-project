import { useState } from "react";

export default function ExpandableDescription({ text, wordLimit = 10 }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const words = text.trim().split(" ");
  const shouldTruncate = words.length > wordLimit;

  const displayedText =
    isExpanded || !shouldTruncate
      ? text
      : words.slice(0, wordLimit).join(" ") + "...";

  return (
    <div>
      <p style={{ marginBottom: "8px" }}>{displayedText}</p>
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          style={{
            background: "none",
            border: "none",
            color: "#007bff",
            cursor: "pointer",
            padding: 0,
            fontSize: "14px",
          }}
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
}
