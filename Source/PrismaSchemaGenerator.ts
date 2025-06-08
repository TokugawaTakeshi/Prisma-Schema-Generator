/* ─── Columns Schemas Generators ─────────────────────────────────────────────────────────────────────────────────── */
/* ┄┄┄ Integer ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ */
import type IntegerColumnSchemaGenerator from "./ColumnsSchemasGenerators/Integer/IntegerColumnSchemaGenerator";
import IntegerColumnSchemaGeneratorForMySQL from
    "./ColumnsSchemasGenerators/Integer/IntegerColumnSchemaGeneratorForMySQL";
import IntegerColumnSchemaGeneratorForPostgreSQL from
    "./ColumnsSchemasGenerators/Integer/IntegerColumnSchemaGeneratorForPostgreSQL";

/* ┄┄┄ String ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ */
import type StringColumnSchemaGenerator from "./ColumnsSchemasGenerators/String/StringColumnSchemaGenerator";
import StringColumnSchemaGeneratorForMySQL from "./ColumnsSchemasGenerators/String/StringColumnSchemaGeneratorForMySQL";
import StringColumnSchemaGeneratorForPostgreSQL from
    "./ColumnsSchemasGenerators/String/StringColumnSchemaGeneratorForPostgreSQL";

/* ┄┄┄ Date Without Time ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ */
import type DateWithoutTimeColumnSchemaGenerator from
    "./ColumnsSchemasGenerators/DateWithoutTime/DateWithoutTimeColumnSchemaGenerator";
import DateWithoutTimeColumnSchemaGeneratorForMySQL from
    "./ColumnsSchemasGenerators/DateWithoutTime/DateWithoutTimeColumnSchemaGeneratorForMySQL";
import DateWithoutTimeColumnSchemaGeneratorForPostgreSQL from
    "./ColumnsSchemasGenerators/DateWithoutTime/DateWithoutTimeColumnSchemaGeneratorForPostgreSQL";

/* ┄┄┄ Date And Time ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ */
import type DateAndTimeColumnSchemaGenerator from
    "./ColumnsSchemasGenerators/DateAndTime/DateAndTimeColumnSchemaGenerator";
import DateAndTimeColumnSchemaGeneratorForMySQL from
    "./ColumnsSchemasGenerators/DateAndTime/DateAndTimeColumnSchemaGeneratorForMySQL";
import DateAndTimeColumnSchemaGeneratorForPostgreSQL from
    "./ColumnsSchemasGenerators/DateAndTime/DateAndTimeColumnSchemaGeneratorForPostgreSQL";

/* ┄┄┄ List ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ */
import type ListColumnSchemaGenerator from "./ColumnsSchemasGenerators/List/ListColumnSchemaGenerator";
import ListColumnSchemaGeneratorForPostgreSQL from
    "./ColumnsSchemasGenerators/List/ListColumnSchemaGeneratorForPostgreSQL";
import ListColumnSchemaGeneratorForMySQL from "./ColumnsSchemasGenerators/List/ListColumnSchemaGeneratorForMySQL";

/* ┄┄┄ JSON ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ */
import type JSON_ColumnSchemaGenerator from "./ColumnsSchemasGenerators/JSON/JSON_ColumnSchemaGenerator";
import JSON_ColumnSchemaGeneratorForPostgresSQL from "./ColumnsSchemasGenerators/JSON/JSON_ColumnSchemaGeneratorForPostgresSQL";
import JSON_ColumnSchemaGeneratorForMySQL from "./ColumnsSchemasGenerators/JSON/JSON_ColumnSchemaGeneratorForMySQL";

/* ┄┄┄ Another Column ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ */
import AnotherColumnSchemaGenerator from "./ColumnsSchemasGenerators/AnotherColumnSchemaGenerator";

/* ─── Framework ──────────────────────────────────────────────────────────────────────────────────────────────────── */
import { formatSchema as formatPrismaSchema } from "@prisma/sdk";

