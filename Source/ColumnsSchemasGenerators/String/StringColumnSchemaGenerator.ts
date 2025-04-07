import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";
import { isNotUndefined } from "@yamato-daiwa/es-extensions";


export default abstract class StringColumnSchemaGenerator {

  public abstract generate(stringColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.String): string;


  protected abstract getNativeDatabaseTypeAttribute(
    stringColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.String
  ): string;


  protected fromTemplate(stringColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.String): string {
    return [
      stringColumnDefinition.name,
      " String",
      ...stringColumnDefinition.isNullable ? [ "?" ] : [],
      ...stringColumnDefinition.isPrimaryKey === true ? [ " @id" ] : [],
      ...stringColumnDefinition.mustBeUnique === true ? [ " @unique" ] : [],
      ` ${ this.getNativeDatabaseTypeAttribute(stringColumnDefinition) }`,
      ...isNotUndefined(stringColumnDefinition.defaultValue) ? [ ` @default(${ stringColumnDefinition.defaultValue })` ] : []
    ].join("");
  }

}
