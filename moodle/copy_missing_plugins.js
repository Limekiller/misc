// Execute this JS code on the plugins overview page to get a list of all missing from disk plugins
let pluginList = ""
for (element of document.querySelectorAll('.status-missing .componentname')) {
  pluginList += element.textContent + "\n"
}
window.alert(pluginList)
