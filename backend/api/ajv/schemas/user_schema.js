export const user_schema = {
    type: "object",
    "properties": {
        username: {type: "string"},
        id: {type: "integer"},
    },
    required: ["username", "id"],
    additionalProperties: false
}