/* ─── Utils ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
import type { IntegerConstructor, IntegerDataTypes } from "fundamental-constants";
import {
  isNonEmptyString,
  isNotUndefined,
  Logger,
  type ParsedJSON,
  UnsupportedScenarioError
} from "@yamato-daiwa/es-extensions";
import { ImprovedFileSystem } from "@yamato-daiwa/es-extensions-nodejs";


class PrismaSchemaGenerator {

  /* ━━━ Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  private readonly databaseProvider: PrismaSchemaGenerator.SupportedDatabaseProviders;

  private readonly integerColumnSchemaGenerator: IntegerColumnSchemaGenerator;
  private readonly stringColumnSchemaGenerator: StringColumnSchemaGenerator;
  private readonly dateWithoutTimeColumnSchemaGenerator: DateWithoutTimeColumnSchemaGenerator;
  private readonly dateAndTimeColumnSchemaGenerator: DateAndTimeColumnSchemaGenerator;
  private readonly listColumnSchemaGenerator: ListColumnSchemaGenerator;
  private readonly JSON_ColumnSchemaGenerator: JSON_ColumnSchemaGenerator;


  /* ━━━ Public Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static async generate(
    {
      generatorProvider,
      clientOutputPathRelativeToSchemaFile,
      binaryTargets,
      databaseProvider,
      databaseConnectionURI_EnvironmentVariableName,
      modelsDefinitions,
      outputFileAbsolutePath
    }: Readonly<{
      generatorProvider: string;
      clientOutputPathRelativeToSchemaFile?: string;
      binaryTargets?: ReadonlyArray<string>;
      databaseProvider: PrismaSchemaGenerator.SupportedDatabaseProviders;
      databaseConnectionURI_EnvironmentVariableName: string;
      modelsDefinitions: ReadonlyArray<PrismaSchemaGenerator.ModelDefinition>;
      outputFileAbsolutePath: string;
    }>
  ): Promise<void> {

    const notFormattedYetSchema: string = new PrismaSchemaGenerator({ databaseProvider }).
        generateNotFormattedYetSchema({
          generatorProvider,
          clientOutputPathRelativeToSchemaFile,
          binaryTargets,
          modelsDefinitions,
          databaseConnectionURI_EnvironmentVariableName
        });

    const formattedSchema: string = await formatPrismaSchema({ schema: notFormattedYetSchema });

    return ImprovedFileSystem.writeFileToPossiblyNotExistingDirectory({
      filePath: `${ outputFileAbsolutePath }/schema.prisma`,
      content: formattedSchema,
      synchronously: false
    });

  }


  /* ━━━ Constructor ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  private constructor(
    {
      databaseProvider
    }: Readonly<{
      databaseProvider: PrismaSchemaGenerator.SupportedDatabaseProviders;
    }>
  ) {

    this.databaseProvider = databaseProvider;

    switch (this.databaseProvider) {

      case PrismaSchemaGenerator.SupportedDatabaseProviders.MySQL: {
        this.integerColumnSchemaGenerator = new IntegerColumnSchemaGeneratorForMySQL();
        this.stringColumnSchemaGenerator = new StringColumnSchemaGeneratorForMySQL();
        this.dateWithoutTimeColumnSchemaGenerator = new DateWithoutTimeColumnSchemaGeneratorForMySQL();
        this.dateAndTimeColumnSchemaGenerator = new DateAndTimeColumnSchemaGeneratorForMySQL();
        this.listColumnSchemaGenerator = new ListColumnSchemaGeneratorForMySQL();
        this.JSON_ColumnSchemaGenerator = new JSON_ColumnSchemaGeneratorForMySQL();
        break;
      }

      case PrismaSchemaGenerator.SupportedDatabaseProviders.PostgreSQL: {
        this.integerColumnSchemaGenerator = new IntegerColumnSchemaGeneratorForPostgreSQL();
        this.stringColumnSchemaGenerator = new StringColumnSchemaGeneratorForPostgreSQL();
        this.dateWithoutTimeColumnSchemaGenerator = new DateWithoutTimeColumnSchemaGeneratorForPostgreSQL();
        this.dateAndTimeColumnSchemaGenerator = new DateAndTimeColumnSchemaGeneratorForPostgreSQL();
        this.listColumnSchemaGenerator = new ListColumnSchemaGeneratorForPostgreSQL();
        this.JSON_ColumnSchemaGenerator = new JSON_ColumnSchemaGeneratorForPostgresSQL();
        break;
      }

      case PrismaSchemaGenerator.SupportedDatabaseProviders.SQLite:
      case PrismaSchemaGenerator.SupportedDatabaseProviders.SQL_Server:
      case PrismaSchemaGenerator.SupportedDatabaseProviders.CockroachDB:
      case PrismaSchemaGenerator.SupportedDatabaseProviders.MongoDB:
      {

        Logger.throwErrorAndLog({
          errorInstance: new UnsupportedScenarioError(`Provider "${ databaseProvider }" is not supported yet.`),
          title: UnsupportedScenarioError.localization.defaultTitle,
          occurrenceLocation: "PrismaSchemaGenerator.constructor(compoundParameter)"
        });

      }

    }

  }


  /* ━━━ Private Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  private generateNotFormattedYetSchema(
    {
      generatorProvider,
      clientOutputPathRelativeToSchemaFile,
      binaryTargets = [],
      databaseConnectionURI_EnvironmentVariableName,
      modelsDefinitions
    }: Readonly<{
      generatorProvider: string;
      clientOutputPathRelativeToSchemaFile?: string;
      binaryTargets?: ReadonlyArray<string>;
      databaseConnectionURI_EnvironmentVariableName: string;
      modelsDefinitions: ReadonlyArray<PrismaSchemaGenerator.ModelDefinition>;
    }>
  ): string {

    /* [ Theory ]
     * Prisma formatter does not support the formatting of single-line blocks, so the manal like breaking will be required. */

    return [

      "generator client {",
      `  provider = "${ generatorProvider }"`,
      ...isNonEmptyString(clientOutputPathRelativeToSchemaFile) ?
          [ `  output = "${ clientOutputPathRelativeToSchemaFile }"` ] :
          [],
      ...binaryTargets.length > 0 ?
          [ `  binaryTargets = [ "${ binaryTargets.join("\", \"") }" ]` ] : [],
      "}",

      "datasource db {",
      `  provider = "${ this.databaseProvider }"`,
      `  url      = env("${ databaseConnectionURI_EnvironmentVariableName }")`,
      "}",

      ...modelsDefinitions.map(this.generateModelSchema.bind(this))

    ].join("\n");

  }

  private generateModelSchema(
    {
      modelName,
      tableName,
      propertiesDefinitions
    }: PrismaSchemaGenerator.ModelDefinition
  ): string {
    return [
      `model ${ modelName } {`,
      ...propertiesDefinitions.map(this.generateColumnSchema.bind(this)),
      ...isNotUndefined(tableName) ? [ `@@map("${ tableName }")` ] : [],
      "}"
    ].join("\n");
  }

  private generateColumnSchema(propertyDefinition: PrismaSchemaGenerator.PropertyDefinition): string {

    if (PrismaSchemaGenerator.isStringPropertyDefinition(propertyDefinition)) {
      return this.stringColumnSchemaGenerator.generate(propertyDefinition);
    }


    if (PrismaSchemaGenerator.isDateWithoutTimePropertyDefinition(propertyDefinition)) {
      return this.dateWithoutTimeColumnSchemaGenerator.generate(propertyDefinition);
    }


    if (PrismaSchemaGenerator.isDateAndTimePropertyDefinition(propertyDefinition)) {
      return this.dateAndTimeColumnSchemaGenerator.generate(propertyDefinition);
    }


    if (PrismaSchemaGenerator.isRelationReferenceToArrayOfOtherModelsPropertyDefinition(propertyDefinition)) {
      return this.listColumnSchemaGenerator.generate(propertyDefinition);
    }


    if (PrismaSchemaGenerator.isAnotherModelPropertyDefinition(propertyDefinition)) {
      return AnotherColumnSchemaGenerator.generate(propertyDefinition);
    }

    if (PrismaSchemaGenerator.isJSON_ModelPropertyDefinition(propertyDefinition)) {
      return this.JSON_ColumnSchemaGenerator.generate(propertyDefinition);
    }


    return this.integerColumnSchemaGenerator.generate(propertyDefinition);

  }

  private static isStringPropertyDefinition(
    propertyDefinition: PrismaSchemaGenerator.PropertyDefinition
  ): propertyDefinition is PrismaSchemaGenerator.PropertyDefinition.String {
    return typeof propertyDefinition.type === "function" && propertyDefinition.type.name === "String";
  }

  private static isDateWithoutTimePropertyDefinition(
    propertyDefinition: PrismaSchemaGenerator.PropertyDefinition
  ): propertyDefinition is PrismaSchemaGenerator.PropertyDefinition.DateWithoutTime {
    return propertyDefinition.type === PrismaSchemaGenerator.PropertyDefinition.DateWithoutTime.TYPE;
  }

  private static isDateAndTimePropertyDefinition(
    propertyDefinition: PrismaSchemaGenerator.PropertyDefinition
  ): propertyDefinition is PrismaSchemaGenerator.PropertyDefinition.DateAndTime {
    return propertyDefinition.type === PrismaSchemaGenerator.PropertyDefinition.DateAndTime.TYPE;
  }

  private static isRelationReferenceToArrayOfOtherModelsPropertyDefinition(
    propertyDefinition: PrismaSchemaGenerator.PropertyDefinition
  ): propertyDefinition is PrismaSchemaGenerator.PropertyDefinition.List {
    return propertyDefinition.type === PrismaSchemaGenerator.PropertyDefinition.List.TYPE;
  }

  private static isAnotherModelPropertyDefinition(
    propertyDefinition: PrismaSchemaGenerator.PropertyDefinition
  ): propertyDefinition is PrismaSchemaGenerator.PropertyDefinition.AnotherModel {
    return propertyDefinition.type === PrismaSchemaGenerator.PropertyDefinition.AnotherModel.TYPE;
  }

  private static isJSON_ModelPropertyDefinition(
    propertyDefinition: PrismaSchemaGenerator.PropertyDefinition
  ): propertyDefinition is PrismaSchemaGenerator.PropertyDefinition.JSON {
    return propertyDefinition.type === PrismaSchemaGenerator.PropertyDefinition.JSON.TYPE;
  }

}


