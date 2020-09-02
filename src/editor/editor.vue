<template>
    <v-app>
        <div ref="storyBoardEditor" class="story-board-editor-container">
            <div class="story-board-editor-panels-count-container">
                <p class="story-board-editor-panels-count-text">{{ $t("panels") }}</p>

                <div class="story-board-editor-panels-count">
                    <v-radio-group v-model="content.panels" row>
                        <v-radio
                            v-for="panel in panelsMaximumCount"
                            :key="panel"
                            :label="`${panel}`"
                            :value="panel"
                        ></v-radio>
                    </v-radio-group>
                </div>
            </div>

            <Foreground :content="content" @setContent="setContent"/>

            <Background :content="content" />
        </div>
    </v-app>
</template>

<script>

import Foreground from './components/Foreground'
import Background from './components/Background'

import config from '../common/config'

export default {
    name: 'editor',

    data: () => ({
        content: {
            panels: null,
            foregroundEnableUpload: false,
            backgroundEnableUpload: false,
            foregrounds: {},
            backgrounds: []
        },

        panelsMaximumCount: config.panelsMaximumCount,
    }),
    components: {
        Foreground,
        Background
    },

    watch: {
        content: {
            deep: true,
            handler(newVal) {
                this.setContent(newVal);
            }
        }
    },

    methods: {
        setContent() {
            window.parent.postMessage({
                application: 'activity-manager',
                message: 'set-content',
                data: { content: this.content}
            }, '*');
        }
    },

    mounted() {
        window.parent.postMessage({
            application: 'activity-manager',
            message: 'init'
        }, '*');

         window.parent.postMessage({
            application: 'activity-manager',
            message: 'set-iframe-height',
            data: { iframeHeight: this.$refs.storyBoardEditor.scrollHeight }
        }, '*');


        window.addEventListener('message', event => {
            const inst = this;
            if(event.data.application !== 'activity-manager') return;
            switch(event.data.message) {
                case 'init-response':
                    if(Object.keys(event.data.data.content).length !== 0) {
                        inst.content = event.data.data.content;
                    }
                    else {
                        inst.setContent(inst.content);
                    }
                    this.$i18n.locale = event.data.data.language;
                break;
            }
        });
    }
};
</script>

<style lang="scss">

.story-board-editor-container {
    height: 500px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
}

.story-board-editor-panels-count-container {
    width: 50%;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.story-board-editor-panels-count {
    display: flex;
    justify-content: center;
}

#app .story-board-editor-panels-count-text {
    margin: 0;
    font-size: 22px;
}
</style>
