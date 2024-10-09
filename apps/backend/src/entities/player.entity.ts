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
    avatar_path!: string

    @Property({ type: 'date', onCreate: () => new Date() })
    createdAt!: Date;

    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt!: Date;

    @ManyToMany(()=> Game)
    games = new Collection<Game>(this);

    @OneToMany(() => Choice, choice => choice.player)
    choices = new Collection<Choice>(this);
}