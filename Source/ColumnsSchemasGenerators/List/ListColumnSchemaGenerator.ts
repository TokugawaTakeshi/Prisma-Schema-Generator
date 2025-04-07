import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";


export default abstract class ListColumnSchemaGenerator {

  public abstract generate(
    listPropertyDefinition: PrismaSchemaGenerator.PropertyDefinition.List
  ): string;

}
