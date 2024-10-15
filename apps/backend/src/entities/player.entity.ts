import { Cascade, Collection, Entity, ManyToMany, OneToMany, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { Choice } from "./choice.entity";
import { Game } from "./game.entity";

@Entity()
export class Player {
    
    @PrimaryKey()
    id!: number;

    @Property() 
    @Unique()
    name!: string;

    @Property()
    avatar_path!: string;

    @Property({ type: 'boolean', default: false })
    isNPC = false;  

    @Property({ onCreate: () => new Date() })
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    @ManyToMany(()=> Game)
    games = new Collection<Game>(this);

    @OneToMany(() => Choice, choice => choice.player, { cascade: [Cascade.REMOVE] })
    choices = new Collection<Choice>(this);
}