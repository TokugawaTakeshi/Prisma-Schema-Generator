/* ─── Entities ───────────────────────────────────────────────────────────────────────────────────────────────────── */
import User from "../BusinessRules/User";

/* ─── Assets ─────────────────────────────────────────────────────────────────────────────────────────────────────── */
import { IntegerDataTypes } from "fundamental-constants";

/* ─── Framework ──────────────────────────────────────────────────────────────────────────────────────────────────── */
import type { PrismaSchemaGenerator } from "../../../../Source";


const userPrismaModelDefinition: PrismaSchemaGenerator.ModelDefinition = {
  modelName: User.NAME,
  tableName: "users",
  propertiesDefinitions: [
    {
      propertyName: User.EmailAddress.NAME,
      columnName: "email_address",
      type: User.EmailAddress.TYPE,
      isPrimaryKey: true,
      isNullable: !User.EmailAddress.REQUIRED,
      maximalCharactersCount: User.EmailAddress.MAXIMAL_CHARACTERS_COUNT
    },
    {
      propertyName: User.DisplayingName.NAME,
      columnName: "displaying_name",
      type: User.DisplayingName.TYPE,
      isNullable: !User.DisplayingName.REQUIRED,
      maximalCharactersCount: User.DisplayingName.MAXIMAL_CHARACTERS_COUNT
    },
    {
      propertyName: "authorityRoleCode",
      columnName: "authority_role_code",
      type: IntegerDataTypes.oneByte,
      isUnsigned: true,
      isNullable: !User.AuthorityRole.REQUIRED
    },
    {
      propertyName: User.HashedPassword.NAME,
      columnName: "hashed_password",
      type: User.HashedPassword.TYPE,
      isNullable: !User.HashedPassword.REQUIRED,
      fixedCharactersCount: 60
    }
  ]
};


export default userPrismaModelDefinition;
