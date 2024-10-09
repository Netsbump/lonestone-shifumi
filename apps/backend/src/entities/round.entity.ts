import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Game } from "./game.entity";
import { Choice } from "./choice.entity";

@Entity()
export class Round {

    @PrimaryKey()
    id!: number;

    @Property()
    number!: number

    @Property({ type: 'date', onCreate: () => new Date() })
    createdAt!: Date;

    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt!: Date;

    @ManyToOne(() => Game)
    game!: Game;

    @OneToMany(() => Choice, choice => choice.round)
    choices = new Collection<Choice>(this);
}