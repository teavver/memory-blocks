import { game_schema } from "../../redis/schemas/game_schema.js";
import Ajv from "ajv";
const ajv = new Ajv()

const validate_game = (game_data) => {
   const valid = ajv.validate( game_schema, game_data )
   if(!valid){ console.error(ajv.errors); return false }
   if(valid){
        console.log(`game ${game_data.game_id} validated!`)
        return true
   }
}

export default validate_game