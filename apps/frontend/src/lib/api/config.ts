
import ky from "ky";

export const API_BASE_URL = 'http://localhost:3000';

export const PLAYERS_ENDPOINT = 'players';
export const ROUNDS_ENDPOINT = 'rounds';
export const GAMES_ENDPOINT = 'games';

export const api = ky.create({
    prefixUrl: API_BASE_URL, 
    retry: 2,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json", 
        "Accept": "application/json",   
    },
})