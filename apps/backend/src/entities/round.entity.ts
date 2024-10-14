import { Cascade, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Game } from "./game.entity";
import { Choice } from "./choice.entity";

@Entity()
export class Round {

    @PrimaryKey()
    id!: number;

    @Property()
    number!: number;

    @Property({ onCreate: () => new Date() })
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    @ManyToOne(() => Game)
    game!: Game;

    @OneToMany(() => Choice, choice => choice.round, { cascade: [Cascade.REMOVE] })
    choices = new Collection<Choice>(this);
}