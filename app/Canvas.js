import React, { useLayoutEffect, useRef, useState } from "react";
import rough from "roughjs";
import Panel from "./Panel";
import "./css/canvas.css";
import Notes from "./Notes";

const generator = rough.generator();

const createElement = (x1, y1, x2, y2, elementType, path, color) => {
  let roughElement = null;
  if (elementType === "line") {
    roughElement = generator.line(x1, y1 , x2, y2 , color);
  } else if (elementType === "circle") {
    roughElement = generator.circle(x1, y1 , (x2 - x1) * 2, color);
  } else if (elementType === "rectangle") {
    roughElement = generator.rectangle(x1, y1 , x2 - x1, y2 - y1, color);
  } else {
    roughElement = generator.linearPath(path, color);
  }

  return { x1, y1, x2, y2, roughElement };
};

// const useHistory = (initialState) => {
//   const [index, setIndex] = useState(0);
//   const [history, setHistory] = useState([initialState]);

//   const setState = (action, overwrite = false) => {
//     const newState = typeof action === 'function' ? action(history[index]) : action;
//     if (overwrite) {
//       const historyCopy = [...history];
//       historyCopy[index] = newState;
//       setHistory(historyCopy);
//     } else {
//       setHistory([...history, newState]);
//       setIndex(prev => prev + 1);
//     }
//   };

//   const undo = () => index > 0 && setIndex(prev => prev - 1)

//   return [history[index], setState, undo];
// };

const useHistory = (initialState) => {
  const [history, setHistory] = useState([initialState]);
  const [index, setIndex] = useState(0);

  const setState = (action, overwrite = false) => {
    const newState = typeof action === 'function' ? action(history[index]) : action;
    
    if (overwrite) {
      const historyCopy = [...history];
      historyCopy[index] = newState;
      setHistory(historyCopy);
    } else {
      const updatedHistory = [...history.slice(0, index + 1), newState];
      setHistory(updatedHistory);
      setIndex(updatedHistory.length - 1);
    }
  };

  const undo = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  return [history[index], setState, undo];
};



const Canvas = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [elements, setElement, undo] = useHistory([]);
  const [elementType, setElementType] = useState("");
  const [linearPath, setLinearpath] = useState([]);
  const [notes, setNote] = useState([]);
  const [notedata, setNoteData] = useState({});
  const [isNoteVisble, setNoteVisible] = useState(false)
  const [color, setColor] = useState({ stroke: "black" });

  let height = window.innerHeight
  let width = window.innerWidth

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    const roughCanvas = rough.canvas(canvas);

    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));

    const handleMouseDown = (event) => {
      if (elementType === "") return;
      setDrawing(true);

      const x = event.clientX;
      const y = event.clientY;

      const element = createElement(x, y, x, y, elementType, linearPath, color);
      setElement((prevstate) => [...prevstate, element]);
    };

    const handleMouseMove = (event) => {
      if (!drawing || elementType === "") return;

      const { clientX, clientY } = event;
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];

      if (elementType === "linearPath")
        setLinearpath((prev) => [...prev, [clientX, clientY]]);

      const updateElement = createElement(
        x1,
        y1,
        clientX,
        clientY,
        elementType,
        linearPath,
        color
      );

      const elementCopy = [...elements];
      elementCopy[index] = updateElement;
      setElement(elementCopy, true);
    };

    const handleMouseUp = () => {
      if (!drawing) return;

      setLinearpath([]);

      setDrawing(false);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [drawing, elements, elementType]);

  // const addNotes = (text) => {
  //   if (notecount >= 1) return;
  //   if (text.trim() === "") return;

  //   const newNote = {
  //     id: notecount,
  //     text: text,
  //     xPos: Math.floor(Math.random() * 400) + 50,
  //     yPos: Math.floor(Math.random() * 200) + 50,
  //   };

  //   console.log(newNote)

  //   setNote([...notes, newNote]);
  //   setNoteCount((prev) => prev + 1);

  // };

  const openNote = () => {
    setNoteVisible(true)
  }

  const handleDrag = (id, xPos, yPos) => {
    setNote((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, xPos, yPos } : note))
    );
  };

  const set_shape = (type) => {
    setElementType(type);
  };

  const set_color = (color) => {
    setColor({ stroke: `${color}` });
  };

  const deleteNote = (id) => {
   setNoteVisible(false)
  }

  const clear_screen = () => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    setElement([])
  };

  

  return (
    <div className="container">
      <Panel
        openNoteEditor={openNote}
        set_shape={set_shape}
        setColor={set_color}
        clear={clear_screen} 
        undo_click={undo}
      />
      {/* <div>
        {notes.map((item, index) => (
          <Notes
            id={item.id}
            message={item.text}
            xPos={item.xPos}
            yPos={item.yPos}
            onDrag={handleDrag}
            delete_note={deleteNote}
            key={index}
          />
        ))}
      </div> */}

      {isNoteVisble && <Notes delete_note={deleteNote}/>}

      <canvas id="canvas" ref={canvasRef} height={height} width={width}></canvas>
    </div>
  );
};

export default Canvas;
