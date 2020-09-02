<template>
    <div class="story-board-editor-foreground-container">
        <div class="story-board-editor-foreground">
            <p class="story-board-editor-foreground-name">{{ $t('foreground') }}</p>

            <div class="story-board-editor-foreground-checkbox-container">
                <v-checkbox
                    disabled
                    class="story-board-editor-foreground-checkbox"
                    :label="$t('enable-student-upload')"
                    v-model="content.foregroundEnableUpload"
                ></v-checkbox>
            </div>
        </div>

        <div v-for="(category, categoryName) in categoriesAndimages"
            class="story-board-editor-foreground-categories"
            :key="categoryName"
        >
            <div class="story-board-editor-foreground-categories-name-container">
                <div class="story-board-editor-foreground-categories-name">
                     <v-checkbox
                        class="story-board-editor-foreground-categories-name-checkbox"
                        disabled
                        :input-value="isCategoryUse(categoryName)"
                    ></v-checkbox>

                    <p class="story-board-editor-foreground-categories-name-text" @click="openCategory(categoryName)">{{ categoryName }}</p>
                </div>

                <div>
                    <v-btn
                        v-if="activeCategories === categoryName"
                        :class="['story-board-editor-foreground-select-all-butoon', selectAllButoonStatus]"
                        text
                        small
                        @click="selectCategoryAllImages(categoryName)"
                    >
                        {{ $t('select-all') }}
                    </v-btn>

                    <v-btn icon @click="openCategory(categoryName)">
                        <v-icon>{{ activeCategories === categoryName ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                    </v-btn>
                </div>
            </div>

            <v-expand-transition>
                <div class="story-board-editor-foreground-image-container"  v-show="activeCategories === categoryName">
                    <div
                        v-for="(imageName) in category"
                        class="story-board-editor-foreground-image"
                        :key="imageName"
                        v-bind:style="{ 'background-image': 'url(' + getImageSrc(imageName, categoryName) + ')' }"
                    >
                        <v-checkbox
                            class="story-board-editor-foreground-checkbox"
                            @change="selectImage(categoryName, imageName)"
                            :input-value="getSelectedImage(categoryName, imageName)"
                        ></v-checkbox>
                    </div>
                </div>
            </v-expand-transition>
        </div>
    </div>
</template>

<script>

import config from '../../common/config'

export default {
    name: 'Foreground',

    data: () => ({
        categoriesAndimages: config.foregroundCategoriesAndImages,

        foregroundCheckbox: false,
        activeCategories: '',
        isActiveSelectAll: ''
    }),

    props: {
        content: {
            type: Object,
            default: () => ({})
        }
    },

    methods: {
        getImageSrc(imageName, categoryName) {
            return require(`../../assets/images/foregrounds/${categoryName}/${imageName}`);
        },

        openCategory(categoryName) {
            if(this.activeCategories === categoryName) return this.activeCategories = '';
            this.activeCategories = categoryName;
        },

        selectImage(categoryName, imageName) {
            if(categoryName in this.content.foregrounds){
                for(const [i, image] of this.content.foregrounds[categoryName].entries()) {
                    if(image === imageName){
                        this.content.foregrounds[categoryName].splice(i, 1);

                        if(!this.content.foregrounds[categoryName].length) {
                            delete this.content.foregrounds[categoryName]
                        }
                        this.$emit('setContent');
                        return;
                    }
                }

                this.content.foregrounds[categoryName].push(imageName);
            }
            else {
                this.content.foregrounds[categoryName] = [imageName];
            }

            this.$emit('setContent');
        },

        getSelectedImage(categoryName, imageName) {
            let isSelected = false;
            if(this.content.foregrounds[categoryName]) {
                this.content.foregrounds[categoryName].forEach(image => {
                    if(image === imageName){
                        isSelected = true;
                    }
                });
            }
            return isSelected;
        },

        selectCategoryAllImages(categoryName) {
            if(this.isActiveSelectAll === categoryName) this.isActiveSelectAll = '';
            else this.isActiveSelectAll = categoryName;

            // Use the spread operator and Object.assign for lost reference
            const newForegrounds = {};
            Object.assign(newForegrounds, this.content.foregrounds);

            if(this.isActiveSelectAll) newForegrounds[categoryName] = [ ...this.categoriesAndimages[categoryName]];
            else delete newForegrounds[categoryName];

            this.content.foregrounds = newForegrounds;
        },

        isCategoryUse(categoryName) {
            return categoryName in this.content.foregrounds;
        }
    },
    computed: {
        selectAllButoonStatus() {
            return this.isActiveSelectAll === this.activeCategories ?
                'story-board-editor-foreground-select-all-butoon-active'
                : '';
        }
    }
};
</script>

<style lang="scss">

.story-board-editor-foreground-container {
    width: 100%;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.story-board-editor-foreground-categories {
    border: 1px solid #ccc;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
}
.story-board-editor-foreground-categories-name-container {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#app .story-board-editor-foreground-categories-name-text {
    font-size: 20px;
    margin: 0px;
    cursor: pointer;
}

.story-board-editor-foreground-categories-name {
    display: flex;
    align-items: center;
}

.story-board-editor-foreground-categories-name-checkbox {
    margin-left: 10px;
}

.story-board-editor-foreground {
    border-bottom: 1px solid #ccc;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
}

 #app .story-board-editor-foreground-name {
    margin: 0;
    font-size: 22px;
    margin-left: 20px;
}

.story-board-editor-foreground-checkbox-container {
    border: 1px solid #ccc;
    height: 40px;
    padding-right: 10px;
    margin-left: 10px;
    border-radius: 10px;
}

#app .story-board-editor-foreground-checkbox {
    margin-left: 10px;
    margin-top: 0;
    padding-top: 7px;
}

.story-board-editor-foreground-image {
    width: 130px;
    height: 100px;
    margin-top: 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
    background-size: contain;
    background-position: center;
    background-color: #FAFAFA;
}

.story-board-editor-foreground-image-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

#app .story-board-editor-foreground-select-all-butoon-active {
    color: blue;
}

#app .story-board-editor-foreground-select-all-butoon {
    margin-right: 10px;
    text-transform: capitalize;
}
</style>
