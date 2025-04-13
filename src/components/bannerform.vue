<template>
  <div class="min-h-screen">
    <div
      :style="{
        backgroundColor: showSettings ? newBgColor : bannerColor,
        opacity: showSettings ? newBgOpacity : bgOpacity
      }"
      class="w-full h-80 fixed top-0 left-0 transition-all duration-300 z-0"
    ></div>

    <div
      class="w-full h-80 flex flex-col items-center justify-center fixed top-0 inset-x-0 z-10 pointer-events-none"
    >
      <img
        :src="showSettings ? tempImage || newImageUrl || bannerImage : bannerImage"
        :style="{
          opacity: showSettings ? newImageOpacity : imageOpacity,
          aspectRatio: showSettings ? newAspectRatio : selectedAspectRatio,
          borderRadius: showSettings ? getBorderRadius(newShape) : getBorderRadius(selectedShape)
        }"
        class="h-32 w-auto object-cover mb-3 border-2 border-white shadow-lg hover:shadow-2xl min-w-[100px]"
      />
      <h1
        class="text-4xl font-jazzy drop-shadow-lg text-center select-none px-4"
        :style="{
          color: showSettings ? newTextColor : textColor,
          opacity: showSettings ? newTextOpacity : textOpacity
        }"
      >
        {{ showSettings && newText ? newText : bannerText }}
      </h1>
    </div>

    <!-- Edit Button and Form -->
    <div class="mt-60 max-w-md mx-auto px-4">
      <button
        class="fixed md:top-6 top-4 md:right-4 right-4 p-3 bg-white rounded-full shadow-lg hover:shadow-2xl transition-all z-20 drop-shadow-md"
        :class="{
          'motion-safe:animate-wiggle': showWiggle,
          'hover:motion-safe:animate-wiggle': !hasClicked && !showWiggle
        }"
        @click="toggleSettings"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-trust-blue"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </button>

      <!-- Edit Form -->
      <form
        v-if="showSettings"
        class="fixed md:top-20 top-4 md:right-4 right-0 left-0 mx-auto md:left-auto bg-white p-6 rounded-lg shadow-xl space-y-4 md:w-auto w-[calc(100%-2rem)] z-30 animate-open-top-right md:max-w-md max-w-[calc(100%-2rem)] max-h-[78.5vh] overflow-auto"
        @submit.prevent="changeBanner"
      >
        <!-- Undo/Redo Controls -->
        <div class="flex justify-between items-center">
          <p class="text-xs text-gray-500 italic">Changes are only preserved upon submission</p>
          <div class="flex space-x-2">
            <button
              type="button"
              class="p-2 bg-gray-100 text-black rounded-md hover:bg-gray-200 transition-all text-xs shadow-sm disabled:opacity-75 disabled:cursor-not-allowed"
              :disabled="!canUndo"
              title="Undo"
              @click="undo"
            >
              ↺
            </button>
            <button
              type="button"
              class="p-2 bg-gray-100 text-black rounded-md hover:bg-gray-200 transition-all text-xs shadow-sm disabled:opacity-75 disabled:cursor-not-allowed"
              :disabled="!canRedo"
              title="Redo"
              @click="redo"
            >
              ↻
            </button>
          </div>
        </div>

        <!-- Quick Templates -->
        <div class="space-y-2">
          <p class="text-sm font-groovy text-gray-700">Quick Templates:</p>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="(template, index) in templates"
              :key="index"
              class="h-10 rounded-md border-2 hover:border-trust-blue transition-all relative overflow-hidden group flex items-center justify-center"
              :style="{ backgroundColor: template.bgColor }"
              :title="template.name"
              @click.prevent="applyTemplate(template)"
            >
              <span
                class="text-xs font-bold px-1 truncate max-w-full"
                :style="{
                  color: template.textColor,
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                }"
              >
                {{ template.name }}
              </span>
            </button>
          </div>
        </div>

        <!-- Banner Text Input -->
        <div>
          <label class="block text-sm font-groovy text-gray-700 mb-2"
            >Banner Text:
            <input
              v-model="newText"
              placeholder="Enter new banner text"
              class="px-3 py-2 rounded-md border-2 border-calm-gray-blue focus:outline-none focus:border-trust-blue transition-all w-full"
            />
          </label>
        </div>

        <!-- Color Pickers -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-groovy text-gray-700 mb-2"
              >Background Color:
              <input v-model="newBgColor" type="color" class="w-full h-10 cursor-pointer mt-1" />
            </label>
          </div>
          <div>
            <label class="block text-sm font-groovy text-gray-700 mb-2"
              >Text Color:
              <input v-model="newTextColor" type="color" class="w-full h-10 cursor-pointer mt-1" />
            </label>
          </div>
        </div>

        <!-- Opacity Sliders -->
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-groovy text-gray-700 mb-2"
              >BG Opacity:
              <input
                v-model="newBgOpacity"
                type="range"
                min="0"
                max="1"
                step="0.1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span class="text-xs">{{ newBgOpacity }}</span>
            </label>
          </div>
          <div>
            <label class="block text-sm font-groovy text-gray-700 mb-2"
              >Text Opacity:
              <input
                v-model="newTextOpacity"
                type="range"
                min="0"
                max="1"
                step="0.1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span class="text-xs">{{ newTextOpacity }}</span>
            </label>
          </div>
          <div>
            <label class="block text-sm font-groovy text-gray-700 mb-2"
              >Image Opacity:
              <input
                v-model="newImageOpacity"
                type="range"
                min="0"
                max="1"
                step="0.1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span class="text-xs">{{ newImageOpacity }}</span>
            </label>
          </div>
        </div>

        <!-- Aspect Ratio Selector -->
        <div class="space-y-2">
          <p class="text-sm font-groovy text-gray-700">Image Aspect Ratio:</p>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="(ratio, index) in aspectRatios"
              :key="index"
              class="p-2 border-2 rounded-md transition-all text-xs"
              :class="
                newAspectRatio === ratio.value
                  ? 'border-trust-blue bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              "
              @click.prevent="newAspectRatio = ratio.value"
            >
              {{ ratio.name }}
            </button>
          </div>
        </div>

        <!-- Image Shape Selector -->
        <div class="space-y-2">
          <p class="text-sm font-groovy text-gray-700">Image Shape:</p>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="(shape, index) in imageShapes"
              :key="index"
              class="p-2 border-2 rounded-md transition-all text-xs"
              :class="
                newShape === shape.value
                  ? 'border-trust-blue bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              "
              @click.prevent="newShape = shape.value"
            >
              {{ shape.name }}
            </button>
          </div>
        </div>

        <!-- Image Upload -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-groovy text-gray-700 mb-2">
              Image (File Upload):
              <input
                type="file"
                accept="image/*"
                class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-groovy file:bg-trust-blue file:text-white hover:file:bg-commit-teal transition-all"
                @change="handleImageUpload"
              />
            </label>
          </div>
          <div>
            <label class="block text-sm font-groovy text-gray-700 mb-2">
              Or enter image URL:
              <input
                v-model="newImageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                class="px-3 py-2 rounded-md border-2 border-calm-gray-blue focus:outline-none focus:border-trust-blue transition-all w-full"
              />
            </label>
            <div v-if="imageError" class="text-red-500 text-sm mt-1">
              Please enter a valid image URL (PNG, JPG, JPEG, GIF, WEBP)
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="grid grid-cols-3 gap-4 pt-2">
          <button
            type="button"
            class="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all shadow-md hover:shadow-lg"
            @click="cancelChanges"
          >
            Cancel
          </button>
          <button
            type="button"
            class="py-2 px-4 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all shadow-md hover:shadow-lg"
            @click="resetToDefaults"
          >
            Reset
          </button>
          <button
            type="submit"
            class="py-2 px-4 bg-trust-blue text-white rounded-lg hover:bg-commit-teal transition-all shadow-md hover:shadow-lg"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue'

  const DEFAULT_SETTINGS = {
    text: "Saksham's Customizable Banner",
    bgColor: '#3B82F6',
    textColor: '#ffffff',
    image: '/default.png',
    bgOpacity: 1,
    textOpacity: 1,
    imageOpacity: 1,
    aspectRatio: '1/1',
    shape: 'rounded'
  }

  const templates = [
    {
      name: 'Ocean Blue',
      bgColor: '#3B82F6',
      textColor: '#ffffff',
      text: 'Ocean Blue Theme',
      bgOpacity: 0.9,
      textOpacity: 1,
      imageOpacity: 0.9
    },
    {
      name: 'Sunset',
      bgColor: '#F97316',
      textColor: '#FFF7ED',
      text: 'Sunset Orange Theme',
      bgOpacity: 0.8,
      textOpacity: 0.9,
      imageOpacity: 0.8
    },
    {
      name: 'Emerald',
      bgColor: '#10B981',
      textColor: '#ECFDF5',
      text: 'Emerald Green Theme',
      bgOpacity: 0.85,
      textOpacity: 0.95,
      imageOpacity: 0.85
    },
    {
      name: 'Royal',
      bgColor: '#7C3AED',
      textColor: '#F5F3FF',
      text: 'Royal Purple Theme',
      bgOpacity: 0.9,
      textOpacity: 0.9,
      imageOpacity: 0.9
    },
    {
      name: 'Midnight',
      bgColor: '#1E293B',
      textColor: '#E2E8F0',
      text: 'Midnight Dark Theme',
      bgOpacity: 0.95,
      textOpacity: 0.9,
      imageOpacity: 0.8
    },
    {
      name: 'Coral',
      bgColor: '#F43F5E',
      textColor: '#FFF1F2',
      text: 'Coral Pink Theme',
      bgOpacity: 0.8,
      textOpacity: 0.95,
      imageOpacity: 0.85
    }
  ]

  const aspectRatios = [
    { name: '1:1', value: '1/1' },
    { name: '4:3', value: '4/3' },
    { name: '16:9', value: '16/9' },
    { name: 'FreeForm', value: 'auto' }
  ]

  const imageShapes = [
    { name: 'Flat', value: 'flat' },
    { name: 'Rounded', value: 'rounded' },
    { name: 'Circle', value: 'circle' }
  ]

  const getBorderRadius = shape => {
    switch (shape) {
      case 'flat':
        return '0'
      case 'rounded':
        return '10%'
      case 'circle':
        return '50%'
      default:
        return '10%'
    }
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
  const selectedAspectRatio = ref(savedSettings?.aspectRatio || DEFAULT_SETTINGS.aspectRatio)
  const selectedShape = ref(savedSettings?.shape || DEFAULT_SETTINGS.shape)

  const newText = ref('')
  const newBgColor = ref(bannerColor.value)
  const newTextColor = ref(textColor.value)
  const newBgOpacity = ref(bgOpacity.value)
  const newTextOpacity = ref(textOpacity.value)
  const newImageOpacity = ref(imageOpacity.value)
  const newImageUrl = ref('')
  const newAspectRatio = ref(selectedAspectRatio.value)
  const newShape = ref(selectedShape.value)
  const tempImage = ref(null)
  const showSettings = ref(false)
  const imageError = ref(false)

  const showWiggle = ref(true)
  const hasClicked = ref(false)

  const MAX_HISTORY = 20
  const history = ref([])
  const currentIndex = ref(-1)

  const canUndo = computed(() => currentIndex.value > 0)
  const canRedo = computed(() => currentIndex.value < history.value.length - 1)

  function captureState() {
    if (currentIndex.value < history.value.length - 1) {
      history.value = history.value.slice(0, currentIndex.value + 1)
    }

    const state = {
      text: bannerText.value,
      bgColor: bannerColor.value,
      textColor: textColor.value,
      image: bannerImage.value,
      bgOpacity: bgOpacity.value,
      textOpacity: textOpacity.value,
      imageOpacity: imageOpacity.value,
      aspectRatio: selectedAspectRatio.value,
      shape: selectedShape.value
    }

    history.value.push(state)

    while (history.value.length > MAX_HISTORY) {
      history.value.shift()
    }

    currentIndex.value = history.value.length - 1
  }

  function undo() {
    if (canUndo.value) {
      currentIndex.value--
      applyState(history.value[currentIndex.value])
    }
  }

  function redo() {
    if (canRedo.value) {
      currentIndex.value++
      applyState(history.value[currentIndex.value])
    }
  }

  function applyState(state) {
    bannerText.value = state.text
    bannerColor.value = state.bgColor
    textColor.value = state.textColor
    bannerImage.value = state.image
    bgOpacity.value = state.bgOpacity
    textOpacity.value = state.textOpacity
    imageOpacity.value = state.imageOpacity
    selectedAspectRatio.value = state.aspectRatio || DEFAULT_SETTINGS.aspectRatio
    selectedShape.value = state.shape || DEFAULT_SETTINGS.shape

    newText.value = state.text
    newBgColor.value = state.bgColor
    newTextColor.value = state.textColor
    newBgOpacity.value = state.bgOpacity
    newTextOpacity.value = state.textOpacity
    newImageOpacity.value = state.imageOpacity
    newAspectRatio.value = state.aspectRatio || DEFAULT_SETTINGS.aspectRatio
    newShape.value = state.shape || DEFAULT_SETTINGS.shape

    if (state.image.startsWith('http')) {
      newImageUrl.value = state.image
      tempImage.value = null
    } else if (state.image.startsWith('data:')) {
      tempImage.value = state.image
      newImageUrl.value = ''
    } else {
      newImageUrl.value = ''
      tempImage.value = null
    }

    saveSettings()
  }

  const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))(?:.*)$/i

  const handleImageUpload = event => {
    imageError.value = false
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = e => {
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
    selectedAspectRatio.value = DEFAULT_SETTINGS.aspectRatio
    selectedShape.value = DEFAULT_SETTINGS.shape

    localStorage.removeItem('bannerSettings')
    cancelChanges()
    captureState()
  }

  const cancelChanges = () => {
    newText.value = ''
    newBgColor.value = bannerColor.value
    newTextColor.value = textColor.value
    newBgOpacity.value = bgOpacity.value
    newTextOpacity.value = textOpacity.value
    newImageOpacity.value = imageOpacity.value
    newAspectRatio.value = selectedAspectRatio.value
    newShape.value = selectedShape.value
    newImageUrl.value = ''
    tempImage.value = null
    showSettings.value = false
    hasClicked.value = false
    imageError.value = false
  }

  const applyTemplate = template => {
    newBgColor.value = template.bgColor
    newTextColor.value = template.textColor
    newText.value = template.text
    newBgOpacity.value = template.bgOpacity
    newTextOpacity.value = template.textOpacity
    newImageOpacity.value = template.imageOpacity
  }

  const changeBanner = async () => {
    if (newText.value.trim()) {
      bannerText.value = newText.value.trim()
    }

    if (newImageUrl.value.trim() && !urlPattern.test(newImageUrl.value.trim())) {
      imageError.value = true
      newImageUrl.value = ''
      return
    }

    bannerColor.value = newBgColor.value
    textColor.value = newTextColor.value
    bgOpacity.value = parseFloat(newBgOpacity.value)
    textOpacity.value = parseFloat(newTextOpacity.value)
    imageOpacity.value = parseFloat(newImageOpacity.value)
    selectedAspectRatio.value = newAspectRatio.value
    selectedShape.value = newShape.value

    if (tempImage.value) {
      bannerImage.value = tempImage.value
    } else if (newImageUrl.value.trim()) {
      bannerImage.value = newImageUrl.value.trim()
    }

    saveSettings()
    captureState()
    showSettings.value = false
    hasClicked.value = false
  }

  const saveSettings = () => {
    localStorage.setItem(
      'bannerSettings',
      JSON.stringify({
        text: bannerText.value,
        bgColor: bannerColor.value,
        textColor: textColor.value,
        image: bannerImage.value,
        bgOpacity: bgOpacity.value,
        textOpacity: textOpacity.value,
        imageOpacity: imageOpacity.value,
        aspectRatio: selectedAspectRatio.value,
        shape: selectedShape.value
      })
    )
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
      newAspectRatio.value = savedSettings.aspectRatio || DEFAULT_SETTINGS.aspectRatio
      newShape.value = savedSettings.shape || DEFAULT_SETTINGS.shape
    }

    captureState()
  })
</script>
