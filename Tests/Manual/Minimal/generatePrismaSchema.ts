/* ─── Data ───────────────────────────────────────────────────────────────────────────────────────────────────────── */
import productPrismaModelDefinition from "./PrismaModelsDefinitions/ProductPrismaModelDefinition";
import productCategoryPrismaModelDefinition from "./PrismaModelsDefinitions/ProductCategoryPrismaModelDefinition";
import userPrismaModelDefinition from "./PrismaModelsDefinitions/UserPrismaModelDefinition";


/* ─── Utils ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
import PrismaSchemaGenerator from "../../../Source/PrismaSchemaGenerator";
import Path from "path";
import { Logger, FileWritingFailedError } from "@yamato-daiwa/es-extensions";
import { ConsoleApplicationLogger } from "@yamato-daiwa/es-extensions-nodejs";


const OUTPUT_DIRECTORY_ABSOLUTE_PATH: string = Path.join(
  process.cwd(), "Tests", "Manual", "Minimal", "_Generated"
);


Logger.setImplementation(ConsoleApplicationLogger);


PrismaSchemaGenerator.generate({

  generatorProvider: "prisma-client-js",

  /** [ WARNING ] DO NOT hardcode it if your project intended to be published. */
  databaseConnectionURI_EnvironmentVariableName: "mysql://root:example@localhost:3306/PrismaSchemaGenerator-MinimalExample",

  databaseProvider: PrismaSchemaGenerator.SupportedDatabaseProviders.MySQL,
  outputFileAbsolutePath: OUTPUT_DIRECTORY_ABSOLUTE_PATH,
  modelsDefinitions: [
    productPrismaModelDefinition,
    productCategoryPrismaModelDefinition,
    userPrismaModelDefinition
  ]

}).

    then(
      (): void => {
        Logger.logSuccess({
          title: "schema.prisma has been generated",
          description: `${ OUTPUT_DIRECTORY_ABSOLUTE_PATH }${ Path.sep }schema.prisma`
        });
      }
    ).

    catch(
      (error: unknown): void => {
        Logger.logError({
          errorType: FileWritingFailedError.NAME,
          title: FileWritingFailedError.localization.defaultTitle,
          description: "prisma.schema",
          occurrenceLocation: "PrismaSchemaGenerator.generate",
          caughtError: error
        });
      }
    );
