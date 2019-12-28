import { BrowserRouter, Route } from 'react-router-dom'
import React from 'react'

import Login from './pages/Login'
import Main from './pages/Main'

export default function Routes(){
    return (
        <BrowserRouter>
            <Route path='/' exact component={Login} />
            <Route path='/dev/:id' component={Main} />
        </BrowserRouter>
    )
}