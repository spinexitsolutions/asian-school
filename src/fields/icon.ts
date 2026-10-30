import type { Field } from 'payload'

export const iconOptions = [
  { label: 'Book', value: 'book' },
  { label: 'Flask (Science)', value: 'flask' },
  { label: 'Computer', value: 'computer' },
  { label: 'Sports / Trophy', value: 'trophy' },
  { label: 'Music', value: 'music' },
  { label: 'Art / Palette', value: 'palette' },
  { label: 'Bus / Transport', value: 'bus' },
  { label: 'Shield / Safety', value: 'shield' },
  { label: 'Plant / Nature', value: 'plant' },
  { label: 'Globe', value: 'globe' },
  { label: 'Graduation Cap', value: 'cap' },
  { label: 'Heart / Care', value: 'heart' },
  { label: 'Users / Community', value: 'users' },
  { label: 'Sparkle', value: 'sparkle' },
  { label: 'Library', value: 'library' },
  { label: 'Camera / CCTV', value: 'camera' },
]

export const iconField = (name = 'icon'): Field => ({
  name,
  type: 'select',
  options: iconOptions,
  defaultValue: 'sparkle',
})
