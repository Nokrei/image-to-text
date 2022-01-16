import { useState } from "react";
import Tesseract from "tesseract.js";
import "./App.css";

function App() {
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");
  const [confidence, setConfidence] = useState("");

  const handleChange = (event) => {
    setImagePath(URL.createObjectURL(event.target.files[0]));
  };

  const handleClick = () => {
    setText("Converting...");
    Tesseract.recognize(imagePath, "eng", {
      logger: (m) => console.log(m),
    })
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        // Get Confidence score
        setConfidence(result.data.confidence);

        setText(result.data.text);
        console.log(result.data);
      });
  };

  return (
    <div className="App">
      <main className="App-main">
        <h3>Extract image from text</h3>
        {imagePath ? (
          <img src={imagePath} className="App-image" alt="logo" />
        ) : (
          <input type="file" onChange={handleChange} />
        )}

        {text && <h3>Extracted text</h3>}
        <div className="text-box">
          <p> {text} </p>
          {confidence && <p>Extraction accuracy: {confidence}%</p>}
        </div>

        {imagePath && !text ? (
          <button onClick={handleClick} style={{ height: 50 }}>
            {" "}
            convert to text
          </button>
        ) : null}
      </main>
    </div>
  );
}

export default App;
