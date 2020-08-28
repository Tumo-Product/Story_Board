<template>
    <div class="story-board-viewer-board">
        <div id="canvas"></div>
        <div class="story-board-viewer-controllers-panel">
            <v-btn
                color="blue"
                icon
                :disabled="hasControllersActive"
                @click="deleteActiveCharacter"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>

            <v-btn
                color="blue"
                icon
                :disabled="hasControllersActive"
                @click="changeCharacterVerticalRotate"
            >
              <v-icon>switch_right</v-icon>
            </v-btn>

            <v-btn
                icon
                color="blue"
                :disabled="hasControllersActive"
                @click="changeCharacterRotateDegees(false)"
            >
              <v-icon>rotate_left</v-icon>
            </v-btn>

            <v-btn
                icon
                color="blue"
                :disabled="hasControllersActive"
                @click="changeCharacterRotateDegees(true)"
            >
              <v-icon>rotate_right</v-icon>
            </v-btn>

            <v-btn
                icon
                color="blue"
                :disabled="hasControllersActive"
                @click="changeCharacterSize(true)"
            >
              <v-icon>add</v-icon>
            </v-btn>

            <v-btn
                icon
                color="blue"
                :disabled="hasControllersActive"
                @click="changeCharacterSize(false)"
            >
              <v-icon>remove</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>

import P5 from 'p5'

import { mapState, mapActions } from 'vuex'
import { moduleName } from '../store/module'

import config from '../../common/config'

