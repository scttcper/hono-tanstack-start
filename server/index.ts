import { z } from "@hono/zod-openapi";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";

const ParamsSchema = z.object({
  id: z
    .string()
    .min(3)
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      example: "1212121",
    }),
});

const route = createRoute({
  method: "get",
  path: "/test/:id",
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            id: z.string(),
            age: z.number(),
            name: z.string(),
          }),
        },
      },
      description: "Retrieve the user",
    },
  },
});

export const app = new OpenAPIHono()
  .basePath("/api")
  .openapi(route, (c) => {
    const { id } = c.req.valid("param");
    return c.json({
      id,
      age: 20,
      name: "Ultra-man",
    });
  })
  .doc("/apidoc", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "My API",
    },
  })
  .get("*", (c) => {
    return c.json({
      message: "Not Found",
    }, 404);
  })
  .get("/doc", swaggerUI({ url: "/api/apidoc" }));

export type App = typeof app;
