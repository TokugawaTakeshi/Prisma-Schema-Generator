/* ━━━ < Imports ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/* ┅┅┅ Columns Schemas Generators ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
/* ╍╍╍ Integer ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
import type IntegerColumnSchemaGenerator from "./ColumnsSchemasGenerators/Integer/IntegerColumnSchemaGenerator";
import IntegerColumnSchemaGeneratorForMySQL from
    "./ColumnsSchemasGenerators/Integer/IntegerColumnSchemaGeneratorForMySQL";
import IntegerColumnSchemaGeneratorForPostgreSQL from
    "./ColumnsSchemasGenerators/Integer/IntegerColumnSchemaGeneratorForPostgreSQL";

/* ╍╍╍ Float ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
import type FloatColumnSchemaGenerator from "./ColumnsSchemasGenerators/Float/FloatColumnSchemaGenerator";
import FloatColumnSchemaGeneratorForMySQL from "./ColumnsSchemasGenerators/Float/FloatColumnSchemaGeneratorForMySQL";
import FloatColumnSchemaGeneratorForPostgreSQL from
    "./ColumnsSchemasGenerators/Float/FloatColumnSchemaGeneratorForPostgreSQL";

/* ╍╍╍ String ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
import type StringColumnSchemaGenerator from "./ColumnsSchemasGenerators/String/StringColumnSchemaGenerator";
import StringColumnSchemaGeneratorForMySQL from "./ColumnsSchemasGenerators/String/StringColumnSchemaGeneratorForMySQL";
import StringColumnSchemaGeneratorForPostgreSQL from
    "./ColumnsSchemasGenerators/String/StringColumnSchemaGeneratorForPostgreSQL";

/* ╍╍╍ Date Without Time ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
import type DateWithoutTimeColumnSchemaGenerator from
    "./ColumnsSchemasGenerators/DateWithoutTime/DateWithoutTimeColumnSchemaGenerator";
import DateWithoutTimeColumnSchemaGeneratorForMySQL from
    "./ColumnsSchemasGenerators/DateWithoutTime/DateWithoutTimeColumnSchemaGeneratorForMySQL";
import DateWithoutTimeColumnSchemaGeneratorForPostgreSQL from
    "./ColumnsSchemasGenerators/DateWithoutTime/DateWithoutTimeColumnSchemaGeneratorForPostgreSQL";

/* ╍╍╍ Date And Time ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
import type DateAndTimeColumnSchemaGenerator from
    "./ColumnsSchemasGenerators/DateAndTime/DateAndTimeColumnSchemaGenerator";
import DateAndTimeColumnSchemaGeneratorForMySQL from
    "./ColumnsSchemasGenerators/DateAndTime/DateAndTimeColumnSchemaGeneratorForMySQL";
import DateAndTimeColumnSchemaGeneratorForPostgreSQL from
    "./ColumnsSchemasGenerators/DateAndTime/DateAndTimeColumnSchemaGeneratorForPostgreSQL";

/* ╍╍╍ List ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
import type ListColumnSchemaGenerator from "./ColumnsSchemasGenerators/List/ListColumnSchemaGenerator";
import ListColumnSchemaGeneratorForPostgreSQL from
    "./ColumnsSchemasGenerators/List/ListColumnSchemaGeneratorForPostgreSQL";
import ListColumnSchemaGeneratorForMySQL from "./ColumnsSchemasGenerators/List/ListColumnSchemaGeneratorForMySQL";

/* ╍╍╍ JSON ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
import type JSON_ColumnSchemaGenerator from "./ColumnsSchemasGenerators/JSON/JSON_ColumnSchemaGenerator";
import JSON_ColumnSchemaGeneratorForPostgresSQL from "./ColumnsSchemasGenerators/JSON/JSON_ColumnSchemaGeneratorForPostgresSQL";
import JSON_ColumnSchemaGeneratorForMySQL from "./ColumnsSchemasGenerators/JSON/JSON_ColumnSchemaGeneratorForMySQL";

/* ╍╍╍ Another Model ╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍ */
import AnotherModelSchemaGenerator from "./ColumnsSchemasGenerators/AnotherModelSchemaGenerator";

