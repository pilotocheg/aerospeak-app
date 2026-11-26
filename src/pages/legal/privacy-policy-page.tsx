import { LegalDocument, type LegalSection } from '@/widgets/legal-document'

const PRIVACY_SECTIONS: LegalSection[] = [
  {
    heading: '1. Overview and Data Controller',
    paragraphs: [
      'This Privacy Policy describes how AeroSpeak ("we", "our", or "us") collects, uses, and protects your personal information when you use our web application.',
      'AeroSpeak is an interactive web-based simulator for student pilots and aviation professionals to practice ICAO-standard radiotelephony communications.',
      'The data controller is Viacheslav Dmytriiev, contact: slavutich.org@gmail.com.',
    ],
  },
  {
    heading: '2. Information We Collect',
    paragraphs: [
      'Account & Profile Data: your email address and username, and your name and email from Google when you sign in with Google. Passwords are handled by Firebase Authentication (Google); we never see or store them.',
      'Terms Acceptance: the date and time you accepted these terms and this policy.',
      'Voice Recordings: short recordings of your radio calls, sent during practice for Speech-to-Text (STT) conversion. We do not store them (see section 5).',
      'Training Progress: the transcript of each attempt, its score and feedback, the scenarios you completed and your practice statistics.',
      'Usage Analytics (only with your consent): pages visited, device and browser type, approximate location derived from your IP address, and a pseudonymous ID of your account, collected through Google Analytics for Firebase.',
      'Technical Data: IP address, browser type and request timestamps, recorded in the server logs of our hosting providers to keep the service running and secure.',
    ],
  },
  {
    heading: '3. Purpose and Legal Basis for Processing',
    paragraphs: [
      'We process your data on the following legal grounds under the General Data Protection Regulation (GDPR):',
      '• Performance of Contract (Art. 6(1)(b)): to create your account, transcribe your radio calls, score them against ICAO phraseology and keep your training progress.',
      '• Consent (Art. 6(1)(a)): to collect usage analytics. You can withdraw consent at any time without affecting the service.',
      '• Legitimate Interests (Art. 6(1)(f)): to keep the platform secure, prevent abuse and fix errors, using technical data and server logs.',
    ],
  },
  {
    heading: '4. Service Providers',
    paragraphs: [
      'We do not sell your personal data. We share it only with providers that run parts of the service for us, under their data processing terms:',
      '• Google (Firebase Authentication, Google Sign-In, Google Analytics for Firebase): sign-in and, with your consent, usage analytics.',
      '• Deepgram: Speech-to-Text conversion of your recordings.',
      '• Neon: the database that holds your account and training progress, hosted in the EU (Frankfurt).',
      '• Render and Vercel: hosting of the AeroSpeak server and web application.',
      'Some of these providers are based in the United States. Transfers outside the European Economic Area rely on the EU–US Data Privacy Framework or the European Commission’s Standard Contractual Clauses.',
    ],
  },
  {
    heading: '5. Voice Recordings',
    paragraphs: [
      'A recording is sent to our server when you finish a radio call. The server keeps it in memory only while it is transcribed and scored, and never writes it to disk or to the database.',
      'We keep the resulting transcript and score as part of your training progress.',
    ],
  },
  {
    heading: '6. Cookies and Browser Storage',
    paragraphs: [
      'Essential storage: AeroSpeak keeps your sign-in session (Firebase Authentication, in IndexedDB) and, in LocalStorage, your theme, your analytics choice and a cache of scenarios and your progress so pages load fast. The cached progress is removed when you sign out. Google Sign-In sets a "g_state" cookie that remembers whether you closed its sign-in prompt. This storage is needed for the service and needs no consent.',
      'Analytics cookies: Google Analytics sets cookies whose names start with "_ga" only after you choose "Allow" in the cookie banner. If you choose "Decline", no analytics data is collected.',
      'You can change your choice at any time under Profile → Analytics. Turning analytics off stops collection and deletes the "_ga" cookies. Clearing this site’s data in your browser also resets your choice.',
    ],
  },
  {
    heading: '7. Data Retention and Security',
    paragraphs: [
      'Account data and training progress are kept while your account exists. Deleting your account under Profile → Delete account removes your profile and progress permanently.',
      'Voice recordings are not retained (see section 5).',
      'Analytics data is kept by Google Analytics for the retention period set in our analytics property, no longer than 14 months.',
      'We protect your data with HTTPS encryption, token-based authentication and restricted access to our systems.',
    ],
  },
  {
    heading: '8. Your Rights under GDPR',
    paragraphs: [
      'You have the right to:',
      '• Access your personal data and receive a copy of it in a portable format.',
      '• Rectify inaccurate data (you can change your username and password in your profile).',
      '• Request deletion of your data (you can delete your account in your profile).',
      '• Request restriction of, or object to, the processing of your data.',
      '• Withdraw your consent to analytics at any time.',
      '• Lodge a complaint with a data protection supervisory authority.',
      'To exercise a right that is not available in your profile, email slavutich.org@gmail.com.',
    ],
  },
  {
    heading: '9. Minors',
    paragraphs: [
      'AeroSpeak is intended for flight students and aviation trainees aged 18 and older. We do not knowingly collect personal information from individuals under 18 years of age.',
    ],
  },
  {
    heading: '10. Changes and Contact',
    paragraphs: [
      'We may update this Privacy Policy to reflect changes in our training features, service providers, or legal obligations. The date at the top shows the latest version.',
      'For questions about this policy or your data, contact Viacheslav Dmytriiev at slavutich.org@gmail.com.',
    ],
  },
]

export const PrivacyPolicyPage = () => (
  <LegalDocument
    title="Privacy Policy"
    subtitle="How AeroSpeak handles personal information, voice recordings, analytics, and training data."
    lastUpdated="2026-11-26"
    sections={PRIVACY_SECTIONS}
  />
)
