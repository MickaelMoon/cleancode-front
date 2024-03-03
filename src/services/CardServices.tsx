import axios, { AxiosResponse } from 'axios';
import http from './HttpCommon'
import {CardInterface, CardCreateResponseInterface, CardCreateRequestInterface} from '../interfaces/CardInterface';

function getAll(): Promise<AxiosResponse<Array<CardInterface>>> {
    return axios.get(`${http}/cards`); 
}

function getCardsForQuizz(date?: string): Promise<AxiosResponse<Array<CardInterface>>> {
    if(date) return axios.get(`${http}/cards/quizz?date=${date}`);
    return axios.get(`${http}/cards/quizz`);
}

function createCard(data: CardCreateRequestInterface): Promise<AxiosResponse<CardCreateResponseInterface>> {
    return axios.post(`${http}/cards`, data);
}
function updateCard(id: string, data: { isValid: boolean }): Promise<AxiosResponse<CardInterface>> {
    return axios.patch(`${http}/cards/${id}/answer`, data);
}

const CardServices = {
    getAll,
    getCardsForQuizz,
    createCard,
    updateCard
}

export default CardServices;