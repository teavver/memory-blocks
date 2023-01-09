const update_settings = (css_var, value) => {
    document.documentElement.style.setProperty(css_var,value)
    console.log(document.documentElement.style.getPropertyValue(css_var))
}

export default update_settings