import { Cascade, Collection, Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Player } from "./player.entity";

@Entity()
export class Game {

    @PrimaryKey()
    id!: number;
    
    @Property({ onCreate: () => new Date() })
    createdAt: Date = new Date();
    
    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    @ManyToMany(() => Player, player => player.games, { cascade: [Cascade.REMOVE] })
    players = new Collection<Player>(this);
}