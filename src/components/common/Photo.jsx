import { useState, memo } from "react";

const Photo = memo(function Photo({ src, name }) {
  const [hasError, setHasError] = useState(!src);

  const initials =
    !name || name === "TBA"
      ? "?"
      : name.split(" ").map((word) => word[0]).slice(0, 2).join("");

  // Strip any leading slashes so "/photos/x.jpg" and "photos/x.jpg" both work,
  // and encode spaces/brackets in file names.
  const clean = src ? src.replace(/^\/+/, "") : "";
  const url = encodeURI(`${import.meta.env.BASE_URL}${clean}`);

  return (
    <div className="photo">
      {hasError ? (
        <span className="ph" role="img" aria-label="Photo coming soon">
          {initials}
        </span>
      ) : (
        <img src={url} alt={name} loading="lazy" onError={() => setHasError(true)} />
      )}
    </div>
  );
});

export default Photo;