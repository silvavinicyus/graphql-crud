import {Resolver, Query, Mutation, Arg} from 'type-graphql';
import { CreateToDoInput } from '../inputs/CreateToDoInput';
import { UpdateToDoInput } from '../inputs/UpdateToDoInput';
import { ToDo } from '../models/ToDo';

@Resolver()
export class ToDoResolver {
    @Query(() => [ToDo])
    todos(){
        return ToDo.find();
    }

    @Query(() => ToDo)
    todo(@Arg("id") id: string){
        return ToDo.findOne({
            where: {id}
        })
    }

    @Mutation(() => ToDo)
    async createToDo(@Arg("data") data: CreateToDoInput){
        const todo = ToDo.create(data);
        await todo.save();
        return todo;
    }

    @Mutation(() => ToDo)
    async updateToDo(@Arg("id") id: string, @Arg("data") data: UpdateToDoInput){
        const todoExists = await ToDo.findOne({where: {id}});

        if(!todoExists){
            throw new Error(`The user ${id} does not exist!`);
        }

        Object.assign(todoExists, data);
        await todoExists.save();

        return todoExists;
    }

    @Mutation(() => Boolean)
    async deleteToDo(@Arg("id") id: string){
        const todoExists = await ToDo.findOne({where: {id}});

        if(!todoExists){
            throw new Error(`The user ${id} does not exist!`);
        }

        await todoExists.remove();
        
        return true;
    }
}