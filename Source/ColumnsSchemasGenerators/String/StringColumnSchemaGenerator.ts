import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";
import { insertSubstringIf, isNotUndefined } from "@yamato-daiwa/es-extensions";


export default abstract class StringColumnSchemaGenerator {

  public abstract generate(stringPropertyDefinition: PrismaSchemaGenerator.PropertyDefinition.String): string;


  protected abstract getNativeDatabaseTypeAttribute(
    stringPropertyDefinition: PrismaSchemaGenerator.PropertyDefinition.String
  ): string;


  protected fromTemplate(
    {
      propertyName,
      columnName = propertyName,
      isNullable,
      isPrimaryKey,
      mustBeUnique,
      defaultValue,
      ...stringPropertyDefinition
    }: PrismaSchemaGenerator.PropertyDefinition.String
  ): string {
    return [

      `${ propertyName } String${ insertSubstringIf("?", isNullable) }`,

      ...isPrimaryKey === true ? [ "@id" ] : [],

      ...mustBeUnique === true ? [ "@unique" ] : [],

      this.getNativeDatabaseTypeAttribute({
        propertyName,
        columnName,
        isNullable,
        isPrimaryKey,
        mustBeUnique,
        defaultValue,
        ...stringPropertyDefinition
      }),

      ...propertyName === columnName ? [] : [ `@map("${ columnName }")` ],

      ...isNotUndefined(defaultValue) ? [ ` @default(${ defaultValue })` ] : []

    ].join(" ");
  }

}
