// CardsList.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardsList from './CardsList';
import { CardCreateRequestInterface } from "../../interfaces/CardInterface";
import CardServices from "../../services/CardServices";

jest.mock("../../services/CardServices");

describe('CardsList component', () => {
  const mockCards: CardCreateRequestInterface[] = [
    { question: 'Question 1', answer: 'Answer 1', tag: 'Tag 1' },
    { question: 'Question 2', answer: 'Answer 2', tag: 'Tag 2' },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
    (CardServices.getAll as jest.Mock).mockResolvedValueOnce(mockCards);
  });

  test('renders card creation form correctly', () => {
  render(<CardsList />);
  const questionInput = screen.getByTestId('question-input');
  const answerInput = screen.getByTestId('answer-input');
  const tagInput = screen.getByTestId('tag-input');
  expect(questionInput).toBeInTheDocument();
  expect(answerInput).toBeInTheDocument();
  expect(tagInput).toBeInTheDocument();
});


});