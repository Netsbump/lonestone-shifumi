import type { CreateGameDTO, GameDTO } from "@packages/dtos";
import { api } from "../api/config";

// Fetch all games
export const fetchGames = async (): Promise<GameDTO[]> => {
  return await api.get("games").json();
};

// Create a new game
export const createGame = async (gameData: CreateGameDTO): Promise<GameDTO> => {
  return await api.post("games", { json: gameData }).json();
};

// Fetch a single game by ID
export const fetchGame = async (id: string | number): Promise<GameDTO> => {
  return await api.get(`games/${id}`).json();
};

// Update a game
export const updateGame = async (id: string | number, gameData: Partial<CreateGameDTO>): Promise<GameDTO> => {
  return await api.patch(`games/${id}`, { json: gameData }).json();
};

// Delete a game
export const deleteGame = async (id: string | number): Promise<void> => {
  return await api.delete(`games/${id}`).json();
};
