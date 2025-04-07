/* ─── Entities ───────────────────────────────────────────────────────────────────────────────────────────────────── */
import ProductCategory from "../BusinessRules/ProductCategory";
import Product from "../BusinessRules/Product";

/* ─── Framework ──────────────────────────────────────────────────────────────────────────────────────────────────── */
import { PrismaSchemaGenerator } from "../../../../Source";


const productCategoryPrismaModelDefinition: PrismaSchemaGenerator.ModelDefinition = {
  modelName: ProductCategory.NAME,
  tableName: "product_categories",
  propertiesDefinitions: [
    {
      propertyName: ProductCategory.ID.NAME,
      columnName: "id",
      type: ProductCategory.ID.TYPE,
      isPrimaryKey: true,
      isNullable: !ProductCategory.ID.REQUIRED,
      fixedCharactersCount: ProductCategory.ID.FIXED_CHARACTERS_COUNT
    },
    {
      propertyName: ProductCategory.Name.NAME,
      columnName: "name",
      type: ProductCategory.Name.TYPE,
      isNullable: !ProductCategory.Name.REQUIRED,
      maximalCharactersCount: ProductCategory.Name.MAXIMAL_CHARACTERS_COUNT
    },
    {
      propertyName: "products",
      type: PrismaSchemaGenerator.PropertyDefinition.List.TYPE,
      elementType: Product.NAME
    }
  ]
};


export default productCategoryPrismaModelDefinition;
