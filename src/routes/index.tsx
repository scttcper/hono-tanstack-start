import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { hc } from "hono/client";
import { App } from "../../server";

const client = hc<App>("http://localhost:3000");

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      const response = await client.api.test[":id"].$get({
        param: {
          id: "1212121",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    },
  });
  return (
    <div className="p-2">
      <h3>Api Test</h3>
      <div className="flex gap-1">
      Result: {isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <pre>{data.name}</pre>
      )}</div>
    </div>
  );
}
