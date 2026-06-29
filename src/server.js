import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import fs from "node:fs/promises";
// name = the type of tool u will be catering to 
const server = new McpServer({
    name: "test",
    version: "1.0.0",
});
//creating a tool 
server.tool("create-user", "Creates a user in the database", {
    name: z.string(),
    email: z.string(),
    address: z.string(),
    phone: z.string(),
}, {
    //anotations for the AI feedback? 
    title: "Create User",
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
}, async (params) => {
    try {
        const id = await createUser(params);
    }
    catch {
        return { content: [{ type: "text", text: " failed to save the user" }] };
    }
    return { content: [{ type: "text", text: ' user created successfully!' }] };
});
async function createUser(user) {
    const users = await import("./data/userdata.json", { with: { type: "json" } }).then(m => m.default);
    const id = users.length + 1;
    users.push({ id, ...user });
    await fs.writeFile("./src/data/users.json", JSON.stringify(users, null, 2));
    return id;
}
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}
main();
//# sourceMappingURL=server.js.map