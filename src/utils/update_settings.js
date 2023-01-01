import { user_settings } from "../user_settings"

const update_settings = (css_var, value) => {
    document.documentElement.style.setProperty(css_var,value)
    user_settings.setting_type = value
    console.log(user_settings.css_var)
}

export default update_settings