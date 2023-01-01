const toggle_setting = (setting_type) => {
    if(localStorage.getItem(setting_type) === "true"){
        localStorage.setItem(setting_type, "false")
        return
    }
    else if(localStorage.getItem(setting_type) === "false"){
        localStorage.setItem(setting_type, "true")
        return
    }
}

export default toggle_setting