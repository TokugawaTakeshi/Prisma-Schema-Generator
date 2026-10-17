/* ━━━ < Imports ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/* ┅┅┅ Data ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
import productPrismaModelDefinition from "./PrismaModelsDefinitions/ProductPrismaModelDefinition";
import productCategoryPrismaModelDefinition from "./PrismaModelsDefinitions/ProductCategoryPrismaModelDefinition";
import userPrismaModelDefinition from "./PrismaModelsDefinitions/UserPrismaModelDefinition";

/* ┅┅┅ Utils ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
import PrismaSchemaGenerator from "../../../Source/PrismaSchemaGenerator";
import Path from "node:path";
import { Logger } from "@yamato-daiwa/es-extensions";
import { ConsoleApplicationLogger } from "@yamato-daiwa/es-extensions-nodejs";
/* ━━━ Imports > ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */


const OUTPUT_DIRECTORY_ABSOLUTE_PATH: string = Path.join(
  process.cwd(), "Tests", "Manual", "Minimal", "_Generated"
);


Logger.setImplementation(ConsoleApplicationLogger);


PrismaSchemaGenerator.generate({
  generatorProvider: "prisma-client-js",
  datasourceProvider: PrismaSchemaGenerator.SupportedDatasourceProviders.MySQL,
  outputDirectoryAbsolutePath: OUTPUT_DIRECTORY_ABSOLUTE_PATH,
  modelsDefinitions: [
    productPrismaModelDefinition,
    productCategoryPrismaModelDefinition,
    userPrismaModelDefinition
  ]
});
