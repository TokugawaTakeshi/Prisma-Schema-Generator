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

  public generate(integerColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.Integer): string {
    return super.fromTemplate(integerColumnDefinition);
  }

  protected override getFieldScalarType(integerColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.Integer): string {

    if (typeof integerColumnDefinition.type === "function" && integerColumnDefinition.type.name === "Integer") {
      return isNotUndefined(integerColumnDefinition.maximalValue) &&
      integerColumnDefinition.maximalValue <= MAXIMAL_VALUE_OF_4_BYTES_INTEGER ? "Int" : "BigInt";
    }


    return integerColumnDefinition.type === IntegerDataTypes.eightBytes ? "BigInt" : "Int";

  }

  protected override getNativeDatabaseTypeAttribute(
    {
      type,
      name: columName,
      ...integerColumnDefinition
    }: PrismaSchemaGenerator.ColumnDefinition.Integer
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

    const minimalValue: number = "minimalValue" in integerColumnDefinition ? integerColumnDefinition.minimalValue : 0;

    if (!("maximalValue" in integerColumnDefinition) || isUndefined(integerColumnDefinition.maximalValue)) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidExternalDataError({
          mentionToExpectedData: `"${ columName }" Column Definition`,
          customMessage:
              "If column type has been specified as `Integer`, the `maximalValue` must be specified at once to make " +
                "possible the computing of the correct native type."
        }),
        title: InvalidExternalDataError.localization.defaultTitle,
        occurrenceLocation: "IntegerColumnSchemaGeneratorForPostgreSQL.getNativeDatabaseTypeAttribute(integerColumnDefinition)"
      });
    }


    const maximalValue: number = integerColumnDefinition.maximalValue;


    if (minimalValue >= MINIMAL_VALUE_OF_2_BYTES_INTEGER && maximalValue <= MAXIMAL_VALUE_OF_2_BYTES_INTEGER) {
      return "@db.SmallInt";
    }


    if (minimalValue >= MINIMAL_VALUE_OF_4_BYTES_INTEGER && maximalValue <= MAXIMAL_VALUE_OF_4_BYTES_INTEGER) {
      return "@db.Integer";
    }


    return "@db.BigInt";

  }

}
