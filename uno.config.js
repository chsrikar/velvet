import { defineConfig, presetUno, presetWebFonts, presetIcons } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Inter:400,500,600,700',
        display: 'Playfair Display:400,500,600,700',
        body: 'Poppins:300,400,500,600,700',
      },
    }),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/',
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
  theme: {
    colors: {
      blush: '#f8c8dc',
      lavender: '#d8c8ff',
      mint: '#c8f2e0',
      peach: '#ffd6c8',
      cream: '#fffaf7',
      dark1: '#1e1b2e',
      dark2: '#2a2445',
      dark3: '#3d356b',
    },
  },
  shortcuts: {
    'glass': 'bg-white/40 backdrop-blur-xl border border-white/30 shadow-lg',
    'glass-dark': 'bg-white/8 backdrop-blur-xl border border-white/10 shadow-lg',
    'card-hover': 'transition-all duration-300 hover:(-translate-y-1 shadow-xl)',
    'btn-primary': 'px-5 py-2.5 rounded-full bg-gradient-to-r from-blush to-lavender text-dark1 font-semibold cursor-pointer border-none transition-all duration-300 hover:(shadow-lg scale-105)',
    'btn-outline': 'px-5 py-2.5 rounded-full border-2 border-blush bg-transparent text-dark1 font-semibold cursor-pointer transition-all duration-300 hover:(bg-blush/20)',
    'input-field': 'w-full px-4 py-3 rounded-2xl border border-blush/30 bg-white/60 backdrop-blur-sm outline-none transition-all duration-300 focus:(border-lavender shadow-md)',
    'input-field-dark': 'w-full px-4 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm outline-none text-white transition-all duration-300 focus:(border-lavender/50 shadow-md)',
  },
})