/* ┅┅┅ Assets ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
import { IntegerDataTypes, FloatingPointDataTypes } from "fundamental-constants";
import type { IntegerConstructor, FloatConstructor } from "fundamental-constants";

/* ┅┅┅ Utils ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
import Path from "node:path";
import ChildProcess from "node:child_process";
import {
  getObjectPropertySafely,
  isElementOfEnumeration,
  isString,
  isNonEmptyString,
  isNotUndefined,
  Logger,
  type ParsedJSON,
  UnsupportedScenarioError, isNotNull, FileWritingFailedError
} from "@yamato-daiwa/es-extensions";
import { ConsoleApplicationLogger, ImprovedFileSystem } from "@yamato-daiwa/es-extensions-nodejs";
/* ━━━ Imports > ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */


class PrismaSchemaGenerator {

  static {
    Logger.setImplementation(ConsoleApplicationLogger);
  }


  /* ━━━ Fields ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  private readonly databaseProvider: PrismaSchemaGenerator.SupportedDatasourceProviders;

  /* ┅┅┅ Generators ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
  private readonly integerColumnSchemaGenerator: IntegerColumnSchemaGenerator;
  private readonly floatColumnSchemaGenerator: FloatColumnSchemaGenerator;
  private readonly stringColumnSchemaGenerator: StringColumnSchemaGenerator;
  private readonly dateWithoutTimeColumnSchemaGenerator: DateWithoutTimeColumnSchemaGenerator;
  private readonly dateAndTimeColumnSchemaGenerator: DateAndTimeColumnSchemaGenerator;
  private readonly listColumnSchemaGenerator: ListColumnSchemaGenerator;
  private readonly JSON_ColumnSchemaGenerator: JSON_ColumnSchemaGenerator;


  /* ━━━ Public Methods ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  public static generate(
    {
      generatorProvider,
      clientOutputPathRelativeToSchemaFile,
      targetOperatingSystems,
      datasourceProvider,
      modelsDefinitions,
      outputDirectoryAbsolutePath,
      outputFileName = "schema.prisma",
      onSucceededEventHandler,
      onFailedEventHandler
    }: Readonly<{
      generatorProvider: string;
      clientOutputPathRelativeToSchemaFile?: string;
      targetOperatingSystems?: ReadonlyArray<string>;
      datasourceProvider: PrismaSchemaGenerator.SupportedDatasourceProviders;
      modelsDefinitions: ReadonlyArray<PrismaSchemaGenerator.ModelDefinition>;
      outputDirectoryAbsolutePath: string;
      outputFileName?: string;
      onSucceededEventHandler?: () => void;
      onFailedEventHandler?: (error: unknown) => void;
    }>
  ): void {

    let notFormattedYetSchema: string;

    try {

      notFormattedYetSchema =
          new PrismaSchemaGenerator({ databaseProvider: datasourceProvider }).
              generateNotFormattedYetSchema({
                generatorProvider,
                clientOutputPathRelativeToSchemaFile,
                binaryTargets: targetOperatingSystems,
                modelsDefinitions
              });

    } catch (error: unknown) {

      Logger.logError({
        errorType: "PrismaSchemaGeneratingError",
        title: "Prisma Schema Generating Failed",
        description: "The unexpected error has occurred during the generating of Prisma schema.",
        occurrenceLocation: "PrismaSchemaGenerator.generate(compoundParameter)",
        caughtError: error
      });

      onFailedEventHandler?.(error);

      return;

    }


    const outputFileAbsolutePath: string =
        `${ Path.normalize(outputDirectoryAbsolutePath) }${ Path.sep }${ outputFileName }`;

    try {

      ImprovedFileSystem.writeFileToPossiblyNotExistingDirectory({
        filePath: outputFileAbsolutePath,
        content: notFormattedYetSchema,
        synchronously: true
      });

    } catch (error: unknown) {

      Logger.logError({
        errorType: FileWritingFailedError.NAME,
        title: FileWritingFailedError.localization.defaultTitle,
        description: "The Prisma schema has been generated but the following error has occurred during the writing to file.",
        occurrenceLocation: "PrismaSchemaGenerator.generate(compoundParameter)",
        caughtError: error
      });

      onFailedEventHandler?.(error);

      return;

    }


    ChildProcess.execFile(
      "node",
      [
        Path.join(process.cwd(), "node_modules", "prisma", "build", "index.js"),
        "format",
        "--schema",
        outputFileAbsolutePath
      ],
      (
        error: ChildProcess.ExecFileException | null,
        standardOutput: string | Buffer,
        standardError: string | Buffer
      ): void => {

        /* [ Theory ] Prisma CLI
         * When formatting is successful,
         * ● `error` is `null`
         * ● `standardError` is `"Prisma schema loaded from {{ path }}."`.
         * ● `standardOutput` is `"Formatted {{ path }} in {{ duration__milliseconds }}ms 🚀"`
         * When formatting failed,
         * ● `error` is not `null`
         * ● `standardError` is `"Error: Could not load `--schema` from provided path ${ path }: file or directory not found"`.
         * ● `standardOutput` is empty
         *  */

