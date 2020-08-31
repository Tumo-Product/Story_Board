<template>
    <v-app>
        <div class="story-board-examiner">
            <StoryBoardPanels :content="content" :answers="answers" />
        </div>
    </v-app>
</template>

<script>

import StoryBoardPanels from './components/StoryBoardPanels'

export default {
    name: 'examiner',

    data:() => ({
      content: {},
      answers: []
    }),

    components: {
      StoryBoardPanels
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
                    inst.content = event.data.data.content;
                    inst.answers = event.data.data.answers;
                break;
            }
        });
    }

};
</script>

<style lang="scss">
.story-board-examiner {
    border: 1px solid #ccc;
    width: 100%;
}

.story-board-viewer-main {
    width: 100%;
}

.story-board-viewer-board-images {
    width: 100%;
    height: 400px;
}

</style>
