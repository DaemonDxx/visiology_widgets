import css from './MonthPickerWidgetStyles.css?raw'

const items = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
]

const indexes = {
    'Январь': 0,
    'Февраль': 1,
    'Март': 2,
    'Апрель': 3,
    'Май': 4,
    'Июнь': 5,
    'Июль': 6,
    'Август': 7,
    'Сентябрь': 8,
    'Октябрь': 9,
    'Ноябрь': 10,
    'Декабрь': 11
}

function createMonthPickerWidget(
    id,
    checkedItems,
    mode,
    onChange,
) {
    applyCss()

    let lastSelectIndex = 0
    const container = $(`<form class="mp_container"/>`)

    items.forEach(month => {
        const i = $(`
            <label class="mp-item">
                <div class="mp-checkbox" aria-hidden="true">
                    <span>${month}</span>
                </div>
            </label>`)
        const input = $(`
            <input type="checkbox" class="mp-checkbox-input" name="${id}" value="${month}" ${checkedItems.includes(month.toLowerCase()) ? 'checked' : ''}/>
        `)
        input.on('click', function (e) {
            if (e.shiftKey) {
                const selectIndex = indexes[month]
                const startIndex = selectIndex > lastSelectIndex ? lastSelectIndex : selectIndex
                const endIndex = selectIndex > lastSelectIndex ? selectIndex : lastSelectIndex
                for (let y = startIndex; y < endIndex; y++) {
                    container.find(`input[value=${items[y]}]`).prop('checked', true)
                }
            } else if (e.ctrlKey || e.altKey) {
                return;
            } else if (!input.prop('checked')) {
                return
            } else {
                container.find('input').each(function () {
                    if ($(this).prop('value') !== month) {
                        $(this).prop('checked', false)
                    }
                })
            }
            lastSelectIndex = indexes[month]
        })

        i.prepend(input)
        container.append(i)
    })

    container.on('change', function (e) {
        e.preventDefault();
        const data = new FormData(this);
        const filters = data.getAll(id).map((v) => v.toLowerCase())
        onChange({
            id,
            values: filters,
        })

    });
    return container
}

function applyCss() {
    const link = document.createElement('style')
    link.innerHTML = css;
    document.head.appendChild(link)
}


window.srw = {
    createMonthPickerWidget: createMonthPickerWidget,
}