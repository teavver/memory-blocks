const updt_css_var = (css_var, new_value) => {
    var root = document.documentElement
    root.style.setProperty(css_var, new_value)
}

export default updt_css_var