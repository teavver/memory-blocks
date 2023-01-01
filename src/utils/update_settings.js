import { user_settings } from "../user_settings"

const update_settings = (css_var, value, apply_to_user_settings = false, setting_type = "") => {
    document.documentElement.style.setProperty(css_var,value)
    console.log(document.documentElement.style.getPropertyValue(css_var))
    if(apply_to_user_settings){
        user_settings.setting_type = value
        console.log(user_settings.css_var)
    }
}

export default update_settings