"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Sparkles, Brain, Target, FileText, TrendingUp, Users, Award, ArrowRight,
  CheckCircle, Zap, Menu, X, ChevronDown, Star, Check, AlertTriangle
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

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
                <span className="text-white font-bold text-xl">BharatMinds</span>
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
                <span className="text-gradient-yellow">College Admission Process</span>
                <br />
                <span className="text-white">Powered by AI & Experts</span>
              </h1>

              {/* Description */}
              <p className="text-lg text-purple-100 leading-relaxed">
                Get personalized admission counselling and AI-powered choice filling reports to maximize your admission chances with{" "}
                <span className="text-yellow-300 font-semibold">'0% admission stress'</span> and tailored to your career goals & preferences.
              </p>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleRegistrationClick}
                  className="inline-flex items-center justify-center gap-3 btn-gradient-yellow-orange text-white px-10 py-5 rounded-full font-bold hover:scale-105 transition-transform shadow-2xl btn-glow cursor-pointer"
                >
                  <span className="text-2xl">🤖</span>
                  <div className="text-left">
                    <div className="text-base font-bold">Try our Karnataka Based AI Counsellor</div>
                    <div className="text-xs opacity-90">Get Personalized Guidance Now</div>
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
                        <Award className="w-3 h-3" />
                        95%+ Success Rate
                      </div>
                    </div>

                    {/* Title */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Worried about the admission process?
                      </h3>
                      <p className="text-sm text-gray-600">
                        Expert guidance for the right college & course.
                      </p>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={handleRegistrationClick}
                      className="btn-gradient-yellow-orange text-white px-6 py-3 rounded-full font-bold text-sm text-center hover:scale-105 transition-transform cursor-pointer"
                    >
                      Start Counselling →
                    </button>

                    {/* Mini Stats */}
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t">
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Students</div>
                        <div className="text-lg font-bold text-purple-700">35k+</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Experience</div>
                        <div className="text-lg font-bold text-purple-700">5yr</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar at Bottom */}
          <div className="mt-16 grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-yellow-300 mb-2">35k+</div>
              <div className="text-purple-100 text-sm">Students Guided</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-300 mb-2 flex items-center justify-center gap-2">
                4.8<Star className="w-8 h-8 fill-yellow-300 text-yellow-300" />
              </div>
              <div className="text-purple-100 text-sm">Google Reviews</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-300 mb-2">100%</div>
              <div className="text-purple-100 text-sm">End to End Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Value Proposition */}
      <section className="section-light py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
            Why UGCET & UGNEET Counselling is <span className="text-gradient-purple">Critical in 2025</span>
          </h2>

          <div className="space-y-6">
            {[
              "Multiple counselling authorities (KEA, NEET) with different processes",
              "1,600+ cutoff records to analyze across 127 engineering colleges and medical colleges",
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
                      Don't Navigate This Alone
                    </p>
                    <p className="text-lg text-orange-700">
                      Get expert AI-powered guidance today
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRegistrationClick}
                  className="btn-gradient-yellow-orange text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl whitespace-nowrap cursor-pointer"
                >
                  Get Expert Help Now →
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
              OUR SERVICES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Top UGCET & UGNEET Counselling Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive AI-powered solutions for your admission journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered College Matching",
                gradient: "from-blue-500 to-cyan-500",
                features: [
                  "Analysis of 1,600+ KCET cutoff records",
                  "Smart category calculation (25+ combinations)",
                  "Probability scoring for each college",
                  "Real-time cutoff trend analysis",
                ],
              },
              {
                icon: Target,
                title: "Expert Counselling Support",
                gradient: "from-purple-500 to-pink-500",
                features: [
                  "One-on-one guidance from experts",
                  "Choice filling assistance and strategy",
                  "Round-by-round admission updates",
                  "24/7 support during counselling",
                ],
              },
              {
                icon: FileText,
                title: "Comprehensive Reports",
                gradient: "from-orange-500 to-red-500",
                features: [
                  "Instant PDF downloads of option lists",
                  "Safe, Target, and Reach college analysis",
                  "Cutoff trend visualization charts",
                  "Detailed probability breakdowns",
                ],
              },
              {
                icon: Sparkles,
                title: "Multi-Course Support",
                gradient: "from-green-500 to-emerald-500",
                features: [
                  "UGCET (Engineering) counselling",
                  "UGNEET (Medical) counselling",
                  "Farm Science course options",
                  "Integrated rank management",
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
              How Our AI Counselling Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple 5-step process from registration to admission
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              {
                step: "01",
                title: "Profile Analysis",
                description: "Share your rank, category, and course preferences",
                icon: "👤",
              },
              {
                step: "02",
                title: "AI Cutoff Mapping",
                description: "We analyze 1,600+ records to find your matches",
                icon: "🤖",
              },
              {
                step: "03",
                title: "Smart Choice Filling",
                description: "Get personalized college recommendations",
                icon: "🎯",
              },
              {
                step: "04",
                title: "Round Support",
                description: "Track your application status in real-time",
                icon: "📊",
              },
              {
                step: "05",
                title: "Seat Confirmation",
                description: "Secure your dream college admission",
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
                quote: "BharatMinds helped me understand my options clearly. The AI recommendations were spot-on!",
                rating: 5,
              },
              {
                name: "Rahul Kumar",
                course: "UGNEET - Medical",
                achievement: "Admitted to BMCRI",
                rank: "Rank 567",
                quote: "The expert guidance during choice filling was invaluable. Highly recommend!",
                rating: 5,
              },
              {
                name: "Ananya Reddy",
                course: "UGCET - Engineering",
                achievement: "Admitted to PESIT",
                rank: "Rank 2890",
                quote: "I was confused about categories, but BharatMinds made it simple. Got my dream college!",
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
            Why Choose BharatMinds AI Counsellor?
          </h2>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "1000+", label: "Students Counselled" },
              { value: "95%", label: "Success Rate" },
              { value: "127", label: "Engineering Colleges" },
              { value: "1,639", label: "Cutoff Records Analyzed" },
            ].map((stat, index) => (
              <div key={index}>
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
                question: "How does AI-powered matching work?",
                answer: "Our AI analyzes 1,600+ historical cutoff records, your rank, category, and preferences to calculate probability scores for each college. It considers 25+ category combinations to maximize your admission chances.",
              },
              {
                question: "What data do you use for cutoff analysis?",
                answer: "We use official KCET 2024 Round 1 cutoff data from KEA, covering 127 engineering colleges and all category combinations. Our database is updated regularly with the latest admission trends.",
              },
              {
                question: "Can I use this for both UGCET and UGNEET?",
                answer: "Yes! Our platform supports both UGCET (Engineering) and UGNEET (Medical) counselling. You can register for multiple courses and get separate recommendations for each.",
              },
              {
                question: "How accurate are the probability scores?",
                answer: "Our AI achieves 99% accuracy based on historical data analysis. However, actual admissions depend on various factors including seat availability, competition, and cutoff variations each year.",
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
                AI-powered college counselling for UGCET and UGNEET students in Karnataka
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
