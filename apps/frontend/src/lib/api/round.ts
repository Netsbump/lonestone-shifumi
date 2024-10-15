import type { CreateRoundDTO, RoundDTO } from "@packages/dtos";
import { api } from "../api/config";

// Fetch all rounds
export const fetchRounds = async (): Promise<RoundDTO[]> => {
  return await api.get("rounds").json();
};

// Create a new round
export const createRound = async (roundData: CreateRoundDTO): Promise<RoundDTO> => {
  return await api.post("rounds", { json: roundData }).json();
};

// Fetch a single round by ID
export const fetchRound = async (id: string | number): Promise<RoundDTO> => {
  return await api.get(`rounds/${id}`).json();
};

// Update a round
export const updateRound = async (id: string | number, roundData: Partial<CreateRoundDTO>): Promise<RoundDTO> => {
  return await api.patch(`rounds/${id}`, { json: roundData }).json();
};

// Delete a round
export const deleteRound = async (id: string | number): Promise<void> => {
  return await api.delete(`rounds/${id}`).json();
};
