import JSON_ColumnSchemaGenerator from "./JSON_ColumnSchemaGenerator";
import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";


export default class JSON_ColumnSchemaGeneratorForMySQL extends JSON_ColumnSchemaGenerator {

  public generate(JSON_PropertyDefinition: PrismaSchemaGenerator.PropertyDefinition.JSON): string {
    return super.fromTemplate(JSON_PropertyDefinition);
  }

  protected override getNativeDatabaseTypeAttribute(): string {
    return "@db.Json";
  }

}
