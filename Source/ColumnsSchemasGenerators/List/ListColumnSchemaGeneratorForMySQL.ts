import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";
import ListColumnSchemaGenerator from "./ListColumnSchemaGenerator";


export default class ListColumnSchemaGeneratorForMySQL extends ListColumnSchemaGenerator {

  public override generate(
    {
      name,
      elementType
    }: PrismaSchemaGenerator.ColumnDefinition.List
  ): string {
    return [
      "String",
      "Int",
      "BigInt",
      "Boolean"
    ].includes(elementType) ? `${ name } @db.Json` : `${ name } ${ elementType }[]`;
  }

}
