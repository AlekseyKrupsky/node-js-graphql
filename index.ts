import * as dotenv from 'dotenv';
import { cwd } from "node:process";
import { run } from "./src/graphql";

dotenv.config({ path: `${cwd()}/.env`});

run();
