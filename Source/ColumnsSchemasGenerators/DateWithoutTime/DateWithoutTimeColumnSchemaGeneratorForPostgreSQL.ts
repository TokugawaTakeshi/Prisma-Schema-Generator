import DateWithoutTimeColumnSchemaGenerator from "./DateWithoutTimeColumnSchemaGenerator";
import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";


export default class DateWithoutTimeColumnSchemaGeneratorForPostgreSQL extends DateWithoutTimeColumnSchemaGenerator {

  public generate(dateWithoutTimePropertyDefinition: PrismaSchemaGenerator.PropertyDefinition.DateWithoutTime): string {
    return super.fromTemplate(dateWithoutTimePropertyDefinition);
  }


  protected override getNativeDatabaseTypeAttribute(): string {
    return "@db.Date";
  }

}
