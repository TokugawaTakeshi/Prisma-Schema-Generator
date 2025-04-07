/* ─── Entities ───────────────────────────────────────────────────────────────────────────────────────────────────── */
import Product from "../BusinessRules/Product";
import ProductCategory from "../BusinessRules/ProductCategory";

/* ─── Framework ──────────────────────────────────────────────────────────────────────────────────────────────────── */
import { PrismaSchemaGenerator } from "../../../../Source";
import { Integer } from "fundamental-constants";


const PRODUCT_CATEGORY_EXTERNAL_KEY_NAME: string = `${ Product.Category.NAME }ID`;


const productPrismaModelDefinition: PrismaSchemaGenerator.ModelDefinition = {
  modelName: Product.NAME,
  tableName: "products",
  propertiesDefinitions: [
    {
      propertyName: Product.ID.NAME,
      columnName: "id",
      type: Product.ID.TYPE,
      isPrimaryKey: true,
      isNullable: !Product.ID.REQUIRED,
      fixedCharactersCount: Product.ID.FIXED_CHARACTERS_COUNT
    },
    {
      propertyName: Product.Title.NAME,
      columnName: "title",
      type: Product.Title.TYPE,
      isNullable: !Product.Title.REQUIRED,
      maximalCharactersCount: Product.Title.MAXIMAL_CHARACTERS_COUNT
    },
    {
      propertyName: Product.Description.NAME,
      columnName: "description",
      type: Product.Description.TYPE,
      isNullable: !Product.Description.REQUIRED,
      maximalCharactersCount: Product.Description.MAXIMAL_CHARACTERS_COUNT
    },
    {
      propertyName: Product.Category.NAME,
      type: PrismaSchemaGenerator.PropertyDefinition.AnotherModel.TYPE,
      targetModelName: ProductCategory.NAME,
      isNullable: !Product.Category.REQUIRED,
      relation: {
        fields: [ PRODUCT_CATEGORY_EXTERNAL_KEY_NAME ],
        references: [ ProductCategory.ID.NAME ]
      }
    },
    {
      propertyName: PRODUCT_CATEGORY_EXTERNAL_KEY_NAME,
      type: Product.ID.TYPE,
      isForeignKey: true,
      fixedCharactersCount: ProductCategory.ID.FIXED_CHARACTERS_COUNT,
      isNullable: !Product.Category.REQUIRED
    },
    {
      propertyName: Product.Price__Dollars__WithoutTax.NAME,
      columnName: "price__dollars__includingTax",
      type: Integer,
      minimalValue: Product.Price__Dollars__WithoutTax.MINIMAL_VALUE,
      maximalValue: Product.Price__Dollars__WithoutTax.MAXIMAL_VALUE,
      isNullable: !Product.Price__Dollars__WithoutTax.REQUIRED
    },
    {
      propertyName: Product.QuantityRemainInStock.NAME,
      columnName: "quantity_remain_in_stock",
      type: Integer,
      minimalValue: Product.QuantityRemainInStock.MINIMAL_VALUE,
      maximalValue: Product.QuantityRemainInStock.MAXIMAL_VALUE,
      isNullable: !Product.QuantityRemainInStock.REQUIRED
    }
  ]
};


export default productPrismaModelDefinition;
