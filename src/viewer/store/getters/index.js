export const answersDefaultValue = state => {
    let value = [];
    for (let i = 0; i < state.content.panels; i++) {
        value.push({
                backgroundImage: '',
                characters: [],
                title: '',
                description: ''
            });
    }
    return value;
}