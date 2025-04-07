import DateAndTimeColumnSchemaGenerator from "./DateAndTimeColumnSchemaGenerator";
import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";
import { isNaturalNumberOrZero, Logger, InvalidConfigError } from "@yamato-daiwa/es-extensions";


export default class DateAndTimeColumnSchemaGeneratorForPostgreSQL extends DateAndTimeColumnSchemaGenerator {

  private static readonly MINIMAL_PRECISION: number = 0;
  private static readonly MAXIMAL_PRECISION: number = 6;


  public generate(dateAndTimePropertyDefinition: PrismaSchemaGenerator.PropertyDefinition.DateAndTime): string {
    return super.fromTemplate(dateAndTimePropertyDefinition);
  }


  protected override getNativeDatabaseTypeAttribute(
    { withTimezone, precision }: Pick<PrismaSchemaGenerator.PropertyDefinition.DateAndTime, "precision" | "withTimezone">
  ): string {

    if (!isNaturalNumberOrZero(precision)) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidConfigError({
          mentionToConfig: "PrismaSchemaGenerator.PropertyDefinition.DateAndTime",
          messageSpecificPart:
              "The `precision` must be the non-negative integer and, in the PostgreSQL case, be within 0 - 6 range. "
        }),
        title: InvalidConfigError.localization.defaultTitle,
        occurrenceLocation:
            "IntegerColumnSchemaGeneratorForPostgreSQL.getNativeDatabaseTypeAttribute(dateAndTimePropertyDefinition)"
      });
    }


    if (
      precision < DateAndTimeColumnSchemaGeneratorForPostgreSQL.MINIMAL_PRECISION ||
      precision > DateAndTimeColumnSchemaGeneratorForPostgreSQL.MAXIMAL_PRECISION
    ) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidConfigError({
          mentionToConfig: "PrismaSchemaGenerator.PropertyDefinition.DateAndTime",
          messageSpecificPart: "The `precision` must be within 0 - 6 range in PostgreSQL case."
        }),
        title: InvalidConfigError.localization.defaultTitle,
        occurrenceLocation:
            "IntegerColumnSchemaGeneratorForPostgreSQL.getNativeDatabaseTypeAttribute(dateAndTimePropertyDefinition)"
      });
    }


    /* [ Source ] https://www.prisma.io/docs/orm/reference/prisma-schema-reference#postgresql-6 */
    return withTimezone ? `@db.Timestamptz(${ precision })` : `@db.Timestamp(${ precision })`;

  }

}
