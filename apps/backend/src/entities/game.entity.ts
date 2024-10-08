import { Collection, Entity, Enum, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Status } from "../types/enums";
import { Player } from "./player.entity";

@Entity()
export class Game {

    @PrimaryKey()
    id!: number;

    @Property()
    @Enum(() => Status)
    status: Status = Status.NOT_STARTED;
    
    @Property({ type: 'date', onCreate: () => new Date() })
    createdAt!: Date;

    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt!: Date;

    @Property({ type: 'date', nullable: true })
    deletedAt?: Date;

    @ManyToMany(() => Player, player => player.games)
    players = new Collection<Player>(this);
}