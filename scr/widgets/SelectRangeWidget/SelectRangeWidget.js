function createSelectRangeWidget(
    items,
    mode,
    onChange,
){
    const container = $(`<form class="slw_container"/>`)
    items.forEach(item => {
        const i = $(`<label class="slw-item">
                <input type="checkbox" class="slw-checkbox-input" name="filter" value="${item}"/>
                <div class="slw-checkbox" aria-hidden="true">
                    <span>${ item }</span>
                </div>
            </label>`)
        container.append(i)
    })
    container.on('change', function() {
        const data = new FormData(this);
        const filters = data.getAll('filter')
        onChange(filters)
    });
    return container
}