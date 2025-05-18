import React, { useState } from 'react';
import { FileText, Search, Filter, Info, ArrowRight, Download, Calendar, User, MapPin, ExternalLink } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SearchBar from '../components/ui/SearchBar';

interface Scheme {
  id: number;
  name: string;
  category: string;
  ministry: string;
  description: string;
  eligibility: string[];
  documents: string[];
  lastUpdated: string;
  applicationLink: string;
}

const SchemeDetails: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedScheme, setExpandedScheme] = useState<number | null>(null);
  
  const schemes: Scheme[] = [
    {
      id: 1,
      name: "PM-KISAN",
      category: "agriculture",
      ministry: "Ministry of Agriculture & Farmers Welfare",
      description: "Provides income support to all landholding farmers' families in the country with cultivable land, subject to certain exclusion criteria.",
      eligibility: [
        "Small and Marginal Farmers with landholding up to 2 hectares",
        "All landholding farmers' families subject to exclusions",
        "Must have Aadhaar card or enrollment number"
      ],
      documents: [
        "Aadhaar Card",
        "Land Records",
        "Bank Account Details",
        "Passport Size Photograph"
      ],
      lastUpdated: "April 15, 2025",
      applicationLink: "#"
    },
    {
      id: 2,
      name: "Pradhan Mantri Awas Yojana (PMAY)",
      category: "housing",
      ministry: "Ministry of Housing and Urban Affairs",
      description: "Credit linked subsidy scheme to help the urban poor in purchasing or building homes.",
      eligibility: [
        "Economically Weaker Section (EWS) with annual income up to Rs. 3 lakh",
        "Low Income Group (LIG) with annual income between Rs. 3-6 lakh",
        "Middle Income Group (MIG) with annual income between Rs. 6-18 lakh"
      ],
      documents: [
        "Aadhaar Card",
        "Income Certificate",
        "Bank Account Details",
        "Ownership/Allotment Letter",
        "Residence Proof"
      ],
      lastUpdated: "March 22, 2025",
      applicationLink: "#"
    },
    {
      id: 3,
      name: "Pradhan Mantri Mudra Yojana (PMMY)",
      category: "business",
      ministry: "Ministry of Finance",
      description: "Provides loans up to Rs. 10 lakh to non-corporate, non-farm small/micro enterprises.",
      eligibility: [
        "Small/Micro enterprises",
        "Individuals seeking loan for business purposes",
        "Manufacturing, trading, service sector enterprises"
      ],
      documents: [
        "Identity Proof",
        "Address Proof",
        "Business Proof/License",
        "Two Passport Size Photographs",
        "Quotation of items to be purchased"
      ],
      lastUpdated: "May 7, 2025",
      applicationLink: "#"
    },
    {
      id: 4,
      name: "National Health Mission (NHM)",
      category: "healthcare",
      ministry: "Ministry of Health & Family Welfare",
      description: "Aims to provide accessible, affordable, and quality healthcare to rural populations, especially vulnerable groups.",
      eligibility: [
        "All residents of rural areas",
        "Focus on pregnant women, children, and elderly",
        "Special provisions for tribal areas"
      ],
      documents: [
        "Identity Card",
        "Residence Proof",
        "Medical Records (if applicable)"
      ],
      lastUpdated: "January 12, 2025",
      applicationLink: "#"
    },
  ];

  const categories = [
    { id: 'all', label: 'All Schemes' },
    { id: 'agriculture', label: 'Agriculture' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'education', label: 'Education' },
    { id: 'housing', label: 'Housing' },
    { id: 'business', label: 'Business & Employment' },
    { id: 'social-welfare', label: 'Social Welfare' },
  ];

  const filteredSchemes = activeCategory === 'all' 
    ? schemes 
    : schemes.filter(scheme => scheme.category === activeCategory);

  const toggleSchemeExpansion = (id: number) => {
    setExpandedScheme(expandedScheme === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Government Schemes</h1>
          <p className="text-slate-500 mt-1">Browse and learn about government programs and benefits</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <SearchBar 
            placeholder="Search schemes..." 
            className="w-full sm:w-64"
          />
          <Button 
            variant="outline" 
            size="md"
            icon={<Filter size={18} />}
          >
            Filter
          </Button>
        </div>
      </div>

      <div className="flex overflow-x-auto py-2 -mx-4 px-4 scrollbar-hide">
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-100 text-blue-800 font-medium'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredSchemes.map((scheme) => (
          <Card key={scheme.id} className="overflow-hidden transition-all duration-300">
            <div 
              className="cursor-pointer"
              onClick={() => toggleSchemeExpansion(scheme.id)}
            >
              <div className="flex justify-between items-center p-4">
                <div className="flex items-start">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-700 mr-3">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-800">{scheme.name}</h3>
                    <p className="text-sm text-slate-500">{scheme.ministry}</p>
                  </div>
                </div>
                <div>
                  <button className="text-slate-400 hover:text-slate-700 transition-colors">
                    <svg 
                      className={`h-5 w-5 transform transition-transform duration-200 ${expandedScheme === scheme.id ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className={`px-4 pb-4 ${expandedScheme !== scheme.id ? 'hidden' : ''}`}>
                <div className="pt-3 border-t border-slate-200">
                  <p className="text-slate-600 mb-4">{scheme.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center">
                        <User size={16} className="mr-2" />
                        Eligibility Criteria
                      </h4>
                      <ul className="space-y-2">
                        {scheme.eligibility.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span className="text-sm text-slate-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center">
                        <FileText size={16} className="mr-2" />
                        Required Documents
                      </h4>
                      <ul className="space-y-2">
                        {scheme.documents.map((doc, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span className="text-sm text-slate-600">{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-between mt-6 pt-4 border-t border-slate-200">
                    <div className="flex items-center text-sm text-slate-500 mb-2 sm:mb-0">
                      <Calendar size={16} className="mr-1" />
                      Last Updated: {scheme.lastUpdated}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        icon={<Download size={16} />}
                      >
                        Download Guidelines
                      </Button>
                      <Button 
                        variant="primary" 
                        size="sm"
                        icon={<ExternalLink size={16} />}
                      >
                        Apply Online
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 space-y-4">
        <h3 className="text-lg font-semibold text-blue-800">Need Assistance?</h3>
        <p className="text-blue-700">
          Our team can help you find schemes you're eligible for and guide you through the application process.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-blue-200 flex items-start">
            <div className="p-2 rounded-full bg-blue-100 mr-3">
              <MapPin size={18} className="text-blue-700" />
            </div>
            <div>
              <h4 className="font-medium text-slate-800">Visit Local Center</h4>
              <p className="text-sm text-slate-600">Find your nearest Common Service Center for in-person assistance.</p>
              <a href="#" className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                Find Nearby Center
                <ArrowRight size={14} className="ml-1" />
              </a>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200 flex items-start">
            <div className="p-2 rounded-full bg-blue-100 mr-3">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-[18px] w-[18px] text-blue-700" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-slate-800">Helpline Support</h4>
              <p className="text-sm text-slate-600">Call our toll-free helpline for guidance on schemes and applications.</p>
              <a href="#" className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                1800-XXX-XXXX
                <ArrowRight size={14} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetails;