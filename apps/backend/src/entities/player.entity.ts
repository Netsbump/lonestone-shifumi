import { Collection, Entity, ManyToMany, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { Game } from "./game.entity";

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

    @Property({ type: 'date', nullable: true })
    deletedAt?: Date;

    @ManyToMany(()=> Game)
    games = new Collection<Game>(this);
}