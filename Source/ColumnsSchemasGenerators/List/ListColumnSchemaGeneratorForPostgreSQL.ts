import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";
import ListColumnSchemaGenerator from "./ListColumnSchemaGenerator";


export default class ListColumnSchemaGeneratorForPostgreSQL extends ListColumnSchemaGenerator {

  public override generate(
    {
      propertyName,
      columnName = propertyName,
      elementType
    }: PrismaSchemaGenerator.PropertyDefinition.List
  ): string {
    return [
      propertyName,
      `${ elementType }[]`,
      ...propertyName === columnName ? [] : [ `@map("${ columnName }")` ]
    ].join(" ");
  }

}
