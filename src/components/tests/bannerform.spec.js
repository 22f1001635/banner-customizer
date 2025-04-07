import { mount } from '@vue/test-utils'
import BannerForm from '../bannerform.vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('BannerForm', () => {
  beforeEach(() => {
    localStorage.clear()
    global.URL.createObjectURL = vi.fn()
  })

  it('renders with default values', () => {
    const wrapper = mount(BannerForm)

    // Test initial state
    expect(wrapper.find('h1').text()).toContain("Saksham's Customizable Banner")
    expect(wrapper.find('[class*="fixed top-0"]').element.style.backgroundColor).toBe(
      'rgb(59, 130, 246)'
    )
    expect(wrapper.find('[class*="fixed top-0"]').element.style.opacity).toBe('1')
    expect(wrapper.find('h1').element.style.color).toBe('rgb(255, 255, 255)')
    expect(wrapper.find('h1').element.style.opacity).toBe('1')
    expect(wrapper.find('img').attributes('src')).toContain('/default.png')
    expect(wrapper.find('img').element.style.opacity).toBe('1')
  })

  it('toggles settings form when button is clicked', async () => {
    const wrapper = mount(BannerForm)

    expect(wrapper.find('form').exists()).toBe(false)

    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('form').exists()).toBe(true)

    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('form').exists()).toBe(false)
  })

  it('updates all banner properties including opacities when form is submitted', async () => {
    const wrapper = mount(BannerForm)
    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    // Set all form values
    await wrapper.find('input[placeholder="Enter new banner text"]').setValue('New Banner')
    await wrapper.findAll('input[type="color"]')[0].setValue('#ff0000')
    await wrapper.findAll('input[type="color"]')[1].setValue('#00ff00')
    await wrapper.findAll('input[type="range"]')[0].setValue(0.5)
    await wrapper.findAll('input[type="range"]')[1].setValue(0.7)
    await wrapper.findAll('input[type="range"]')[2].setValue(0.9)
    await wrapper
      .find('input[type="url"]')
      .setValue('https://tinypng.com/images/social/website.jpg')

    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    // Verify all updates
    expect(wrapper.find('h1').text()).toBe('New Banner')
    expect(wrapper.find('[class*="fixed top-0"]').element.style.backgroundColor).toBe(
      'rgb(255, 0, 0)'
    )
    expect(wrapper.find('[class*="fixed top-0"]').element.style.opacity).toBe('0.5')
    expect(wrapper.find('h1').element.style.color).toBe('rgb(0, 255, 0)')
    expect(wrapper.find('h1').element.style.opacity).toBe('0.7')
    expect(wrapper.find('img').element.style.opacity).toBe('0.9')
    expect(wrapper.find('img').attributes('src')).toBe(
      'https://tinypng.com/images/social/website.jpg'
    )

    // Verify localStorage
    const savedSettings = JSON.parse(localStorage.getItem('bannerSettings'))
    expect(savedSettings).toEqual({
      text: 'New Banner',
      bgColor: '#ff0000',
      textColor: '#00ff00',
      image: 'https://tinypng.com/images/social/website.jpg',
      bgOpacity: 0.5,
      textOpacity: 0.7,
      imageOpacity: 0.9
    })
  })

  it('handles image upload and updates banner', async () => {
    const wrapper = mount(BannerForm)
    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    // Mock file upload
    const file = new File(['test'], 'test.png', { type: 'image/png' })
    const mockFileReader = {
      readAsDataURL: vi.fn(),
      result: 'data:image/png;base64,test',
      onload: vi.fn()
    }
    global.FileReader = vi.fn(() => mockFileReader)

    const fileInput = wrapper.find('input[type="file"]')
    Object.defineProperty(fileInput.element, 'files', { value: [file] })
    await fileInput.trigger('change')

    mockFileReader.onload({ target: { result: 'data:image/png;base64,test' } })
    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('img').attributes('src')).toBe('data:image/png;base64,test')
  })

  it('shows error for invalid image URL', async () => {
    const wrapper = mount(BannerForm)
    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    await wrapper.find('input[type="url"]').setValue('invalid-url')
    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.text-red-500').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toContain('/default.png')
  })

  it('resets all inputs when cancel is clicked', async () => {
    const wrapper = mount(BannerForm)
    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    await wrapper.find('input[placeholder="Enter new banner text"]').setValue('Test')
    await wrapper.findAll('input[type="color"]')[0].setValue('#ff0000')
    await wrapper.findAll('input[type="color"]')[1].setValue('#00ff00')
    await wrapper.findAll('input[type="range"]')[0].setValue(0.2)
    await wrapper.findAll('input[type="range"]')[1].setValue(0.3)
    await wrapper.findAll('input[type="range"]')[2].setValue(0.4)
    await wrapper
      .find('input[type="url"]')
      .setValue('https://tinypng.com/images/social/website.jpg')

    await wrapper.find('button.bg-gray-300').trigger('click')
    await wrapper.vm.$nextTick()

    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('input[placeholder="Enter new banner text"]').element.value).toBe('')
    expect(wrapper.findAll('input[type="color"]')[0].element.value).toBe('#3b82f6')
    expect(wrapper.findAll('input[type="color"]')[1].element.value).toBe('#ffffff')
    expect(wrapper.findAll('input[type="range"]')[0].element.value).toBe('1')
    expect(wrapper.findAll('input[type="range"]')[1].element.value).toBe('1')
    expect(wrapper.findAll('input[type="range"]')[2].element.value).toBe('1')
    expect(wrapper.find('input[type="url"]').element.value).toBe('')
  })

  it('resets to default values and clears localStorage', async () => {
    const wrapper = mount(BannerForm)

    localStorage.setItem(
      'bannerSettings',
      JSON.stringify({
        text: 'Custom Text',
        bgColor: '#ff0000',
        textColor: '#00ff00',
        image: 'custom.png',
        bgOpacity: 0.2,
        textOpacity: 0.3,
        imageOpacity: 0.4
      })
    )

    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    await wrapper.find('button.bg-amber-500').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('h1').text()).toContain("Saksham's Customizable Banner")
    expect(wrapper.find('[class*="fixed top-0"]').element.style.backgroundColor).toBe(
      'rgb(59, 130, 246)'
    )
    expect(wrapper.find('[class*="fixed top-0"]').element.style.opacity).toBe('1')
    expect(wrapper.find('h1').element.style.color).toBe('rgb(255, 255, 255)')
    expect(wrapper.find('h1').element.style.opacity).toBe('1')
    expect(wrapper.find('img').attributes('src')).toContain('/default.png')
    expect(wrapper.find('img').element.style.opacity).toBe('1')
    expect(localStorage.getItem('bannerSettings')).toBeNull()
  })

  it('stops wiggle animation after first click', async () => {
    const wrapper = mount(BannerForm)

    const button = wrapper.find('button')
    expect(button.classes()).toContain('motion-safe:animate-wiggle')

    await button.trigger('click')
    await wrapper.vm.$nextTick()

    expect(button.classes()).not.toContain('motion-safe:animate-wiggle')
    expect(button.classes()).not.toContain('hover:motion-safe:animate-wiggle')
  })

  it('loads saved settings on mount', async () => {
    localStorage.setItem(
      'bannerSettings',
      JSON.stringify({
        text: 'Saved Banner',
        bgColor: '#123456',
        textColor: '#654321',
        image: 'saved.png',
        bgOpacity: 0.6,
        textOpacity: 0.7,
        imageOpacity: 0.8
      })
    )

    const wrapper = mount(BannerForm)

    expect(wrapper.find('h1').text()).toBe('Saved Banner')
    expect(wrapper.find('[class*="fixed top-0"]').element.style.backgroundColor).toBe(
      'rgb(18, 52, 86)'
    )
    expect(wrapper.find('[class*="fixed top-0"]').element.style.opacity).toBe('0.6')
    expect(wrapper.find('h1').element.style.color).toBe('rgb(101, 67, 33)')
    expect(wrapper.find('h1').element.style.opacity).toBe('0.7')
    expect(wrapper.find('img').attributes('src')).toBe('saved.png')
    expect(wrapper.find('img').element.style.opacity).toBe('0.8')
  })
})
