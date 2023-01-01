const bool_setting = (setting_name) => {
    if(localStorage.getItem(setting_name) === "true"){
        return true
    }
    return false
}

export default bool_setting