import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";


export default abstract class DateWithoutTimeColumnSchemaGenerator {

  public abstract generate(dateWithoutTimeColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.DateWithoutTime): string;


  protected abstract getNativeDatabaseTypeAttribute(
    dateTimeColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.DateWithoutTime
  ): string;


  protected fromTemplate(dateWithoutTimeColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.DateWithoutTime): string {
    return [
      dateWithoutTimeColumnDefinition.name,
      " DateTime",
      ...dateWithoutTimeColumnDefinition.isNullable ? [ "?" ] : [],
      ` ${ this.getNativeDatabaseTypeAttribute(dateWithoutTimeColumnDefinition) }`,
      ...dateWithoutTimeColumnDefinition.isAutomaticallyUpdatedUpdateAtColumn === true ?
          [ " @updatedAt" ] : []
    ].join("");
  }

}
