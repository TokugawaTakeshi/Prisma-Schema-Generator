import DateWithoutTimeColumnSchemaGenerator from "./DateWithoutTimeColumnSchemaGenerator";
import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";


export default class DateWithoutTimeColumnSchemaGeneratorForPostgreSQL extends DateWithoutTimeColumnSchemaGenerator {

  public generate(dateWithoutTimeColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.DateWithoutTime): string {
    return super.fromTemplate(dateWithoutTimeColumnDefinition);
  }


  protected override getNativeDatabaseTypeAttribute(): string {
    return "@db.Date";
  }

}
