/* ─── Columns Schemas Generators ─────────────────────────────────────────────────────────────────────────────────── */
import type IntegerColumnSchemaGenerator from "./ColumnsSchemasGenerators/Integer/IntegerColumnSchemaGenerator";
import IntegerColumnSchemaGeneratorForMySQL from
    "./ColumnsSchemasGenerators/Integer/IntegerColumnSchemaGeneratorForMySQL";
import IntegerColumnSchemaGeneratorForPostgreSQL from
    "./ColumnsSchemasGenerators/Integer/IntegerColumnSchemaGeneratorForPostgreSQL";
import type StringColumnSchemaGenerator from "./ColumnsSchemasGenerators/String/StringColumnSchemaGenerator";
import StringColumnSchemaGeneratorForMySQL from "./ColumnsSchemasGenerators/String/StringColumnSchemaGeneratorForMySQL";
import StringColumnSchemaGeneratorForPostgreSQL from
    "./ColumnsSchemasGenerators/String/StringColumnSchemaGeneratorForPostgreSQL";
import type DateAndTimeColumnSchemaGenerator from
    "./ColumnsSchemasGenerators/DateAndTime/DateAndTimeColumnSchemaGenerator";
import DateAndTimeColumnSchemaGeneratorForMySQL from
    "./ColumnsSchemasGenerators/DateAndTime/DateAndTimeColumnSchemaGeneratorForMySQL";
import DateAndTimeColumnSchemaGeneratorForPostgreSQL from
    "./ColumnsSchemasGenerators/DateAndTime/DateAndTimeColumnSchemaGeneratorForPostgreSQL";
import type ListColumnSchemaGenerator from "./ColumnsSchemasGenerators/List/ListColumnSchemaGenerator";
import ListColumnSchemaGeneratorForPostgreSQL from
    "./ColumnsSchemasGenerators/List/ListColumnSchemaGeneratorForPostgreSQL";
import ListColumnSchemaGeneratorForMySQL from "./ColumnsSchemasGenerators/List/ListColumnSchemaGeneratorForMySQL";
import AnotherColumnSchemaGenerator from "./ColumnsSchemasGenerators/AnotherColumnSchemaGenerator";

/* ─── Framework ──────────────────────────────────────────────────────────────────────────────────────────────────── */
import { formatSchema as formatPrismaSchema } from "@prisma/sdk";

