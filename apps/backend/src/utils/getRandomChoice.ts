import { type Choice, LEAF, SCISSORS, STONE } from "@packages/dtos";

export const getRandomChoice = (): Choice => {
    const choices: Choice[] = [LEAF, STONE, SCISSORS];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };