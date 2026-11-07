const GOOGLE_IDENTITY_SCRIPT_SRC = 'https://accounts.google.com/gsi/client'

export type GoogleCredentialResponse = {
  credential?: string
}

export type GoogleIdentity = {
  accounts: {
    id: {
      initialize: (config: {
        client_id: string
        callback: (response: GoogleCredentialResponse) => void
        use_fedcm_for_prompt?: boolean
      }) => void
      prompt: () => void
      cancel: () => void
    }
  }
}

declare global {
  interface Window {
    google?: GoogleIdentity
  }
}

let scriptPromise: Promise<GoogleIdentity> | null = null

/** Loads the Google Identity Services script once and resolves with `window.google`. */
export const loadGoogleIdentity = () => {
  scriptPromise ??= new Promise<GoogleIdentity>((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve(window.google)
      return
    }

    const script = document.createElement('script')
    script.src = GOOGLE_IDENTITY_SCRIPT_SRC
    script.async = true
    script.onload = () => {
      if (window.google?.accounts?.id) {
        resolve(window.google)
      } else {
        reject(new Error('Google Identity Services did not initialize'))
      }
    }
    script.onerror = () => {
      scriptPromise = null
      script.remove()
      reject(new Error('Failed to load Google Identity Services'))
    }
    document.head.append(script)
  })

  return scriptPromise
}
