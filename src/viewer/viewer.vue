<template>
    <div class="story-board-viewer">
        <div class="story-board-viewer-main">
            <Board />

            <div class="story-board-viewer-board-images">
                <Panels />

                <Images />
            </div>
        </div>
    </div>
</template>

<script>

import Panels from './components/Panels'
import Images from './components/Images'
import Board from './components/Board'

import { debounce } from 'lodash'

import VuexModule, { moduleName } from './store/module'
import { mapActions, mapState } from 'vuex'


export default {
    name: 'viewer',

    components: {
        Panels,
        Images,
        Board
    },

    computed: {
        ...mapState({
            answers: state => state[moduleName].answers,
            content: state => state[moduleName].content,
        }),
    },

    watch: {
        answers: {
            deep: true,
            handler: debounce(function(newVal) {
                window.parent.postMessage({
                    application: 'activity-manager',
                    message: 'set-answers',
                    data: { answers: newVal }
                }, '*');
            }, 500)
        }
    },

    methods: {
        ...mapActions([
            'setAnswers',
            'setContent'
        ])
    },

    mounted() {
        window.parent.postMessage({
            application: 'activity-manager',
            message: 'init'
        }, '*');

        window.addEventListener('message', event => {
            const inst = this;
            if(event.data.application !== 'activity-manager') return;

            switch(event.data.message) {
                case 'init-response':
                    inst.setContent(event.data.data.content);
                    inst.setAnswers(event.data.data.answers);
                break;
            }
        });
    },
    beforeCreate() {
        this.$store.registerModule(moduleName, VuexModule());
    },
    beforeDestroy() {
        this.$store.unregisterModule(moduleName);
    },


};
</script>

<style lang="scss">
.story-board-viewer {
    border: 1px solid #ccc;
    width: 100%;
    height: 800px;
}

.story-board-viewer-main {
    width: 100%;
}

.story-board-viewer-board-images {
    width: 100%;
    height: 400px;
}

</style>
