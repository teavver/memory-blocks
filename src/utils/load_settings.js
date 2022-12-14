import bool_setting from "./bool_setting"

const load_settings = () => {
    // Check for dark mode first and apply
    if(bool_setting("DARK_MODE") === true){
        var element = document.body
        element.classList.add("dark-mode")
        if(document.getElementById("dark_mode_checkbox")){
            document.getElementById("dark_mode_checkbox").checked = true
        }
    }
} 

export default load_settings