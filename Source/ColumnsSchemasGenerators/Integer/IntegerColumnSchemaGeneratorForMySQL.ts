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

    const isUnsigned: boolean = "isUnsigned" in integerColumnDefinition && integerColumnDefinition.isUnsigned;

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
        occurrenceLocation: "IntegerColumnSchemaGeneratorForMySQL.getNativeDatabaseTypeAttribute(integerColumnDefinition)"
      });
    }


    const maximalValue: number = integerColumnDefinition.maximalValue;

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
