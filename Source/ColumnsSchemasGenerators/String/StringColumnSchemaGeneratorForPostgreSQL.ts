import StringColumnSchemaGenerator from "./StringColumnSchemaGenerator";
import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";
import {
  Logger,
  InvalidExternalDataError,
  isUndefined,
  isNotUndefined
} from "@yamato-daiwa/es-extensions";


export default class StringColumnSchemaGeneratorForPostgreSQL extends StringColumnSchemaGenerator {

  public override generate(stringColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.String): string {
    return super.fromTemplate(stringColumnDefinition);
  }

  protected override getNativeDatabaseTypeAttribute(
    stringColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.String
  ): string {

    if (stringColumnDefinition.isPrimaryKey === true) {

      const maximalCharactersCount: number | undefined =
          stringColumnDefinition.maximalCharactersCount ?? stringColumnDefinition.fixedCharactersCount;

      if (isUndefined(maximalCharactersCount)) {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidExternalDataError({
            mentionToExpectedData: `"${ stringColumnDefinition.name }" Column Definition`,
            customMessage: "If target string is a primary key, either maximal or fixed characters count must be specified"
          }),
          title: InvalidExternalDataError.localization.defaultTitle,
          occurrenceLocation: "StringColumnSchemaGeneratorForPostgreSQL.getNativeDatabaseTypeAttribute(stringColumnDefinition)"
        });
      }


      return `@db.VarChar(${ maximalCharactersCount })`;

    }


    if (isNotUndefined(stringColumnDefinition.maximalCharactersCount)) {
      return `@db.VarChar(${ stringColumnDefinition.maximalCharactersCount })`;
    }


    if (isNotUndefined(stringColumnDefinition.fixedCharactersCount)) {
      return `@db.Char(${ stringColumnDefinition.fixedCharactersCount })`;
    }


    return "@db.Text";

  }

}
