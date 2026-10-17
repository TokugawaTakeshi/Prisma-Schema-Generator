# Yamato Daiwa Prisma Schema Generator

Generates the **prisma.schema** based on a script intended to be executed by [ts-node](https://typestrong.org/ts-node/) or
  [tsx](https://tsx.is/).
Designed for the projects obeys to **Clean Architecture** principles one of which forbids the defining of the
**business rules** using the frameworks.


## Installation

```Bash
npm i @yamato-daiwa/prisma-schema-generator -D -E
```

> [!NOTE]
> Initially, there was not intentions to scope this package to "@yamato-daiwa", but there is already 
>   [another package](https://www.npmjs.com/package/prisma-schema-generator) with "prisma-schema-generator" name
>   specializing on joining multiple prisma files into one.


### Requirements

For the `@yamato-daiwa/prisma-schema-generator` of version **0.5.0** or any patch version of it:

<dl>

  <dt>Supported Minimal Node.js Version</dt>
  <dd>22.0.0</dd>

  <dt>Supported Prisma Versions Range</dt>
  <dd> >=7.0.0 <=8.0.0</dd>

</dl>


## Problem Overview

**Prisma** [suggests](https://www.prisma.io/docs/orm/overview/introduction/data-modeling#data-modeling-with-prisma-orm)
  to use **prisma.schema** file as business rules definition method.
Although it has not been declared directly, de facto using just the **Prisma** you need
  either defined you business rules inside **prisma.schema** or additionally
  [model the data on application level](https://www.prisma.io/docs/orm/overview/introduction/data-modeling#data-modeling-on-the-application-level)
  what it rarely practiced because it is the dual management impacting the application maintainability.

However, the defining of business rules in **prisma.schema** is the gross violation of **Clean Architecture**.

> Where should such ORM systems reside? 
> In the database layer of course.
> Indeed, ORMs form another kind of _Humble Object_ boundary between the gateway interfaces and the database.
> 
> — Robert C. Martin, **Clean Architecture**,
> Pearson Education, ISBN-10: 0-13-449416-4, Published in 2018.

The database layer mentioned above is the _outermost_ layer of the **Clean Architecture** while the **entities** 
  (**enterprise business rules**) are the _innermost_ layer:

<figure>
  <img src="https://github.com/TokugawaTakeshi/Prisma-Schema-Generator/raw/master/CleanArchitectureDiagram.png" alt="The Clean Architecture Diagram"/>
  <figcaption style="text-align: center;">
    The Clean Architecture Diagram (<a href="https://medium.com/@rudrakshnanavaty/clean-architecture-7c1b3b4cb181" target="_blank" rel="noopener noreferrer nofollow">Image source</a>)
  </figcaption>
</figure> 


According to the **Clean Architecture**, each outer ring _must_ respect the inner ones while the inner ones must know 
  _nothing_ about the outer ones:

> Source code dependencies must point only inward, toward higher-level policies.
> 
> Nothing in an inner circle can know anything at all about something in an outer circle.
> In particular, the name of something declared in an outer circle must not be mentioned by the code in an inner circle.
> That includes classes, variables, or any other named software entity.
>
> — Robert C. Martin, **Clean Architecture**,
> Pearson Education, ISBN-10: 0-13-449416-4, Published in 2018.


## Solution

In general terms, the **@yamato-daiwa/prisma-schema-generator** has been designed as a part of the following approach.

1. Define the business rules completely independently on any framework.
2. For each entity create the mapper object according to which the Prisma model will be generated.
3. Create the script generating the Prisma schema.


## Example
### Step 1: Define the Business Rules

There is no standards how to define the business rules.
The author of **@yamato-daiwa/prisma-schema-generator** doing it as shown below.
To make the example enough, three entities has been provided.

#### Sample Entity 1

```typescript
import {
  EMAIL_ADDRESS_VALID_PATTERN,
  MAXIMAL_CHARACTERS_COUNT_OF_EMAIL_ADDRESS,
  MINIMAL_CHARACTERS_COUNT_OF_EMAIL_ADDRESS
} from "fundamental-constants";


type User = {
  emailAddress: string;
  displayingName: string;
  authorityRole: User.AuthorityRoles;
  hashedPassword: string;
};


namespace User {

  export const NAME: string = "User";

  export namespace EmailAddress {
    export const NAME: string = "emailAddress";
    export const TYPE: StringConstructor = String;
    export const REQUIRED: boolean = true;
    export const MINIMAL_CHARACTERS_COUNT: number = MINIMAL_CHARACTERS_COUNT_OF_EMAIL_ADDRESS;
    export const MAXIMAL_CHARACTERS_COUNT: number = MAXIMAL_CHARACTERS_COUNT_OF_EMAIL_ADDRESS;
    export const REGULAR_EXPRESSION: RegExp = EMAIL_ADDRESS_VALID_PATTERN;
  }


  export namespace DisplayingName {
    export const NAME: string = "displayingName";
    export const TYPE: StringConstructor = String;
    export const REQUIRED: boolean = true;
    export const MINIMAL_CHARACTERS_COUNT: number = 2;
    export const MAXIMAL_CHARACTERS_COUNT: number = 250;
  }


  export enum AuthorityRoles {
    admin = "admin",
    editor = "editor"
  }

  export namespace AuthorityRole {
    export const TYPE: StringConstructor = String;
    export const REQUIRED: boolean = true;
    export const ALLOWED_VALUES: Array<AuthorityRoles> = Object.values(AuthorityRoles);
  }


  export namespace HashedPassword {
    export const NAME: string = "hashedPassword";
    export const TYPE: StringConstructor = String;
    export const REQUIRED: boolean = true;
  }

}


export default User;
``` 

#### Sample Entity 2

```typescript
import { FIXED_CHARACTERS_COUNT_IN_NANO_ID } from "fundamental-constants";


type ProductCategory = {
  readonly ID: ProductCategory.ID;
  name: string;
};


namespace ProductCategory {

  export const NAME: string = "ProductCategory";

  export type ID = string;
  export namespace ID {
    export const NAME: string = "ID";
    export const TYPE: StringConstructor = String;
    export const REQUIRED: boolean = true;
    export const FIXED_CHARACTERS_COUNT: number = FIXED_CHARACTERS_COUNT_IN_NANO_ID;
  }

  export namespace Name {
    export const NAME: string = "name";
    export const TYPE: StringConstructor = String;
    export const REQUIRED: boolean = true;
    export const MINIMAL_CHARACTERS_COUNT: number = 2;
    export const MAXIMAL_CHARACTERS_COUNT: number = 100;
  }

}


export default ProductCategory;
```


#### Sample Entity 3

```typescript
import type ProductCategory from "./ProductCategory";
import { FIXED_CHARACTERS_COUNT_IN_NANO_ID } from "fundamental-constants";


type Product = {
  readonly ID: Product.ID;
  title: string;
  description?: string;
  category: ProductCategory;
  price__dollars__includingTax: number;
  quantityRemainInStock?: number;
};


namespace Product {

  export const NAME: string = "Product";

  export type ID = string;
  export namespace ID {
    export const NAME: string = "ID";
    export const TYPE: StringConstructor = String;
    export const REQUIRED: boolean = true;
    export const FIXED_CHARACTERS_COUNT: number = FIXED_CHARACTERS_COUNT_IN_NANO_ID;
  }

  export namespace Title {
    export const NAME: string = "title";
    export const TYPE: StringConstructor = String;
    export const REQUIRED: boolean = true;
    export const MINIMAL_CHARACTERS_COUNT: number = 2;
    export const MAXIMAL_CHARACTERS_COUNT: number = 200;
  }

  export namespace Description {
    export const NAME: string = "description";
    export const TYPE: StringConstructor = String;
    export const REQUIRED: boolean = true;
    export const MINIMAL_CHARACTERS_COUNT: number = 2;
    export const MAXIMAL_CHARACTERS_COUNT: number = 500;
  }

  export namespace Category {
    export const NAME: string = "category";
    export const TYPE: ObjectConstructor = Object;
    export const REQUIRED: boolean = false;
  }

  export namespace Price__Dollars__WithoutTax {
    export const NAME: string = "price__dollars__withoutTax";
    export const TYPE: NumberConstructor = Number;
    export const REQUIRED: boolean = true;
    export const MINIMAL_VALUE: number = 1;
    export const MAXIMAL_VALUE: number = Number.MAX_SAFE_INTEGER;
  }

  export namespace QuantityRemainInStock {
    export const NAME: string = "quantityRemainInStock";
    export const TYPE: NumberConstructor = Number;
    export const REQUIRED: boolean = false;
    export const MINIMAL_VALUE: number = 0;
    export const MAXIMAL_VALUE: number = Number.MAX_SAFE_INTEGER;
  }

}


export default Product;
```


### Step 2 Define the Prisma Models Definition

Defining the prisma models, refer to business rules as much as possible.


#### Sample Entity 1

```typescript
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
```

#### Sample Entity 2

````typescript
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
````

#### Sample Entity 3

```typescript
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
```


### Step 3 Create and Run the Script

```typescript
/* ─── Data ───────────────────────────────────────────────────────────────────────────────────────────────────────── */
import productPrismaModelDefinition from "./PrismaModelsDefinitions/ProductPrismaModelDefinition";
import productCategoryPrismaModelDefinition from "./PrismaModelsDefinitions/ProductCategoryPrismaModelDefinition";
import userPrismaModelDefinition from "./PrismaModelsDefinitions/UserPrismaModelDefinition";


/* ─── Utils ──────────────────────────────────────────────────────────────────────────────────────────────────────── */
import PrismaSchemaGenerator from "prisma-schema-generator";
import Path from "path";
import { Logger, FileWritingFailedError } from "@yamato-daiwa/es-extensions";
import { ConsoleApplicationLogger } from "@yamato-daiwa/es-extensions-nodejs";


Logger.setImplementation(ConsoleApplicationLogger);


PrismaSchemaGenerator.generate({

  generatorProvider: "prisma-client-js",

  /** [ WARNING ] DO NOT hardcode it if your project intended to be published. */
  databaseConnectionURI_EnvironmentVariableName: "mysql://root:example@localhost:3306/PrismaSchemaGenerator-MinimalExample",

  databaseProvider: PrismaSchemaGenerator.SupportedDatabaseProviders.MySQL,
  
  // TODO Correct the otuput directory path
  outputDirectoryAbsolutePath: Path.join(process.cwd(), "Tests", "Manual", "Minimal", "_Generated"),
  
  modelsDefinitions: [
    productPrismaModelDefinition,
    productCategoryPrismaModelDefinition,
    userPrismaModelDefinition
  ]

});
```

Now you can run this script to generate the **schema.prisma**.
For **ts-node** case, it will be something like (you need to correct the path to script):

```
tsx generatePrismaSchema.ts
```

As result, the following schema.prisma will be generated:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
}

model Product {
  ID                         String           @id @map("id") @db.VarChar(21)
  title                      String           @db.TinyText
  description                String           @db.Text
  category                   ProductCategory? @relation(fields: [categoryID], references: [ID], onUpdate: Cascade, onDelete: Restrict)
  categoryID                 String?          @db.Char(21)
  price__dollars__withoutTax BigInt           @map("price__dollars__includingTax") @db.UnsignedBigInt
  quantityRemainInStock      BigInt?          @map("quantity_remain_in_stock") @db.UnsignedBigInt

  @@map("products")
}

model ProductCategory {
  ID       String    @id @map("id") @db.VarChar(21)
  name     String    @db.TinyText
  products Product[]

  @@map("product_categories")
}

model User {
  emailAddress      String @id @map("email_address") @db.VarChar(320)
  displayingName    String @map("displaying_name") @db.TinyText
  authorityRoleCode Int    @map("authority_role_code") @db.UnsignedTinyInt
  hashedPassword    String @map("hashed_password") @db.Char(60)

  @@map("users")
}
```

The ****@yamato-daiwa/prisma-schema-generator****'s turn ends here.
You will need to update and rerun above script when make some changes in business rules and/or prisma model definitions.

Also, you may want to generate the `schema.prisma` and prisma client at once.
If so, add to your `package.json` the script similar to following one (correct the paths before launch): 

```json
{
  "scripts": {
    "Prisma Schema And Client Generating": "tsx generatePrismaSchema.ts && prisma generate --schema _Generated/schema.prisma"
  }
}
```

Above command does not need the established connection with the database.


## API
### `PrismaSchemaGenerator` Class / Namespace

Has only one public member, the static `generate` method.


#### `generate` Static Method

```
(
  options: 
      {
        generatorProvider: string;
        clientOutputPathRelativeToSchemaFile?: string;
        targetOperatingSystems?: ReadonlyArray<string>;
        datasourceProvider: PrismaSchemaGenerator.SupportedDatabaseProviders;
        modelsDefinitions: ReadonlyArray<PrismaSchemaGenerator.ModelDefinition>;
        outputDirectoryAbsolutePath: string;
        outputFileName?: string;
        onSucceededEventHandler?: () => void;
        onFailedEventHandler?: (error: unknown) => void;
      }
) => Promise<void>
```

Generates the **prisma.schema** file according the specified options.


##### Options

<dl>

  <dt><code>generatorProvider</code></dt>
  <dd>
    <dl>  
      <dt>Type</dt>
      <dd>String</dd>
      <dt>Is Required</dt>
      <dd>Yes</dd>
      <dt>Description</dt>
      <dd>
        The value of 
          <a 
            href="https://www.prisma.io/docs/orm/reference/prisma-schema-reference#generator" 
            target="_blank" 
            rel="nofollow noopener noreferrer"
          >
            <code>generator.client.provider</code>
          </a>.
        Usually the <code>"prisma-client-js"</code> unless using the 
          <a 
            href="https://www.prisma.io/docs/orm/prisma-schema/overview/generators#community-generators" 
            target="_blank" 
            rel="nofollow noopener noreferrer"
          >
            community generators
          </a>.
      </dd>
    </dl>
  </dd>

  <dt><code>clientOutputPathRelativeToSchemaFile</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>String</dd>
      <dt>Is Required</dt>
      <dd>Yes</dd>
      <dt>Description</dt>
      <dd>
        The value of 
          <a 
            href="https://www.prisma.io/docs/orm/reference/prisma-schema-reference#generator" 
            target="_blank" 
            rel="nofollow noopener noreferrer"
          >
            <code>generator.client.output</code>
          </a>.
        As default, the client will be generated to <code>node_modules/.prisma/client</code>.
      </dd>
    </dl>
  </dd>

  <dt><code>targetOperatingSystems</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Array&lt;string&gt;</dd>
      <dt>Is Required</dt>
      <dd>No</dd>
      <dt>Description</dt>
      <dd>
        The value of 
          <a 
            href="https://www.prisma.io/docs/orm/reference/prisma-schema-reference#generator" 
            target="_blank" 
            rel="nofollow noopener noreferrer"
          >
            <code>generator.client.binaryTargets</code>
          </a>.
      </dd>
    </dl>
  </dd>

  <dt><code>datasourceProvider</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Array&lt;PrismaSchemaGenerator.SupportedDatabaseProviders&gt;</dd>
      <dt>Is Required</dt>
      <dd>Yes</dd>
      <dt>Allowed Values</dt>
      <dd>
        <ul>
          <li><code>PrismaSchemaGenerator.SupportedDatasourceProviders.PostgreSQL</code></li>
          <li><code>PrismaSchemaGenerator.SupportedDatasourceProviders.MySQL</code></li>
          <li><code>PrismaSchemaGenerator.SupportedDatasourceProviders.SQLite</code></li>
          <li><code>PrismaSchemaGenerator.SupportedDatasourceProviders.SQL_Server</code></li>
          <li><code>PrismaSchemaGenerator.SupportedDatasourceProviders.MongoDB</code></li>
          <li><code>PrismaSchemaGenerator.SupportedDatasourceProviders.CockroachDB</code></li>
        </ul>
      </dd>
      <dt>Description</dt>
      <dd>
        The value of 
          <a 
            href="https://www.prisma.io/docs/orm/reference/prisma-schema-reference#datasource" 
            target="_blank" 
            rel="nofollow noopener noreferrer"
          >
            <code>datasource.provider</code>
          </a>.
        Must be the element of <code>PrismaSchemaGenerator.SupportedDatasourceProviders</code> enumeration.
      </dd>
    </dl>
  </dd>

  <dt><code>modelsDefinitions</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Array&lt;PrismaSchemaGenerator.ModelDefinition&gt;</dd>
      <dt>Is Required</dt>
      <dd>Yes</dd>
      <dt>Element Schema<dt>
      <dd><pre><code>
  {
    modelName?: string;
    tableName?: string;
    propertiesDefinitions: ReadonlyArray&lt;PropertyDefinition&gt;;
    compositeID?: &lt;CompositeID&gt;;
    compoundUniqueConstraint?: ReadonlyArray&lt;string&gt;;
  }
      </code></pre></dd>
      <dt>Description</dt>
      <dd>
        The array of <code>PrismaSchemaGenerator.ModelDefinition</code>` objects basing on which the Prisma models will 
          be generated.
      </dd>
    </dl>
  </dd>
  
  <dt><code>outputDirectoryAbsolutePath</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>String</dd>
      <dt>Is Required</dt>
      <dd>Yes</dd>
      <dt>Description</dt>
      <dd>The path specifying the directory where to output the file.</dd>
    </dl>
  </dd>

  <dt><code>outputFileName</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>String</dd>
      <dt>Default Value</dt>
      <dd><code>"schema.prisma"</code></dd>
      <dt>Description</dt>
      <dd>The output file name of Prisma schema.</dd>
    </dl>
  </dd>

  <dt><code>onSucceededEventHandler</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Functions</dd>
      <dt>Parameters</dt>
      <dd>No</dd>
      <dt>Return Value</dt>
      <dd>No (void)</dd>
      <dt>Is Required</dt>
      <dd>No</dd>
      <dt>Description</dt>
      <dd>The callback will be invoked if Prisma schema has been successfully generated and formatted.</dd>
    </dl>
  </dd>

  <dt><code>onFailedEventHandler</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Functions</dd>
      <dt>Parameters</dt>
      <dd>
        <dl>
          <dt><code>error</code></dt>
          <dd>
            <dl>
              <dt>Type</dt>
              <dd>unknown</dd>  
            </dl>
          </dd>
        </dl>
      </dd>
      <dt>Return Value</dt>
      <dd>No (void)</dd>
      <dt>Is Required</dt>
      <dd>No</dd>
      <dt>Description</dt>
      <dd>The callback will be invoked when some error occurred during the generating of prisma schema.</dd>
    </dl>
  </dd>

</dl>


### Properties Definition (`PrismaSchemaGenerator.PropertyDefinition`)

For each model definition (`PrismaSchemaGenerator.ModelDefinition`) the properties definitions must be specified via
  `propertiesDefinitions`, the array of `PrismaSchemaGenerator.PropertyDefinition`.
The `PrismaSchemaGenerator.PropertyDefinition` is the ([discriminated union](https://basarat.gitbook.io/typescript/type-system/discriminated-unions))
  currently included the following subtypes:

+ `PropertyDefinition.String`
+ `PropertyDefinition.Integer`
+ `PropertyDefinition.DateWithoutTime`
+ `PropertyDefinition.DateAndTime`
+ `PropertyDefinition.List`
+ `PropertyDefinition.AnotherModel`
+ `PropertyDefinition.JSON`


#### Common Properties

Each subtype of `PrismaSchemaGenerator.PropertyDefinition` discriminated union has the following properties.

<dl>

  <dt><code>propertyName</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>string</dd>
      <dt>Is Required</dt>
      <dd>Yes</dd>
      <dt>Description<dt>
      <dd>Obviously, the name of target property for target Prisma model</dd>
    </dl>    
  </dd>

  <dt><code>columnName</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>string</dd>
      <dt>Is Required</dt>
      <dd>No</dd>
      <dt>Description<dt>
      <dd>
        The value of 
        <a 
          href="https://www.prisma.io/docs/orm/reference/prisma-schema-reference#map" 
          target="_blank" 
          rel="nofollow noopener noreferrer"
        >
          <code>@map</code> attribute
        </a>.
        If specified, the table column with this name will correspond to target property.
        If not, the table column name will be even with the property name. 
      </dd>
    </dl>    
  </dd>

  <dt><code>isNullable</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>boolean</dd>
      <dt>Is Required</dt>
      <dd>Yes</dd>
      <dt>Description<dt>
      <dd>
        If <code>true</code>, the type of target property will be marked with <code>?</code> in <strong>schema.prisma</strong>.  
      </dd>
    </dl>    
  </dd>

</dl>


#### String Properties

For the string-like columns, in addition to [common properties](#common-properties), the following ones can be (must be
for required ones) specified.

<dl>

  <dt><code>type</code></dt>
  <dd>
    Must be specified with
      <a 
        href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String" 
        target="_blank" 
        rel="nofollow noopener noreferrer"
      >
        <code>String</code> object
      </a>
      to for string-like columns.
    The best specific data type will be desiced according the following properties and specific Database.    
  </dd>

  <dt><code>isPrimaryKey</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>boolean</dd>
      <dt>Default Value</dt>
      <dd><code>false</code></dd>
      <dt>Description<dt>
      <dd>
        If specified with <code>true</code>, the 
          <a 
            href="https://www.prisma.io/docs/orm/reference/prisma-schema-reference#id" 
            target="_blank" 
            rel="nofollow noopener noreferrer"
          >
            <code>@id</code> attribute
          </a>
          will be added.
      </dd>
    </dl>
  </dd>

  <dt><code>mustBeUnique</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>boolean</dd>
      <dt>Default Value</dt>
      <dd><code>false</code></dd>
      <dt>Description<dt>
      <dd>
        If specified with <code>true</code>, the 
          <a 
            href="https://www.prisma.io/docs/orm/reference/prisma-schema-reference#unique" 
            target="_blank" 
            rel="nofollow noopener noreferrer"
          >
            <code>@unique</code> attribute
          </a>
          will be added.
      </dd>
    </dl>
  </dd>

  <dt><code>defaultValue</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>boolean</dd>
      <dt>Is Required</dt>
      <dd>No</dd>
      <dt>Description<dt>
      <dd>
        If specified, will be used as the value for 
          <a 
            href="https://www.prisma.io/docs/orm/reference/prisma-schema-reference#default" 
            target="_blank" 
            rel="nofollow noopener noreferrer"
          >
            <code>@default</code> attribute
          </a>
          will be added.
      </dd>
    </dl>
  </dd>

  <dt><code>maximalCharactersCount</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>number</dd>
      <dt>Is Required</dt>
      <dd>No</dd>
      <dt>Description<dt>
      <dd>
        If specified, will be used to select the best native data type such as <code>@db.TinyText</code> or
          <code>@db.MediumText</code> for MySQL.
      </dd>
    </dl>
  </dd>

  <dt><code>fixedCharactersCount</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>number</dd>
      <dt>Is Required</dt>
      <dd>No</dd>
      <dt>Description<dt>
      <dd>
        If specified, will be used to select the best native data type such as <code>@db.TinyText</code> or
          <code>@db.MediumText</code> for MySQL.
        Must NOT be specified with <code>maximalCharactersCount</code>.
      </dd>
    </dl>
  </dd>

</dl>
