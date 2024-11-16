import IntegerColumnSchemaGenerator from "./IntegerColumnSchemaGenerator";
import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";
import { IntegerDataTypes } from "fundamental-constants";


export default class IntegerColumnSchemaGeneratorForMySQL extends IntegerColumnSchemaGenerator {

  public generate(integerColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.Integer): string {
    return super.fromTemplate(integerColumnDefinition);
  }

  protected override getFieldScalarType(integerType: IntegerDataTypes): string {
    return integerType === IntegerDataTypes.eightBytes ? "BigInt" : "Int";
  }

  protected override getNativeDatabaseTypeAttribute(
    { type, isUnsigned = false }: PrismaSchemaGenerator.ColumnDefinition.Integer
  ): string {

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

  }

}
