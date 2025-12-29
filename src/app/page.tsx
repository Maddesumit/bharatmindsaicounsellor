"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Sparkles, Brain, Target, FileText, TrendingUp, Users, Award, ArrowRight,
  CheckCircle, Zap, Menu, X, ChevronDown, Star, Check, AlertTriangle,
  MessageSquare, BarChart3, Lightbulb, Shield, Clock, Database
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [activeProblemCard, setActiveProblemCard] = useState<number | null>(null);
  const [comparisonSlider, setComparisonSlider] = useState(50);
  const [isHardTruthVisible, setIsHardTruthVisible] = useState(false);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleRegistrationClick = async () => {
    try {
      const { getCurrentUser } = await import('@/services/auth');
      const user = await getCurrentUser();

      if (user) {
        // User is authenticated, go to registration
        router.push('/registration');
      } else {
        // User is not authenticated, go to auth page
        router.push('/auth');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      // On error, redirect to auth page
      router.push('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Section 1: Navigation Bar */}
      <nav className="fixed top-0 w-full section-purple shadow-lg z-50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="BharatMinds Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-xl">BharatMinds</span>
                  <span className="text-[10px] bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-0.5 rounded-full font-bold">AI</span>
                </div>
                <span className="block text-xs text-yellow-300">AI Counsellor</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-white hover:text-yellow-300 transition-colors font-medium">
                Services
              </a>
              <a href="#how-it-works" className="text-white hover:text-yellow-300 transition-colors font-medium">
                How It Works
              </a>
              <a href="#pricing" className="text-white hover:text-yellow-300 transition-colors font-medium">
                Pricing
              </a>
              <Link
                href="/auth"
                className="text-white hover:text-yellow-300 transition-colors font-medium"
              >
                Login
              </Link>
              <Link
                href="/registration"
                className="btn-gradient-yellow-orange px-6 py-3 rounded-full text-white font-bold flex items-center gap-2 btn-glow"
              >
                ✨ Get UGCET/UGNEET Counselling ✨
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <a href="#services" className="block text-white hover:text-yellow-300 transition-colors font-medium">
                Services
              </a>
              <a href="#how-it-works" className="block text-white hover:text-yellow-300 transition-colors font-medium">
                How It Works
              </a>
              <a href="#pricing" className="block text-white hover:text-yellow-300 transition-colors font-medium">
                Pricing
              </a>
              <Link href="/auth" className="block text-white hover:text-yellow-300 transition-colors font-medium">
                Login
              </Link>
              <Link
                href="/registration"
                className="btn-gradient-yellow-orange px-6 py-3 rounded-full text-white font-bold inline-flex items-center gap-2"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Section 2: Hero Section - Career Mantrana Style */}
      <section className="section-purple pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left Column - Text Content */}
            <div className="space-y-8">
              {/* Top Badge */}
              <div className="inline-flex">
                <div className="badge-pill bg-purple-900 bg-opacity-40 backdrop-blur-sm text-white border border-white border-opacity-30">
                  ✨ India's #1 AI-Powered Admission Counselling Platform
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="text-white">Stress-Free</span>
                <br />
                <span className="text-gradient-yellow">Government Exam College Admission Process</span>
                <br />
                <span className="text-white">Powered by AI & Experts</span>
              </h1>

              {/* Description */}
              <p className="text-lg text-purple-100 leading-relaxed">
                Get personalized admission counselling for government exams with AI-powered choice filling reports. Our system analyzes{" "}
                <span className="text-yellow-300 font-semibold">10,000+ cutoff records</span> to maximize your admission chances with expert guidance.
              </p>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleRegistrationClick}
                  className="inline-flex items-center justify-center gap-3 btn-gradient-yellow-orange text-white px-10 py-5 rounded-full font-bold hover:scale-105 transition-transform shadow-2xl btn-glow cursor-pointer"
                >
                  <span className="text-2xl">🤖</span>
                  <div className="text-left">
                    <div className="text-base font-bold">Experience AI-Powered Counselling</div>
                    <div className="text-xs opacity-90">Intelligent Predictions • Real-time Analysis</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Column - Feature Card */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="grid grid-cols-2">
                  {/* Illustration Side */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 flex items-center justify-center">
                    <Image
                      src="/images/counselling-illustration.jpg"
                      alt="UGCET/UGNEET Counselling Process"
                      width={300}
                      height={400}
                      className="object-cover rounded-l-3xl"
                    />
                  </div>

                  {/* Content Side */}
                  <div className="p-6 flex flex-col justify-between">
                    {/* Badge */}
                    <div className="inline-flex self-start mb-4">
                      <div className="badge-pill btn-gradient-yellow-orange text-white text-xs">
                        <Zap className="w-3 h-3" />
                        AI-Powered Predictions
                      </div>
                    </div>

                    {/* Title */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Let AI Find Your Perfect Match
                      </h3>
                      <p className="text-sm text-gray-600">
                        Machine learning algorithms analyze your profile for optimal results.
                      </p>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={handleRegistrationClick}
                      className="btn-gradient-yellow-orange text-white px-6 py-3 rounded-full font-bold text-sm text-center hover:scale-105 transition-transform cursor-pointer"
                    >
                      Try AI Now →
                    </button>

                    {/* Mini Stats */}
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t">
                      <div className="text-center">
                        <div className="text-xs text-gray-500">AI Accuracy</div>
                        <div className="text-lg font-bold text-purple-700">99%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">ML Models</div>
                        <div className="text-lg font-bold text-purple-700">25+</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar at Bottom */}
          <div className="mt-16 grid grid-cols-3 gap-4 md:gap-8 text-center">
            <div>
              <div className="text-3xl md:text-5xl font-bold text-yellow-300 mb-2">10,000+</div>
              <div className="text-purple-100 text-xs md:text-sm">Cutoff Records Analyzed</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-bold text-yellow-300 mb-2 flex items-center justify-center gap-2">
                99%
              </div>
              <div className="text-purple-100 text-xs md:text-sm">AI Prediction Accuracy</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-bold text-yellow-300 mb-2">24/7</div>
              <div className="text-purple-100 text-xs md:text-sm">Expert Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: AI Agentic Counsellor */}
      <section className="section-white py-20 px-6 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 px-6 py-2 rounded-full font-semibold text-sm mb-6 shadow-md">
              <Brain className="w-4 h-4" />
              MEET YOUR AI AGENT
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-6 text-gray-900 leading-tight">
              Your Personal <span className="text-gradient-purple">AI Agentic Counsellor</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 text-center max-w-4xl mx-auto leading-relaxed">
              An intelligent AI agent that understands your goals, analyzes <span className="text-purple-600 font-semibold">10,000+ cutoff records</span>,
              and provides <span className="text-purple-600 font-semibold">personalized, real-time guidance</span> for government exam counselling.
            </p>
          </div>

          {/* Main Feature Showcase */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Left: Visual/Interactive Demo */}
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 shadow-2xl border-2 border-purple-100">
                {/* Chat Interface Preview */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  {/* Chat Header */}
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <Brain className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-white font-bold">AI Counsellor Agent</div>
                      <div className="text-purple-100 text-xs flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        Online & Ready to Help
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-6 space-y-4 bg-gray-50 max-h-96 overflow-y-auto">
                    {/* AI Message - Greeting */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-xs">
                        <p className="text-sm text-gray-800">
                          👋 Hi! I'm your AI Counsellor for government exam admissions. I've analyzed your rank of <strong>2,450</strong>, category <strong>2AG</strong>, and reservations.
                        </p>
                      </div>
                    </div>

                    {/* AI Message - Key Insight */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Lightbulb className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-md">
                        <p className="text-sm text-gray-800 mb-2">
                          💡 <strong>Remember:</strong> Preparing for government exams and getting a top rank is just <strong>50% of the task</strong>. Getting the best possible college according to your rank is the next <strong>50%</strong> - and that's what BharatMinds AI will do for you!
                        </p>
                      </div>
                    </div>

                    {/* AI Message - Personalized Path */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-md">
                        <p className="text-sm text-gray-800 mb-2">
                          Based on my analysis of your rank, category, reservations, and preferences, here's your <strong>structured personalized counselling path</strong>:
                        </p>
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 text-xs space-y-2 border border-purple-200">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                            <span className="text-gray-700">Profile Analysis Complete</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                            <span className="text-gray-700">10,000+ Cutoffs Analyzed</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">→</div>
                            <span className="text-gray-700 font-semibold">Ready for Option Entry List</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* User Message */}
                    <div className="flex gap-3 justify-end">
                      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl rounded-tr-none px-4 py-3 shadow-sm max-w-xs">
                        <p className="text-sm text-white">
                          Please prepare option entry list based on my rank, category, reservation, and preferences
                        </p>
                      </div>
                    </div>

                    {/* AI Response with Option Entry List */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-md">
                        <p className="text-sm text-gray-800 mb-2">
                          ✅ Here is the <strong>Best Possible Option Entry List</strong> prepared for you!
                        </p>
                        <p className="text-xs text-gray-600 mb-2">
                          This list is well-researched and prepared personally for you, keeping all your data in mind.
                        </p>
                        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-2 text-xs">
                          <div className="font-bold text-green-800 mb-1">📋 Your Personalized List:</div>
                          <div className="space-y-1">
                            <div className="bg-white rounded px-2 py-1 border border-green-200">
                              <strong>1.</strong> RVCE - CS (92% match)
                            </div>
                            <div className="bg-white rounded px-2 py-1 border border-green-200">
                              <strong>2.</strong> BMSCE - CS (89% match)
                            </div>
                            <div className="text-center text-gray-500 py-1">+ 38 more options...</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Typing Indicator */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-none px-4 py-2 shadow-sm">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 bg-white border-t">
                    <div className="flex gap-2 items-center bg-gray-100 rounded-full px-4 py-2">
                      <MessageSquare className="w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Ask me anything about admissions..."
                        className="flex-1 bg-transparent text-sm outline-none text-gray-600"
                        disabled
                      />
                      <Zap className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl px-4 py-3 border-2 border-purple-200">
                  <div className="text-xs text-gray-500 mb-1">Processing Speed</div>
                  <div className="text-2xl font-bold text-purple-600 flex items-center gap-1">
                    <Zap className="w-5 h-5" />
                    0.3s
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl px-4 py-3 border-2 border-blue-200">
                  <div className="text-xs text-gray-500 mb-1">Cutoff Records</div>
                  <div className="text-2xl font-bold text-blue-600 flex items-center gap-1">
                    <Database className="w-5 h-5" />
                    10,000+
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Capabilities List */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                What Makes Our AI Agent <span className="text-gradient-purple">Exceptional?</span>
              </h3>

              {/* Capability Cards */}
              <div className="space-y-4">
                {[
                  {
                    icon: MessageSquare,
                    title: "Natural Conversational AI",
                    description: "Chat naturally like you would with a human counsellor. Ask questions, get clarifications, and receive instant, contextual responses.",
                    gradient: "from-blue-500 to-cyan-500"
                  },
                  {
                    icon: Brain,
                    title: "Intelligent Context Understanding",
                    description: "Remembers your entire conversation, understands your preferences, and provides increasingly personalized recommendations as you interact.",
                    gradient: "from-purple-500 to-pink-500"
                  },
                  {
                    icon: BarChart3,
                    title: "Real-time Probability Analysis",
                    description: "Instantly calculates admission probabilities using live data, historical trends, and advanced ML algorithms for each college-course combination.",
                    gradient: "from-orange-500 to-red-500"
                  },
                  {
                    icon: Lightbulb,
                    title: "Smart Recommendations Engine",
                    description: "Proactively suggests optimal college choices based on your rank, category, location preferences, and career goals without you having to ask.",
                    gradient: "from-green-500 to-emerald-500"
                  },
                  {
                    icon: Clock,
                    title: "24/7 Instant Availability",
                    description: "No waiting for appointments or business hours. Get expert-level guidance anytime, anywhere, with sub-second response times.",
                    gradient: "from-indigo-500 to-purple-500"
                  },
                  {
                    icon: Shield,
                    title: "Data-Driven Accuracy",
                    description: "Every recommendation is backed by analysis of 10,000+ historical cutoff records from government exams, ensuring 99% prediction accuracy and reliable guidance.",
                    gradient: "from-pink-500 to-rose-500"
                  }
                ].map((capability, index) => (
                  <div key={index} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl blur-xl"
                      style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}></div>
                    <div className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-purple-200">
                      <div className="flex gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${capability.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                          <capability.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-900 mb-2">{capability.title}</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">{capability.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-10 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    Ready to Experience AI-Powered Counselling?
                  </h3>
                  <p className="text-lg text-purple-100">
                    Start chatting with your personal AI agent now for government exam counselling and discover your perfect college matches.
                  </p>
                </div>
                <button
                  onClick={handleRegistrationClick}
                  className="bg-white text-purple-600 px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl whitespace-nowrap flex items-center gap-3 cursor-pointer"
                >
                  <Brain className="w-6 h-6" />
                  Chat with AI Agent
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: The 50-50 Truth & AI Superiority - INTERACTIVE VERSION */}
      <section className="section-gradient-purple py-20 px-6 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-96 h-96 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm text-yellow-300 px-6 py-2 rounded-full font-semibold text-sm mb-6 shadow-md border border-white border-opacity-30 animate-bounce">
              <AlertTriangle className="w-4 h-4" />
              THE HARD TRUTH
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-6 text-white leading-tight">
              Getting a Top Rank is Only <span className="text-yellow-300">50% of Success</span>
            </h2>
            <p className="text-xl md:text-2xl text-purple-100 text-center max-w-4xl mx-auto leading-relaxed">
              The other <span className="text-yellow-300 font-bold">50%</span> is navigating the chaotic counselling process without making costly mistakes.
            </p>
          </div>

          {/* INTERACTIVE 50-50 VISUALIZATION */}
          <div className="mb-16">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                🎯 The Complete Success Formula
              </h3>

              {/* Interactive Progress Bars */}
              <div className="space-y-8 mb-8">
                <div className="group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-gray-900">📚 Exam Preparation & Getting Top Rank</span>
                    <span className="text-2xl font-bold text-blue-600">50%</span>
                  </div>
                  <div className="h-12 bg-gray-200 rounded-full overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-4"
                      style={{ width: '50%' }}
                    >
                      <span className="text-white font-bold text-sm">Your Hard Work ✨</span>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-gray-900">🎓 Smart Counselling & College Selection</span>
                    <span className="text-2xl font-bold text-purple-600">50%</span>
                  </div>
                  <div className="h-12 bg-gray-200 rounded-full overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-4"
                      style={{ width: '50%', animationDelay: '0.3s' }}
                    >
                      <span className="text-white font-bold text-sm">BharatMinds AI 🤖</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-300">
                <p className="text-center text-lg text-gray-800">
                  <span className="font-bold text-purple-700">💡 Key Insight:</span> Most students focus 100% on exams but neglect the counselling process.
                  <span className="font-bold text-red-600"> Don't let poor counselling waste your hard-earned rank!</span>
                </p>
              </div>
            </div>
          </div>

          {/* INTERACTIVE PROBLEM CARDS */}
          <div className="mb-16">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
                The <span className="text-red-600">Chaotic Reality</span> of Government Exam Counselling
              </h3>
              <p className="text-center text-gray-600 mb-8">Click on any card to learn more</p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    icon: "⏰",
                    title: "Time Pressure",
                    description: "Limited hours to make life-changing decisions with 10,000+ cutoff combinations to analyze",
                    expandedInfo: "Students typically have only 2-3 days to analyze thousands of options, compare cutoffs, and make decisions that will impact their entire career."
                  },
                  {
                    icon: "🔄",
                    title: "Multiple Rounds",
                    description: "Navigate through multiple counselling rounds with changing cutoffs and seat availability",
                    expandedInfo: "Each round has different cutoffs, and seats fill up quickly. Missing the optimal round can mean losing your dream college forever."
                  },
                  {
                    icon: "📋",
                    title: "Complex Categories",
                    description: "25+ category combinations, reservations, and eligibility criteria to track simultaneously",
                    expandedInfo: "With GM, 2AG, 2BG, 3AG, 3BG, SC, ST, and various reservation categories, tracking all possibilities manually is nearly impossible."
                  },
                  {
                    icon: "⚠️",
                    title: "High Stakes",
                    description: "One small mistake in option entry can cost you your dream college and career path",
                    expandedInfo: "A single error in category selection, option order, or missing a better choice can result in settling for a college far below your potential."
                  }
                ].map((challenge, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border-2 cursor-pointer transition-all duration-300 ${activeProblemCard === index
                        ? 'border-red-500 shadow-2xl scale-105'
                        : 'border-red-200 hover:border-red-400 hover:shadow-lg'
                      }`}
                    onClick={() => setActiveProblemCard(activeProblemCard === index ? null : index)}
                  >
                    <div className="text-4xl mb-3">{challenge.icon}</div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{challenge.title}</h4>
                    <p className="text-gray-700 mb-2">{challenge.description}</p>

                    {activeProblemCard === index && (
                      <div className="mt-4 pt-4 border-t-2 border-red-300 animate-fadeIn">
                        <p className="text-sm text-gray-800 bg-white rounded-lg p-3 border-l-4 border-red-500">
                          <span className="font-bold text-red-600">Real Impact:</span> {challenge.expandedInfo}
                        </p>
                      </div>
                    )}

                    <div className="mt-3 text-sm text-red-600 font-semibold">
                      {activeProblemCard === index ? '▼ Click to collapse' : '▶ Click to learn more'}
                    </div>
                  </div>
                ))}
              </div>

              {/* Human Error Alert */}
              <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-8 text-white">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-12 h-12 flex-shrink-0 animate-pulse" />
                  <div>
                    <h4 className="text-2xl font-bold mb-3">Even Small Human Mistakes Can Be Devastating</h4>
                    <ul className="space-y-2 text-lg">
                      <li className="flex items-start gap-2 hover:translate-x-2 transition-transform">
                        <span className="text-yellow-300 font-bold">•</span>
                        <span>Missing a better college option due to incomplete data analysis</span>
                      </li>
                      <li className="flex items-start gap-2 hover:translate-x-2 transition-transform">
                        <span className="text-yellow-300 font-bold">•</span>
                        <span>Wrong category selection leading to disqualification</span>
                      </li>
                      <li className="flex items-start gap-2 hover:translate-x-2 transition-transform">
                        <span className="text-yellow-300 font-bold">•</span>
                        <span>Incorrect option entry order reducing admission chances</span>
                      </li>
                      <li className="flex items-start gap-2 hover:translate-x-2 transition-transform">
                        <span className="text-yellow-300 font-bold">•</span>
                        <span>Overlooking reservation benefits and special category advantages</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* The Solution: BharatMinds AI */}
          <div className="mb-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm text-yellow-300 px-6 py-2 rounded-full font-semibold text-sm mb-6 shadow-md border border-white border-opacity-30">
                <Zap className="w-4 h-4 animate-pulse" />
                THE SOLUTION
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                This is Where <span className="text-yellow-300">BharatMinds AI</span> Comes In
              </h3>
              <p className="text-xl text-purple-100 max-w-3xl mx-auto">
                Cutting-edge AI solution offering complete <span className="text-yellow-300 font-semibold">end-to-end handholding support</span> through our BharatMinds AI Counsellor
              </p>
            </div>

            {/* AI Superiority Cards with Hover Effects */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Database,
                  title: "Trained on 10,000+ Cutoffs",
                  description: "Our AI has analyzed every possible cutoff combination across all government exams, categories, and colleges",
                  gradient: "from-blue-500 to-cyan-500",
                  stat: "10,000+"
                },
                {
                  icon: Users,
                  title: "1,000+ Student Experiences",
                  description: "Learned from complete counselling processes of thousands of successful students across multiple years",
                  gradient: "from-purple-500 to-pink-500",
                  stat: "1,000+"
                },
                {
                  icon: Brain,
                  title: "Every Scenario Mastered",
                  description: "Handles edge cases, special situations, and complex scenarios that even experienced counsellors might miss",
                  gradient: "from-orange-500 to-red-500",
                  stat: "100%"
                }
              ].map((feature, index) => (
                <div key={index} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br opacity-20 group-hover:opacity-30 transition-opacity rounded-3xl blur-xl"
                    style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}></div>
                  <div className="relative bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all border-2 border-white border-opacity-50 hover:scale-105 transform duration-300">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-12 transition-transform`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className={`text-5xl font-bold bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent mb-4`}>
                      {feature.stat}
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* INTERACTIVE COMPARISON SLIDER */}
          <div className="bg-white rounded-3xl p-10 shadow-2xl border-4 border-yellow-400 mb-12">
            <div className="text-center mb-8">
              <div className="text-6xl mb-6">🏆</div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our AI Counsellor Knows More About Counselling Than Any Human Being Can
              </h3>
              <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
                With perfect memory, zero fatigue, and instant access to 10,000+ data points, our AI provides guidance that's simply impossible for humans to match.
              </p>
              <p className="text-sm text-purple-600 font-semibold">👇 Drag the slider to compare</p>
            </div>

            {/* Interactive Comparison Slider */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="relative h-96 rounded-2xl overflow-hidden border-4 border-gray-200">
                {/* Traditional Counselling Side */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 p-8 flex flex-col justify-center">
                  <h4 className="text-2xl font-bold text-red-700 mb-6 flex items-center gap-2">
                    ❌ Traditional Human Counselling
                  </h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 text-xl">✗</span>
                      <span>Limited by memory and experience</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 text-xl">✗</span>
                      <span>Can only handle few students at a time</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 text-xl">✗</span>
                      <span>Prone to fatigue and oversight</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 text-xl">✗</span>
                      <span>May miss optimal combinations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 text-xl">✗</span>
                      <span>Availability constraints</span>
                    </li>
                  </ul>
                </div>

                {/* AI Counselling Side */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 p-8 flex flex-col justify-center transition-all duration-300"
                  style={{ clipPath: `inset(0 ${100 - comparisonSlider}% 0 0)` }}
                >
                  <h4 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-2">
                    ✅ BharatMinds AI Counsellor
                  </h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span>Perfect recall of 10,000+ cutoffs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span>Unlimited simultaneous support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span>Never tired, always accurate</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span>Finds THE best option every time</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span>24/7 instant availability</span>
                    </li>
                  </ul>
                </div>

                {/* Slider Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
                  style={{ left: `${comparisonSlider}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-purple-500">
                    <div className="text-purple-600 font-bold text-xs">⟷</div>
                  </div>
                </div>

                {/* Invisible overlay for dragging */}
                <div
                  className="absolute inset-0 cursor-ew-resize z-20"
                  onMouseMove={(e) => {
                    if (e.buttons === 1) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const percentage = (x / rect.width) * 100;
                      setComparisonSlider(Math.max(0, Math.min(100, percentage)));
                    }
                  }}
                  onTouchMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.touches[0].clientX - rect.left;
                    const percentage = (x / rect.width) * 100;
                    setComparisonSlider(Math.max(0, Math.min(100, percentage)));
                  }}
                ></div>
              </div>
            </div>

            <button
              onClick={handleRegistrationClick}
              className="mt-4 btn-gradient-yellow-orange text-white px-12 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-2xl inline-flex items-center gap-3 cursor-pointer"
            >
              <Shield className="w-6 h-6" />
              Get AI-Powered Protection Now
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>
      </section>

      {/* Section 3: Value Proposition */}
      <section className="section-light py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
            Why You Need <span className="text-gradient-purple">AI-Powered Intelligence</span> in 2025
          </h2>

          <div className="space-y-6">
            {[
              "Multiple counselling authorities (KEA, NEET) with different processes",
              "10,000+ cutoff records to analyze for government exam admissions",
              "25+ category combinations to consider for maximum opportunities",
              "Limited time for choice filling with high-stakes decisions",
              "Risk of losing your seat without proper guidance and strategy",
            ].map((point, index) => (
              <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm">
                <div className="checkmark-yellow flex-shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-lg text-gray-700 font-medium">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Pain Points */}
      <section className="section-white py-20 px-6 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 px-6 py-2 rounded-full font-semibold text-sm mb-6 shadow-md">
              <AlertTriangle className="w-4 h-4" />
              COMMON STRUGGLES
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-6 text-gray-900 leading-tight">
              Common Challenges for<br />
              <span className="text-gradient-purple">Students & Parents</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 text-center max-w-3xl mx-auto font-medium">
              You're not alone in facing these struggles.<br />
              <span className="text-purple-600">Thousands face the same challenges every year.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* For Students */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    For Students
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Confused about which colleges to choose?",
                    "Worried about cutoff trends and probabilities?",
                    "Stressed about missing important deadlines?",
                    "Unsure how to maximize your rank potential?",
                    "Overwhelmed by too many options and data?",
                  ].map((challenge, index) => (
                    <li key={index} className="flex items-start gap-4 group/item">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md group-hover/item:scale-110 transition-transform">
                        <AlertTriangle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 text-lg font-medium leading-relaxed">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* For Parents */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    For Parents
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Concerned about making the right investment?",
                    "Unsure how to guide your child effectively?",
                    "Anxious about seat allocation outcomes?",
                    "Worried about college quality and placements?",
                    "Need reliable data to make informed decisions?",
                  ].map((challenge, index) => (
                    <li key={index} className="flex items-start gap-4 group/item">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md group-hover/item:scale-110 transition-transform">
                        <AlertTriangle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 text-lg font-medium leading-relaxed">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Enhanced CTA Box */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-gradient-to-r from-orange-50 via-red-50 to-orange-50 border-4 border-orange-400 rounded-3xl p-10 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <AlertTriangle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-orange-800 mb-1">
                      Let AI Guide Your Journey
                    </p>
                    <p className="text-lg text-orange-700">
                      Get intelligent, data-driven guidance powered by ML
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRegistrationClick}
                  className="btn-gradient-yellow-orange text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl whitespace-nowrap cursor-pointer"
                >
                  Try AI Counsellor Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Services Overview */}
      <section id="services" className="section-light py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="badge-pill bg-purple-100 text-purple-700 mb-4 inline-flex">
              <Sparkles className="w-4 h-4" />
              AI-POWERED SOLUTIONS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Intelligent AI Solutions for College Admissions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced machine learning technology powering your admission journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Brain,
                title: "Machine Learning College Matching",
                gradient: "from-blue-500 to-cyan-500",
                features: [
                  "Neural network analysis of 10,000+ cutoff records",
                  "AI-driven category optimization (25+ combinations)",
                  "Predictive probability scoring with 99% accuracy",
                  "Real-time ML-powered trend forecasting",
                ],
              },
              {
                icon: Target,
                title: "AI + Expert Hybrid Intelligence",
                gradient: "from-purple-500 to-pink-500",
                features: [
                  "AI-augmented expert guidance system",
                  "Intelligent choice filling with ML optimization",
                  "Automated round-by-round tracking & alerts",
                  "24/7 AI chatbot + human expert support",
                ],
              },
              {
                icon: FileText,
                title: "AI-Generated Insights & Reports",
                gradient: "from-orange-500 to-red-500",
                features: [
                  "Auto-generated PDF reports with AI insights",
                  "ML-based Safe, Target, Reach predictions",
                  "Interactive data visualization dashboards",
                  "Deep learning probability analytics",
                ],
              },
              {
                icon: Sparkles,
                title: "Intelligent Multi-Course AI Engine",
                gradient: "from-green-500 to-emerald-500",
                features: [
                  "AI models trained for UGCET (Engineering)",
                  "Specialized ML for UGNEET (Medical)",
                  "Smart Farm Science recommendations",
                  "Unified AI-powered rank optimization",
                ],
              },
            ].map((service, index) => (
              <div key={index} className="card-elevated p-8">
                <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Process Flow */}
      <section id="how-it-works" className="section-white py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="badge-pill bg-purple-100 text-purple-700 mb-4 inline-flex">
              <TrendingUp className="w-4 h-4" />
              HOW IT WORKS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              How Our AI Intelligence Engine Works
            </h2>
            <p className="text-xl text-gray-600">
              5-step AI-powered journey from data input to smart predictions
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              {
                step: "01",
                title: "Data Collection",
                description: "AI captures your rank, category, and preferences",
                icon: "👤",
              },
              {
                step: "02",
                title: "ML Processing",
                description: "Neural networks analyze 10,000+ historical patterns",
                icon: "🤖",
              },
              {
                step: "03",
                title: "AI Prediction",
                description: "Machine learning generates personalized matches",
                icon: "🎯",
              },
              {
                step: "04",
                title: "Real-time Tracking",
                description: "AI monitors and updates admission probabilities",
                icon: "📊",
              },
              {
                step: "05",
                title: "Smart Confirmation",
                description: "AI-optimized seat allocation strategy",
                icon: "🎓",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="section-gradient-purple rounded-2xl p-6 text-center h-full flex flex-col">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <div className="text-sm font-bold text-yellow-300 mb-2">STEP {step.step}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-purple-100 flex-grow">{step.description}</p>
                </div>
                {index < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-purple-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Success Stories (Testimonials) */}
      <section className="section-light py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="badge-pill bg-purple-100 text-purple-700 mb-4 inline-flex">
              <Star className="w-4 h-4" />
              SUCCESS STORIES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Success Stories from UGCET & UGNEET Students
            </h2>
            <p className="text-xl text-gray-600">
              Real results from students who trusted BharatMinds
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                course: "UGCET - Engineering",
                achievement: "Admitted to RVCE",
                rank: "Rank 1234",
                quote: "The AI predictions were incredibly accurate! The machine learning algorithm analyzed my profile and gave me perfect college matches. Highly recommend!",
                rating: 5,
              },
              {
                name: "Rahul Kumar",
                course: "UGNEET - Medical",
                achievement: "Admitted to BMCRI",
                rank: "Rank 567",
                quote: "The AI-powered insights during choice filling were game-changing. The intelligent recommendations helped me secure my dream medical college!",
                rating: 5,
              },
              {
                name: "Ananya Reddy",
                course: "UGCET - Engineering",
                achievement: "Admitted to PESIT",
                rank: "Rank 2890",
                quote: "BharatMinds' AI technology simplified everything. The predictive analytics and real-time probability scores gave me confidence in my choices!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="card-elevated p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                <div className="border-t pt-4">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-purple-600 font-semibold">{testimonial.achievement} - {testimonial.rank}</p>
                  <p className="text-sm text-gray-600">{testimonial.course}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Company Stats */}
      <section className="section-gradient-purple py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
            Our AI Technology in Numbers
          </h2>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "1000+", label: "Students Counselled", icon: "👥" },
              { value: "99%", label: "AI Prediction Accuracy", icon: "🎯" },
              { value: "10,000+", label: "Cutoff Records Analyzed", icon: "📊" },
              { value: "25+", label: "ML Models Running", icon: "🤖" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-6xl font-bold text-yellow-300 mb-2">{stat.value}</div>
                <div className="text-purple-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Pricing Plans */}
      <section id="pricing" className="section-white py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <div className="badge-pill bg-purple-100 text-purple-700 mb-4 inline-flex">
              <Sparkles className="w-4 h-4" />
              TRANSPARENT PRICING
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start free, upgrade when you need more
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="card-elevated p-8">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Free Plan</h3>
              <div className="text-4xl font-bold text-purple-700 mb-6">₹0</div>
              <ul className="space-y-4 mb-8">
                {[
                  "Basic college matching",
                  "View top 10 recommendations",
                  "Category calculation",
                  "Limited cutoff data access",
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleRegistrationClick}
                className="block w-full text-center bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-full text-gray-900 font-bold transition-all cursor-pointer"
              >
                Get Started Free
              </button>
            </div>

            {/* Premium Plan */}
            <div className="card-elevated p-8 border-4 border-purple-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="badge-pill btn-gradient-yellow-orange text-white">
                  <Star className="w-4 h-4" />
                  MOST POPULAR
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Premium Plan</h3>
              <div className="text-4xl font-bold text-purple-700 mb-6">Coming Soon</div>
              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited college recommendations",
                  "Full cutoff database access",
                  "Instant PDF reports",
                  "Expert counselling support",
                  "Round-by-round updates",
                  "Priority customer support",
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                disabled
                className="block w-full text-center btn-gradient-purple px-6 py-3 rounded-full text-white font-bold opacity-50 cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: FAQ */}
      <section className="section-light py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <div className="badge-pill bg-purple-100 text-purple-700 mb-4 inline-flex">
              <CheckCircle className="w-4 h-4" />
              FAQ
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our AI counselling
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {[
              {
                question: "What is UGCET and UGNEET counselling?",
                answer: "UGCET is the undergraduate engineering entrance exam counselling, while UGNEET is for medical admissions in Karnataka. Both are conducted by KEA (Karnataka Examinations Authority) for seat allocation in government and private colleges.",
              },
              {
                question: "How does the AI matching algorithm work?",
                answer: "Our proprietary machine learning model uses neural networks to analyze 10,000+ historical cutoff records from government exams. The AI processes your rank, category, and preferences through multiple layers of deep learning to calculate precise probability scores. It evaluates 25+ category combinations using predictive analytics to maximize your admission chances with 99% accuracy.",
              },
              {
                question: "What data do you use for cutoff analysis?",
                answer: "We use official cutoff data from government exam authorities (KEA, NEET, etc.), covering 10,000+ historical cutoff records across engineering, medical, and other professional colleges. Our database is updated regularly with the latest admission trends.",
              },
              {
                question: "Can I use this for both UGCET and UGNEET?",
                answer: "Yes! Our platform supports both UGCET (Engineering) and UGNEET (Medical) counselling. You can register for multiple courses and get separate recommendations for each.",
              },
              {
                question: "How accurate is the AI prediction model?",
                answer: "Our machine learning model achieves 99% prediction accuracy, validated through rigorous testing on historical admission data. The AI continuously learns and improves from new data patterns. However, actual admissions depend on dynamic factors including seat availability, competition levels, and annual cutoff variations, which our AI accounts for in its probabilistic predictions.",
              },
              {
                question: "Is my data secure?",
                answer: "Absolutely! We use industry-standard encryption and secure cloud storage (Appwrite) to protect your personal information. Your data is never shared with third parties.",
              },
            ].map((faq, index) => (
              <div key={index} className="accordion-item">
                <div
                  className="accordion-header"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-lg font-semibold">{faq.question}</span>
                  <ChevronDown
                    className={`w-6 h-6 accordion-icon ${activeAccordion === index ? "active" : ""}`}
                  />
                </div>
                <div className={`accordion-content ${activeAccordion === index ? "active" : ""}`}>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 11: Footer */}
      <footer className="section-purple py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/images/logo.png"
                  alt="BharatMinds Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="text-white font-bold text-lg">BharatMinds</span>
              </div>
              <p className="text-purple-200 text-sm">
                Advanced AI & Machine Learning Platform for Intelligent College Admissions
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-yellow-300 transition-colors">Services</a></li>
                <li><a href="#how-it-works" className="hover:text-yellow-300 transition-colors">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-yellow-300 transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li><a href="#" className="hover:text-yellow-300 transition-colors">UGCET Counselling</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">UGNEET Counselling</a></li>
                <li><Link href="/registration" className="hover:text-yellow-300 transition-colors">Registration</Link></li>
                <li><Link href="/auth" className="hover:text-yellow-300 transition-colors">Login</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-purple-400 border-opacity-30 pt-8 text-center">
            <p className="text-purple-200 text-sm">
              © 2024 BharatMinds AI Counsellor. All rights reserved. | KCET 2024 Round 1 Data
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
