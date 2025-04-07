import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";
import { insertSubstringIf, isNonEmptyString } from "@yamato-daiwa/es-extensions";


export default abstract class DateWithoutTimeColumnSchemaGenerator {

  public abstract generate(dateWithoutTimePropertyDefinition: PrismaSchemaGenerator.PropertyDefinition.DateWithoutTime): string;


  protected abstract getNativeDatabaseTypeAttribute(): string;


  protected fromTemplate(
    {
      propertyName,
      columnName = propertyName,
      isNullable,
      isAutomaticallyUpdatedUpdateAtColumn,
      defaultValue
    }: PrismaSchemaGenerator.PropertyDefinition.DateWithoutTime
  ): string {
    return [

      `${ propertyName } DateTime${ insertSubstringIf("?", isNullable) }`,

      this.getNativeDatabaseTypeAttribute(),

      ...propertyName === columnName ? [] : [ `@map("${ columnName }")` ],

      ...isAutomaticallyUpdatedUpdateAtColumn === true ? [ "@updatedAt" ] : [],

      ...isNonEmptyString(defaultValue) ? [ `@default(${ defaultValue })` ] : []

    ].join(" ");
  }

}
