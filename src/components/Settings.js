import toggle_setting from "../utils/toggle_setting";
import { useEffect } from "react";
import bool_setting from "../utils/bool_setting";
import update_settings from "../utils/update_settings";
import "../styles/settings.css";

const Settings = () => {

    const settings_tile_color_palette = {
        1: "57, 68, 221",
        2: "255, 0, 0",
        3: "0, 255, 0",
        4: "255, 50, 200",
    }
    
    // Check the checkbox if dark mode is ON in localstorage
    useEffect(() => {
        if(bool_setting("DARK_MODE")){
            document.getElementById("dark_mode_checkbox").checked = true
        }
    },[])
    
    const settings_dark_mode_toggle = () => {
        var body = document.body
        body.classList.toggle("dark-mode")
        toggle_setting("DARK_MODE")
        console.log("toggling dark-mode")
    }
    
    const settings_tile_color_change = (id) => {
        update_settings("--tile_color",`${settings_tile_color_palette[id]}`)
    }
    
    return(
        <div className="settings-content">
            <ul>
                <li>
                    <label htmlFor="dark_mode_setting">Dark mode</label>
                    <input onClick={ () => settings_dark_mode_toggle() } type="checkbox" name="dark_mode_setting" id="dark_mode_checkbox"></input>
                </li>
                <li>
                <div className="settings-tile-colorpicker-ctn">
                    <p>Tile color</p>
                    <div onClick={ () => settings_tile_color_change(1) } className="settings-tile-colorpicker settings-tile-colorpicker-selected" id="settings-tile-color-1"></div>
                    <div onClick={ () => settings_tile_color_change(2) } className="settings-tile-colorpicker" id="settings-tile-color-2"></div>
                    <div onClick={ () => settings_tile_color_change(3) } className="settings-tile-colorpicker" id="settings-tile-color-3"></div>
                    <div onClick={ () => settings_tile_color_change(4) } className="settings-tile-colorpicker" id="settings-tile-color-4"></div>
                </div>    
                </li>
            </ul>
        </div>
    )
}

export default Settings