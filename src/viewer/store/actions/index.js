export const setAnswers = ({ commit, getters }, answers) => {
    let answersValue = Object.keys(answers).length > 0 ? answers : getters.answersDefaultValue;
    commit('setAnswers', answersValue);
}

export const setContent = ({ commit }, content) => {
    commit('setContent', content);
}

export const addCharacter = ({ commit }, character) => {
    commit('addCharacter', character);
    commit('setLastCharacter', character);
}

export const addBackground = ({ commit }, backgroundImage) => {
    commit('addBackground', backgroundImage);
    commit('setLastBackground', backgroundImage);
}

export const setActivePanelIndex = ({ commit }, index) => {
    commit('setActivePanelIndex', index);
}

export const setActiveCharacterIndex = ({ commit }, index) => {
    commit('setActiveCharacterIndex', index);
}

export const setCharacterRotateDegees = ({ commit }, { degees, direction }) => {
    commit('setCharacterRotateDegees', { degees, direction });
}

export const changeCharacterVerticalRotate = ({ commit }) => {
    commit('changeCharacterVerticalRotate');
}

export const setCharacterSize = ({ commit }, { size, direction }) => {
    commit('setCharacterSize', { size, direction });
}

export const deleteCharacter = ({commit}) => {
    commit('deleteCharacter');
}
