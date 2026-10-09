import { useState, memo } from "react";

const Photo = memo(function Photo({ src, name }) {
  const [hasError, setHasError] = useState(!src);
  const initials = !name || name === "TBA"
    ? "?"
    : name.split(" ").map((word) => word[0]).slice(0, 2).join("");

  return (
    <div className="photo">
      {hasError ? (
        <span className="ph" role="img" aria-label="Photo coming soon">
          {initials}
        </span>
      ) : (
        <img
          src={`${import.meta.env.BASE_URL}${src}`}
          alt={name}
          loading="lazy"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
});

export default Photo;
