import StringColumnSchemaGenerator from "./StringColumnSchemaGenerator";
import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";
import {
  Logger,
  InvalidExternalDataError,
  isUndefined,
  isNotUndefined
} from "@yamato-daiwa/es-extensions";


export default class StringColumnSchemaGeneratorForPostgreSQL extends StringColumnSchemaGenerator {

  public override generate(stringPropertyDefinition: PrismaSchemaGenerator.PropertyDefinition.String): string {
    return super.fromTemplate(stringPropertyDefinition);
  }

  protected override getNativeDatabaseTypeAttribute(
    stringPropertyDefinition: PrismaSchemaGenerator.PropertyDefinition.String
  ): string {

    if (stringPropertyDefinition.isPrimaryKey === true) {

      const maximalCharactersCount: number | undefined =
          stringPropertyDefinition.maximalCharactersCount ?? stringPropertyDefinition.fixedCharactersCount;

      if (isUndefined(maximalCharactersCount)) {
        Logger.throwErrorWithFormattedMessage({
          errorInstance: new InvalidExternalDataError({
            mentionToExpectedData: `"${ stringPropertyDefinition.propertyName }" String Column Definition`,
            customMessage: "If target string is a primary key, either maximal or fixed characters count must be specified."
          }),
          title: InvalidExternalDataError.localization.defaultTitle,
          occurrenceLocation: "StringColumnSchemaGeneratorForPostgreSQL.getNativeDatabaseTypeAttribute(stringPropertyDefinition)"
        });
      }


      return `@db.VarChar(${ maximalCharactersCount })`;

    }


    if (isNotUndefined(stringPropertyDefinition.maximalCharactersCount)) {
      return `@db.VarChar(${ stringPropertyDefinition.maximalCharactersCount })`;
    }


    if (isNotUndefined(stringPropertyDefinition.fixedCharactersCount)) {
      return `@db.Char(${ stringPropertyDefinition.fixedCharactersCount })`;
    }


    return "@db.Text";

  }

}
