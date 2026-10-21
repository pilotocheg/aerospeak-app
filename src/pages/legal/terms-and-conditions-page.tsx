import { LegalDocument, type LegalSection } from '@/widgets/legal-document'

const TERMS_SECTIONS: LegalSection[] = [
  {
    heading: '1. General Provisions and Scope',
    paragraphs: [
      'AeroSpeak ("we", "our", or "us") develops and provides the web-based training platform available via our official domain (hereafter, the "Service").',
      'The Service is provided exclusively subject to these Terms and Conditions. By accessing or using AeroSpeak, you agree to accept and comply with all terms herein. If you do not agree with any part of these terms, you must not use the Service.',
    ],
  },
  {
    heading: '2. Purpose of the Service and Educational Disclaimer',
    paragraphs: [
      'AeroSpeak is designed strictly as a supplementary training tool for student pilots and aviation professionals to practice ICAO-standard English radiotelephony communications.',
      'The platform is provided for educational and training purposes only. It does not replace official flight training, ground school instruction, certified language proficiency testing, or regulatory compliance requirements.',
      'We do not guarantee specific learning outcomes or official certification success. Real-world aviation decisions remain solely the responsibility of the pilot in command.',
    ],
  },
  {
    heading: '3. Intellectual Property Rights',
    paragraphs: [
      'All intellectual property rights, UI components, code architecture, design assets, scenario structures, training texts, and audio algorithms contained within AeroSpeak are owned by or licensed to the AeroSpeak project team.',
      'You are granted a limited, non-exclusive, non-transferable license to access and use the Service for personal, educational training purposes. You are strictly prohibited from modifying, copying, replicating, reverse-engineering, or sharing platform content and materials with third parties.',
    ],
  },
  {
    heading: '4. User Accounts and Security',
    paragraphs: [
      'To access certain training features and track scenario progress, you must create an account using secure credentials.',
      'You are entirely responsible for maintaining the confidentiality of your account details and password. We are not liable for any loss or damage arising from your failure to protect your credentials.',
      'We reserve the right to suspend or block access to accounts in the event of suspected abuse, unauthorized multi-device sharing, or security breaches.',
    ],
  },
  {
    heading: '5. Acceptable Use and Voice Submissions',
    paragraphs: [
      'When using voice input and simulation features, you agree not to transmit unlawful, harmful, offensive, or misleading content, nor attempt to disrupt or overload platform infrastructure.',
      'Voice recordings and text inputs submitted during practice sessions are processed automatically to evaluate phraseology accuracy and provide interactive feedback as outlined in our Privacy Policy.',
    ],
  },
  {
    heading: '6. Warranties and Limitation of Liability',
    paragraphs: [
      'The Service is provided on an "as is" and "as available" basis, without warranties of any kind, whether express or implied, including uninterrupted availability or error-free performance.',
      'To the maximum extent permitted by applicable law, AeroSpeak and its developers shall not be held liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with your use of the platform or reliance on its feedback.',
    ],
  },
  {
    heading: '7. Indemnification',
    paragraphs: [
      'You agree to indemnify, defend, and hold harmless AeroSpeak, its creators, and contributors from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of your breach of these Terms and Conditions or misuse of the Service.',
    ],
  },
  {
    heading: '8. Changes and Updates to Terms',
    paragraphs: [
      'We reserve the right to modify or replace these Terms and Conditions at any time. Continued use of the platform after any revisions indicates your acceptance of the updated terms.',
    ],
  },
  {
    heading: '9. Governing Law and Jurisdiction',
    paragraphs: [
      'These Terms shall be governed by and interpreted in accordance with applicable European standards and local jurisdictional regulations governing digital educational services, without regard to conflict of law principles.',
    ],
  },
]

export const TermsAndConditionsPage = () => (
  <LegalDocument
    title="Terms and Conditions"
    subtitle="Please review these terms before using AeroSpeak training scenarios and platform features."
    lastUpdated="2026-10-21"
    sections={TERMS_SECTIONS}
  />
)
