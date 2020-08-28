<template>
    <div class="story-board-viewer-panels">
        <div class="story-board-viewer-panels-header">
            <div class="story-board-viewer-panels-preview-container">
                <v-btn class="story-board-viewer-panels-preview-button" icon color="blue">
                    <v-icon size="40" @click="changePreviewDialogStatus">view_module</v-icon>
                </v-btn>

                <v-btn icon color="blue">
                    <v-icon size="30" @click="updataConvas">mdi-cached</v-icon>
                </v-btn>
            </div>

            <PreviewDialog ref="previewDialog" />
        </div>

        <div class="story-board-viewer-panels-container">
            <div
                v-for="(panel, index) in content.panels"
                :key="panel"
                :class="['story-board-viewer-panel', activePanelClass(index)]"
                @click="selectPanel(index)"
            >
                <div :id="`canvas${index}`"></div>
            </div>
        </div>
    </div>
</template>

<script>
import P5 from 'p5'

import config from '../../common/config'

import PreviewDialog from '../components/PreviewDialog'

import { debounce } from 'lodash'
import { mapState, mapActions} from 'vuex'
import { moduleName } from '../store/module'

export default {
    name: 'viewer-panels',

    data: () => ({
        config,

        backgroundImage: '',
        selectedCharacters: [],
        panelsCanvasies: []
    }),

    components: {
        PreviewDialog
    },

    computed: {
        ...mapState({
            answers: state => state[moduleName].answers,
            content: state => state[moduleName].content,
            activePanelIndex: state => state[moduleName].activePanelIndex
        }),
    },
    watch: {
        content() {
            for (let index = 0; index < this.content.panels; index++) {
                 this.canvasSetup(this.answers[index]);
                 new P5(this.sketch, `canvas${index}`);
            }
        },
    },
    methods: {
        ...mapActions(['setActivePanelIndex', 'setActiveCharacterIndex']),

        changePreviewDialogStatus() {
            this.$refs.previewDialog.changePreviewDialogStatus();
        },

        activePanelClass(index) {
           return this.activePanelIndex === index ? 'story-board-viewer-active-panel' : '';
        },

        selectPanel(index) {
            this.setActivePanelIndex(index);
            this.setActiveCharacterIndex(null);
        },

        updataConvas: debounce(function() {
            this.panelsCanvasies.forEach(p5 => {
                p5.remove();
            });

            this.panelsCanvasies = [];

            for (let index = 0; index < this.content.panels; index++) {
                this.canvasSetup(this.answers[index]);
                new P5(this.sketch, `canvas${index}`);
            }
        }, 300),

        canvasSetup(data) {
            this.sketch = p5 => {
                this.panelsCanvasies.push(p5)
                if (data === undefined) return;

                let backgroundImage = '';
                let selectedCharacters = [];
                let sizeDifferenceCoefficient = this.config.viewerMainBoardWidth / this.config.viewerPanelsWidth;

                p5.setup = () => {
                    p5.createCanvas(this.config.viewerPanelsWidth, this.config.viewerPanelsHeight);
                    p5.rectMode(p5.RADIUS);
                    p5.strokeWeight(2);
                    p5.angleMode(p5.DEGREES);

                    if(data.backgroundImage) {
                        backgroundImage = p5.loadImage(require(`../../assets/images/backgrounds/${data.backgroundImage}`));
                    }

                    if(data.characters) {
                        for ( var i=0; i < data.characters.length; i++) {
                            let item = data.characters[i]
                            p5.loadImage(require(`../../assets/images/foregrounds/${item.category}/${item.image}`), img => {
                                selectedCharacters.push({ img, imageName: item.image });
                            });
                        }
                    }
                };

                p5.draw = () => {
                    p5.imageMode(p5.CORNERS);
                    p5.rectMode(p5.RADIUS);
                    p5.strokeWeight(2);
                    p5.background(backgroundImage);

                    for ( var i=0; i < data.characters.length; i++) {
                        let item = data.characters[i];

                        p5.noFill();
                        p5.imageMode(p5.CENTER);
                        p5.rectMode(p5.RADIUS);
                        p5.strokeWeight(2);

                        selectedCharacters.forEach(selectedCharacter => {
                            if(selectedCharacter.imageName === data.characters[i].image) {
                                let characterWidth = selectedCharacter.img.width / sizeDifferenceCoefficient;
                                let characterHeight = selectedCharacter.img.height/ sizeDifferenceCoefficient;

                                p5.push();
                                p5.translate(item.xPosition / sizeDifferenceCoefficient, item.yPosition / sizeDifferenceCoefficient);
                                p5.rotate(item.rotateDegees);
                                p5.scale(item.verticalRotate, 1);
                                p5.imageMode(p5.CENTER);
                                p5.image(selectedCharacter.img, 0, 0, characterWidth / item.size, characterHeight / item.size);
                                p5.pop();
                            }
                        });
                    }
                };
            }
        }
    },

};
</script>

<style lang="scss">

.story-board-viewer-panels {
    border: 1px solid #ccc;
}

.story-board-viewer-panels-header {
    height: 35px;
    margin: 5px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.story-board-viewer-panels-container {
    height: 105px;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;

}

.story-board-viewer-panel {
    margin-left: 10px;
    border: 1px solid #ccc;
    height: 95px;
    width: 199px;
    flex: 0 0 auto;
    cursor: pointer;
}

.story-board-viewer-panel:hover {
    border: 2px solid #6200ea;

}

.story-board-viewer-active-panel {
    border: 2px solid #6200ea;
}

.story-board-viewer-panels-preview-container {
    width: 100%;
    height: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 5px;
}

.story-board-viewer-panels-preview-button {
    margin-left: 5px;
}

</style>
