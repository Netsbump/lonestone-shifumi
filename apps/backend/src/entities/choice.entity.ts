import { Collection, Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Round } from "./round.entity";

@Entity()
export class Choice {

    @PrimaryKey()
    id!: number;

    @Property()
    action!: string

    @Property({ type: 'date', onCreate: () => new Date() })
    createdAt!: Date;

    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt!: Date;

    @Property({ type: 'date', nullable: true })
    deletedAt?: Date;

    @ManyToMany(() => Round)
    rounds = new Collection<Round>(this);
}