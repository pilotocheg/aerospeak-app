import { useGoogleOneTap, type UseGoogleOneTapOptions } from '../model/use-google-one-tap'

type GoogleOneTapAutoSignInProps = UseGoogleOneTapOptions

export const GoogleOneTapAutoSignIn = (props: GoogleOneTapAutoSignInProps) => {
  useGoogleOneTap(props)
  return null
}
