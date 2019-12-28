import React, { useEffect, useState } from 'react'
import './Main.css'

import logo from '../assets/logo.svg'
import like from '../assets/like.svg'
import dislike from '../assets/dislike.svg'
import api from '../services/api'

export default function Main({ match }) {

    const [users, setUsers] = useState([])

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id
                }
            })

            setUsers(response.data)
        }

        loadUsers()
    }, [match.params.id])

    return (
        <div className='main-container'>
            <img src={logo} alt='Logo do app' />
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        <img src={user.avatar} alt='imagem do dev' />
                        <footer>
                            <strong>{user.name}</strong>
                            <p>{user.bio}</p>
                        </footer>
                        <div className='buttons'>
                            <button type='button'>
                                <img src={dislike} alt='dislike' />
                            </button>

                            <button type='button'>
                                <img src={like} alt='like' />
                            </button>
                        </div>
                    </li>
                ))}

            </ul>
        </div>
    )
}