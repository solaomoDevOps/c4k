import { ArrowLeft, Shield, Lock, Eye, UserCheck } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
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
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-center">
            <Shield className="w-16 h-16 text-white mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
            <p className="text-blue-100">Last Updated: December 2024</p>
          </div>

          <div className="p-8 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Commitment to Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                At Computer4Kids, we take the privacy and safety of children very seriously. This privacy policy explains how we collect, use, and protect information when you use our platform.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">100% Kid-Safe Platform</h3>
                  <p className="text-gray-700">
                    Computer4Kids is designed with children's safety as our top priority. We do not display ads, we do not share data with third parties, and we do not allow external links that could lead children away from our protected learning environment.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <UserCheck className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Information We Collect</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Account Information</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Parent/guardian email address for account creation</li>
                    <li>Child's first name and age group for personalization</li>
                    <li>Selected avatar for visual identification</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Learning Progress</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Lessons completed and progress tracking</li>
                    <li>Scores and achievements earned</li>
                    <li>Time spent on activities</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">How We Use Your Information</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>To provide personalized learning experiences</li>
                <li>To track and display learning progress</li>
                <li>To maintain account security</li>
                <li>To improve our educational content</li>
                <li>To send important updates to parents/guardians</li>
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Data Protection</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>We do NOT:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Sell or share personal information with third parties</li>
                  <li>Display advertisements to children</li>
                  <li>Collect unnecessary personal information</li>
                  <li>Track children across other websites</li>
                  <li>Allow public profiles or social features</li>
                </ul>
                <p className="mt-4">
                  <strong>We DO:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Use secure encryption for all data</li>
                  <li>Store information on secure servers</li>
                  <li>Regularly review and update security measures</li>
                  <li>Allow parents to access and delete their child's data</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Parent Rights</h2>
              <p className="text-gray-700 mb-3">
                Parents and guardians have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Review all information we have collected about their child</li>
                <li>Request deletion of their child's account and data</li>
                <li>Refuse further collection of their child's information</li>
                <li>Contact us with any privacy concerns</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Cookies and Tracking</h2>
              <p className="text-gray-700">
                We use essential cookies to maintain user sessions and remember preferences. We do not use tracking cookies or analytics that identify individual users. All cookies are used solely to improve the learning experience.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this privacy policy from time to time. We will notify parents of any significant changes via email. Continued use of Computer4Kids after changes indicates acceptance of the updated policy.
              </p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-3">
                If you have any questions or concerns about our privacy practices, please contact us:
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> <a href="mailto:privacy@computer4kids.com" className="text-blue-600 hover:underline">privacy@computer4kids.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
