export const setAnswers = (state, answers) => {
    state.answers = answers;
}

export const setContent = (state, content) => {
    state.content = content;
}

export const addCharacter = (state, character) => {
    state.answers[state.activePanelIndex].characters.push(character);
}

export const addBackground = (state, backgroundImage) => {
    state.answers[state.activePanelIndex].backgroundImage = backgroundImage;
}

export const setLastCharacter = (state, character) => {
    state.lastSelectedCharacter = character;
}

export const setLastBackground = (state, backgroundImage) => {
    state.lastSelectedBackground = backgroundImage;
}

export const setActivePanelIndex = (state, index) => {
    state.activePanelIndex = index;
}

export const setActiveCharacterIndex = (state, index) => {
    state.activeCharacterIndex = index;
}

export const setCharacterRotateDegees = (state, { degees, direction }) => {
    let character = state.answers[state.activePanelIndex].characters[state.activeCharacterIndex];
    direction ? character.rotateDegees += degees : character.rotateDegees -= degees;
}

export const setCharacterSize = (state, { size, direction }) => {
    let character = state.answers[state.activePanelIndex].characters[state.activeCharacterIndex];

    if(character.size === 1 || character.size === 25) return character.size = 10;

    direction ? character.size -= size : character.size += size;
}

export const changeCharacterVerticalRotate = state => {
    let character = state.answers[state.activePanelIndex].characters[state.activeCharacterIndex];

    character.verticalRotate = character.verticalRotate == 1 ? -1 : 1;
}

export const deleteCharacter = state => {
    if(state.activeCharacterIndex != null) {
        state.answers[state.activePanelIndex].characters.splice(state.activeCharacterIndex, 1);
    }
}
