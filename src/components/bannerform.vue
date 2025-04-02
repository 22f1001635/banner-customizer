<template>
  <div class="min-h-screen">
    <div :style="{ 
        backgroundColor: bannerColor,
        opacity: bgOpacity
      }" 
      class="w-full h-80 fixed top-0 left-0 transition-all duration-300 z-0">
    </div>

    <div class="w-full h-80 flex flex-col items-center justify-center fixed top-0 left-0 z-10 pointer-events-none">
      <img :src="bannerImage" :style="{ opacity: imageOpacity }" 
           class="h-32 w-32 object-cover mb-3 rounded-[10%] border-2 border-white shadow-lg hover:shadow-2xl">
      <h1 class="text-4xl font-jazzy drop-shadow-lg text-center select-none" :style="{ 
        color: textColor,
        opacity: textOpacity
      }">{{ bannerText }}</h1>
    </div>

    <div class="mt-60 max-w-md mx-auto px-4">
      <button @click="toggleSettings"
        class="fixed md:top-6 top-4 md:right-4 right-4 p-3 bg-white rounded-full 
               shadow-lg hover:shadow-2xl transition-all z-20 drop-shadow-md"
        :class="{
          'motion-safe:animate-wiggle': showWiggle,
          'hover:motion-safe:animate-wiggle': !hasClicked && !showWiggle
        }">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-trust-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
        </svg>
      </button>
      
      <form v-if="showSettings" @submit.prevent="changeBanner"
        class="fixed md:top-20 top-4 md:right-4 right-0 left-0 mx-auto md:left-auto 
               bg-white p-6 rounded-lg shadow-xl space-y-4 md:w-auto w-[calc(100%-2rem)] 
               z-30 animate-open-top-right md:max-w-md max-w-[calc(100%-2rem)]">
        <div>
          <label class="block text-sm font-groovy text-gray-700 mb-2">Banner Text:
            <input v-model="newText" placeholder="Enter new banner text"
              class="px-3 py-2 rounded-md border-2 border-calm-gray-blue focus:outline-none focus:border-trust-blue transition-all w-full"/>
          </label>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-groovy text-gray-700 mb-2">Background Color:
              <input v-model="newBgColor" type="color" class="w-full h-10 cursor-pointer mt-1"/>
            </label>
          </div>
          <div>
            <label class="block text-sm font-groovy text-gray-700 mb-2">Text Color:
              <input v-model="newTextColor" type="color" class="w-full h-10 cursor-pointer mt-1"/>
            </label>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-groovy text-gray-700 mb-2">BG Opacity:
              <input v-model="newBgOpacity" type="range" min="0" max="1" step="0.1" 
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
              <span class="text-xs">{{ newBgOpacity }}</span>
            </label>
          </div>
          <div>
            <label class="block text-sm font-groovy text-gray-700 mb-2">Text Opacity:
              <input v-model="newTextOpacity" type="range" min="0" max="1" step="0.1" 
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
              <span class="text-xs">{{ newTextOpacity }}</span>
            </label>
          </div>
          <div>
            <label class="block text-sm font-groovy text-gray-700 mb-2">Image Opacity:
              <input v-model="newImageOpacity" type="range" min="0" max="1" step="0.1" 
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
              <span class="text-xs">{{ newImageOpacity }}</span>
            </label>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-groovy text-gray-700 mb-2">
              Banner Image (Upload or URL):
              <input type="file" accept="image/*" @change="handleImageUpload" 
                class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-groovy file:bg-trust-blue file:text-white hover:file:bg-commit-teal transition-all"/>
            </label>
          </div>
          <div>
            <label class="block text-sm font-groovy text-gray-700 mb-2">
              Or enter image URL:
              <input v-model="newImageUrl" type="url" placeholder="https://example.com/image.jpg"
                class="px-3 py-2 rounded-md border-2 border-calm-gray-blue focus:outline-none focus:border-trust-blue transition-all w-full"/>
            </label>
            <div v-if="imageError" class="text-red-500 text-sm mt-1">
              Please enter a valid image URL (PNG, JPG, JPEG, GIF, WEBP)
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4 pt-2">
          <button type="button" @click="cancelChanges"
            class="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all shadow-md hover:shadow-lg">
            Cancel
          </button>
          <button type="button" @click="resetToDefaults"
            class="py-2 px-4 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all shadow-md hover:shadow-lg">
            Reset
          </button>
          <button type="submit" 
            class="py-2 px-4 bg-trust-blue text-white rounded-lg hover:bg-commit-teal transition-all shadow-md hover:shadow-lg">
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const DEFAULT_SETTINGS = {
  text: "Saksham's Customizable Banner",
  bgColor: '#3B82F6',
  textColor: '#ffffff',
  image: '/default.png',
  bgOpacity: 1,
  textOpacity: 1,
  imageOpacity: 1
}

