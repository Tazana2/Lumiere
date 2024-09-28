import React, { useState, useEffect } from "react"
import "../styles/FindThePair.css"

function FindThePair({ item }) {
    const [selectedWord, setSelectedWord] = useState(null)
    const [selectedEmoji, setSelectedEmoji] = useState(null)
    const [matches, setMatches] = useState([])
    const [shuffledWords, setShuffledWords] = useState([])
    const [shuffledEmojis, setShuffledEmojis] = useState([])

    const shuffleArray = (array) => {
        return array
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
    }

    const isCompleted = matches.length === item.pairs.length

    useEffect(() => {
        const words = item.pairs.map((pair) => pair.word)
        const emojis = item.pairs.map((pair) => pair.emoji)
        setShuffledWords(shuffleArray(words))
        setShuffledEmojis(shuffleArray(emojis))
    }, [item])

    useEffect(() => {
        if (selectedWord !== null && selectedEmoji !== null) {
            const word = shuffledWords[selectedWord]
            const emoji = shuffledEmojis[selectedEmoji]

            const originalPair = item.pairs.find(
                (pair) => pair.word === word && pair.emoji === emoji
            )

            if (originalPair) {
                setMatches([...matches, word])  // Empareja la palabra si es correcta
            }

            setSelectedWord(null)
            setSelectedEmoji(null)
        }
    }, [selectedWord, selectedEmoji])  // Este efecto se activa cuando se seleccionan ambos

    const isEmojiDisabled = (emoji) => {
        const originalPair = item.pairs.find((pair) => pair.emoji === emoji)
        return matches.includes(originalPair.word) // Deshabilitar si la palabra ya fue emparejada
    }

    if (isCompleted) {
        // Aquí se puede agregar una animación o mensaje de actividad completada
    }

    return (
        <div className="pair-exercises">
            <h2 className="title">{item.title}</h2>
            <p>{item.description}</p>
			<div className="matching-container">
				<div className="word-container">
					<h4>Palabras</h4>
					{shuffledWords.map((word, index) => (
						<button
							key={index}
							onClick={() => setSelectedWord(index)}
							disabled={matches.includes(word)}
							className={`word-button ${selectedWord === index ? "selected" : ""} ${matches.includes(word) ? "matched" : ""}`}
						>
							{word}
						</button>
					))}
				</div>
				<div className="emoji-container">
					<h4>Emojis</h4>
					{shuffledEmojis.map((emoji, index) => (
						<button
							key={index}
							onClick={() => setSelectedEmoji(index)}
							disabled={isEmojiDisabled(emoji)}
							className={`emoji-button ${selectedEmoji === index ? "selected" : ""} ${isEmojiDisabled(emoji) ? "matched" : ""}`}
						>
							{emoji}
						</button>
					))}
				</div>
			</div>
            <div>
                {isCompleted && <p>{item.feedback.completed}</p>}
            </div>
			<button 
				className="button continuar" 
				disabled={!isCompleted}
				onClick={
                    // Aquí se puede agregar una función para marcar la actividad como completada y continuar a la siguiente
					console.log("Actividad completada")
				}
			>
				CONTINUAR
			</button>
        </div>
    )
}

export default FindThePair