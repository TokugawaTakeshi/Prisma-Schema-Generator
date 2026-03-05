import FloatColumnSchemaGenerator from "./FloatColumnSchemaGenerator";
import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";
import { FloatingPointDataTypes } from "fundamental-constants";
import { InvalidExternalDataError, isUndefined, Logger } from "@yamato-daiwa/es-extensions";


export default class FloatColumnSchemaGeneratorForPostgreSQL extends FloatColumnSchemaGenerator {

  private static readonly MAXIMAL_VALUE_OF_REAL: number = 1e+37;


  public generate(floatPropertyDefinition: PrismaSchemaGenerator.PropertyDefinition.Float): string {
    return super.fromTemplate(floatPropertyDefinition);
  }

  protected override getFieldScalarType(): string {
    return "Float";
  }

  protected override getNativeDatabaseTypeAttribute(
    {
      type,
      propertyName: columnName,
      ...floatPropertyDefinition
    }: PrismaSchemaGenerator.PropertyDefinition.Float
  ): string {

    if (type === FloatingPointDataTypes.fourBytes) {
      return "@db.Real";
    }


    if (type === FloatingPointDataTypes.eightBytes) {
      return "@db.DoublePrecision";
    }


    if (type === FloatingPointDataTypes.sixteenBytes) {
      return "@db.DoublePrecision";
    }


    if (!("maximalValue" in floatPropertyDefinition) || isUndefined(floatPropertyDefinition.maximalValue)) {
      Logger.throwErrorWithFormattedMessage({
        errorInstance: new InvalidExternalDataError({
          mentionToExpectedData: `"${ columnName }" Float Column Definition`,
          customMessage:
              "If column type has been specified as `Float`, the `maximalValue` must be specified at once to make " +
                "possible the computing of the correct native type."
        }),
        title: InvalidExternalDataError.localization.defaultTitle,
        occurrenceLocation: "FloatColumnSchemaGeneratorForPostgreSQL.getNativeDatabaseTypeAttribute(floatPropertyDefinition)"
      });
    }


    const maximalValue: number = floatPropertyDefinition.maximalValue;

    if (maximalValue <= FloatColumnSchemaGeneratorForPostgreSQL.MAXIMAL_VALUE_OF_REAL) {
      return "@db.Real";
    }


    return "@db.DoublePrecision";

  }

}
