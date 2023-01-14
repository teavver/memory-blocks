import bool_setting from "./bool_setting"
import check_setting from "./check_setting"
import id_generator from "./game/id_generator"

const load_settings = () => {
    
    check_for_user_id()
    check_for_dark_mode()
}

const check_for_user_id = () => {
    
    // Check for user id
    if(!check_setting("USER_ID")){
        // New user, generate id and assign
        const user_id = id_generator(4)
        localStorage.setItem("USER_ID", user_id)
    }
}

const check_for_dark_mode = () => {
    
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