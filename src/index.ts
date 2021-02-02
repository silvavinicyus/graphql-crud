import 'reflect-metadata';
import {createConnection} from 'typeorm';
import {ApolloServer} from 'apollo-server';
import {buildSchema} from 'type-graphql';
import {ToDoResolver} from './resolvers/todo.resolver';

async function runServer() {
    const connection = createConnection();
    const schema = await buildSchema({
        resolvers: [ToDoResolver]
    });

    const server = new ApolloServer({schema});
    await server.listen(8050);

    console.log('Server started at port ::8050');
}

runServer();