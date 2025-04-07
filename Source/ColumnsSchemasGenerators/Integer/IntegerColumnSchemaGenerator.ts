import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";
import { insertSubstringIf, isNotUndefined } from "@yamato-daiwa/es-extensions";


export default abstract class IntegerColumnSchemaGenerator {

  public abstract generate(integerPropertyDefinition: PrismaSchemaGenerator.PropertyDefinition.Integer): string;


  protected abstract getNativeDatabaseTypeAttribute(
    integerPropertyDefinition: PrismaSchemaGenerator.PropertyDefinition.Integer
  ): string;

  protected abstract getFieldScalarType(integerPropertyDefinition: PrismaSchemaGenerator.PropertyDefinition.Integer): string;


  protected fromTemplate(
    {
      propertyName,
      columnName = propertyName,
      isNullable,
      isPrimaryKey,
      defaultValue,
      ...integerPropertyDefinition
    }: PrismaSchemaGenerator.PropertyDefinition.Integer
  ): string {
    return [

      propertyName,

      this.getFieldScalarType({
        propertyName,
        columnName,
        isNullable,
        isPrimaryKey,
        defaultValue,
        ...integerPropertyDefinition
      }) + insertSubstringIf("?", isNullable),

      this.getNativeDatabaseTypeAttribute({
        propertyName,
        columnName,
        isNullable,
        isPrimaryKey,
        defaultValue,
        ...integerPropertyDefinition
      }),

      ...isPrimaryKey === true ? [ "@id" ] : [],

      ...propertyName === columnName ? [] : [ `@map("${ columnName }")` ],

      ...isNotUndefined(defaultValue) ? [ `@default(${ defaultValue })` ] : []

    ].join(" ");
  }

}
