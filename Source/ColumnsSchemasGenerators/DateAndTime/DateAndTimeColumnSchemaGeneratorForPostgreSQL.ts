import DateAndTimeColumnSchemaGenerator from "./DateAndTimeColumnSchemaGenerator";
import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";
import { isNonNegativeInteger, Logger, InvalidConfigError } from "@yamato-daiwa/es-extensions";


export default class DateAndTimeColumnSchemaGeneratorForPostgreSQL extends DateAndTimeColumnSchemaGenerator {

  private static readonly MINIMAL_PRECISION: number = 0;
  private static readonly MAXIMAL_PRECISION: number = 6;


  public generate(dateAndTimeColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.DateAndTime): string {
    return super.fromTemplate(dateAndTimeColumnDefinition);
  }


  protected override getNativeDatabaseTypeAttribute(
    { withTimezone, precision }: PrismaSchemaGenerator.ColumnDefinition.DateAndTime
  ): string {

    if (!isNonNegativeInteger(precision)) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidConfigError({
          mentionToConfig: "PrismaSchemaGenerator.ColumnDefinition.DateAndTime",
          messageSpecificPart:
              "The `precision` must be the non-negative integer and, in the PostgreSQL case, be within 0 - 6 range. "
        }),
        title: InvalidConfigError.localization.defaultTitle,
        occurrenceLocation:
            "IntegerColumnSchemaGeneratorForPostgreSQL.getNativeDatabaseTypeAttribute(dateAndTimeColumnDefinition)"
      });
    }


    if (
      precision < DateAndTimeColumnSchemaGeneratorForPostgreSQL.MINIMAL_PRECISION ||
      precision > DateAndTimeColumnSchemaGeneratorForPostgreSQL.MAXIMAL_PRECISION
    ) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidConfigError({
          mentionToConfig: "PrismaSchemaGenerator.ColumnDefinition.DateAndTime",
          messageSpecificPart: "The `precision` must be within 0 - 6 range in PostgreSQL case."
        }),
        title: InvalidConfigError.localization.defaultTitle,
        occurrenceLocation:
            "IntegerColumnSchemaGeneratorForPostgreSQL.getNativeDatabaseTypeAttribute(dateAndTimeColumnDefinition)"
      });
    }


    /* [ Source ] https://www.prisma.io/docs/orm/reference/prisma-schema-reference#postgresql-6 */
    return withTimezone ? `@db.Timestamptz(${ precision })` : `@db.Timestamp(${ precision })`;

  }

}