export default {
    name: 'viewer-board',

    data: () => ({
            config,

            backgroundImage: '',
            p5: null,
            selectedCharacters: []
    }),

    props: {
        content: {
            type: Object,
            default: () => ({})
        }
    },

    computed: {
        ...mapState({
            answers: state => state[moduleName].answers,
            lastSelectedCharacter: state => state[moduleName].lastSelectedCharacter,
            lastSelectedBackground: state => state[moduleName].lastSelectedBackground,
            activePanelIndex: state => state[moduleName].activePanelIndex,
            activeCharacterIndex: state => state[moduleName].activeCharacterIndex
        }),

        hasControllersActive() {
            return this.activeCharacterIndex === null;
        }
    },

    watch: {
        lastSelectedCharacter(newVal) {
            this.p5.loadImage(require(`../../assets/images/foregrounds/${newVal.category}/${newVal.image}`), img => {
                this.selectedCharacters.push({img, imageName: newVal.image});

            });
        },

        lastSelectedBackground(newVal) {
            this.p5.loadImage(require(`../../assets/images/backgrounds/${newVal}`), img => {
                this.backgroundImage = img;
            });
        },

        activePanelIndex(newVal) {
            this.addCanvasImages(newVal);
        }
    },

    methods: {
        ...mapActions([
            'setActiveCharacterIndex',
            'deleteCharacter',
            'setCharacterRotateDegees',
            'setCharacterSize',
            'changeCharacterVerticalRotate'
        ]),

        changeCharacterSize(direction) {
            this.setCharacterSize( { size: 1, direction} )
        },

        changeCharacterRotateDegees(direction) {
            this.setCharacterRotateDegees( {degees: 10, direction} )
        },

        deleteActiveCharacter() {
            this.deleteCharacter();
            this.setActiveCharacterIndex(null);
        },
        addCanvasImages(activePanelIndex) {
            let selectedBoardData = this.answers[activePanelIndex]
            this.selectedCharacters = [];
            this.backgroundImage = '';

            if(selectedBoardData && selectedBoardData.backgroundImage) {
                this.backgroundImage = this.p5.loadImage(require(`../../assets/images/backgrounds/${selectedBoardData.backgroundImage}`));
            }

            if(selectedBoardData && selectedBoardData.characters) {
                for ( var i=0; i < selectedBoardData.characters.length; i++) {
                    let item = selectedBoardData.characters[i]
                    this.p5.loadImage(require(`../../assets/images/foregrounds/${item.category}/${item.image}`), img => {
                        this.selectedCharacters.push({img, imageName: item.image});
                    });
                }
            }

        },
        canvasSetup() {
            this.sketch = p5 => {
                let overBox = false;
                let locked = false;
                let xOffset = 0.0;
                let yOffset = 0.0;
                this.p5 = p5;

                p5.setup = () => {
                    p5.createCanvas(this.config.viewerMainBoardWidth, this.config.viewerMainBoardHeight);
                    p5.rectMode(p5.RADIUS);
                    p5.strokeWeight(2);
                    this.addCanvasImages(this.activePanelIndex);
                    p5.angleMode(p5.DEGREES)
                };

                p5.draw = () => {
                    p5.imageMode(p5.CORNERS);
                    p5.rectMode(p5.RADIUS);
                    p5.strokeWeight(2);
                    p5.background(this.backgroundImage);


                    const mouseIsPressed = (item, index) => {
                        if (p5.mouseIsPressed) {
                            if (overBox) {
                                locked = true;
                                this.setActiveCharacterIndex(index);
                            } else {
                                locked = false;
                            }
                            xOffset = p5.mouseX - item.xPosition;
                            yOffset = p5.mouseY - item.yPosition;
                        }
                    }

                    const mouseDragged = item => {
                        p5.mouseDragged = () =>{
                            if (locked) {
                                item.xPosition = p5.mouseX - xOffset;
                                item.yPosition = p5.mouseY - yOffset;
                            }
                        }
                    }

                    if(this.answers[this.activePanelIndex] && this.answers[this.activePanelIndex].characters) {
                        this.answers[this.activePanelIndex].characters.forEach((item, index) => {
                            p5.noFill();
                            p5.imageMode(p5.CENTER);
                            p5.rectMode(p5.RADIUS);
                            p5.strokeWeight(2);


                            this.selectedCharacters.forEach(selectedCharacter => {
                                if(selectedCharacter.imageName === item.image) {
                                    let characterWidth = selectedCharacter.img.width;
                                    let characterHeight = selectedCharacter.img.height;

                                    p5.push();
                                    p5.translate(item.xPosition, item.yPosition);
                                    p5.rotate(item.rotateDegees);
                                    p5.scale(item.verticalRotate, 1);
                                    p5.image(selectedCharacter.img, 0, 0, characterWidth / item.size, characterHeight / item.size);
                                    p5.pop();

                                    if(index === this.activeCharacterIndex) {
                                        p5.push()
                                        p5.translate(item.xPosition, item.yPosition);
                                        p5.rotate(item.rotateDegees);
                                        p5.rect(0, 0, characterWidth / item.size / 2, characterHeight / item.size / 2);
                                        p5.pop()
                                    }

                                       if (
                                            p5.mouseX > item.xPosition -  characterWidth / item.size / 2 &&
                                            p5.mouseX < item.xPosition +  characterWidth / item.size / 2 &&
                                            p5.mouseY > item.yPosition -  characterHeight / item.size / 2 &&
                                            p5.mouseY < item.yPosition +  characterHeight / item.size / 2
                                        )
                                            {
                                                overBox = true;

                                                if (!locked) {
                                                    p5.push()
                                                    p5.translate(item.xPosition, item.yPosition);
                                                    p5.rotate(item.rotateDegees);
                                                    p5.rect(0, 0, characterWidth / item.size / 2, characterHeight / item.size / 2);
                                                    p5.pop()
                                                    mouseIsPressed(item, index)
                                                    mouseDragged(item)
                                                }
                                            }
                                            else { overBox = false }
                                }
                            });


                            p5.mouseReleased = () =>{
                                locked = false;
                            }

                        })
                    }
                };
            }
        }
    },
    mounted() {
        this.canvasSetup();
        new P5(this.sketch, 'canvas');
    }

};
</script>

<style lang="scss">

.story-board-viewer-board {
    width: 100%;
    height: 400px;
    display: flex;
}
.story-board-viewer-controllers-panel {
    width: 50px;
    height: 400px;
    border-left: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

</style>