/* ─── Utils ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
import type { IntegerDataTypes } from "fundamental-constants";
import * as FileSystem from "fs/promises";
import { isUndefined, Logger } from "@yamato-daiwa/es-extensions";


class PrismaSchemaGenerator {

  private readonly databaseProvider: PrismaSchemaGenerator.SupportedDatabaseProviders;

  private readonly integerColumnSchemaGenerator: IntegerColumnSchemaGenerator;
  private readonly stringColumnSchemaGenerator: StringColumnSchemaGenerator;
  private readonly dateAndTimeColumnSchemaGenerator: DateAndTimeColumnSchemaGenerator;
  private readonly listColumnSchemaGenerator: ListColumnSchemaGenerator;


  public static async generate(
    {
      generatorProvider,
      databaseProvider,
      databaseConnectionURI_EnvironmentVariableName,
      modelsDefinitions,
      outputFileAbsolutePath
    }: Readonly<{
      generatorProvider: string;
      databaseProvider: PrismaSchemaGenerator.SupportedDatabaseProviders;
      databaseConnectionURI_EnvironmentVariableName: string;
      modelsDefinitions: ReadonlyArray<PrismaSchemaGenerator.ModelDefinition>;
      outputFileAbsolutePath: string;
    }>
  ): Promise<void> {

    const notFormattedSchema: string = new PrismaSchemaGenerator({ databaseProvider }).
        generateNotFormattedSchema({ generatorProvider, modelsDefinitions, databaseConnectionURI_EnvironmentVariableName });

    const formattedSchema: string = await formatPrismaSchema({ schema: notFormattedSchema });

    return FileSystem.writeFile(`${ outputFileAbsolutePath }/schema.prisma`, formattedSchema);

  }


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
        this.dateAndTimeColumnSchemaGenerator = new DateAndTimeColumnSchemaGeneratorForMySQL();
        this.listColumnSchemaGenerator = new ListColumnSchemaGeneratorForMySQL();
        break;
      }

      case PrismaSchemaGenerator.SupportedDatabaseProviders.PostgreSQL: {
        this.integerColumnSchemaGenerator = new IntegerColumnSchemaGeneratorForPostgreSQL();
        this.stringColumnSchemaGenerator = new StringColumnSchemaGeneratorForPostgreSQL();
        this.dateAndTimeColumnSchemaGenerator = new DateAndTimeColumnSchemaGeneratorForPostgreSQL();
        this.listColumnSchemaGenerator = new ListColumnSchemaGeneratorForPostgreSQL();
        break;
      }

      default: {
        Logger.throwErrorAndLog({
          errorType: "NotSupportedYetError",
          description: `Provider "${ databaseProvider }" is not supported yet.`,
          title: "Database Provider Not Supported Yet",
          occurrenceLocation: "PrismaSchemaGenerator.constructor(compoundParameter)",
        });
      }

    }

  }


  private generateNotFormattedSchema(
    {
      generatorProvider,
      databaseConnectionURI_EnvironmentVariableName,
      modelsDefinitions
    }: Readonly<{
      generatorProvider: string;
      databaseConnectionURI_EnvironmentVariableName: string;
      modelsDefinitions: ReadonlyArray<PrismaSchemaGenerator.ModelDefinition>;
    }>
  ): string {

    /* [ Theory ]
     * Prisma formatter does not support the normalizing single-line blocks, so the manal formatting will
     *   require to some extent. */
    return [

      "generator client {",
      `  provider = "${ generatorProvider }"`,
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
      fieldsDefinitions
    }: PrismaSchemaGenerator.ModelDefinition
  ): string {
    return [
      `model ${ modelName } {`,
      ...fieldsDefinitions.map(this.generateColumnSchema.bind(this)),
      ...isUndefined(tableName) ? [] : [ `@@map("${ tableName }")` ],
      "}"
    ].join("\n");
  }

  private generateColumnSchema(columnDefinition: PrismaSchemaGenerator.ColumnDefinition): string {

    if (PrismaSchemaGenerator.isStringColumnDefinition(columnDefinition)) {
      return this.stringColumnSchemaGenerator.generate(columnDefinition);
    }


    if (PrismaSchemaGenerator.isDateAndTimeColumnDefinition(columnDefinition)) {
      return this.dateAndTimeColumnSchemaGenerator.generate(columnDefinition);
    }


    if (PrismaSchemaGenerator.isRelationReferenceToArrayOfOtherModelsColumnDefinition(columnDefinition)) {
      return this.listColumnSchemaGenerator.generate(columnDefinition);
    }


    if (PrismaSchemaGenerator.isAnotherModelColumnDefinition(columnDefinition)) {
      return AnotherColumnSchemaGenerator.generate(columnDefinition);
    }


    return this.integerColumnSchemaGenerator.generate(columnDefinition);

  }

  private static isStringColumnDefinition(
    columnDefinition: PrismaSchemaGenerator.ColumnDefinition
  ): columnDefinition is PrismaSchemaGenerator.ColumnDefinition.String {
    return typeof columnDefinition.type === "function" && columnDefinition.type.name === "String";
  }

  private static isDateAndTimeColumnDefinition(
    columnDefinition: PrismaSchemaGenerator.ColumnDefinition
  ): columnDefinition is PrismaSchemaGenerator.ColumnDefinition.DateAndTime {
    return columnDefinition.type === PrismaSchemaGenerator.ColumnDefinition.DateAndTime.TYPE;
  }

  private static isRelationReferenceToArrayOfOtherModelsColumnDefinition(
    columnDefinition: PrismaSchemaGenerator.ColumnDefinition
  ): columnDefinition is PrismaSchemaGenerator.ColumnDefinition.List {
    return columnDefinition.type === PrismaSchemaGenerator.ColumnDefinition.List.TYPE;
  }

  private static isAnotherModelColumnDefinition(
    columnDefinition: PrismaSchemaGenerator.ColumnDefinition
  ): columnDefinition is PrismaSchemaGenerator.ColumnDefinition.AnotherModel {
    return columnDefinition.type === PrismaSchemaGenerator.ColumnDefinition.AnotherModel.TYPE;
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
    fieldsDefinitions: ReadonlyArray<ColumnDefinition>;
  }>;

  export type ColumnDefinition =
      ColumnDefinition.String |
      ColumnDefinition.Integer |
      ColumnDefinition.DateAndTime |
      ColumnDefinition.List |
      ColumnDefinition.AnotherModel;

  export namespace ColumnDefinition {

    export type CommonPart = {
      name: string;
      isNullable: boolean;
    };

    export type String = CommonPart & {
      type: StringConstructor;
      isPrimaryKey?: boolean;
      defaultValue?: string;
      maximalCharactersCount?: number;
      fixedCharactersCount?: number;
    };

    export type Integer = CommonPart & {
      type: IntegerDataTypes;
      isUnsigned: boolean;
      isPrimaryKey?: boolean;
      defaultValue?: number;
      minimalValue?: number;
      maximalValue?: number;
    };


    export type DateAndTime = CommonPart & {
      type: typeof DateAndTime.TYPE;
      withTimezone: boolean;
      precision: number;
    };

    export namespace DateAndTime {
      export const TYPE: "DATE_TIME" = "DATE_TIME";
    }


    export type List =
        Omit<CommonPart, "isNullable"> &
        {
          type: typeof List.TYPE;
          elementType: string;
        };

    export namespace List {
      export const TYPE: "LIST" = "LIST";
    }


    export type AnotherModel = CommonPart & {
      type: typeof AnotherModel.TYPE;
      targetModelName: string;
      relation: {
        fields: ReadonlyArray<string>;
        references: ReadonlyArray<string>;
      };
    };

    export namespace AnotherModel {
      export const TYPE: "ANOTHER_MODEL" = "ANOTHER_MODEL";
    }

  }

}


export default PrismaSchemaGenerator;
