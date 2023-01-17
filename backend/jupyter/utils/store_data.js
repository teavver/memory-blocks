import generate_test_data from "./generate_test_data.js"
import * as fs from 'fs';

// Store some randomly generated data in a biiiiig json file for jupyter later
const store_data = () => {
    const data = generate_test_data()
    
    try {        
        fs.writeFileSync('test_data.json', data)
    } catch (err) {
        console.error(err)
    }    
}

export default store_data