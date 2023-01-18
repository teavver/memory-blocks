import generate_data from "./generate_data.js";

// Generate a lot of testing data for jupyter
const generate_test_data = () => {
    let data = {}
    const amount_of_games = 800

    for (let i = 0; i < amount_of_games; i++) {
        const generated_game_data = generate_data()
        data[i] = generated_game_data
    }

    const dt = JSON.stringify(data)
    console.log(dt)
    return dt
}

export default generate_test_data