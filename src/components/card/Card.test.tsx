// Card.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from './Card';
import { CardInterface } from '../../interfaces/CardInterface';

describe('Card component', () => {
    const mockCard: CardInterface = {
        id: '1',
        category: 'Test Category',
        question: 'Test Question',
        answer: 'Test Answer',
        tag: 'Test Tag',
        lastReviewed: '2024-01-01',
    };

    test('renders without crashing', () => {
        render(<Card card={mockCard} />);
        const cardElement = screen.getByTestId('card-container');
        expect(cardElement).toBeInTheDocument();
    });

    test('renders the category', () => {
        render(<Card card={mockCard} />);
        const categoryElement = screen.getByText(/Test Category/i);
        expect(categoryElement).toBeInTheDocument();
    });

    test('renders a different date than in mockCard', () => {
        render(<Card card={mockCard} />);
        const dateElement = screen.getByTestId('card-date');
        expect(dateElement.textContent).not.toEqual(mockCard.lastReviewed);
    });

});