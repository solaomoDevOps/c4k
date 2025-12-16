import { ArrowLeft, Heart, Star, Users, Shield } from 'lucide-react';

interface AboutUsProps {
  onBack: () => void;
}

export default function AboutUs({ onBack }: AboutUsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 bg-white hover:bg-gray-100 text-gray-700 font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 p-12 text-center">
            <div className="text-8xl mb-4">👨‍⚕️💻</div>
            <h1 className="text-6xl font-bold text-white mb-4">About Computer4Kids</h1>
            <p className="text-2xl text-blue-100 max-w-3xl mx-auto">
              A Free, Safe Platform to Teach Children Computer Skills
            </p>
          </div>

          <div className="p-12">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-10 h-10 text-red-500 fill-red-500" />
                <h2 className="text-4xl font-bold text-gray-800">Our Story</h2>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 mb-8">
                <p className="text-2xl text-gray-700 leading-relaxed mb-6">
                  I started this project because I was looking for a fun site to get my 5-year-old boy
                  <span className="font-bold text-blue-600"> Ayoola </span>
                  excited about the computer and could not find something nice and simple.
                </p>
                <p className="text-2xl text-gray-700 leading-relaxed mb-6">
                  So I embarked on a journey to make that possible for all kids! Now,
                  <span className="font-bold text-cyan-600"> computer4kids </span>
                  is a free, safe platform to teach children how to safely use the computer.
                </p>
                <p className="text-2xl text-gray-700 leading-relaxed">
                  Parents don't always have time to teach their kids these essential skills. Now they can
                  be sure of a helpful platform to guide their children on how to use computers and laptops
                  safely and confidently.
                </p>
              </div>

              <div className="text-center mb-8">
                <div className="inline-block bg-gradient-to-r from-blue-400 to-cyan-500 rounded-3xl p-8 shadow-xl">
                  <p className="text-3xl text-white font-bold mb-2">
                    Made with love and care for all children
                  </p>
                  <p className="text-2xl text-blue-100">
                    By Dr. Simeon Olaomo
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 text-center transform hover:scale-105 transition-all">
                <Shield className="w-16 h-16 text-pink-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-3">100% Safe</h3>
                <p className="text-lg text-gray-600">
                  Child-friendly content with no ads or external links. Your children learn in a protected environment.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 text-center transform hover:scale-105 transition-all">
                <Star className="w-16 h-16 text-blue-500 mx-auto mb-4 fill-blue-500" />
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Completely Free</h3>
                <p className="text-lg text-gray-600">
                  No hidden fees, no subscriptions. Quality education accessible to every child, everywhere.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center transform hover:scale-105 transition-all">
                <Users className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-3">For All Kids</h3>
                <p className="text-lg text-gray-600">
                  Designed for children ages 5 and up. Fun, interactive lessons that make learning enjoyable!
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border-4 border-yellow-300">
              <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">What Your Child Will Learn</h3>
              <div className="grid md:grid-cols-2 gap-4 text-lg text-gray-700">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🖱️</span>
                  <div>
                    <strong>Mouse Skills:</strong> Clicking, dragging, and moving with precision
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-3xl">⌨️</span>
                  <div>
                    <strong>Keyboard Skills:</strong> Typing letters, words, and sentences
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-3xl">💻</span>
                  <div>
                    <strong>Computer Basics:</strong> Understanding how computers work
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🛡️</span>
                  <div>
                    <strong>Internet Safety:</strong> Staying safe online
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-3xl">📁</span>
                  <div>
                    <strong>Files & Folders:</strong> Organizing digital work
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🎨</span>
                  <div>
                    <strong>Creative Tools:</strong> Drawing and creating digital art
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 p-12 text-center">
            <h3 className="text-4xl font-bold text-white mb-4">Join Our Learning Community!</h3>
            <p className="text-2xl text-blue-100 mb-6 max-w-3xl mx-auto">
              Help your child build confidence with computers and prepare them for a digital future.
            </p>
            <button
              onClick={onBack}
              className="bg-white hover:bg-gray-100 text-blue-600 font-bold text-2xl py-4 px-12 rounded-full shadow-lg transform hover:scale-105 transition-all"
            >
              Start Learning Now!
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600">
            computer4kids &copy; {new Date().getFullYear()} - Made with <Heart className="w-5 h-5 inline text-red-500 fill-red-500" /> by Dr. Simeon Olaomo
          </p>
        </div>
      </div>
    </div>
  );
}
