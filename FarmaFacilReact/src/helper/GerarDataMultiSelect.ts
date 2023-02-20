export function SetDataMultiSelect(data: any[], key: string) {
    const dataMultiSelect: any[] = [];

    data.forEach((item) => {
        let ItemData = {
            value: item.id,
            label: item[key]
        }
        dataMultiSelect.push(ItemData);
    })

    return dataMultiSelect;
}