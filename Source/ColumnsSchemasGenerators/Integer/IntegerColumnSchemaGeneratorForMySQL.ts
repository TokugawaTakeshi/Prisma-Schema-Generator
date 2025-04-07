import IntegerColumnSchemaGenerator from "./IntegerColumnSchemaGenerator";
import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";
import {
  IntegerDataTypes,
  MAXIMAL_VALUE_OF_UNSIGNED_1_BYTE_INTEGER,
  MAXIMAL_VALUE_OF_UNSIGNED_2_BYTES_INTEGER,
  MAXIMAL_VALUE_OF_UNSIGNED_3_BYTES_INTEGER,
  MAXIMAL_VALUE_OF_UNSIGNED_4_BYTES_INTEGER,
  MINIMAL_VALUE_OF_1_BYTE_INTEGER,
  MINIMAL_VALUE_OF_2_BYTES_INTEGER,
  MINIMAL_VALUE_OF_3_BYTES_INTEGER,
  MINIMAL_VALUE_OF_4_BYTES_INTEGER,
  MAXIMAL_VALUE_OF_1_BYTE_INTEGER,
  MAXIMAL_VALUE_OF_2_BYTES_INTEGER,
  MAXIMAL_VALUE_OF_3_BYTES_INTEGER,
  MAXIMAL_VALUE_OF_4_BYTES_INTEGER
} from "fundamental-constants";
import { InvalidExternalDataError, isNotUndefined, isUndefined, Logger } from "@yamato-daiwa/es-extensions";


export default class IntegerColumnSchemaGeneratorForMySQL extends IntegerColumnSchemaGenerator {

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

    const isUnsigned: boolean = "isUnsigned" in integerPropertyDefinition && integerPropertyDefinition.isUnsigned;

    switch (type) {
      case IntegerDataTypes.oneByte:
          return isUnsigned ? "@db.UnsignedTinyInt" : "@db.TinyInt";
      case IntegerDataTypes.twoBytes:
          return isUnsigned ? "@db.UnsignedSmallInt" : "@db.SmallInt";
      case IntegerDataTypes.threeBytes:
          return isUnsigned ? "@db.UnsignedMediumInt" : "@db.MediumInt";
      case IntegerDataTypes.fourBytes:
          return isUnsigned ? "@db.UnsignedInt" : "@db.Int";
      case IntegerDataTypes.eightBytes:
          return isUnsigned ? "@db.UnsignedBigInt" : "@db.BigInt";
    }


    const minimalValue: number = "minimalValue" in integerPropertyDefinition ? integerPropertyDefinition.minimalValue : 0;

    if (!("maximalValue" in integerPropertyDefinition) || isUndefined(integerPropertyDefinition.maximalValue)) {
      Logger.throwErrorAndLog({
        errorInstance: new InvalidExternalDataError({
          mentionToExpectedData: `"${ columName }" Integer Column Definition`,
          customMessage:
              "If column type has been specified as `Integer`, the `maximalValue` must be specified at once to make " +
                "possible the computing of the correct native type."
        }),
        title: InvalidExternalDataError.localization.defaultTitle,
        occurrenceLocation: "IntegerColumnSchemaGeneratorForMySQL.getNativeDatabaseTypeAttribute(integerPropertyDefinition)"
      });
    }


    const maximalValue: number = integerPropertyDefinition.maximalValue;

    if (minimalValue >= 0) {

      if (maximalValue <= MAXIMAL_VALUE_OF_UNSIGNED_1_BYTE_INTEGER) {
        return "@db.UnsignedTinyInt";
      }


      if (maximalValue <= MAXIMAL_VALUE_OF_UNSIGNED_2_BYTES_INTEGER) {
        return "@db.UnsignedSmallInt";
      }


      if (maximalValue <= MAXIMAL_VALUE_OF_UNSIGNED_3_BYTES_INTEGER) {
        return "@db.UnsignedMediumInt";
      }


      if (maximalValue <= MAXIMAL_VALUE_OF_UNSIGNED_4_BYTES_INTEGER) {
        return "@db.UnsignedInt";
      }


      return "@db.UnsignedBigInt";

    }


    if (minimalValue >= MINIMAL_VALUE_OF_1_BYTE_INTEGER && maximalValue <= MAXIMAL_VALUE_OF_1_BYTE_INTEGER) {
      return "@db.TinyInt";
    }


    if (minimalValue >= MINIMAL_VALUE_OF_2_BYTES_INTEGER && maximalValue <= MAXIMAL_VALUE_OF_2_BYTES_INTEGER) {
      return "@db.SmallInt";
    }


    if (minimalValue >= MINIMAL_VALUE_OF_3_BYTES_INTEGER && maximalValue <= MAXIMAL_VALUE_OF_3_BYTES_INTEGER) {
      return "@db.MediumInt";
    }


    if (minimalValue >= MINIMAL_VALUE_OF_4_BYTES_INTEGER && maximalValue <= MAXIMAL_VALUE_OF_4_BYTES_INTEGER) {
      return "@db.Int";
    }


    return "@db.BigInt";

  }

}
