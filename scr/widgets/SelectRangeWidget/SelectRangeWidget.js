function createSelectRangeWidget(
    items,
    mode,
    onChange,
){
    applyCss()
    const container = $(`<form class="slw_container"/>`)
    items.forEach(item => {
        const i = $(`<label class="slw-item">
                <input type="checkbox" class="slw-checkbox-input" name="filter" value="${item.v}" ${item.isChecked ? 'checked' : ''}/>
                <div class="slw-checkbox" aria-hidden="true">
                    <span>${ item.v }</span>
                </div>
            </label>`)
        container.append(i)
    })
    container.on('change', function(e) {
        e.preventDefault();
        const data = new FormData(this);
        const filters = data.getAll('filter')
        onChange(filters)
    });
    return container
}

function applyCss() {
    const link = document.createElement('style')
    link.innerHTML = '' +
        '.slw_container {\n' +
        '    display: flex;\n' +
        '    justify-content: space-between;\n' +
        '    flex-direction: column;\n' +
        '    padding: 2px;\n' +
        '    gap: 6px;\n' +
        '}\n' +
        '\n' +
        '.slw-item {\n' +
        '    position: relative;\n' +
        '    display: flex;\n' +
        '    justify-content: center;\n' +
        '    align-items: center;\n' +
        '}\n' +
        '\n' +
        '.slw-checkbox-input {\n' +
        '    appearance: none;\n' +
        '    position: relative;\n' +
        '    min-width: 100%;\n' +
        '    height: 38px;\n' +
        '    border-radius: 10px;\n' +
        '}\n' +
        '\n' +
        '.slw-checkbox-input[type="checkbox"] {\n' +
        '    margin: 0;\n' +
        '}\n' +
        '\n' +
        '.slw-checkbox {\n' +
        '    position: absolute;\n' +
        '    top: 0px;\n' +
        '    left: 0px;\n' +
        '    display: flex;\n' +
        '    align-items: center;\n' +
        '    min-width: 100%;\n' +
        '    height: 38px;\n' +
        '    border: 1px solid blue;\n' +
        '    border-radius: 10px;\n' +
        '    user-select: none;\n' +
        '    box-sizing: border-box;\n' +
        '    padding-left: 10px;\n' +
        '}\n' +
        '\n' +
        '.slw-checkbox-input:checked {\n' +
        '    background: #C56FFF;\n' +
        '}\n' +
        '\n' +
        '.slw-checkbox-input:checked + .slw-checkbox {\n' +
        '    color: #000000;\n' +
        '}\n' +
        '\n' +
        '.slw-checkbox-input:disabled {\n' +
        '    background: gray;\n' +
        '}'
    document.head.appendChild(link)
}