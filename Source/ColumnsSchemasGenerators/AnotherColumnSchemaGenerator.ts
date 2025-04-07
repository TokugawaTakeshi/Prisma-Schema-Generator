import type PrismaSchemaGenerator from "../PrismaSchemaGenerator";
import { insertSubstringIf } from "@yamato-daiwa/es-extensions";


export default abstract class AnotherColumnSchemaGenerator {

  public static generate(
    {
      propertyName,
      columnName = propertyName,
      targetModelName,
      isNullable,
      relation
    }: PrismaSchemaGenerator.PropertyDefinition.AnotherModel
  ): string {
    return [

      `${ propertyName } ${ targetModelName } ${ insertSubstringIf("?", isNullable) }`,

      `@relation(fields: [${ relation.fields.join(",") }], references: [${ relation.references.join(",") }])`,

      ...propertyName === columnName ? [] : [ `@map("${ columnName }")` ]

    ].join("");
  }

}
