import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";
import { insertSubstringIf, isNotUndefined } from "@yamato-daiwa/es-extensions";


export default abstract class JSON_ColumnSchemaGenerator {

  public abstract generate(JSON_PropertyDefinition: PrismaSchemaGenerator.PropertyDefinition.JSON): string;


  protected abstract getNativeDatabaseTypeAttribute(): string;


  protected fromTemplate(
    {
      propertyName,
      columnName = propertyName,
      isNullable,
      defaultValue
    }: PrismaSchemaGenerator.PropertyDefinition.JSON
  ): string {
    return [

      `${ propertyName } Json${ insertSubstringIf("?", isNullable) }`,

      this.getNativeDatabaseTypeAttribute(),

      ...propertyName === columnName ? [] : [ `@map("${ columnName }")` ],

      ...isNotUndefined(defaultValue) ? [ ` @default(${ JSON.stringify(defaultValue) })` ] : []

    ].join(" ");
  }

}
