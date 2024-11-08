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

  protected override getNativeDatabaseTypeAttribute(integerType: IntegerDataTypes): string {

    switch (integerType) {

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
