import React, { useRef,useState,useEffect } from "react";
import "./css/notes.css";

const Notes = ({ id, message, xPos, yPos, onDrag, delete_note }) => {
  const noteRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: xPos, y: yPos });

  useEffect(() => {
    const mouseUp = () => setIsDragging(false);

    const mouseMove = (event) => {
      if (!isDragging) return;

      const newX = event.clientX;
      const newY = event.clientY;
      setPosition({ x: newX, y: newY });
      onDrag(id, newX, newY);
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
    };

    
  }, [isDragging, position.x, position.y]);

  const mouseDown = () => setIsDragging(true);

  const deleteNote = (e) => {
    e.stopPropagation()
    delete_note(id)
  }

  return (
    <div
      className="notes-container"
      ref={noteRef}
      style={{ left: position.x, top: position.y }}
      onMouseDown={mouseDown}
    >
      <button onClick={deleteNote}>
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABJUlEQVR4nO3YT0sCQRyH8YeuUu0KG/RHUG8efAceetFBJ6noEKUI6iG1wHolxcIYg6wi67Qzs3w/IHga92F09zeCiIiIiMg/6QEPwKXDNRvAHXBLhYbADzAHLhysdwo8W2ueUJEMmJoPfj9yZ/KdeDRrfQNdKpYCY3MBC+DKQUQHT46JsSO+fEYUxSwPjMkjnkKKsGNGVsw1u50BLyFGFMWsdsQEH7GR7Ik534poE7hkK+YmxoiNJjAxF/4BvJr3n0CLyCTAmwnIX+uYdqJ2Ic06fLWSgjtXdD/2dM/tN5pnSHrA0z3Y0aTMvBVsTFpiAg5mfHc9xnuNyaxT4qLkKbFhzv7eTocZMHN41PUWM6zLnw99E+Miwo65BwYO1xQRERER4c8v6Th7MMbV15kAAAAASUVORK5CYII="/>
      </button>
      {message}
    </div>
  );
};

export default Notes;
