import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle, BookOpen, Shield, Star, Zap } from 'lucide-react';

interface FAQProps {
  onBack: () => void;
}

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  icon: string;
}

export default function FAQ({ onBack }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData: FAQItem[] = [
    {
      category: "Getting Started",
      icon: "🚀",
      question: "What age is Computer4Kids designed for?",
      answer: "Computer4Kids is designed for children ages 4-12. The lessons are structured to be engaging for beginners while providing progressive challenges. Younger children may need parent assistance initially, while older kids can navigate independently."
    },
    {
      category: "Getting Started",
      icon: "🚀",
      question: "How do I create an account?",
      answer: "Creating an account is simple! Click 'Get Started' on the home page, enter a parent email address, and create a child profile with a name, age, and fun avatar. You'll receive a verification email to complete the setup. No credit card required - it's completely free!"
    },
    {
      category: "Getting Started",
      icon: "🚀",
      question: "Is Computer4Kids really free?",
      answer: "Yes, absolutely! Computer4Kids is 100% free with no hidden fees, subscriptions, or paywalls. We believe every child deserves access to quality computer education, regardless of their family's financial situation."
    },
    {
      category: "Learning & Progress",
      icon: "📚",
      question: "What will my child learn?",
      answer: "Your child will master essential computer skills including: mouse control (clicking, dragging, moving), keyboard typing, understanding computer parts, internet safety, file management, creative tools, and problem-solving. Lessons are interactive and game-based for maximum engagement."
    },
    {
      category: "Learning & Progress",
      icon: "📚",
      question: "How long does it take to complete all lessons?",
      answer: "Every child learns at their own pace! Most children complete the core curriculum in 2-4 weeks with regular practice (15-30 minutes daily). The platform adapts to your child's speed, so there's no pressure or time limits."
    },
    {
      category: "Learning & Progress",
      icon: "📚",
      question: "Can my child repeat lessons?",
      answer: "Absolutely! Children can replay any lesson as many times as they want. Repetition helps reinforce learning, and some kids enjoy revisiting their favorite activities. Progress is saved automatically."
    },
    {
      category: "Learning & Progress",
      icon: "📚",
      question: "What if my child finds a lesson too difficult?",
      answer: "Each lesson includes hints and guidance. If a child struggles, they can exit and try again later. Parents can also assist by working through lessons together. The lessons are designed to be achievable with patience and practice."
    },
    {
      category: "Learning & Progress",
      icon: "📚",
      question: "How do I track my child's progress?",
      answer: "Parents can access the Parent Dashboard to see detailed progress reports including lessons completed, time spent learning, achievements earned, and skill levels. You'll see exactly what your child has mastered and what's next."
    },
    {
      category: "Safety & Privacy",
      icon: "🛡️",
      question: "Is Computer4Kids safe for children?",
      answer: "Safety is our top priority! Computer4Kids has NO advertisements, NO external links, NO chat features, and NO social media connections. Children cannot leave the protected learning environment. All content is age-appropriate and educational."
    },
    {
      category: "Safety & Privacy",
      icon: "🛡️",
      question: "What data do you collect?",
      answer: "We collect minimal information: parent email (for account recovery), child's first name and age (for personalization), and learning progress (to show achievements). We NEVER sell data, share with third parties, or use tracking cookies. See our Privacy Policy for full details."
    },
    {
      category: "Safety & Privacy",
      icon: "🛡️",
      question: "Can other people see my child's profile?",
      answer: "No. Computer4Kids has no social features, public profiles, or ways for children to interact with others. Each child's learning experience is completely private and only visible to their parent/guardian."
    },
    {
      category: "Safety & Privacy",
      icon: "🛡️",
      question: "Should I supervise my child while they use Computer4Kids?",
      answer: "While the platform is designed to be safe and independent, we always recommend parent supervision for online activities, especially for younger children. It's also a great bonding opportunity to learn together!"
    },
    {
      category: "Technical",
      icon: "💻",
      question: "What devices can we use?",
      answer: "Computer4Kids works best on desktop computers and laptops with a mouse and keyboard (recommended for learning these skills). The site is accessible on tablets, but physical mouse and keyboard practice is most effective for skill development."
    },
    {
      category: "Technical",
      icon: "💻",
      question: "What browsers are supported?",
      answer: "Computer4Kids works on all modern web browsers including Chrome, Firefox, Safari, and Edge. For the best experience, keep your browser updated to the latest version."
    },
    {
      category: "Technical",
      icon: "💻",
      question: "Do we need to install anything?",
      answer: "No installations required! Computer4Kids is a web-based platform that runs entirely in your browser. Simply visit the website and start learning - no downloads, no app stores, no hassle."
    },
    {
      category: "Technical",
      icon: "💻",
      question: "What if we experience technical issues?",
      answer: "Try refreshing your browser or clearing your cache first. If problems persist, contact us at support@computer4kids.com with details about the issue, and we'll help resolve it quickly."
    },
    {
      category: "Account Management",
      icon: "👤",
      question: "Can I create multiple child profiles?",
      answer: "Yes! Parents can create multiple child profiles under one account. Each child gets their own personalized experience with individual progress tracking, avatars, and achievements."
    },
    {
      category: "Account Management",
      icon: "👤",
      question: "How do I reset my password?",
      answer: "On the login screen, click 'Forgot Password' and enter your email address. You'll receive a password reset link via email. Follow the instructions to create a new password."
    },
    {
      category: "Account Management",
      icon: "👤",
      question: "Can I delete my account and data?",
      answer: "Yes, parents can delete their account and all associated data at any time through the Parent Dashboard settings. This action is permanent and cannot be undone."
    },
    {
      category: "Account Management",
      icon: "👤",
      question: "I didn't receive the verification email. What do I do?",
      answer: "Check your spam/junk folder first. If you still can't find it, request a new verification email from the login page. Make sure you entered the correct email address during signup."
    },
    {
      category: "Features & Games",
      icon: "🎮",
      question: "What are the mini-games?",
      answer: "Mini-games are fun activities that reinforce learned skills! They include typing races, mouse mazes, coloring games, and more. Children earn points and rewards while practicing what they've learned in lessons."
    },
    {
      category: "Features & Games",
      icon: "🎮",
      question: "What are achievements and rewards?",
      answer: "As children complete lessons and games, they earn XP points, unlock achievement badges, and receive daily rewards. These gamification features keep learning fun and motivating!"
    },
    {
      category: "Features & Games",
      icon: "🎮",
      question: "Can my child customize their avatar?",
      answer: "Yes! Children can choose from a variety of colorful, fun avatars when creating their profile. This helps personalize their learning experience and makes it more engaging."
    },
    {
      category: "About Computer4Kids",
      icon: "❤️",
      question: "Who created Computer4Kids?",
      answer: "Computer4Kids was created by Dr. Simeon Olaomo, who couldn't find a simple, safe platform to teach his 5-year-old son computer skills. He built this platform with love to help all children learn essential digital skills."
    },
    {
      category: "About Computer4Kids",
      icon: "❤️",
      question: "Why is Computer4Kids free?",
      answer: "We believe education should be accessible to everyone. Computer4Kids is free because we want every child, regardless of their family's financial situation, to have the opportunity to learn essential computer skills for their future."
    },
    {
      category: "About Computer4Kids",
      icon: "❤️",
      question: "How can I support Computer4Kids?",
      answer: "Share Computer4Kids with other parents, teachers, and families! Word-of-mouth helps us reach more children. You can also provide feedback to help us improve the platform."
    },
    {
      category: "About Computer4Kids",
      icon: "❤️",
      question: "Will you add more lessons in the future?",
      answer: "Yes! We're continuously developing new content, lessons, and features based on user feedback. Our goal is to provide a comprehensive, ever-growing library of computer skills education."
    }
  ];

  const categories = Array.from(new Set(faqData.map(item => item.category)));

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "Getting Started": return <Zap className="w-5 h-5 text-yellow-500" />;
      case "Learning & Progress": return <BookOpen className="w-5 h-5 text-blue-500" />;
      case "Safety & Privacy": return <Shield className="w-5 h-5 text-green-500" />;
      case "Technical": return <HelpCircle className="w-5 h-5 text-purple-500" />;
      case "Account Management": return <Star className="w-5 h-5 text-orange-500" />;
      case "Features & Games": return <Star className="w-5 h-5 text-pink-500" />;
      case "About Computer4Kids": return <Star className="w-5 h-5 text-red-500" />;
      default: return <HelpCircle className="w-5 h-5 text-gray-500" />;
    }
  };

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
          <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 p-8 text-center">
            <HelpCircle className="w-16 h-16 text-white mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">Frequently Asked Questions</h1>
            <p className="text-blue-100">Find answers to common questions about Computer4Kids</p>
          </div>

          <div className="p-8">
            <p className="text-center text-gray-600 mb-8 text-lg">
              Have a question? We've got answers! Browse through our most commonly asked questions below.
            </p>

            {categories.map((category, catIndex) => (
              <div key={catIndex} className="mb-8">
                <div className="flex items-center gap-3 mb-4 pb-2 border-b-2 border-gray-200">
                  {getCategoryIcon(category)}
                  <h2 className="text-2xl font-bold text-gray-800">{category}</h2>
                </div>

                <div className="space-y-3">
                  {faqData
                    .filter(item => item.category === category)
                    .map((item, index) => {
                      const globalIndex = faqData.indexOf(item);
                      const isOpen = openIndex === globalIndex;

                      return (
                        <div
                          key={globalIndex}
                          className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-all"
                        >
                          <button
                            onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                            className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-cyan-50 transition-all"
                          >
                            <div className="flex items-center gap-3 text-left">
                              <span className="text-2xl">{item.icon}</span>
                              <span className="font-semibold text-gray-800">{item.question}</span>
                            </div>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            )}
                          </button>

                          {isOpen && (
                            <div className="px-6 py-4 bg-white border-t-2 border-gray-100">
                              <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}

            <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Still Have Questions?</h3>
              <p className="text-gray-700 mb-4">
                We're here to help! If you can't find the answer you're looking for, please reach out to us.
              </p>
              <a
                href="mailto:support@computer4kids.com"
                className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
