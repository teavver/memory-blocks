import id_generator from "./id_generator.js";

// Generate realistic random game values for data visualization
const generate_data = () => {

    const game_seq_len = gen_random_int(20) // I doubt avg score would be higher than 20
    const game_sequence = generate_game_sequence(game_seq_len)

    const last_tile = gen_random_int(16)
    const score = game_seq_len
    const user_id = id_generator(4)
    const game_id = id_generator(6)

    const game_data = {
        game_sequence,
        last_tile,
        score,
        user_id,
        game_id
    }

    return game_data
}

const generate_game_sequence = (arr_length) => {
    let game_sequence = []
    const number_of_tiles = 16

    for (let i = 0; i < arr_length; i++) {
        game_sequence.push(gen_random_int(number_of_tiles))
    }

    return game_sequence
}

const gen_random_int = (max) => {
    return Math.floor( Math.random() * max )
}

export default generate_data