import { useEffect, useState } from 'react'
import './App.css'

interface VoteData {
  avatar: number
  mario: number
}

// Determine API URL based on environment
const getAPIUrl = () => {
  // In production (Railway), use relative URL so it works on any domain
  if (import.meta.env.PROD) {
    return '/api'
  }
  // In development, use localhost
  return 'http://localhost:3001/api'
}

const API_URL = getAPIUrl()

function App() {
  const [votes, setVotes] = useState<VoteData>({ avatar: 0, mario: 0 })
  const [isVoting, setIsVoting] = useState(false)

  // Fetch votes from server
  const fetchVotes = async () => {
    try {
      const response = await fetch(`${API_URL}/votes`)
      if (response.ok) {
        const data = await response.json()
        setVotes(data)
      }
    } catch (error) {
      console.error('Failed to fetch votes:', error)
    }
  }

  // Poll for vote updates every 1 second
  useEffect(() => {
    fetchVotes()
    const interval = setInterval(fetchVotes, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleVote = async (movie: 'avatar' | 'mario') => {
    setIsVoting(true)
    try {
      const response = await fetch(`${API_URL}/votes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movie }),
      })
      if (response.ok) {
        const data = await response.json()
        setVotes(data)
      }
    } catch (error) {
      console.error('Failed to submit vote:', error)
    } finally {
      setIsVoting(false)
    }
  }

  const totalVotes = votes.avatar + votes.mario
  const avatarPercentage = totalVotes > 0 ? (votes.avatar / totalVotes) * 100 : 0
  const marioPercentage = totalVotes > 0 ? (votes.mario / totalVotes) * 100 : 0
  const isAvatarLeading = votes.avatar > votes.mario
  const isMarioLeading = votes.mario > votes.avatar

  return (
    <div className="app-container">
      <div className="content">
        <h1 className="title">God jul önskar Philip och Emelie</h1>
        
        <p className="subtitle">
          I julklapp får ni en magisk bioupplevelse. Rösta på den som ni vill se allra mest.
        </p>

        <div className="movies-container">
          <div className={`movie-card ${isAvatarLeading ? 'leading' : ''}`}>
            <img 
              src="https://m.media-amazon.com/images/M/MV5BZDYxY2I1OGMtN2Y4MS00ZmU1LTgyNDAtODA0MzAyYjI0N2Y2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
              alt="Avatar: Fire and Ash"
              className="movie-poster avatar-poster"
            />
            <p className="release-date">Premiär: 17 december 2025</p>
            
            <div className="voting-section">
              <div className="vote-count">{votes.avatar} röster</div>
              <button 
                className="vote-button"
                onClick={() => handleVote('avatar')}
                disabled={isVoting}
              >
                {isVoting ? 'Röstar...' : 'Rösta på Avatar'}
              </button>
              {totalVotes > 0 && (
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${avatarPercentage}%` }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className={`movie-card ${isMarioLeading ? 'leading' : ''}`}>
            <img 
              src="https://m.media-amazon.com/images/M/MV5BNmI4YWM2MzktYjNjNy00YmM1LThhNmItOWM1ODkzMDYyZTk0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
              alt="Super Mario Galaxy: Filmen"
              className="movie-poster mario-poster"
            />
            <p className="release-date">Premiär: 3 april 2026</p>
            
            <div className="voting-section">
              <div className="vote-count">{votes.mario} röster</div>
              <button 
                className="vote-button"
                onClick={() => handleVote('mario')}
                disabled={isVoting}
              >
                {isVoting ? 'Röstar...' : 'Rösta på Mario'}
              </button>
              {totalVotes > 0 && (
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${marioPercentage}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {totalVotes > 0 && (
          <div className="total-votes">
            Totalt {totalVotes} röst{totalVotes !== 1 ? 'er' : ''}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
