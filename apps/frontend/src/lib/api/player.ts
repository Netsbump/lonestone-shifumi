import type {
  CreatePlayerDTO,
  PlayerDTO
} from '@packages/dtos';

import { api } from './config';

// Fetch all players
export const fetchPlayers = async (): Promise<PlayerDTO[]> => {
  return await api.get('players').json();
};

// Create a new player
export const createPlayer = async (playerData: CreatePlayerDTO): Promise<PlayerDTO> => {
  return await api.post('players', { json: playerData }).json();
};

// Fetch a single player by ID
export const fetchPlayer = async (id: string | number): Promise<PlayerDTO> => {
  return await api.get(`players/${id}`).json();
};

// Update a player
export const updatePlayer = async (
  id: string | number,
  playerData: Partial<CreatePlayerDTO>,
): Promise<PlayerDTO> => {
  return await api.patch(`players/${id}`, { json: playerData }).json();
};

// Delete a player
export const deletePlayer = async (id: string | number): Promise<void> => {
  return await api.delete(`players/${id}`).json();
};