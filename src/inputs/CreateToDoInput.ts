import {InputType, Field} from 'type-graphql';

@InputType()
export class CreateToDoInput {
    @Field()
    name: string;

    @Field()
    hours: string;
}