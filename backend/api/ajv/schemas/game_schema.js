export const game_schema = {
    type: "object",
    "properties": {
        game_sequence: { type: "array" },
        last_tile: { type: "integer" },
        score: { type: "integer" },
        user_id: { type: "integer" },
        game_id: { type: "integer" },
    },
    required: [ "game_sequence", "last_tile", "score", "user_id", "game_id" ],
    additionalProperties: false
}