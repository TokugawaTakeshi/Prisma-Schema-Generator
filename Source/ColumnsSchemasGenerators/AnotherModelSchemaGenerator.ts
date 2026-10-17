import type PrismaSchemaGenerator from "../PrismaSchemaGenerator";
import { insertSubstringIf } from "@yamato-daiwa/es-extensions";


export default abstract class AnotherModelSchemaGenerator {

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

      [
        "@relation(",
        [
          `fields: [${ relation.ownFields.join(",") }]`,
          `references: [${ relation.fieldsOnOtherSideOfRelation.join(",") }]`,
          `onUpdate: ${ relation.onUpdate }`,
          `onDelete: ${ relation.onDelete }`
        ].join(", "),
        ")"
      ].join(""),

      ...propertyName === columnName ? [] : [ `@map("${ columnName }")` ]

    ].join("");
  }

}
