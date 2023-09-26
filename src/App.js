import './App.css';
import React, {useEffect, useState} from 'react';

function Navbar() {
  return (
    <nav>
      <img src="https://freepngimg.com/thumb/meme/98035-shiba-inu-doge-meme-free-clipart-hq.png" alt='meme logo' />
      <h2 className='nav--heading'>Meme Generator</h2>
      <h4 className='nav--corner'>Home</h4>
    </nav>
  )
}

function MemeComponent() {
const [meme, setMeme] = useState({
  topText: "",
  bottomText: "",
  randomImage: "https://i.imgflip.com/30b1gx.jpg"
})

  const [allMemes, setAllMemes] = useState([])

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllMemes(data.data.memes))
  }, [])

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length)
    const url = allMemes[randomNumber].url
    setMeme(prevMeme => ({
      ...prevMeme,
      randomImage: url
    }))
  }

  function handleChange(event) {
    const {name, value} = event.target
    setMeme(prevMeme => ({
      ...prevMeme,
      [name]: value
    }))
  }

  return (
    <main>
      <div className='form'>
        <input type="text" className='form--input' placeholder='Top text' name="topText" value={meme.topText} onChange={handleChange}/>
        <input type="text" className='form--input' placeholder='Bottom text' name="bottomText" value={meme.bottomText} onChange={handleChange}/>
        <button className='form--button' onClick={getMemeImage}>Get a new meme image</button>
      </div>
      <div className='meme'>
        <img src={meme.randomImage} alt="meme" className='meme--image'/>
        <h2 className='meme--text top'>{meme.topText}</h2>
        <h2 className='meme--text bottom'>{meme.bottomText}</h2>
      </div>
    </main>
  )
}

function App() {
  return (
    <div>
      <Navbar />
      <MemeComponent />
    </div>
  );
}

export default App;
