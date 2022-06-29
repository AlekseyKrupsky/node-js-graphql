import * as dotenv from 'dotenv';
import { cwd } from "node:process";
import { run } from "./src/graphql";

dotenv.config({ path: `${cwd()}/.env`});

run();

// console.log(process.env.ARTISTS_URL);

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

