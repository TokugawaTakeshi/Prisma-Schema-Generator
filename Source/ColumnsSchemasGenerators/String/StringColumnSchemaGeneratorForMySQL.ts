import StringColumnSchemaGenerator from "./StringColumnSchemaGenerator";
import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";
import {
  Logger,
  InvalidExternalDataError,
  isUndefined,
  isNotUndefined
} from "@yamato-daiwa/es-extensions";


export default class StringColumnSchemaGeneratorForMySQL extends StringColumnSchemaGenerator {

  private static readonly TINY_TEXT_MAXIMAL_LENGTH: number = 255;
  private static readonly TEXT_MAXIMAL_LENGTH: number = 65_535;
  private static readonly MEDIUM_TEXT_MAXIMAL_LENGTH: number = 16_777_215;
  private static readonly LONG_TEXT_MAXIMAL_LENGTH: number = 4_294_967_295;


  public override generate(stringPropertyDefinition: PrismaSchemaGenerator.PropertyDefinition.String): string {
    return super.fromTemplate(stringPropertyDefinition);
  }


  protected override getNativeDatabaseTypeAttribute(
    stringPropertyDefinition: PrismaSchemaGenerator.PropertyDefinition.String
  ): string {

    if (
      stringPropertyDefinition.isPrimaryKey === true ||
      stringPropertyDefinition.mustBeUnique === true
    ) {

      const maximalCharactersCount: number | undefined =
          stringPropertyDefinition.maximalCharactersCount ?? stringPropertyDefinition.fixedCharactersCount;

      if (isUndefined(maximalCharactersCount)) {
        Logger.throwErrorAndLog({
          errorInstance: new InvalidExternalDataError({
            mentionToExpectedData: `"${ stringPropertyDefinition.propertyName }" String Column Definition`,
            customMessage: "If target string is a primary key, either maximal or fixed characters count must be specified."
          }),
          title: InvalidExternalDataError.localization.defaultTitle,
          occurrenceLocation: "StringColumnSchemaGeneratorForMySQL.getNativeDatabaseTypeAttribute(stringPropertyDefinition)"
        });
      }


      return `@db.VarChar(${ maximalCharactersCount })`;

    }


    if (isNotUndefined(stringPropertyDefinition.maximalCharactersCount)) {

      if (stringPropertyDefinition.maximalCharactersCount <= StringColumnSchemaGeneratorForMySQL.TINY_TEXT_MAXIMAL_LENGTH) {
        return "@db.TinyText";
      }


      if (stringPropertyDefinition.maximalCharactersCount <= StringColumnSchemaGeneratorForMySQL.TEXT_MAXIMAL_LENGTH) {
        return "@db.Text";
      }


      if (stringPropertyDefinition.maximalCharactersCount <= StringColumnSchemaGeneratorForMySQL.MEDIUM_TEXT_MAXIMAL_LENGTH) {
        return "@db.MediumText";
      }

      if (stringPropertyDefinition.maximalCharactersCount <= StringColumnSchemaGeneratorForMySQL.LONG_TEXT_MAXIMAL_LENGTH) {
        return "@db.LongText";
      }


      return `@db.VarChar(${ stringPropertyDefinition.maximalCharactersCount })`;

    }


    if (isNotUndefined(stringPropertyDefinition.fixedCharactersCount)) {
      return `@db.Char(${ stringPropertyDefinition.fixedCharactersCount })`;
    }


    return "@db.Text";

  }

}