namespace PrismaSchemaGenerator {

  export enum SupportedDatabaseProviders {
    PostgreSQL = "postgresql",
    MySQL = "mysql",
    SQLite = "sqlite",
    SQL_Server = "sqlserver",
    MongoDB = "mongodb",
    CockroachDB = "cockroachdb"
  }

  export type ModelDefinition = Readonly<{
    modelName: string;
    tableName?: string;
    propertiesDefinitions: ReadonlyArray<PropertyDefinition>;
  }>;

  export type PropertyDefinition =
      PropertyDefinition.String |
      PropertyDefinition.Integer |
      PropertyDefinition.DateWithoutTime |
      PropertyDefinition.DateAndTime |
      PropertyDefinition.List |
      PropertyDefinition.AnotherModel |
      PropertyDefinition.JSON;

  export namespace PropertyDefinition {

    export type CommonPart = Readonly<{
      propertyName: string;
      columnName?: string;
      isNullable: boolean;
    }>;


    /* ─── String ─────────────────────────────────────────────────────────────────────────────────────────────────── */
    export type String =
        CommonPart &
        Readonly<{
          type: StringConstructor;
          isPrimaryKey?: boolean;
          isForeignKey?: boolean;
          mustBeUnique?: boolean;
          defaultValue?: string;
          maximalCharactersCount?: number;
          fixedCharactersCount?: number;
        }>;

