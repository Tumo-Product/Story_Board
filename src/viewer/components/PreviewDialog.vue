<template>
    <v-dialog
      v-model="previewDialogStatus"
      width="900"
    >
        <v-card class="story-board-viewer-preview-dialog-container">
            <div
                v-for="(panel, index) in content.panels"
                :key="panel"
                class="story-board-viewer-viewer-preview-dialog-panel"
            >
                <div :id="`previewDialogCanvas${index}`"></div>

                <div class="story-board-viewer-viewer-preview-dialog-panel-text">
                    <div class="story-board-viewer-viewer-preview-dialog-title-container">
                        <div class="story-board-viewer-viewer-preview-dialog-panel-count">
                            {{index + 1}}
                        </div>

                        <v-text-field
                            class="story-board-viewer-viewer-preview-dialog-panel-title"
                            v-model="answers[index].title"
                            outlined
                            hide-details
                        ></v-text-field>
                    </div>

                    <v-textarea
                        outlined
                        hide-details
                        no-resize
                        v-model="answers[index].description"
                        height='80'
                        name="input-7-4"
                    ></v-textarea>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
import P5 from 'p5'
import config from '../../common/config'

import { mapState } from 'vuex'
import { moduleName } from '../store/module'

export default {
    name: 'viewer-panels',

    data: () => ({
        config,
        backgroundImage: '',
        selectedCharacters: [],
        panelsCanvasies: [],
        previewDialogStatus: false
    }),

    computed: {
         ...mapState({
            answers: state => state[moduleName].answers,
            content: state => state[moduleName].content
        }),
    },
    watch: {
        previewDialogStatus(newVal) {
            if(newVal) {
                this.$nextTick(()=>{
                    for (let index = 0; index < this.content.panels; index++) {
                        this.canvasSetup(this.answers[index]);
                        new P5(this.sketch, `previewDialogCanvas${index}`);
                    }
                })
            }
            else {
                this.panelsCanvasies.forEach(p5 => {
                    p5.remove();
                });
                this.panelsCanvasies = [];
            }
        }
    },
    methods: {
        changePreviewDialogStatus() {
            this.previewDialogStatus = true;
        },

        canvasSetup(data) {
            this.sketch = p5 => {
                this.panelsCanvasies.push(p5);
                if (data === undefined) return;

                let backgroundImage = '';
                let selectedCharacters = [];
                let sizeDifferenceCoefficient = this.config.viewerMainBoardWidth / this.config.previewDialogPanelsWidth;

                p5.setup = () => {
                    p5.createCanvas(this.config.previewDialogPanelsWidth, this.config.previewDialogPanelsHeight);
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

                                p5.push()
                                p5.translate(item.xPosition / sizeDifferenceCoefficient, item.yPosition / sizeDifferenceCoefficient);
                                p5.rotate(item.rotateDegees);
                                p5.scale(item.verticalRotate, 1);
                                p5.imageMode(p5.CENTER);
                                p5.image(selectedCharacter.img, 0, 0, characterWidth / item.size, characterHeight / item.size);
                                p5.pop()
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

.story-board-viewer-preview-dialog-container {
    width: 1000px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
}

.story-board-viewer-viewer-preview-dialog-panel {
    margin-left: 8px;
    border: 1px solid #ccc;
    width: 402px;
    margin-bottom: 10px;
}

.story-board-viewer-viewer-preview-dialog-panel-text {
    width: 400px;
}
.story-board-viewer-viewer-preview-dialog-title-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.story-board-viewer-viewer-preview-dialog-panel-count {
    width: 40px;
    border:solid 1px #9E9E9E;
    border-right: none;
    border-radius: 5px 0 0 5px;
    height: 56px;
    font-size: 30px;
    color: gray;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>
