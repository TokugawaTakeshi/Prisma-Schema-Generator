import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";
import { insertSubstringIf, isNonEmptyString } from "@yamato-daiwa/es-extensions";


export default abstract class DateAndTimeColumnSchemaGenerator {

  public abstract generate(dateTimePropertyDefinition: PrismaSchemaGenerator.PropertyDefinition.DateAndTime): string;


  protected abstract getNativeDatabaseTypeAttribute(
    compoundParameter: Pick<PrismaSchemaGenerator.PropertyDefinition.DateAndTime, "precision" | "withTimezone">
  ): string;


  protected fromTemplate(
    {
      propertyName,
      columnName = propertyName,
      isNullable,
      precision,
      withTimezone,
      isAutomaticallyUpdatedUpdateAtColumn,
      defaultValue
    }: PrismaSchemaGenerator.PropertyDefinition.DateAndTime
  ): string {
    return [

      `${ propertyName } DateTime${ insertSubstringIf("?", isNullable) }`,

      this.getNativeDatabaseTypeAttribute({ precision, withTimezone }),

      ...propertyName === columnName ? [] : [ `@map("${ columnName }")` ],

      ...isAutomaticallyUpdatedUpdateAtColumn === true ? [ "@updatedAt" ] : [],

      ...isNonEmptyString(defaultValue) ? [ `@default(${ defaultValue })` ] : []

    ].join(" ");
  }

}
