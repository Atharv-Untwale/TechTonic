import { useState, useEffect, memo } from "react";

const Photo = memo(function Photo({ src, name, className = "" }) {
  const [hasError, setHasError] = useState(!src);

  useEffect(() => {
    setHasError(!src);
  }, [src]);

  const initials =
    !name || name === "TBA"
      ? "?"
      : name
          .split(" ")
          .filter(Boolean)
          .map((word) => word[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();

  // Strip any leading slashes so "/photos/x.jpg" and "photos/x.jpg" both work,
  // and encode spaces/brackets in file names.
  const clean = src ? src.replace(/^\/+/, "") : "";
  const url = clean ? encodeURI(`${import.meta.env.BASE_URL}${clean}`) : "";

  return (
    <div className={`photo ${className}`}>
      {hasError ? (
        <div className="ph-placeholder">
          <span className="ph" role="img" aria-label="Photo coming soon">
            {initials}
          </span>
          <span className="ph-badge">PHOTO</span>
        </div>
      ) : (
        <img src={url} alt={name} loading="lazy" onError={() => setHasError(true)} />
      )}
    </div>
  );
});

export default Photo;