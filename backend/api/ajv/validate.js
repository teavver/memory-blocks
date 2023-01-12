import Ajv from "ajv";
const ajv = new Ajv()

const validate = (schema, object) => {
    const valid = ajv.validate(schema,object)
    if(!valid){ console.error(ajv.errors); return false }
    if(valid){
        return true
    }
}

export default validate