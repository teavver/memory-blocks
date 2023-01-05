const create_game_data = (game_sequence, last_tile, score, user_id) => {
    const game_data = {
        "game_sequence": game_sequence,
        "last_tile": last_tile,
        "score": score,
        "user_id": user_id
    }
    return game_data
}

export default create_game_data