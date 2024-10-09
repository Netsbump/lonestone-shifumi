import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { Round } from "./round.entity";
import { Player } from "./player.entity";

@Entity()
export class Choice {

   @ManyToOne(() => Player, { primary: true })
   player!: Player;
   
   @ManyToOne(() => Round, { primary: true })
   round!: Round;

   @Property()
   action!: string

}