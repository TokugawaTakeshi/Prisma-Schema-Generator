import StringColumnSchemaGenerator from "./StringColumnSchemaGenerator";
import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";
import { isNotUndefined } from "@yamato-daiwa/es-extensions";


export default class StringColumnSchemaGeneratorForPostgreSQL extends StringColumnSchemaGenerator {

  public override generate(stringColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.String): string {
    return super.fromTemplate(stringColumnDefinition);
  }

  protected override getNativeDatabaseTypeAttribute(
      stringColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.String
  ): string {

    if (stringColumnDefinition.isPrimaryKey === true) {
      return "@db.Uuid";
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
