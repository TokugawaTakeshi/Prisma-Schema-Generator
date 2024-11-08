import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";


export default abstract class DateAndTimeColumnSchemaGenerator {

  public abstract generate(dateTimeColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.DateAndTime): string;


  protected abstract getNativeDatabaseTypeAttribute(
    stringColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.DateAndTime
  ): string;


  protected fromTemplate(dateAndTimeColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.DateAndTime): string {
    return [
      dateAndTimeColumnDefinition.name,
      " DateTime",
      ...dateAndTimeColumnDefinition.isNullable ? [ "?" ] : [],
      ` ${ this.getNativeDatabaseTypeAttribute(dateAndTimeColumnDefinition) }`
    ].join("");
  }

}
