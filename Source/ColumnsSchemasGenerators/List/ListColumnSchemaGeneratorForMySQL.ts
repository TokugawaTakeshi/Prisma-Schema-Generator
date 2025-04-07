import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";
import ListColumnSchemaGenerator from "./ListColumnSchemaGenerator";


export default class ListColumnSchemaGeneratorForMySQL extends ListColumnSchemaGenerator {

  public override generate(
    {
      propertyName,
      columnName = propertyName,
      elementType
    }: PrismaSchemaGenerator.PropertyDefinition.List
  ): string {
    return [

      propertyName,

      [
        "String",
        "Int",
        "BigInt",
        "Boolean"
      ].includes(elementType) ?
          "Json @db.Json" :
          `${ elementType }[]`,

      ...propertyName === columnName ? [] : [ `@map("${ columnName }")` ]

    ].join(" ");

  }

}
