import state from './state'

import * as mutations from './mutations/index'

import * as actions from './actions/index'

import * as getters from './getters/index'

export default () => ({
    state: state(),
    mutations,
    actions,
    getters
});

export const moduleName = 'viewer';