    export const NEW_UNIVERSALLY_UNIQUE_IDENTIFIER: string = "uuid()";
    export const NEW_NANO_ID: string = "nanoid()";


    /* ─── Integer ────────────────────────────────────────────────────────────────────────────────────────────────── */
    export type Integer =
        CommonPart &
        Readonly<
          {
            isPrimaryKey?: boolean;
            defaultValue?: number;
          } &
          (
            (
              {
                type: IntegerConstructor;
                maximalValue: number;
              } &
              (
                { minimalValue: number; } |
                { isUnsigned: true; }
              )
            ) |
            {
              type: IntegerDataTypes;
              isUnsigned: boolean;
            }
          )
        >;


    /* ─── Date Without Time ──────────────────────────────────────────────────────────────────────────────────────── */
    export type DateWithoutTime =
        CommonPart &
        Readonly<{
          type: typeof DateWithoutTime.TYPE;
          isAutomaticallyUpdatedUpdateAtColumn?: boolean;
          defaultValue?: string;
        }>;

    export namespace DateWithoutTime {
      export const TYPE: "DATE_WITHOUT_TIME" = "DATE_WITHOUT_TIME";
      export const TODAY_AS_DEFAULT_VALUE: string = "dbgenerated(\"(CURRENT_DATE)\")";
    }


    /* ─── Date And Time ──────────────────────────────────────────────────────────────────────────────────────────── */
    export type DateAndTime =
        CommonPart &
        Readonly<{
          type: typeof DateAndTime.TYPE;
          withTimezone: boolean;
          precision: number;
          isAutomaticallyUpdatedUpdateAtColumn?: boolean;
          defaultValue?: string;
        }>;

    export namespace DateAndTime {
      export const TYPE: "DATE_TIME" = "DATE_TIME";
      export const CURRENT_MOMENT_AS_DEFAULT_VALUE: string = "now()";
    }


    /* ─── List ───────────────────────────────────────────────────────────────────────────────────────────────────── */
    export type List =
        Omit<CommonPart, "isNullable"> &
        Readonly<{
          type: typeof List.TYPE;
          elementType: string;
        }>;

    export namespace List {
      export const TYPE: "LIST" = "LIST";
    }


    /* ─── JSON ───────────────────────────────────────────────────────────────────────────────────────────────────── */
    export type JSON =
        CommonPart &
        Readonly<{
          type: typeof JSON.TYPE;
          defaultValue?: ParsedJSON;
        }>;

    export namespace JSON {
      export const TYPE: "JSON" = "JSON";
    }


    /* ─── Another Model ──────────────────────────────────────────────────────────────────────────────────────────── */
    export type AnotherModel =
        CommonPart &
        Readonly<{
          type: typeof AnotherModel.TYPE;
          targetModelName: string;
          relation: {
            fields: ReadonlyArray<string>;
            references: ReadonlyArray<string>;
          };
        }>;

    export namespace AnotherModel {
      export const TYPE: "ANOTHER_MODEL" = "ANOTHER_MODEL";
    }

  }

}


export default PrismaSchemaGenerator;
