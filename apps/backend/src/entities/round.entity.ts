import { Collection, Entity, Enum, ManyToMany, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Status } from "../types/enums";
import { Game } from "./game.entity";
import { Choice } from "./choice.entity";

@Entity()
export class Round {

    @PrimaryKey()
    id!: number;

    @Property()
    number!: number

    @Property()
    @Enum(() => Status)
    timer_status: Status = Status.NOT_STARTED

    @Property({ type: 'date', onCreate: () => new Date() })
    createdAt!: Date;

    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt!: Date;

    @Property({ type: 'date', nullable: true })
    deletedAt?: Date;

    @ManyToOne({nullable: false})
    game!: Game;

    @ManyToMany(() => Choice, choice => choice.rounds)
    choices = new Collection<Choice>(this);
}