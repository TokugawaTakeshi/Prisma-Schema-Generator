/* ─── Columns Schemas Generators ─────────────────────────────────────────────────────────────────────────────────── */
import type IntegerColumnSchemaGenerator from "./ColumnsSchemasGenerators/Integer/IntegerColumnSchemaGenerator";
import IntegerColumnSchemaGeneratorForPostgreSQL from
    "./ColumnsSchemasGenerators/Integer/IntegerColumnSchemaGeneratorForPostgreSQL";
import type StringColumnSchemaGenerator from "./ColumnsSchemasGenerators/String/StringColumnSchemaGenerator";
import StringColumnSchemaGeneratorForPostgreSQL from
    "./ColumnsSchemasGenerators/String/StringColumnSchemaGeneratorForPostgreSQL";
import type DateAndTimeColumnSchemaGenerator from
    "./ColumnsSchemasGenerators/DateAndTime/DateAndTimeColumnSchemaGenerator";
import DateAndTimeColumnSchemaGeneratorForPostgreSQL from
    "./ColumnsSchemasGenerators/DateAndTime/DateAndTimeColumnSchemaGeneratorForPostgreSQL";
import ListColumnSchemaGenerator from
      "./ColumnsSchemasGenerators/ListColumnSchemaGenerator";
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


  public static async generate(
    {
      generatorProvider,
      databaseProvider,
      modelsDefinitions,
      outputFileAbsolutePath
    }: Readonly<{
      generatorProvider: string;
      databaseProvider: PrismaSchemaGenerator.SupportedDatabaseProviders;
      modelsDefinitions: ReadonlyArray<PrismaSchemaGenerator.ModelDefinition>;
      outputFileAbsolutePath: string;
    }>
  ): Promise<void> {

    const notFormattedSchema: string = new PrismaSchemaGenerator({ databaseProvider }).
        generateNotFormattedSchema({ generatorProvider, modelsDefinitions });

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

      case PrismaSchemaGenerator.SupportedDatabaseProviders.PostgreSQL: {
        this.integerColumnSchemaGenerator = new IntegerColumnSchemaGeneratorForPostgreSQL();
        this.stringColumnSchemaGenerator = new StringColumnSchemaGeneratorForPostgreSQL();
        this.dateAndTimeColumnSchemaGenerator = new DateAndTimeColumnSchemaGeneratorForPostgreSQL()
        break;
      }

      // case PrismaSchemaGenerator.SupportedDatabaseProviders.MySQL: {
      //   this.integerColumnSchemaGenerator = new IntegerColumnSchemaGeneratorForMySQL();
      //   this.stringColumnSchemaGenerator = new StringColumnSchemaGeneratorForMySQL();
      //   break;
      // }

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
      modelsDefinitions
    }: Readonly<{
      generatorProvider: string;
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
      `  url      = env("DATABASE_URL")`,
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
      return ListColumnSchemaGenerator.generate(columnDefinition);
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
