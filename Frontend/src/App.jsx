import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"
import { MdSunny } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";

function App() {
  const [input, setInput] = useState("");
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);
const [darkMode,setDarkMode] = useState(true) ;

  const API = "http://localhost:5000/notes";

  // GET NOTES
  const getNotes = async () => {
    const res = await axios.get(API);
    setNotes(res.data);
  };

  useEffect(() => {
    getNotes();
  }, []);

  // ADD OR UPDATE
  const addOrUpdateNote = async () => {
    if (!input) return;

    if (editId) {
      // UPDATE (PUT)
      await axios.put(`${API}/${editId}`, {
        title: input,
      });

      setEditId(null);
    } else {
      // ADD (POST)
      await axios.post(API, {
        title: input,
      });
    }

    setInput("");
    getNotes();
  };

  // DELETE
  const deleteNote = async (id) => {
    await axios.delete(`${API}/${id}`);
    getNotes();
  };

  // EDIT CLICK
  const editNote = (note) => {
    setInput(note.title);
    setEditId(note.id);
  };

  return (
    <div className={darkMode ? "Dark container" : "Light container"}>
      <h1>Notebook App</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter note"
      />

      <button  onClick={addOrUpdateNote}>
        {editId ? "Update Note" : "Add Note"}
      </button>
       <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
  {darkMode ? (
    <>
      <MdSunny /> Light Mode
    </>
  ) : (
    <>
      <BsFillMoonStarsFill /> Dark Mode
    </>
  )}
</button>

      <div className="notes-container">
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            <h3>{note.title}</h3>

            <button className="edit-btn" onClick={() => editNote(note)}>
              Edit
            </button>

            <button className="delete-btn" onClick={() => deleteNote(note.id)}>
              Delete
            </button>

            {/* toggle button */}

          
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;