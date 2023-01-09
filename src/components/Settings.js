import update_settings from "../utils/update_settings";
import toggle_local_storage_setting from "../utils/toggle_local_storage_setting";
import bool_setting from "../utils/bool_setting";
import check_setting from "../utils/check_setting";
import { useEffect } from "react";
import { tile_colors } from "../utils/tile_colors";
import "../styles/settings.css";

const Settings = () => {
    
    // Check the checkbox if dark mode is ON in localstorage
    useEffect(() => {
        if(!check_setting("DARK_MODE")){ localStorage.setItem("DARK_MODE","false") }
        if(bool_setting("DARK_MODE")){
            document.getElementById("dark_mode_checkbox").checked = true
        }
        if(check_setting("TILE_COLOR_ID")){
            clear_tile_colorpickers()
            var color_elements = document.querySelectorAll(".settings-tile-colorpicker")
            const color_id = localStorage.getItem("TILE_COLOR_ID")
            color_elements[color_id-1].classList.add("selected-color")
            
            // Update color on render
            // console.log(tile_colors[color_id])
            document.documentElement.style.setProperty("--tile_color",tile_colors[color_id])
        }
    },[])
    
    const settings_dark_mode_toggle = () => {
        var body = document.body
        body.classList.toggle("dark-mode")
        toggle_local_storage_setting("DARK_MODE")
    }
    
    const settings_tile_color_change = (id) => {
        update_settings("--tile_color",`${tile_colors[id]}`)
        localStorage.setItem("TILE_COLOR_ID",id)
        
        // Clear all colors
        clear_tile_colorpickers()
        
        // Apply to the color selected
        var tile_color_elements = document.querySelectorAll(".settings-tile-colorpicker")
        tile_color_elements[id-1].classList.add("selected-color")
    }
    
    const clear_tile_colorpickers = () => {
        var tile_color_elements = document.querySelectorAll(".settings-tile-colorpicker")
        for (let i = 0; i < tile_color_elements.length; i++) {
            tile_color_elements[i].classList.remove("selected-color")
        }
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
                        <div onClick={ () => settings_tile_color_change(1) } className="settings-tile-colorpicker selected-color" id="settings-tile-color-1"></div>
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