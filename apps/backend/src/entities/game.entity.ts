import { Collection, Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Player } from "./player.entity";

@Entity()
export class Game {

    @PrimaryKey()
    id!: number;
    
    @Property({ type: 'date', onCreate: () => new Date() })
    createdAt!: Date;

    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt!: Date;

    @ManyToMany(() => Player, player => player.games)
    players = new Collection<Player>(this);
}