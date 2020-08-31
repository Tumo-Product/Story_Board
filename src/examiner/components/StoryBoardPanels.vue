<template>
    <div ref="storyBoardExaminer" class="story-board-examiner-preview-container">
        <div
            v-for="(panel, index) in content.panels"
            :key="panel"
            class="story-board-examiner-panel"
        >
            <div :id="`examinerStoryBoard${index}`"></div>

            <div class="story-board-examiner-panel-text">
                <div class="story-board-examiner-title-container">
                    <div class="story-board-examiner-panel-count">
                        {{index + 1}}
                    </div>

                    <div class="story-board-examiner-panel-title">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <span v-bind="attrs" v-on="on">{{ answers[index].title }}</span>
                            </template>
                            <span>{{ answers[index].title }}</span>
                        </v-tooltip>
                    </div>
                </div>

                <div class="story-board-examiner-panel-description">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">{{ answers[index].description }}</span>
                        </template>
                        <span>{{ answers[index].description }}</span>
                    </v-tooltip>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import P5 from 'p5'
import config from '../../common/config'

export default {
    name: 'viewer-panels',

    data: () => ({
        config
    }),

   props: {
        content: {
            type: Object,
            default: () => ({})
        },
        answers: {
            type: Array,
            default: () => ([])
        }
    },

    watch: {
         answers() {
            this.$nextTick(()=>{
                for (let index = 0; index < this.content.panels; index++) {
                    this.canvasSetup(this.answers[index]);
                    new P5(this.sketch, `examinerStoryBoard${index}`);
                }

                window.parent.postMessage({
                    application: 'activity-manager',
                    message: 'set-iframe-height',
                    data: { iframeHeight: this.$refs.storyBoardExaminer.scrollHeight }
                }, '*');
            })
        }
    },

    methods: {
        canvasSetup(data) {
            this.sketch = p5 => {
                if (data === undefined) return;
                let backgroundImage = '';
                let selectedCharacters = [];
                let sizeDifferenceCoefficient = this.config.viewerMainBoardWidth / this.config.examinerPanelsWidth;

                p5.setup = () => {
                    p5.createCanvas(this.config.examinerPanelsWidth, this.config.examinerPanelsHeight);
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

.story-board-examiner-preview-container {
    width: 1000px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
}

.story-board-examiner-panel {
    margin-left: 5px;
    border: 1px solid #ccc;
    width: 485px;
    height: 390px;
    margin-bottom: 10px;
}

.story-board-examiner-panel-title {
    height: 50px;
    overflow: hidden;
    width: 440px;
    border: 1px solid #9E9E9E;
    padding: 5px;
}

.story-board-examiner-panel-description {
    height: 80px;
    overflow: hidden;
    width: 480px;
    border: 1px solid #9E9E9E;
    padding: 5px;
}

.story-board-examiner-panel-text {
    width: 485px;
}
.story-board-examiner-title-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.story-board-examiner-panel-count {
    width: 40px;
    border:solid 1px #9E9E9E;
    border-right: none;
    height: 50px;
    font-size: 30px;
    color: gray;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>
