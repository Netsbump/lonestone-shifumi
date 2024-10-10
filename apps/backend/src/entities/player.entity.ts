import { Collection, Entity, ManyToMany, OneToMany, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { Game } from "./game.entity";
import { Choice } from "./choice.entity";

@Entity()
export class Player {
    
    @PrimaryKey()
    id!: number;

    @Property() 
    @Unique()
    name!: string;

    @Property()
    avatar_path!: string;

    @Property({ onCreate: () => new Date() })
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    @ManyToMany(()=> Game)
    games = new Collection<Game>(this);

    @OneToMany(() => Choice, choice => choice.player)
    choices = new Collection<Choice>(this);
}