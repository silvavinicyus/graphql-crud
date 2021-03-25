import {InputType, Field} from 'type-graphql';

@InputType()
export class UpdateToDoInput {
    @Field({nullable: false})
    name: string;

    @Field()
    hours: string;

    @Field()
    description: string;
}