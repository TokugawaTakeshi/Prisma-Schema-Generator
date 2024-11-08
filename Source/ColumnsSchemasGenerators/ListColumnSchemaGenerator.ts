import type PrismaSchemaGenerator from "../PrismaSchemaGenerator";


export default abstract class ListColumnSchemaGenerator {

  public static generate(
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
