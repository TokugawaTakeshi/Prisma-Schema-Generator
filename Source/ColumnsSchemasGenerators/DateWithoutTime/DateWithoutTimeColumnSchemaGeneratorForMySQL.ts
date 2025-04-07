import DateWithoutTimeColumnSchemaGenerator from "./DateWithoutTimeColumnSchemaGenerator";
import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";


export default class DateWithoutTimeColumnSchemaGeneratorForMySQL extends DateWithoutTimeColumnSchemaGenerator {


  public generate(dateWithoutTimePropertyDefinition: PrismaSchemaGenerator.PropertyDefinition.DateWithoutTime): string {
    return super.fromTemplate(dateWithoutTimePropertyDefinition);
  }

  /* [ Theory ]
   *  According the documentation (https://www.prisma.io/docs/orm/reference/prisma-schema-reference#datetime) for the
   *    begin of 2025, the `@db.Date` accepts one parameter ofr MySQL case. But actually, the passing of the parameter
   *    will cause "Function `Date` takes 0 arguments, but received 1." error.
   * */
  protected override getNativeDatabaseTypeAttribute(): string {
    return "@db.Date";
  }

}
