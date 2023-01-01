const check_setting = (setting_name) => {
    // Check if setting exists -> return bool
    if (!localStorage.getItem(setting_name)){
        return false
    }
    return true
}

export default check_setting