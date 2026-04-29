import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function getPublicStorageUrl(bucket, path) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export function getPublicImageUrl(path) {
  return getPublicStorageUrl('product-images', path)
}

export function getPublicBrochureUrl(path) {
  return getPublicStorageUrl('product-brochures', path)
}
