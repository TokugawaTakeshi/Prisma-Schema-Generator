import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";
import { insertSubstringIf, isNotUndefined } from "@yamato-daiwa/es-extensions";


export default abstract class FloatColumnSchemaGenerator {

  public abstract generate(floatPropertyDefinition: PrismaSchemaGenerator.PropertyDefinition.Float): string;


  protected abstract getNativeDatabaseTypeAttribute(
    floatPropertyDefinition: PrismaSchemaGenerator.PropertyDefinition.Float
  ): string;

  protected abstract getFieldScalarType(floatPropertyDefinition: PrismaSchemaGenerator.PropertyDefinition.Float): string;


  protected fromTemplate(
    {
      propertyName,
      columnName = propertyName,
      isNullable,
      isPrimaryKey,
      defaultValue,
      ...floatPropertyDefinition
    }: PrismaSchemaGenerator.PropertyDefinition.Float
  ): string {
    return [

      propertyName,

      this.getFieldScalarType({
        propertyName,
        columnName,
        isNullable,
        isPrimaryKey,
        defaultValue,
        ...floatPropertyDefinition
      }) + insertSubstringIf("?", isNullable),

      this.getNativeDatabaseTypeAttribute({
        propertyName,
        columnName,
        isNullable,
        isPrimaryKey,
        defaultValue,
        ...floatPropertyDefinition
      }),

      ...isPrimaryKey === true ? [ "@id" ] : [],

      ...propertyName === columnName ? [] : [ `@map("${ columnName }")` ],

      ...isNotUndefined(defaultValue) ? [ `@default(${ defaultValue })` ] : []

    ].join(" ");
  }

}
