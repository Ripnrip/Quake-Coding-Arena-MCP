import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { ListPromptsRequestSchema, GetPromptRequestSchema } from "@modelcontextprotocol/sdk/types.js";

export function registerEncouragementPrompts(server: Server) {
    // 💡 Prompts Implementation
    server.setRequestHandler(ListPromptsRequestSchema, async () => {
        return {
            prompts: [
                {
                    name: "encourage-developer",
                    description: "Encourage the developer with a Quake sound based on recent success",
                    arguments: [
                        {
                            name: "success_level",
                            description: "Level of success (low, medium, high)",
                            required: true
                        }
                    ]
                },
                {
                    name: "celebrate-victory",
                    description: "Celebrate a major coding victory",
                    arguments: [
                        {
                            name: "achievement",
                            description: "Specific achievement to reference (e.g. GODLIKE)",
                            required: false
                        }
                    ]
                }
            ]
        };
    });

    server.setRequestHandler(GetPromptRequestSchema, async (request) => {
        const promptName = request.params.name;
        const args = request.params.arguments || {};

        if (promptName === "encourage-developer") {
            const level = args.success_level;
            let sound = "IMPRESSIVE";
            if (level === "high") sound = "GODLIKE";
            if (level === "low") sound = "EXCELLENT";

            return {
                messages: [
                    {
                        role: "user",
                        content: {
                            type: "text",
                            text: `The developer just achieved a ${level} success. Please acknowledge this and then immediately call the play_enhanced_quake_sound tool with the '${sound}' achievement.`
                        }
                    }
                ]
            };
        }

        if (promptName === "celebrate-victory") {
            const achievement = args.achievement || "PERFECT";
            return {
                messages: [
                    {
                        role: "user",
                        content: {
                            type: "text",
                            text: `We have a victory! Please celebrate by calling the play_enhanced_quake_sound tool with the '${achievement}' achievement and add an encouraging comment.`
                        }
                    }
                ]
            };
        }

        throw new Error("Prompt not found");
    });
}
