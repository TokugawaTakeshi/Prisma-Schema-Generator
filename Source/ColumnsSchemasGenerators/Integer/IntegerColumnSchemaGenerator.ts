import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";
import { isNotUndefined } from "@yamato-daiwa/es-extensions";


export default abstract class IntegerColumnSchemaGenerator {

  public abstract generate(integerColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.Integer): string;


  protected abstract getNativeDatabaseTypeAttribute(
    integerColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.Integer
  ): string;

  protected abstract getFieldScalarType(integerColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.Integer): string;


  protected fromTemplate(integerColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.Integer): string {
    return [
      integerColumnDefinition.name,
      ` ${ this.getFieldScalarType(integerColumnDefinition) }`,
      ...integerColumnDefinition.isNullable ? [ "?" ] : [],
      ` ${ this.getNativeDatabaseTypeAttribute(integerColumnDefinition) }`,
      ...integerColumnDefinition.isPrimaryKey === true ? [ " @id" ] : [],
      ...isNotUndefined(integerColumnDefinition.defaultValue) ?
          [ ` @default(${ integerColumnDefinition.defaultValue })` ] : []
    ].join("");
  }

}
