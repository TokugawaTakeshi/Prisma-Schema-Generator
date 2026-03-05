import IntegerColumnSchemaGenerator from "./IntegerColumnSchemaGenerator";
import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";
import {
  IntegerDataTypes,
  MAXIMAL_VALUE_OF_2_BYTES_INTEGER,
  MAXIMAL_VALUE_OF_4_BYTES_INTEGER,
  MINIMAL_VALUE_OF_2_BYTES_INTEGER,
  MINIMAL_VALUE_OF_4_BYTES_INTEGER
} from "fundamental-constants";
import { InvalidExternalDataError, isNotUndefined, isUndefined, Logger } from "@yamato-daiwa/es-extensions";


export default class IntegerColumnSchemaGeneratorForPostgreSQL extends IntegerColumnSchemaGenerator {

  public generate(integerPropertyDefinition: PrismaSchemaGenerator.PropertyDefinition.Integer): string {
    return super.fromTemplate(integerPropertyDefinition);
  }

  protected override getFieldScalarType(integerPropertyDefinition: PrismaSchemaGenerator.PropertyDefinition.Integer): string {

    if (typeof integerPropertyDefinition.type === "function" && integerPropertyDefinition.type.name === "Integer") {
      return isNotUndefined(integerPropertyDefinition.maximalValue) &&
      integerPropertyDefinition.maximalValue <= MAXIMAL_VALUE_OF_4_BYTES_INTEGER ? "Int" : "BigInt";
    }


    return integerPropertyDefinition.type === IntegerDataTypes.eightBytes ? "BigInt" : "Int";

  }

  protected override getNativeDatabaseTypeAttribute(
    {
      type,
      propertyName: columName,
      ...integerPropertyDefinition
    }: PrismaSchemaGenerator.PropertyDefinition.Integer
  ): string {

    switch (type) {

      case IntegerDataTypes.oneByte:
      case IntegerDataTypes.twoBytes: {

        return "@db.SmallInt";

      }

      case IntegerDataTypes.threeBytes:
      case IntegerDataTypes.fourBytes: {

        return "@db.Integer";

      }


      case IntegerDataTypes.eightBytes: {

        return "@db.BigInt";

      }

    }

    const minimalValue: number = "minimalValue" in integerPropertyDefinition ? integerPropertyDefinition.minimalValue : 0;

    if (!("maximalValue" in integerPropertyDefinition) || isUndefined(integerPropertyDefinition.maximalValue)) {
      Logger.throwErrorWithFormattedMessage({
        errorInstance: new InvalidExternalDataError({
          mentionToExpectedData: `"${ columName }" Integer Column Definition`,
          customMessage:
              "If column type has been specified as `Integer`, the `maximalValue` must be specified at once to make " +
                "possible the computing of the correct native type."
        }),
        title: InvalidExternalDataError.localization.defaultTitle,
        occurrenceLocation: "IntegerColumnSchemaGeneratorForPostgreSQL.getNativeDatabaseTypeAttribute(integerPropertyDefinition)"
      });
    }


    const maximalValue: number = integerPropertyDefinition.maximalValue;


    if (minimalValue >= MINIMAL_VALUE_OF_2_BYTES_INTEGER && maximalValue <= MAXIMAL_VALUE_OF_2_BYTES_INTEGER) {
      return "@db.SmallInt";
    }


    if (minimalValue >= MINIMAL_VALUE_OF_4_BYTES_INTEGER && maximalValue <= MAXIMAL_VALUE_OF_4_BYTES_INTEGER) {
      return "@db.Integer";
    }


    return "@db.BigInt";

  }

}
