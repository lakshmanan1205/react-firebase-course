import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import { db, auth, storage } from "./config/firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const moviesCollectionRef = collection(db, "movies");
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(null);
  const [isReceived, setIsReceived] = useState(false);
  const [editableDate, setEditableDate] = useState();
  const [file, setFile] = useState(null);
  async function getMoviesList() {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("movies", filteredData);
      setMovies(filteredData);
    } catch (error) {
      console.error(error);
    }
  }
  async function onSubmitMovie() {
    try {
      const formData = {
        title,
        releasedDate: date,
        isGotAscar: isReceived,
        userId: auth?.currentUser?.uid,
      };
      console.log("sub", auth);
      await addDoc(moviesCollectionRef, formData);
      getMoviesList();
    } catch (error) {
      console.error(error);
    }
  }
  async function updateMovie(id) {
    try {
      const movieDoc = doc(db, "movies", id);
      const formData = {
        releasedDate: editableDate,
      };
      await updateDoc(movieDoc, formData);
      getMoviesList();
    } catch (err) {
      console.log(err);
    }
  }
  async function deleteMovie(id) {
    try {
      console.log(id);
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMoviesList();
    } catch (error) {
      console.error(error);
    }
  }
  async function uploadFile() {
    if (!file) return;
    const filesUploadRef = ref(storage, `projectFiles/${file.name}`);
    try {
      await uploadBytes(filesUploadRef, file);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(function () {
    getMoviesList();
  }, []);
  return (
    <div className="App">
      <Auth />
      <div style={{ marginTop: "16px" }}>
        <input
          placeholder="movie name ..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="released date ..."
          type="numbar"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="checkbox"
          checked={isReceived}
          onChange={(e) => setIsReceived(e.target.checked)}
        />
        <label>Is Oscar Received?</label>
        <button onClick={onSubmitMovie}>submit</button>
      </div>
      <div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={uploadFile}>Upload file</button>
      </div>
      <div>
        {movies.map((movie) => (
          <>
            <h4 style={{ color: movie.isGotAscar ? "green" : "initial" }}>
              {movie.title}
            </h4>
            <p>{movie.releasedDate}</p>
            <input
              type="number"
              value={editableDate}
              onChange={(e) => setEditableDate(e.target.value)}
            />
            <button onClick={() => updateMovie(movie.id)}>Update Date</button>
            <button onClick={() => deleteMovie(movie.id)}>Delete movie</button>
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
