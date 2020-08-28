<template>
    <div class="story-board-viewer-images">
        <v-tabs
            background-color="white"
            color="deep-purple accent-4"
            left
            height="35"
            hide-slider
            v-model="selectedTab"
        >
            <v-tab class="story-board-viewer-images-tab">
                <img :src="require('../../assets/images/add_characters.svg')" class="story-board-viewer-images-add-icon">
            </v-tab>

            <v-tab>
                <img :src="require('../../assets/images/add_background.svg')" class="story-board-viewer-images-add-icon">
            </v-tab>

            <v-tabs-items v-model="selectedTab">
                <v-tab-item>
                    <div class="story-board-viewer-character-image-container">
                        <div
                            v-for="(foreground, categoryName, i) in content.foregrounds"
                            :key="i"
                            class="story-board-viewer-character-category"
                        >
                            <div
                                v-for="characterImage in foreground"
                                class="story-board-viewer-image"
                                :key="characterImage"
                                @click="addNewCharacter(characterImage, categoryName)"
                                v-bind:style="{ 'background-image': 'url(' + getCharacterImageSrc(categoryName, characterImage) + ')' }"
                            >
                            </div>
                        </div>
                    </div>
                </v-tab-item>

                <v-tab-item>
                    <div class="story-board-viewer-background-image-container">
                        <div
                            v-for="backgroundImage in content.backgrounds"
                            class="story-board-viewer-image story-board-viewer-background-image"
                            :key="backgroundImage"
                            v-bind:style="{ 'background-image': 'url(' + getBackgroundImageSrc(backgroundImage) + ')' }"
                            @click="selectBackgroundImage(backgroundImage)"
                        >
                        </div>
                    </div>
                </v-tab-item>
            </v-tabs-items>
        </v-tabs>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { moduleName } from '../store/module'

export default {
    name: 'viewer-images',

    data: () => ({
        selectedTab: null,
        selectedCategory: null

    }),

    methods: {
        ...mapActions(['addCharacter', 'addBackground']),

        getCharacterImageSrc(categoryName, imageName) {
            return require(`../../assets/images/foregrounds/${categoryName}/${imageName}`);
        },

        getBackgroundImageSrc(backgroundImage) {
            return require(`../../assets/images/backgrounds/${backgroundImage}`);
        },

        addNewCharacter(characterImage, categoryName) {
            this.addCharacter({
                category: categoryName,
                image: characterImage,
                size: 5,
                rotateDegees: 0,
                verticalRotate: 1,
                xPosition: 100,
                yPosition: 100
            })
        },

        selectBackgroundImage(backgroundImage) {
            this.addBackground(backgroundImage);
        }
    },
    computed: {
        ...mapState({
            answers: state => state[moduleName].answers,
            content: state => state[moduleName].content
        }),
    }

};
</script>

<style lang="scss">

.story-board-viewer-images {
    border: 1px solid #ccc;
}

.story-board-viewer-image {
    width: 130px;
    height: 90px;
    margin-top: 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
    background-size: contain;
    background-position: center;
    background-color: #FAFAFA;
    cursor: pointer;
}

.story-board-viewer-image:hover {
    border-color: #6200ea;
}

.story-board-viewer-image:active {
    border-color: #6200ea;
    border-width: 3px;
}

.story-board-viewer-background-image {
    height: 90px;
    width: 135px;
    background-size: cover;
}

.story-board-viewer-character-image-container {
    width: 100%;
    height: 205px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    overflow-y: auto;
}

.story-board-viewer-background-image-container {
    width: 100%;
    height: 230px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    overflow-y: auto;
}

#app .story-board-viewer-images .v-tab {
    text-transform: capitalize;
}

.story-board-viewer-images-add-icon {
    width: 30px;
    height: 30px;
}

.story-board-viewer-character-category {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.story-board-viewer-images-tab {
    border-right: 2px solid #2196F3;
}
</style>
