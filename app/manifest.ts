import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Menu mensa ELIS',
    short_name: 'Menu ELIS',
    description: 'Permette di vedere il menu della mensa dell\'ELIS',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#015374',
    icons: [
        {
            src: '/icon.png',
            sizes: '512x512',
            type: 'image/png',
        },
    ],
  }
}