import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";


export default abstract class ListColumnSchemaGenerator {

  public abstract generate(
    listColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.List
  ): string;

}
