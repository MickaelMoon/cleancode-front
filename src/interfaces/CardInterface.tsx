interface CardInterface {
    id: string;
    category: string;
    question: string;
    answer: string;
    tag?: string;
    lastReviewed: string;
}

interface CardCreateRequestInterface {
    question: string;
    answer: string;
    tag: string;
}

interface CardCreateResponseInterface {
    id: string;
    category: string;
    question: string;
    answer: string;
    tag?: string;
}

export type { CardInterface, CardCreateRequestInterface, CardCreateResponseInterface };