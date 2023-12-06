import { createPool } from "mysql2/promise";
import {config} from 'dotenv';
import { database } from './db.config';
config();

const connection = createPool(database);

export default connection;
