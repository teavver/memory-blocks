import generate_data from "./generate_data.js";

// Generate a lot of testing data for jupyter
const generate_test_data = () => {
    let data = {}

    for (let i = 0; i < 20; i++) {
        const generated_game_data = generate_data()
        data[i] = generated_game_data
    }

    const dt = JSON.stringify(data)
    console.log(dt)
    return dt
}

export default generate_test_data