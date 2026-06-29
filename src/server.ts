import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import {z} from "zod";

// name = the type of tool u will be catering to 
const server = new McpServer({
      name : "test",
      version : "1.0.0",
})

//creating a tool 
server.tool(
  "create-user",
  "Creates a user in the database",
  {
    name: z.string(),
    email: z.string(),
    address: z.string(),
    phone: z.string(),
  },
  {
      //anotations for the AI feedback? 
    title: "Create User",
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  async ({ name, email, address, phone }) => {
    return {
      content: [
        {
          type: "text",
          text: `Created user ${name}`,
        },
      ],
    };
  }
);

async function main(){
      const transport = new StdioServerTransport();
      await server.connect(transport);
}

main()