        const stringifiedStandardError: string =
            Buffer.isBuffer(standardError) ? standardError.toString("utf8") : standardError;

        if (isNotNull(error)) {

          Logger.logError({
            errorType: "PrismaSchemaFormattingError",
            title: "Prisma Schema Formatting Failed",
            description: stringifiedStandardError,
            occurrenceLocation: "PrismaSchemaGenerator.generate(compoundParameter)",
            caughtError: error
          });

          onFailedEventHandler?.(error);
          return;

        }


        const stringifiedStandardOutput: string =
            Buffer.isBuffer(standardOutput) ? standardOutput.toString("utf8") : standardOutput;

        Logger.logSuccess({
          title: "Prisma Schema Formatting Succeeded",
          // Formatted Tests\Manual\Minimal\_Generated\schema.prisma in 14ms 🚀
          description: stringifiedStandardOutput
        });

        onSucceededEventHandler?.();

      }
    );

  }


  /* ━━━ Constructor ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  private constructor(
    {
      databaseProvider
    }: Readonly<{
      databaseProvider: PrismaSchemaGenerator.SupportedDatasourceProviders;
    }>
  ) {

    this.databaseProvider = databaseProvider;

    switch (this.databaseProvider) {

      case PrismaSchemaGenerator.SupportedDatasourceProviders.MySQL: {
        this.integerColumnSchemaGenerator = new IntegerColumnSchemaGeneratorForMySQL();
        this.floatColumnSchemaGenerator = new FloatColumnSchemaGeneratorForMySQL();
        this.stringColumnSchemaGenerator = new StringColumnSchemaGeneratorForMySQL();
        this.dateWithoutTimeColumnSchemaGenerator = new DateWithoutTimeColumnSchemaGeneratorForMySQL();
        this.dateAndTimeColumnSchemaGenerator = new DateAndTimeColumnSchemaGeneratorForMySQL();
        this.listColumnSchemaGenerator = new ListColumnSchemaGeneratorForMySQL();
        this.JSON_ColumnSchemaGenerator = new JSON_ColumnSchemaGeneratorForMySQL();
        break;
      }

      case PrismaSchemaGenerator.SupportedDatasourceProviders.PostgreSQL: {
        this.integerColumnSchemaGenerator = new IntegerColumnSchemaGeneratorForPostgreSQL();
        this.floatColumnSchemaGenerator = new FloatColumnSchemaGeneratorForPostgreSQL();
        this.stringColumnSchemaGenerator = new StringColumnSchemaGeneratorForPostgreSQL();
        this.dateWithoutTimeColumnSchemaGenerator = new DateWithoutTimeColumnSchemaGeneratorForPostgreSQL();
        this.dateAndTimeColumnSchemaGenerator = new DateAndTimeColumnSchemaGeneratorForPostgreSQL();
        this.listColumnSchemaGenerator = new ListColumnSchemaGeneratorForPostgreSQL();
        this.JSON_ColumnSchemaGenerator = new JSON_ColumnSchemaGeneratorForPostgresSQL();
        break;
      }

      case PrismaSchemaGenerator.SupportedDatasourceProviders.SQLite:
      case PrismaSchemaGenerator.SupportedDatasourceProviders.SQL_Server:
      case PrismaSchemaGenerator.SupportedDatasourceProviders.CockroachDB:
      case PrismaSchemaGenerator.SupportedDatasourceProviders.MongoDB:
      {

        Logger.throwErrorWithFormattedMessage({
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
      modelsDefinitions
    }: Readonly<{
      generatorProvider: string;
      clientOutputPathRelativeToSchemaFile?: string;
      binaryTargets?: ReadonlyArray<string>;
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
      "}",

      ...modelsDefinitions.map(this.generateModelSchema.bind(this))

    ].join("\n");

  }

  private generateModelSchema(
    {
      modelName,
      tableName,
      propertiesDefinitions,
      compositeID,
      compoundUniqueConstraint = []
    }: PrismaSchemaGenerator.ModelDefinition
  ): string {
    return [
      `model ${ modelName } {`,
      ...propertiesDefinitions.map(this.generateColumnSchema.bind(this)),
      ...isNotUndefined(compositeID) && compositeID.fields.length > 0 ?
          [
            [
              "@@id(",
              [
                `fields: [${ compositeID.fields.join(", ") }]`,
                ...isNotUndefined(compositeID.parameterName) ? [ `name: "${ compositeID.parameterName }"` ] : []
              ].join(", "),
              ")"
            ].join("")
          ] :
          [],
      ...compoundUniqueConstraint.length > 0 ? [ `@@unique([${ compoundUniqueConstraint.join(", ") }])` ] : [],
      ...isNotUndefined(tableName) ? [ `@@map("${ tableName }")` ] : [],
      "}"
    ].join("\n");
  }

  private generateColumnSchema(propertyDefinition: PrismaSchemaGenerator.PropertyDefinition): string {

    if (PrismaSchemaGenerator.isStringPropertyDefinition(propertyDefinition)) {
      return this.stringColumnSchemaGenerator.generate(propertyDefinition);
    }


    if (PrismaSchemaGenerator.isIntegerPropertyDefinition(propertyDefinition)) {
      return this.integerColumnSchemaGenerator.generate(propertyDefinition);
    }


    if (PrismaSchemaGenerator.isFloatPropertyDefinition(propertyDefinition)) {
      return this.floatColumnSchemaGenerator.generate(propertyDefinition);
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
      return AnotherModelSchemaGenerator.generate(propertyDefinition);
    }

    if (PrismaSchemaGenerator.isJSON_ModelPropertyDefinition(propertyDefinition)) {
      return this.JSON_ColumnSchemaGenerator.generate(propertyDefinition);
    }


    Logger.throwErrorWithFormattedMessage({
      errorInstance: new UnsupportedScenarioError(
        `The property "${ String(getObjectPropertySafely(propertyDefinition, "propertyName")) }" has unsupported type.`
      ),
      title: UnsupportedScenarioError.localization.defaultTitle,
      occurrenceLocation: "PrismaSchemaGenerator.generateColumnSchema(propertyDefinition)"
    });

  }

  private static isStringPropertyDefinition(
    propertyDefinition: PrismaSchemaGenerator.PropertyDefinition
  ): propertyDefinition is PrismaSchemaGenerator.PropertyDefinition.String {
    return typeof propertyDefinition.type === "function" && propertyDefinition.type.name === "String";
  }

  private static isIntegerPropertyDefinition(
    propertyDefinition: PrismaSchemaGenerator.PropertyDefinition
  ): propertyDefinition is PrismaSchemaGenerator.PropertyDefinition.Integer {
    return (typeof propertyDefinition.type === "function" && propertyDefinition.type.name === "Integer") ||
        (isString(propertyDefinition.type) && isElementOfEnumeration(propertyDefinition.type, IntegerDataTypes));
  }

  private static isFloatPropertyDefinition(
    propertyDefinition: PrismaSchemaGenerator.PropertyDefinition
  ): propertyDefinition is PrismaSchemaGenerator.PropertyDefinition.Float {
    return (typeof propertyDefinition.type === "function" && propertyDefinition.type.name === "Float") ||
        (isString(propertyDefinition.type) && isElementOfEnumeration(propertyDefinition.type, FloatingPointDataTypes));
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

  /* ━━━ Prisma Configuration ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  type PrismaConfiguration = PrismaConfiguration.CounterintuitiveNativeAPI | PrismaConfiguration.ObviousAPI;

  export namespace PrismaConfiguration {

    /* ┅┅┅ Counterintuitive Native API ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
    export type CounterintuitiveNativeAPI = Readonly<{
      generator: CounterintuitiveNativeAPI.Generator;
      client: CounterintuitiveNativeAPI.Client;
    }>;

    export namespace CounterintuitiveNativeAPI {

      /** @see https://www.prisma.io/docs/orm/v7/reference/prisma-schema-reference#generator */
      export type Generator = Readonly<{
        provider: string;
        output?: string;
        previewFeatures?: ReadonlyArray<string>;
        engineType?: string;
        binaryTargets?: ReadonlyArray<string>;
        moduleFormat?: string;
      }>;

      /** @see https://www.prisma.io/docs/orm/v7/reference/prisma-schema-reference#generator */
      export type Client = Readonly<{
        provider: string;
        output: string;
        previewFeatures?: ReadonlyArray<string>;
        runtime?: string;
        moduleFormat?: string;
        generatedFileExtension?: string;
        importFileExtension?: string;
        compilerBuild?: string;
      }>;

    }


    /* ┅┅┅ Obvious API ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
    export type ObviousAPI = Readonly<{
      generatorProvider: string;
      clientOutputPathRelativeToSchemaFile: string;
      previewFeatures?: ReadonlyArray<string>;
      queryEngine?: string;
      targetOperatingSystems?: ReadonlyArray<string>;
      outputModulesFormat?: string;
    }>;

    export namespace ObviousAPI {

    }

  }

  export enum SupportedDatasourceProviders {
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
    compositeID?: CompositeID;
    compoundUniqueConstraint?: ReadonlyArray<string>;
  }>;

  export type CompositeID = Readonly<{
    parameterName?: string;
    fields: ReadonlyArray<string>;
  }>;

  export enum ReferentialActions {
    cascade = "Cascade",
    restrict = "Restrict",
    noAction = "NoAction",
    setNull = "SetNull",
    setDefault = "SetDefault"
  }


  /* ━━━ Property Definition ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  export type PropertyDefinition =
      PropertyDefinition.String |
      PropertyDefinition.Integer |
      PropertyDefinition.Float |
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


    /* ┅┅┅ String ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
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


    /* ┅┅┅ Integer ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
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


    /* ┅┅┅ Float ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
    export type Float =
        CommonPart &
        Readonly<
          {
            isPrimaryKey?: boolean;
            defaultValue?: number;
          } &
          (
            (
              {
                type: FloatConstructor;
                maximalValue: number;
              } &
              (
                { minimalValue: number; } |
                { isUnsigned: true; }
              )
            ) |
            {
              type: FloatingPointDataTypes;
              isUnsigned: boolean;
            }
          )
        >;


    /* ┅┅┅ Date Without Time ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
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


    /* ┅┅┅ Date and Time ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
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


    /* ┅┅┅ List ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
    export type List =
        Omit<CommonPart, "isNullable"> &
        Readonly<{
          type: typeof List.TYPE;
          elementType: string;
        }>;

    export namespace List {
      export const TYPE: "LIST" = "LIST";
    }


    /* ┅┅┅ JSON ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
    export type JSON =
        CommonPart &
        Readonly<{
          type: typeof JSON.TYPE;
          defaultValue?: ParsedJSON;
        }>;

    export namespace JSON {
      export const TYPE: "JSON" = "JSON";
    }


    /* ┅┅┅ Another Model ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ */
    export type AnotherModel =
        CommonPart &
        Readonly<{
          type: typeof AnotherModel.TYPE;
          targetModelName: string;
          relation: {
            ownFields: ReadonlyArray<string>;
            fieldsOnOtherSideOfRelation: ReadonlyArray<string>;
            onUpdate: ReferentialActions;
            onDelete: ReferentialActions;
          };
        }>;

    export namespace AnotherModel {
      export const TYPE: "ANOTHER_MODEL" = "ANOTHER_MODEL";
    }

  }

}


export default PrismaSchemaGenerator;
