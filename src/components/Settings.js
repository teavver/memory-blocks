import toggle_setting from "../utils/toggle_setting"
import { useEffect } from "react"
import bool_setting from "../utils/bool_setting"

const Settings = () => {

    // Check the checkbox if dark mode is ON in localstorage
    useEffect(() => {
        if(bool_setting("DARK_MODE")){
            document.getElementById("dark_mode_checkbox").checked = true
        }
    },[])

    const settings_dark_mode_toggle = () => {
        var element = document.body
        element.classList.toggle("dark-mode")
        toggle_setting("DARK_MODE")
        console.log("TOGGLING")
    }
    
    return(
        <div className="settings-ctn">
            SETTINGS
            <br></br>
            <label htmlFor="dark_mode_setting">Dark mode</label>
            <input onClick={ () => settings_dark_mode_toggle() } type="checkbox" name="dark_mode_setting" id="dark_mode_checkbox"></input>
        </div>
    )
}

export default Settings