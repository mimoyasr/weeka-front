var widget = uploadcare.Widget('#demo-widget')

widget.onChange(function(file) {
	if (file) {
		file
		.done(function(info) {
			setValue(info.cdnUrl)
		})
		.fail(function() {
			setValue(null)
		})
	}
	else {
		setValue(null)
	}
})

function setValue(value) {
	var $value = document.querySelector('.result__value')
	
	if (value === null) {
	  $value.innerText = 'null'
	}
	else {
		$value.innerHTML = `<a href="${value}">${value}</a>`
	}
}
