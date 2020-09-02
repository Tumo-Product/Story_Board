<template>
    <div class="story-board-editor-background-container">
        <div class="story-board-editor-background">
            <p class="story-board-editor-background-name">{{ $t('background') }}</p>

            <div class="story-board-editor-background-checkbox-container">
                <v-checkbox
                    disabled
                    class="story-board-editor-background-checkbox"
                    :label="$t('enable-student-upload')"
                    v-model="content.backgroundEnableUpload"
                ></v-checkbox>
            </div>
        </div>

        <div class="story-board-editor-background-select-all-container">
            <div class="story-board-editor-background-select-all">
                <v-btn
                    text
                    small
                    :class="['story-board-editor-background-select-all-butoon', selectAllButoonClass]"
                    @click="selectAllImages"
                >
                    {{ $t('select-all') }}
                </v-btn>
            </div>

            <div class="story-board-editor-background-image-container">
                <div
                    v-for="backgroundImage in backgroundImages"
                    class="story-board-editor-background-image"
                    v-bind:style="{ 'background-image': 'url(' + getImageSrc(backgroundImage) + ')' }"
                    :key="backgroundImage"
                >
                    <v-checkbox
                        class="story-board-editor-background-checkbox"
                        :input-value="getSelectedImage(backgroundImage)"
                        @change="selectImage(backgroundImage)"
                    ></v-checkbox>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import config from '../../common/config'

export default {
    name: 'Background',

    data: () => ({
        backgroundImages: config.backgroundImages,
        isActiveSelectAll: false
    }),

    props: {
        content: {
            type: Object,
            default: () => ({})
        }
    },

    methods: {
        getImageSrc(backgroundImage) {
            return require(`../../assets/images/backgrounds/${backgroundImage}`);
        },

        selectImage(selectedImage) {
            if(this.content.backgrounds.length > 0){
                for(const [i, image] of this.content.backgrounds.entries()) {
                    if(image === selectedImage){
                        this.content.backgrounds.splice(i, 1);
                        return;
                    }
                }
            }
                this.content.backgrounds.push(selectedImage);
        },

        getSelectedImage(selectedImage) {
            let isSelected = false;
            if(this.content.backgrounds.length > 0) {
                this.content.backgrounds.forEach(image => {
                    if(image === selectedImage) {
                        isSelected = true;
                    }
                });
            }
            return isSelected;
        },

        selectAllImages() {
            this.isActiveSelectAll = !this.isActiveSelectAll;

            // Use the spread operator to duplicate an array for lost reference
            if(this.isActiveSelectAll) this.content.backgrounds = [ ...this.backgroundImages ]
            else this.content.backgrounds = [];
        }
    },

    computed: {
        selectAllButoonClass() {
            return this.isActiveSelectAll ? 'story-board-editor-foreground-select-all-butoon-active' : '';
        }
    }
};
</script>

<style lang="scss">

.story-board-editor-background-container {
    width: 100%;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
}
.story-board-editor-background-select-all-container {
    border: 1px solid #ccc;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
}
.story-board-editor-background-select-all {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
}

.story-board-editor-background {
    border-bottom: 1px solid #ccc;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
}

 #app .story-board-editor-background-name {
    margin: 0;
    font-size: 22px;
    margin-left: 20px;
}

.story-board-editor-background-checkbox-container {
    border: 1px solid #ccc;
    height: 40px;
    padding-right: 10px;
    margin-left: 10px;
    border-radius: 10px;
}

.story-board-editor-background-checkbox {
    margin-left: 10px;
    margin-top: 0;
    padding-top: 7px;
}

.story-board-editor-background-image {
    width: 160px;
    height: 100px;
    margin-top: 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
    background-size: cover;
}

.story-board-editor-background-image-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.story-board-editor-background-select-all-butoon {
    margin-left: 10px;
    text-transform: capitalize;
}
</style>
