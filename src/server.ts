import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";

// name = the type of tool u will be catering to 
const server = new McpServer({
      name : "test",
      version : "1.0.0",
})

async function main(){
      const transport = new StdioServerTransport();
      await server.connect(transport);
}

main()