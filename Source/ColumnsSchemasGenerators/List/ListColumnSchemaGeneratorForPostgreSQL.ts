import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";
import ListColumnSchemaGenerator from "./ListColumnSchemaGenerator";


export default class ListColumnSchemaGeneratorForPostgreSQL extends ListColumnSchemaGenerator {

  public override generate(
    {
      name,
      elementType
    }: PrismaSchemaGenerator.ColumnDefinition.List
  ): string {
    return [
      name,
      ` ${ elementType }[]`
    ].join("");
  }

}
