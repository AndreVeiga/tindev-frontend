import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { Link } from 'react-router-dom'
import './Main.css'
import logo from '../assets/logo.svg'
import like from '../assets/like.svg'
import dislike from '../assets/dislike.svg'
import api from '../services/api'
import itsamatch from '../assets/itsamatch.png'

export default function Main({ match }) {

    const [users, setUsers] = useState([])
    const [matchDev, setMatchDev] = useState(false)

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: { user: match.params.id }
            })
            setUsers(response.data)
        }
        loadUsers()
    }, [match.params.id])

    useEffect(() => {
        const socket = io('https://tindev-backend-veiga.herokuapp.com', {
            query: { user: match.params.id }
        })

        socket.on('match', dev => {
            setMatchDev(dev)
        })

    }, [match.params.id])

    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id }
        })

        setUsers(users.filter(user => user._id !== id))
    }

    async function handleDislike(id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id }
        })

        setUsers(users.filter(user => user._id !== id))
    }

    function renderLinesWithDevs() {
        return (
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        <img src={user.avatar} alt={user.name} />
                        <footer>
                            <strong>{user.name}</strong>
                            <p>{user.bio}</p>
                        </footer>
                        <div className='buttons'>
                            <button type='button' onClick={_ => handleDislike(user._id)}>
                                <img src={dislike} alt='dislike' />
                            </button>

                            <button type='button' onClick={_ => handleLike(user._id)}>
                                <img src={like} alt='like' />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        )
    }

    function renderLinesEmpty() {
        return (
            <div className='empty'>
                Acabou :(
        </div>
        )
    }

    function renderMatch() {
        return (
            <div className='match-container'>
                <img src={itsamatch} alt='Its a macth' />
                <img className='avatar' src={matchDev.avatar} alt={matchDev.name} />
                <strong>{matchDev.name}</strong>
                <p>{matchDev.bio}</p>
                <button
                    type='button'
                    onClick={_ => setMatchDev(null)}>
                    Fechar
                </button>
            </div>
        )
    }

    return (
        <div className='main-container'>
            <Link to='/'>
                <img src={logo} alt='Logo do app' />
            </Link>
            {users.length ? renderLinesWithDevs() : renderLinesEmpty()}
            {matchDev && renderMatch()}
        </div>
    )
}