Generates the **prisma.schema** based on script intended to be executed by [ts-node](https://typestrong.org/ts-node/) or
[tsx](https://tsx.is/).
Designed for projects obeys to **Clean Architecture** principles one of which forbids the defining of the
**business rules** using the frameworks.


## Problem Overview

**Prisma** [suggests](https://www.prisma.io/docs/orm/overview/introduction/data-modeling#data-modeling-with-prisma-orm)
to make the **prisma.schema** file the source of business rules definition.
(Although it has not been declared directly, de facto using just the **Prisma** you need
either make the **prisma.schema** to the source business rules definitions, or additionally
[model the data on application level](https://www.prisma.io/docs/orm/overview/introduction/data-modeling#data-modeling-on-the-application-level)
what it rarely practiced because it is the dual management impacting the application maintainability).

The defining of the business rules in **prisma.schema** is the gross violation of **Clean Architecture**.

>

According to the Clear Architecture, the **prisma.schema** must be on the **** level what implies that the business
rules are readonly for either Prisma or another ORM.

>

## Solution



## Quick Example


## API
### `PrismaSchemaGenerator` Class / Namespace

Has only one public member, the static `generate` method.

#### `generate` Static Method

```
(
  options: Readonly<{
    generatorProvider: string;
    databaseProvider: PrismaSchemaGenerator.SupportedDatabaseProviders;
    modelsDefinitions: ReadonlyArray<PrismaSchemaGenerator.ModelDefinition>;
    outputFileAbsolutePath: string;
  }>
): Promise<void>
```

Generates the **prisma.schema** file according the specified options.

##### Options
###### `generatorProvider`

The value of [`generator.provider`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#fields-1).
Usually the `"prisma-client-js"` unless using the
[community generators](https://www.prisma.io/docs/orm/prisma-schema/overview/generators#community-generators).

###### `databaseProvider`

Corresponding to [`datasource.provider`](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#datasource)
of **prisma.schema**.
Must be the element of `PrismaSchemaGenerator.ModelDefinition` enumeration.

###### `modelsDefinitions`

The array of `PrismaSchemaGenerator.ModelDefinition` objects basing on which the Prisma models will be generated.

<dl>

  <dt>Type</dt>
  <dd></dd>

  <dt>Is required</dt>
  <dd>No</dd>

  <dt>Schema<dt>
  <dd><pre><code>
{
  presetFileRelativePath?: string;
  enable?: boolean;
}
  </code></pre></dd>

</dl>
