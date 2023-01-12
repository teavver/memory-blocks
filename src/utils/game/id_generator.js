const id_generator = (digits) => {
    let id
    switch (digits) {
        case 4:        
            id = Math.floor(1000 + (9999 - 1000) * Math.random())
            return id
        case 6:
            id = Math.floor(100000 + (999999 - 100000) * Math.random())
            return id
        default:
            console.error("id_generator.js - bad fn arg")
            return
    }   
}

export default id_generator