/* ─── Data ───────────────────────────────────────────────────────────────────────────────────────────────────────── */
import productPrismaModelDefinition from "./PrismaModelsDefinitions/ProductPrismaModelDefinition";
import productCategoryPrismaModelDefinition from "./PrismaModelsDefinitions/ProductCategoryPrismaModelDefinition";
import userPrismaModelDefinition from "./PrismaModelsDefinitions/UserPrismaModelDefinition";


/* ─── Utils ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
import PrismaSchemaGenerator from "../../../Source/PrismaSchemaGenerator";
import Path from "path";
import { Logger } from "@yamato-daiwa/es-extensions";
import { ConsoleApplicationLogger } from "@yamato-daiwa/es-extensions-nodejs";


const OUTPUT_DIRECTORY_ABSOLUTE_PATH: string = Path.join(
  process.cwd(), "Tests", "Manual", "Minimal", "_Generated"
);


Logger.setImplementation(ConsoleApplicationLogger);


PrismaSchemaGenerator.generate({

  generatorProvider: "prisma-client-js",

  databaseProvider: PrismaSchemaGenerator.SupportedDatabaseProviders.MySQL,
  outputFileAbsolutePath: OUTPUT_DIRECTORY_ABSOLUTE_PATH,
  modelsDefinitions: [
    productPrismaModelDefinition,
    productCategoryPrismaModelDefinition,
    userPrismaModelDefinition
  ]

});
