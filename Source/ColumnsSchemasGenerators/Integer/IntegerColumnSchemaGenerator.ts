import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";
import type { IntegerDataTypes } from "fundamental-constants";
import { isNotUndefined } from "@yamato-daiwa/es-extensions";


export default abstract class IntegerColumnSchemaGenerator {

  public abstract generate(integerColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.Integer): string;


  protected abstract getNativeDatabaseTypeAttribute(integerType: IntegerDataTypes): string;

  protected abstract getFieldScalarType(integerType: IntegerDataTypes): string;


  protected fromTemplate(integerColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.Integer): string {
    return [
      integerColumnDefinition.name,
      ` ${ this.getFieldScalarType(integerColumnDefinition.type) }`,
      ...integerColumnDefinition.isNullable ? [ "?" ] : [],
      ` ${ this.getNativeDatabaseTypeAttribute(integerColumnDefinition.type) }`,
      ...integerColumnDefinition.isPrimaryKey === true ? [ " @id" ] : [],
      ...isNotUndefined(integerColumnDefinition.defaultValue) ?
          [ ` @default(${ integerColumnDefinition.defaultValue })` ] : []
    ].join("");
  }

}
