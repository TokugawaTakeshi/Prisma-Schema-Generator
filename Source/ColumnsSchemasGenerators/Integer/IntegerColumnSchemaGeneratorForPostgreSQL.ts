import IntegerColumnSchemaGenerator from "./IntegerColumnSchemaGenerator";
import type PrismaSchemaGenerator from "../../PrismaSchemaGenerator";
import { IntegerDataTypes } from "fundamental-constants";


export default class IntegerColumnSchemaGeneratorForPostgreSQL extends IntegerColumnSchemaGenerator {

  public generate(integerColumnDefinition: PrismaSchemaGenerator.ColumnDefinition.Integer): string {
    return super.fromTemplate(integerColumnDefinition);
  }

  protected override getFieldScalarType(integerType: IntegerDataTypes): string {
    return integerType === IntegerDataTypes.eightBytes ? "BigInt" : "Int";
  }

  protected override getNativeDatabaseTypeAttribute(
    { type }: PrismaSchemaGenerator.ColumnDefinition.Integer
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

  }

}
