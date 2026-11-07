import type PrismaSchemaGenerator from "../PrismaSchemaGenerator";
import { isNotUndefined } from "@yamato-daiwa/es-extensions";


export default abstract class DataSourceBlockGenerator {

  public static generateForCounterintuitiveNativeAPI(
    {
      name,
      provider,
      relationMode,
      schemas = [],
      extensions = []
    }: PrismaSchemaGenerator.PrismaConfiguration.CounterintuitiveNativeAPI.DataSource
  ): string {


    return [

      `datasource ${ name ?? "db" } {`,

      `  provider = "${ provider }"`,

      ...isNotUndefined(relationMode) ?
          [ `  relationMode = ${ relationMode }` ] :
          [],

      ...schemas.length > 0 ?
          [ `  schemas = [ ${ schemas.map((schema: string): string => `"${ schema }"`).join(", ") }` ] :
          [],

      ...extensions.length > 0 ?
          [ `  extensions = [ ${ extensions.map((extension: string): string => `"${ extension }"`).join(", ") }` ] :
          [],

      "}"

    ].

        join("\n");

  }

  public static generateForCounterintuitiveObviousAPI(
    {
      name,
      provider,
      referentialIntegrityEnforcedBy,
      databaseSchemas = [],
      postgreSQL_Extensions = []
    }: PrismaSchemaGenerator.PrismaConfiguration.ObviousAPI.DataSource
  ): string {

    return [

      `datasource ${ name ?? "db" } {`,

      `  provider = "${ provider }"`,

      ...isNotUndefined(referentialIntegrityEnforcedBy) ?
          [ `  relationMode = ${ referentialIntegrityEnforcedBy }` ] :
          [],

      databaseSchemas.length > 0 ?
          [ `  schemas = [ ${ databaseSchemas.map((databaseSchema: string): string => `"${ databaseSchema }"`).join(", ") }` ] :
          [],

      ...postgreSQL_Extensions.length > 0 ?
          [
            `  extensions = [ ${ 
              postgreSQL_Extensions.
                  map((postgreSQL_Extension: string): string => `"${ postgreSQL_Extension }"`).
                  join(", ") 
              }`
          ] :
          [],

      "}"

    ].

        join("\n");

  }

}
