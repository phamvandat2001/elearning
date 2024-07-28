import type { Express } from "express";
import { Schema } from "mongoose";

declare global {
    type SchemaObject = {
        [key: string]: Schema
    };
    type CustomExpressServer = Express & { schema?: SchemaObject };
}

export = global;