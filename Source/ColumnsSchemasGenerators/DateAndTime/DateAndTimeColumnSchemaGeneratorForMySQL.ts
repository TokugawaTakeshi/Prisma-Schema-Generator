import DateAndTimeColumnSchemaGenerator from "./DateAndTimeColumnSchemaGenerator";
import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";
import { isNonNegativeInteger, Logger, InvalidConfigError } from "@yamato-daiwa/es-extensions";


export default class DateAndTimeColumnSchemaGeneratorForMySQL extends DateAndTimeColumnSchemaGenerator {

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
              "The `precision` must be the non-negative integer and, in the MySQL case, be within 0 - 6 range. "
        }),
        title: InvalidConfigError.localization.defaultTitle,
        occurrenceLocation:
            "DateAndTimeColumnSchemaGeneratorForMySQL.getNativeDatabaseTypeAttribute(dateAndTimeColumnDefinition)"
      });
    }


    if (
      precision < DateAndTimeColumnSchemaGeneratorForMySQL.MINIMAL_PRECISION ||
      precision > DateAndTimeColumnSchemaGeneratorForMySQL.MAXIMAL_PRECISION
    ) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidConfigError({
          mentionToConfig: "PrismaSchemaGenerator.ColumnDefinition.DateAndTime",
          messageSpecificPart: "The `precision` must be within 0 - 6 range in MySQL case."
        }),
        title: InvalidConfigError.localization.defaultTitle,
        occurrenceLocation:
            "IntegerColumnSchemaGeneratorForPostgreSQL.getNativeDatabaseTypeAttribute(dateAndTimeColumnDefinition)"
      });
    }


    /* [ Theory ]
    * MySQL converts TIMESTAMP values from the current time zone to UTC for storage, and back from UTC to the current
    * time zone for retrieval. This does not occur for other types such as DATETIME,
    * By default, the current time zone for each connection is the server's time.
    *
    * [ Reference ] https://dev.mysql.com/doc/refman/8.0/en/datetime.html
    * [ Reference ] https://www.prisma.io/docs/orm/reference/prisma-schema-reference#mysql-6 */
    return withTimezone ? `@db.Timestamp(${ precision })` : `@db.DateTime(${ precision })`;

  }

}
