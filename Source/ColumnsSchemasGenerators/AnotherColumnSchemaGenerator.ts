import type PrismaSchemaGenerator from "../PrismaSchemaGenerator";


export default abstract class AnotherColumnSchemaGenerator {

  public static generate(
    {
      name,
      targetModelName,
      isNullable,
      relation
    }: PrismaSchemaGenerator.ColumnDefinition.AnotherModel
  ): string {
    return [
      name,
      ` ${ targetModelName }`,
      ...isNullable ? [ "?" ] : [],
      `@relation(fields: [${ relation.fields.join(",") }], references: [${ relation.references.join(",") }])`
    ].join("");
  }

}
