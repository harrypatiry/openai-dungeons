import {Html, Head} from "next/document";
import { useState } from "react";
import styles from "./index.module.css";

const prefix = '/openai-dnd'

export default function App() {
  const [names, setNames] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [resultList, setResultList] = useState([]);
  const [showList, setShowList] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: nameInput }),
    });
    const data = await response.json();
    setResultList([...resultList,data.result]);
    setNameInput("");
    setNames([...names, nameInput])
  }

  const toggleList = () => {
    setShowList(true)
  }

  return (
    <Html lang="en">
      <div>
        <Head>
          <title>OpenAI RPG</title>
        </Head>

        <main className={styles.main}>
          <h3>Dungeons and Dragons Generator</h3>
          <form onSubmit={onSubmit}>
          <label for="Name">Name</label>
            <input
              type="text"
              name="nameInput"
              placeholder="Enter your name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <input type="submit" value="Generate Story" onClick={toggleList}/>
          </form>
          <h4>Stories</h4>
          <div>
            <ul className={styles.listContainer} style={{display: showList ? 'block' : 'none' }}>
              {names.reverse().map((i, index) => (
                  <li className={styles.list} key={index}>Name: {i}<br></br>Story: {resultList[index]}</li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </Html>
  );
}