const loadSettings = () => {
  const saved = localStorage.getItem('bannerSettings')
  return saved ? JSON.parse(saved) : null
}

const savedSettings = loadSettings()
const bannerText = ref(savedSettings?.text || DEFAULT_SETTINGS.text)
const bannerColor = ref(savedSettings?.bgColor || DEFAULT_SETTINGS.bgColor)
const textColor = ref(savedSettings?.textColor || DEFAULT_SETTINGS.textColor)
const bannerImage = ref(savedSettings?.image || DEFAULT_SETTINGS.image)
const bgOpacity = ref(savedSettings?.bgOpacity || DEFAULT_SETTINGS.bgOpacity)
const textOpacity = ref(savedSettings?.textOpacity || DEFAULT_SETTINGS.textOpacity)
const imageOpacity = ref(savedSettings?.imageOpacity || DEFAULT_SETTINGS.imageOpacity)

const newText = ref('')
const newBgColor = ref(bannerColor.value)
const newTextColor = ref(textColor.value)
const newBgOpacity = ref(bgOpacity.value)
const newTextOpacity = ref(textOpacity.value)
const newImageOpacity = ref(imageOpacity.value)
const newImageUrl = ref('')
const tempImage = ref(null)
const showSettings = ref(false)
const imageError = ref(false)

const showWiggle = ref(true)
const hasClicked = ref(false)

const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))(?:.*)$/i

const handleImageUpload = (event) => {
  imageError.value = false
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      tempImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const toggleSettings = () => {
  hasClicked.value = true
  showWiggle.value = false
  showSettings.value = !showSettings.value
}

const resetToDefaults = () => {
  bannerText.value = DEFAULT_SETTINGS.text
  bannerColor.value = DEFAULT_SETTINGS.bgColor
  textColor.value = DEFAULT_SETTINGS.textColor
  bannerImage.value = DEFAULT_SETTINGS.image
  bgOpacity.value = DEFAULT_SETTINGS.bgOpacity
  textOpacity.value = DEFAULT_SETTINGS.textOpacity
  imageOpacity.value = DEFAULT_SETTINGS.imageOpacity
  
  localStorage.removeItem('bannerSettings')
  cancelChanges()
}

const cancelChanges = () => {
  newText.value = ''
  newBgColor.value = bannerColor.value
  newTextColor.value = textColor.value
  newBgOpacity.value = bgOpacity.value
  newTextOpacity.value = textOpacity.value
  newImageOpacity.value = imageOpacity.value
  newImageUrl.value = ''
  tempImage.value = null
  showSettings.value = false
  hasClicked.value = false
  imageError.value = false
}

const changeBanner = async () => {
  if (newText.value.trim()) {
    bannerText.value = newText.value.trim()
  }
  bannerColor.value = newBgColor.value
  textColor.value = newTextColor.value
  bgOpacity.value = parseFloat(newBgOpacity.value)
  textOpacity.value = parseFloat(newTextOpacity.value)
  imageOpacity.value = parseFloat(newImageOpacity.value)
  
  if (tempImage.value) {
    bannerImage.value = tempImage.value
  } else if (newImageUrl.value.trim()) {
    if (!urlPattern.test(newImageUrl.value.trim())) {
      imageError.value = true
      return
    }
    
    if (process.env.NODE_ENV === 'test') {
      bannerImage.value = newImageUrl.value.trim()
    } else {
      const img = new Image()
      img.onerror = () => {
        imageError.value = true
        bannerImage.value = DEFAULT_SETTINGS.image
      }
      img.onload = () => {
        imageError.value = false
        bannerImage.value = newImageUrl.value.trim()
        saveSettings()
      }
      img.src = newImageUrl.value.trim()
      return
    }
  }

  saveSettings()
}

const saveSettings = () => {
  localStorage.setItem('bannerSettings', JSON.stringify({
    text: bannerText.value,
    bgColor: bannerColor.value,
    textColor: textColor.value,
    image: bannerImage.value,
    bgOpacity: bgOpacity.value,
    textOpacity: textOpacity.value,
    imageOpacity: imageOpacity.value
  }))
  cancelChanges()
}

onMounted(() => {
  setTimeout(() => {
    showWiggle.value = false
  }, 3000)

  if (savedSettings) {
    newBgColor.value = savedSettings.bgColor
    newTextColor.value = savedSettings.textColor
    newBgOpacity.value = savedSettings.bgOpacity || 1
    newTextOpacity.value = savedSettings.textOpacity || 1
    newImageOpacity.value = savedSettings.imageOpacity || 1
  }
})
</script>