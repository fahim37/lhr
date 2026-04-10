"use client"

import { useState } from "react"
import { Check } from "lucide-react"

export default function SecurityServices() {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential")

  return (
    <div className="text-white mt-10 container">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-12">
        <div className="rounded-full border-2 border-primary p-1 inline-flex">
          <button
            className={`px-6 py-2 rounded-full text-sm md:text-base font-medium transition-colors ${activeTab === "residential" ? "bg-primary text-[#0a1155]" : "text-primary"
              }`}
            onClick={() => setActiveTab("residential")}
          >
            Residential Security
          </button>
          <button
            className={`px-6 py-2 rounded-full text-sm md:text-base font-medium transition-colors ${activeTab === "commercial" ? "bg-primary text-[#0a1155]" : "text-primary"
              }`}
            onClick={() => setActiveTab("commercial")}
          >
            Commercial Security
          </button>
        </div>
      </div>

      {/* Residential Service Cards */}
      {activeTab === "residential" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mobile Patrols */}
          <div className="bg-[#FFFFFF1A] rounded-lg p-6 flex flex-col h-full">
            <div className="text-primary mb-4">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 15 H40 V45 H20 Z" stroke="#f0d878" strokeWidth="2" fill="none" />
                <path d="M25 10 V15 M35 10 V15" stroke="#f0d878" strokeWidth="2" />
                <path d="M15 25 H25 M15 35 H25" stroke="#f0d878" strokeWidth="2" />
                <circle cx="30" cy="25" r="5" stroke="#f0d878" strokeWidth="2" fill="none" />
                <path d="M25 35 H35" stroke="#f0d878" strokeWidth="2" />
                <path d="M30 30 V40" stroke="#f0d878" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Mobile Patrols</h3>
            <p className="text-primary mb-4">Regularly scheduled patrols to deter criminal activity</p>

            <div className="space-y-2 mt-auto">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Visible security presence</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Incident reporting</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Property inspection</span>
              </div>
            </div>
          </div>

          {/* Vacation Watch */}
          <div className="bg-[#FFFFFF1A] rounded-lg p-6 flex flex-col h-full">
            <div className="text-primary mb-4">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="10" width="20" height="40" rx="5" stroke="#f0d878" strokeWidth="2" fill="none" />
                <rect x="25" y="15" width="10" height="20" rx="2" stroke="#f0d878" strokeWidth="2" fill="none" />
                <circle cx="30" cy="40" r="3" stroke="#f0d878" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Vacation Watch</h3>
            <p className="text-primary mb-4">Monitoring properties while homeowners are away</p>

            <div className="space-y-2 mt-auto">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Regular property checks</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Status reports</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Mail/package collection</span>
              </div>
            </div>
          </div>

          {/* Customized Security Plans */}
          <div className="bg-[#FFFFFF1A] rounded-lg p-6 flex flex-col h-full">
            <div className="text-primary mb-4">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="15" y="20" width="20" height="30" rx="2" stroke="#f0d878" strokeWidth="2" fill="none" />
                <circle cx="25" cy="35" r="5" stroke="#f0d878" strokeWidth="2" fill="none" />
                <path d="M35 30 H45 V40 H35 Z" stroke="#f0d878" strokeWidth="2" fill="none" />
                <path d="M40 25 V30" stroke="#f0d878" strokeWidth="2" />
                <path d="M40 40 V45" stroke="#f0d878" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Customized Security Plans</h3>
            <p className="text-primary mb-4">Tailored strategies for your needs</p>

            <div className="space-y-2 mt-auto">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Community-specific</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Risk assessment</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Flexible service options</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Commercial Services */}
      {activeTab === "commercial" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:px-32">
          {/* Access Control */}
          {/* <div className="bg-[#FFFFFF1A] rounded-lg p-6 flex flex-col h-full">
            <div className="text-primary mb-4">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="15" y="20" width="30" height="25" rx="2" stroke="#f0d878" strokeWidth="2" fill="none" />
                <circle cx="30" cy="32.5" r="5" stroke="#f0d878" strokeWidth="2" fill="none" />
                <path d="M30 15 V20" stroke="#f0d878" strokeWidth="2" />
                <path d="M25 32.5 H35" stroke="#f0d878" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Access Control</h3>
            <p className="text-primary mb-4">Secure entry management systems</p>

            <div className="space-y-2 mt-auto">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Keycard systems</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Visitor management</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Access logs</span>
              </div>
            </div>
          </div> */}

          {/* Security Guards */}
          <div className="bg-[#FFFFFF1A] rounded-lg p-6 flex flex-col h-full">
            <div className="text-primary mb-4">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="20" r="10" stroke="#f0d878" strokeWidth="2" fill="none" />
                <path
                  d="M15 50 V45 C15 40 20 35 30 35 C40 35 45 40 45 45 V50"
                  stroke="#f0d878"
                  strokeWidth="2"
                  fill="none"
                />
                <path d="M30 20 m-3,-3 l6,6 m-6,0 l6,-6" stroke="#f0d878" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Security Guards</h3>
            <p className="text-primary mb-4">Professional on-site security personnel</p>

            <div className="space-y-2 mt-auto">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Trained professionals</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>24/7 coverage</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Incident management</span>
              </div>
            </div>
          </div>

          {/* CCTV Monitoring */}
          {/* <div className="bg-[#FFFFFF1A] rounded-lg p-6 flex flex-col h-full">
            <div className="text-primary mb-4">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 20 H25 V40 H15 Z" stroke="#f0d878" strokeWidth="2" fill="none" />
                <path d="M25 25 L40 20 V40 L25 35 Z" stroke="#f0d878" strokeWidth="2" fill="none" />
                <path d="M40 25 Q45 20 50 25" stroke="#f0d878" strokeWidth="2" fill="none" />
                <path d="M40 35 Q45 40 50 35" stroke="#f0d878" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">CCTV Monitoring</h3>
            <p className="text-primary mb-4">Advanced video surveillance systems</p>

            <div className="space-y-2 mt-auto">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>24/7 monitoring</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>HD video quality</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Remote viewing</span>
              </div>
            </div>
          </div> */}

          {/* Risk Assessment */}
          <div className="bg-[#FFFFFF1A] rounded-lg p-6 flex flex-col h-full">
            <div className="text-primary mb-4">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 15 H40 V45 H20 Z" stroke="#f0d878" strokeWidth="2" fill="none" />
                <path d="M25 25 H35 M25 30 H35 M25 35 H35" stroke="#f0d878" strokeWidth="2" />
                <path d="M30 15 V10 M25 10 H35" stroke="#f0d878" strokeWidth="2" />
                <circle cx="30" cy="20" r="2" stroke="#f0d878" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Risk Assessment</h3>
            <p className="text-primary mb-4">Comprehensive security evaluations</p>

            <div className="space-y-2 mt-auto">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Vulnerability analysis</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Threat identification</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>Custom security plans</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
