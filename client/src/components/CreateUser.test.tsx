import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, test, expect, Mock } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import { CreateUser } from './CreateUser'


describe('createuser component', () => {
    test('renders the form field', () => {
        render(
            <Router>
                <CreateUser/>
            </Router>
            
        )
        expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument()
    })

    
})