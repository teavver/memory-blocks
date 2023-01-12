const create_game_data = (game_sequence, last_tile, score) => {
    const game_data = {
        "game_sequence": game_sequence,
        "last_tile": last_tile,
        "score": score,
    }
    return game_data
}

export default create_game_data