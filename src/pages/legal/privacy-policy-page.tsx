import { LegalDocument, type LegalSection } from '@/widgets/legal-document'

const PRIVACY_SECTIONS: LegalSection[] = [
  {
    heading: '1. Overview and Data Controller',
    paragraphs: [
      'This Privacy Policy describes how AeroSpeak ("we", "our", or "us") collects, uses, and protects your personal information when you use our web application.',
      'AeroSpeak is designed as an interactive web-based simulator for student pilots and aviation professionals to practice ICAO-standard radiotelephony communications.',
    ],
  },
  {
    heading: '2. Information We Collect',
    paragraphs: [
      'Account & Profile Data: Email address, username, password hash, and basic profile parameters when you create an account.',
      'Voice & Audio Inputs: Short audio snippets and speech recordings transmitted during interactive scenario practice to perform Speech-to-Text (STT) conversion and evaluate your radiotelephony responses.',
      'Training Progress & Scenario Data: History of completed scenarios, scoring results, phraseology evaluation logs, accuracy feedback, and learning stats.',
      'Technical & Device Data: IP address, browser type, operating system version, time zone, and session timestamps collected automatically to maintain system performance and security.',
    ],
  },
  {
    heading: '3. Purpose and Legal Basis for Processing',
    paragraphs: [
      'We process your data based on the following legal grounds under the General Data Protection Regulation (GDPR):',
      '• Performance of Contract: To process voice inputs, evaluate phraseology accuracy against ICAO standards, and provide interactive feedback.',
      '• Legitimate Interests: To optimize speech recognition models, improve simulation scenarios, maintain platform security, and analyze performance bugs.',
      '• Legal Compliance: To adhere to statutory record-keeping and technical data protection requirements.',
    ],
  },
  {
    heading: '4. Voice Data Processing and Third Parties',
    paragraphs: [
      'Audio recordings captured during practice sessions are processed solely for phrase verification and speech recognition.',
      'We do not sell your personal data or audio files. Data may be shared with trusted infrastructure providers (e.g., cloud hosting, Speech-to-Text AI APIs) strictly bound by data processing agreements and security standards.',
    ],
  },
  {
    heading: '5. Cookies and Web Storage',
    paragraphs: [
      'AeroSpeak uses essential cookies and browser storage (such as LocalStorage and SessionStorage) to maintain active login sessions, save application preferences, and preserve practice state.',
      'Analytics cookies may be used with your consent to gather aggregated statistics on app usage and improve user navigation.',
    ],
  },
  {
    heading: '6. Data Retention and Security',
    paragraphs: [
      'Personal data and progress history are stored for as long as your account remains active or as needed to provide our training services.',
      'Audio samples processed for automated feedback are held strictly for the duration required to parse and evaluate the response, after which they are purged or anonymized.',
      'We apply technical and organizational measures (including HTTPS encryption, access controls, and hashed storage) to safeguard your information.',
    ],
  },
  {
    heading: '7. Your Rights under GDPR',
    paragraphs: [
      'If you are located in the European Economic Area (EEA), you have the right to:',
      '• Access, rectify, or request deletion of your personal data.',
      '• Request restriction or object to the processing of your data.',
      '• Export your account and training progress data in a portable format.',
      '• Withdraw consent for non-essential cookies at any time.',
    ],
  },
  {
    heading: '8. Minors',
    paragraphs: [
      'AeroSpeak is intended for flight students and aviation trainees aged 18 and older. We do not knowingly collect personal information from individuals under 18 years of age.',
    ],
  },
  {
    heading: '9. Changes and Contact',
    paragraphs: [
      'We may update this Privacy Policy periodically to reflect changes in our training features, infrastructure, or regulatory obligations.',
      'If you have questions regarding this policy or wish to exercise your data protection rights, please contact the AeroSpeak team through our official support channels.',
    ],
  },
]

export const PrivacyPolicyPage = () => (
  <LegalDocument
    title="Privacy Policy"
    subtitle="How AeroSpeak handles personal information, audio inputs, and training data."
    lastUpdated="2026-10-21"
    sections={PRIVACY_SECTIONS}
  />
)
