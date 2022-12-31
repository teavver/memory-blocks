
const Settings = () => {
    
    const settings_dark_mode_toggle = () => {
        var element = document.body;
        element.classList.toggle("dark-mode");
    }
    
    return(
        <div className="settings-ctn">
            SETTINGS LOL
            <button onClick={ () => settings_dark_mode_toggle() }>Dark mode toggle</button>
        </div>
    )
}

export default Settings