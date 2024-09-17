import React, { useRef, useState, useEffect } from "react";
import "./css/notes.css";

const Notes = ({ delete_note }) => {
  const noteRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 950, y: 200 });
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseUp = () => setIsDragging(false);

    const mouseMove = (event) => {
      if (!isDragging) return;

      const noteElement = noteRef.current;
      const noteRect = noteElement.getBoundingClientRect();

      // Calculate the new position by considering the mouse offset
      const newX = event.clientX - mouseOffset.x;
      const newY = event.clientY - mouseOffset.y;

        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
  
        // Adjust position to keep the note within viewport bounds
        const adjustedX = Math.max(0, Math.min(newX, viewportWidth - noteRect.width));
        const adjustedY = Math.max(0, Math.min(newY, viewportHeight - noteRect.height));

        console.log(adjustedX, adjustedY)
  
        setPosition({ x: adjustedX, y: adjustedY });
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, [isDragging, mouseOffset]);

  const mouseDown = (event) => {
    setIsDragging(true);

    // Calculate mouse offset when dragging starts (relative to the note's top-left corner)
    const rect = noteRef.current.getBoundingClientRect();
    setMouseOffset({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const deleteNote = (e) => {
    e.stopPropagation();
    delete_note();
  };

  return (
    <div
      className="notes-container"
      ref={noteRef}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onMouseDown={mouseDown}
    >
      <div>
        <button onClick={deleteNote}>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABJUlEQVR4nO3YT0sCQRyH8YeuUu0KG/RHUG8efAceetFBJ6noEKUI6iG1wHolxcIYg6wi67Qzs3w/IHga92F09zeCiIiIiMg/6QEPwKXDNRvAHXBLhYbADzAHLhysdwo8W2ueUJEMmJoPfj9yZ/KdeDRrfQNdKpYCY3MBC+DKQUQHT46JsSO+fEYUxSwPjMkjnkKKsGNGVsw1u50BLyFGFMWsdsQEH7GR7Ik534poE7hkK+YmxoiNJjAxF/4BvJr3n0CLyCTAmwnIX+uYdqJ2Ic06fLWSgjtXdD/2dM/tN5pnSHrA0z3Y0aTMvBVsTFpiAg5mfHc9xnuNyaxT4qLkKbFhzv7eTocZMHN41PUWM6zLnw99E+Miwo65BwYO1xQRERER4c8v6Th7MMbV15kAAAAASUVORK5CYII="
            alt="delete"
        />
        </button>
      </div>
      <div>
        <input type="text"/>
      </div>
    </div>
  );
};

export default Notes;
