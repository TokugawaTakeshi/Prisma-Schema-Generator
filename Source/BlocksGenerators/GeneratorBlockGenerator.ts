import type PrismaSchemaGenerator from "../PrismaSchemaGenerator";
import {
  isNonEmptyString,
  isNotUndefined,
  Logger,
  InvalidExternalDataError
} from "@yamato-daiwa/es-extensions";


export default abstract class GeneratorBlockGenerator {

  public static generateForCounterintuitiveNativeAPI(
    {
      name,
      provider,
      output,
      previewFeatures = [],
      engineType,
      binaryTargets = [],
      moduleFormat
    }: PrismaSchemaGenerator.PrismaConfiguration.CounterintuitiveNativeAPI.Generator
  ): string {

    return [

      `generator ${ name ?? "client" } {`,

      `  provider = "${ provider }"`,

      ...isNonEmptyString(output) ?
          [ `  output = "${ output }"` ] :
          [],

      ...previewFeatures.length > 0 ?
          [ `  schemas = [ ${ previewFeatures.map((previewFeature: string): string => `"${ previewFeature }"`).join(", ") }` ] :
          [],

      ...isNotUndefined(engineType) ?
          [ `  engineType = "${ engineType }"` ] :
          [],

      ...binaryTargets.length > 0 ?
          [ `  binaryTargets = [ ${ binaryTargets.map((binaryTarget: string): string => `"${ binaryTarget }"`).join(", ") }` ] :
          [],

      ...isNotUndefined(moduleFormat) ?
          [ `  moduleFormat = "${ moduleFormat }"` ] :
          [],

      "}"

    ].

        join("\n");

  }


  public static generateForCounterintuitiveObviousAPI(
    {
      name,
      ID,
      implementationFilePath,
      assetsDirectoryOutputPath,
      previewFeatures = [],
      queryEngineType,
      targetRuntimes = [],
      moduleFormat
    }: PrismaSchemaGenerator.PrismaConfiguration.ObviousAPI.AssetsGenerator
  ): string {

    let provider: string;

    if (isNonEmptyString(ID)) {

      provider = ID;

    } else if (isNonEmptyString(implementationFilePath)) {

      provider = implementationFilePath;

    } else {

      Logger.throwErrorWithFormattedMessage({
        errorInstance:
            new InvalidExternalDataError({
              mentionToExpectedData: "Assets Generator Definition",
              messageSpecificPart:
                  "Either `ID` or `implementationFilePath` must be specified with non-empty string."
            }),
        title: InvalidExternalDataError.localization.defaultTitle,
        occurrenceLocation: "GeneratorBlockGenerator.generateForCounterintuitiveObviousAPI(options)",
      });

    }

    return [

      `generator ${ name ?? "client" } {`,

      `  provider = "${ provider }"`,

      ...isNonEmptyString(assetsDirectoryOutputPath) ?
          [ `  output = ${ assetsDirectoryOutputPath }` ] :
          [],

      ...previewFeatures.length > 0 ?
          [ `  schemas = [ ${ previewFeatures.map((previewFeature: string): string => `"${ previewFeature }"`).join(", ") }` ] :
          [],

      ...isNotUndefined(queryEngineType) ?
          [ `  engineType = "${ queryEngineType }"` ] :
          [],

      ...targetRuntimes.length > 0 ?
          [
            `  binaryTargets = [ ${ targetRuntimes.map((targetRuntime: string): string => `"${ targetRuntime }"`).join(", ") }`
          ] :
          [],

      ...isNotUndefined(moduleFormat) ?
        [ `  moduleFormat = "${ moduleFormat }"` ] :
        [],

      "}"

    ].

        join("\n");

  }

}
