import { ArrowLeft, FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface TermsOfUseProps {
  onBack: () => void;
  onNavigateToPrivacy?: () => void;
}

export default function TermsOfUse({ onBack, onNavigateToPrivacy }: TermsOfUseProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 bg-white hover:bg-gray-100 text-gray-700 font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 text-center">
            <FileText className="w-16 h-16 text-white mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">Terms of Use</h1>
            <p className="text-blue-100">Last Updated: December 2024</p>
          </div>

          <div className="p-8 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Computer4Kids</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Computer4Kids, you agree to be bound by these Terms of Use. Please read them carefully. If you do not agree with any part of these terms, please do not use our platform.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Our Mission</h3>
                  <p className="text-gray-700">
                    Computer4Kids is a free educational platform dedicated to teaching children essential computer skills in a safe, engaging environment. We are committed to providing quality education accessible to every child.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Use constitute a legally binding agreement between you and Computer4Kids. By creating an account or using our services, you confirm that you have read, understood, and agree to these terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Eligibility and Parental Consent</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  Computer4Kids is designed for children ages 4-12. To use our platform:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>A parent or legal guardian must create and manage the account</li>
                  <li>Parents must provide accurate contact information</li>
                  <li>Parents are responsible for supervising their child's use of the platform</li>
                  <li>Children should not create accounts without parental permission</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Free Service</h2>
              <p className="text-gray-700 leading-relaxed">
                Computer4Kids is completely free to use. We do not charge subscription fees, require payment for content, or display advertisements. Our platform is funded by the creator's commitment to education and may accept voluntary donations to support continued development.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. User Accounts</h2>
              <div className="space-y-3 text-gray-700">
                <p>When creating an account, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and truthful information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Not share account access with others outside your household</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Acceptable Use</h2>
              <div className="space-y-3 text-gray-700">
                <p>Users must NOT:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Attempt to hack, disrupt, or damage the platform</li>
                  <li>Upload malicious code or viruses</li>
                  <li>Misuse or abuse the service in any way</li>
                  <li>Attempt to access other users' accounts</li>
                  <li>Use automated tools to access the service</li>
                  <li>Copy, modify, or distribute our content without permission</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                All content on Computer4Kids, including but not limited to text, graphics, logos, images, lessons, and software, is the property of Computer4Kids and is protected by copyright laws. You may use the platform for personal, non-commercial educational purposes only.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Privacy and Data</h2>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. Please review our <button onClick={onNavigateToPrivacy} className="text-blue-600 hover:underline font-semibold">Privacy Policy</button> to understand how we collect, use, and protect your information. By using Computer4Kids, you consent to our data practices as described in the Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Disclaimers</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  Computer4Kids is provided "as is" without warranties of any kind. While we strive to provide accurate and up-to-date educational content:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>We do not guarantee uninterrupted or error-free service</li>
                  <li>We are not responsible for technical issues beyond our control</li>
                  <li>Educational outcomes may vary by individual</li>
                  <li>Content is for general educational purposes and not professional advice</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                To the maximum extent permitted by law, Computer4Kids shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform. Our total liability shall not exceed the amount you paid to use the service (which is zero, as the service is free).
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Account Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We reserve the right to suspend or terminate accounts that violate these Terms of Use. You may also delete your account at any time through the Parent Dashboard.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update these Terms of Use from time to time. Significant changes will be communicated via email to registered parents. Continued use of the platform after changes constitutes acceptance of the updated terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Use shall be governed by and construed in accordance with applicable laws. Any disputes shall be resolved in appropriate courts.
              </p>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Questions or Concerns?</h3>
                  <p className="text-gray-700 mb-2">
                    If you have any questions about these Terms of Use, please contact us:
                  </p>
                  <p className="text-gray-700">
                    <strong>Email:</strong> <a href="mailto:support@computer4kids.com" className="text-blue-600 hover:underline">support@computer4kids.com</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center pt-6 border-t-2 border-gray-200">
              <p className="text-gray-600">
                Thank you for choosing Computer4Kids to help your child learn essential computer skills!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
