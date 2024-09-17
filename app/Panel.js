import React, { useState } from "react";
import "./css/panel.css";

const Panel = ({ openNoteEditor, set_shape, setColor, undo_click, clear }) => {
  const [toggle, setToggle] = useState(false);
  const [disabledButton, setDisabledButton] = useState(null);

  const openNote = () => {
    openNoteEditor();
  };

  const set_shape_rect = () => {
    setDisabledButton("rect");
    set_shape("rectangle");
  };

  const set_shape_line = () => {
    setDisabledButton("line");
    set_shape("line");
  };

  const set_shape_circle = () => {
    setDisabledButton("circle");
    set_shape("circle");
  };

  const set_shape_linear = () => {
    setDisabledButton("linear");
    set_shape("linearPath");
  };

  const open_color_palette = () => {
    setToggle(!toggle);
  };

  const set_color = (color) => {
    document.querySelector(".main-color").style.backgroundColor = color;
    // document.querySelector(".color-palette").classList.toggle = "hidden";
    setToggle(false);
    setColor(color);
  };

  const undo = () => {
    undo_click();
  };

  const clear_screen = () => {
    clear();
  };

  return (
    <div className="panel-container">
      <div>
        <button
          className="button"
          onClick={set_shape_rect}
          disabled={disabledButton === "rect"}
        >
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAS0lEQVR4nO3WQQoAIAhE0bn/sZLOZSeQBBOi/gN3woDMQgk/mpL88Fgm2JtmK72YRHCIU1dRrhDlqqJcIcpVRbnue32sIXRkgvGWBcTLnnJ2JY0JAAAAAElFTkSuQmCC" />
        </button>
        <button
          className="button"
          onClick={set_shape_circle}
          disabled={disabledButton === "circle"}
        >
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABgklEQVR4nO2WS04CQRCGv73ElQt1MEYlwl0U1z5OgMDC4EXcifEABsWV4k3wcQoFNzhMMJ38k3RMGHp6BsOCP6lkkqn6q6u6Hg1LLCC2gAbwArwC3xLz3QPqQDFPhwHQBkJgMkMioANsZ3V6BAxEOgLugGOgDKxIzPeJ/o2ka2yqvk6bimCiKHYcbHaBByt6czWpI42AMXDhceiWbKM0kQdWen2c2s4Nxxew4WJwa6U3K7riaru0zFhF4nKns7AnrlCZnIqGTmgqNC90xHmepNSTkmmPvHAmzqckpQ8plXJ0XBbnW5LSUEqFHB0XxGm4p2IwB8erVltNxbuU9nN0XBFnfyGLqz7HdqolKRXV7CMN/KwouQ4Qgxud0GyZrHgU17WL8qZV3WbQ++JSHJ/AuqtR1VqLLU+n8Vo8SGvcsB4CXQ18lzuN0xupWL1wqMaPnz6mQk/VmwVJRS1zD/xY6U0d6V+sAVeOj71Qu9dp8bsiUC8+awoNJX0Nh5pLyyzBf+MXxXuIdNHoq5IAAAAASUVORK5CYII=" />
        </button>
        <button
          className="button"
          onClick={set_shape_line}
          disabled={disabledButton === "line"}
        >
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXUlEQVR4nO3WsQmAQBBE0d/EiP13YiSiJl5gOYpwJTgb6LwGPgwbLMSHDMAOTNXRBlzAUhUVcPToCYyJvinzWinX66TM66TM66TM66TfzPtYe7T1R63MDGzV0cDpBtGfQVbddtyxAAAAAElFTkSuQmCC" />
        </button>
        <button
          className="button"
          onClick={set_shape_linear}
          disabled={disabledButton === "linear"}
        >
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAvUlEQVR4nO2RMQrCMBSGP3BzEDyGu+JSSOoBungrj+LuERwKunkIFZxdhJboC4RiCm1ftnxD+hLK9/LyQyYRFrhJvQFq4A2cgKWG/CFfI/UemAMH4DhFbkRoOrVnAbxSyZFJzijJbecft39KJoOpRezfv9sgzGU0hUh2PfVobM+tJ9/cRAK1kfNBFMD9z/j+vNSQl1keso0EZzQCdVyBKpXc8QFmJJI7mu/6a1Jpy9fSoJFJLpKJGitpkiGkBWNMPS7US1zwAAAAAElFTkSuQmCC" />
        </button>
        <div className="main-color" onClick={open_color_palette}>
          {toggle && (
            <div className="color-palette">
              <div className="color-1" onClick={() => set_color("black")}></div>
              <div className="color-2" onClick={() => set_color("red")}></div>
              <div
                className="color-3"
                onClick={() => set_color("rgb(3, 197, 3)")}
              ></div>
            </div>
          )}
        </div>
      </div>
      <div>
        <button className="button" onClick={undo}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABtElEQVR4nO2ZzytEURSAP/kVzzQr0SwQVpOyUsrGhuIPYKH8KNlLWVBiIQtLu1nMSsrCxkIWSoxslBI7ZUQpmqyU0jC69RbT6b0J3TfmvN5Xd/Xq3Pt1z7nvdC9ERFQkTcAOkAPSQA1KJTJAoWiMEwKJAjBBCCROgXqU4ADHHhJnQAwlOJFEheBEO1EhOGHYiZjPEfuX8Qo8AZfAPrABjAEtQUvEgXNLEqXGlyu3EJRUvEwixeMd2AJaKzm1fpuGM+VqRTLut5/QACSAJDDgLjIFXAOfJYRStjtpGzJ+mLqYB+59ZHY1yRhqgSXgw2OOTSwTtIyhD8h6nGzDKJTpBl5E/FugDoUy/UBexJ8mAErJNFqaIy1iXxAQfjKLluK3eRR/F2WUWbMY/0TEniNAjMyBO9GV5RZjWYiYdAsc09JUWY455FGDKukVIncoJSFEnlFKc1hEOsKSWkkhcoNSBsNyak0KkW2UsiJE1lHKnhCZQilZIdKDQtqFxBtQjUJmhcghSjkSIuY2UmWPlRcXEJ0oZNXjbVIlj0LE1ItKHookcu47jUpG3V0x/5GR/15MRAQh4Rul1lSa9gHCJgAAAABJRU5ErkJggg==" />
        </button>
        <button className="button" onClick={clear_screen}>
          Clear
        </button>
      </div>
      <div>
        <button className="button note-btn" onClick={openNote}>
          Note
        </button>
      </div>
    </div>
  );
};

export default Panel;
