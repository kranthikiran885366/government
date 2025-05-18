import React, { useState } from 'react';
import { AlertTriangle, Camera, MapPin, Shield, Eye, EyeOff, Send, AlertCircle, Upload, CheckCircle2 } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Tabs from '../components/ui/Tabs';

type IssueType = 'corruption' | 'officer' | 'infrastructure' | 'scheme';

const ReportIssues: React.FC = () => {
  const [issueType, setIssueType] = useState<IssueType>('corruption');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [uploadStatus, setUploadStatus] = useState<'ready' | 'uploading' | 'success' | 'error'>('ready');
  
  const tabs = [
    { id: 'corruption', label: 'Corruption', icon: <AlertTriangle size={16} /> },
    { id: 'officer', label: 'Officer Accountability', icon: <Shield size={16} /> },
    { id: 'infrastructure', label: 'Infrastructure Issues', icon: <MapPin size={16} /> },
    { id: 'scheme', label: 'Scheme Implementation', icon: <AlertCircle size={16} /> },
  ];

  const handleTabChange = (tabId: string) => {
    setIssueType(tabId as IssueType);
  };

  const simulateUpload = () => {
    setUploadStatus('uploading');
    setTimeout(() => {
      setUploadStatus('success');
    }, 2000);
  };

  const IssueForm = () => {
    switch (issueType) {
      case 'corruption':
        return <CorruptionForm />;
      case 'officer':
        return <OfficerForm />;
      case 'infrastructure':
        return <InfrastructureForm />;
      case 'scheme':
        return <SchemeForm />;
      default:
        return <CorruptionForm />;
    }
  };

  const CorruptionForm = () => (
    <div className="space-y-6">
      <div className="bg-red-50 p-4 rounded-lg border border-red-100">
        <div className="flex">
          <Shield className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-red-800">This report will be secure and confidential</h3>
            <p className="mt-1 text-sm text-red-700">
              Your information is protected. Reports are only visible to authorized oversight officials.
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Issue Title</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Brief title describing the corruption issue"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
        <textarea
          rows={4}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe the corruption incident in detail (who, what, when, where)"
        ></textarea>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
        <div className="flex gap-2">
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Where did this occur?"
          />
          <Button variant="outline" size="md" icon={<MapPin size={18} />}>
            Use Current
          </Button>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Evidence Upload</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
          <div className="space-y-2 text-center">
            <Camera className="mx-auto h-12 w-12 text-slate-400" />
            <div className="flex text-sm text-slate-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
              >
                <span>Upload photos or videos</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-slate-500">PNG, JPG, MP4 up to 10MB</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setIsAnonymous(!isAnonymous)}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            isAnonymous ? 'bg-blue-600' : 'bg-slate-200'
          }`}
        >
          <span className="sr-only">Toggle anonymous reporting</span>
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              isAnonymous ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
        <span className="ml-3 text-sm font-medium text-slate-700 flex items-center">
          {isAnonymous ? (
            <>
              <EyeOff size={16} className="mr-1" />
              Report Anonymously
            </>
          ) : (
            <>
              <Eye size={16} className="mr-1" />
              Report with Identity
            </>
          )}
        </span>
      </div>
      
      <div className="flex justify-end">
        <Button
          variant="primary"
          size="lg"
          icon={<Send size={18} />}
        >
          Submit Report
        </Button>
      </div>
    </div>
  );

  const OfficerForm = () => (
    <div className="space-y-6">
      <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
        <div className="flex">
          <Shield className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-amber-800">Officer Accountability Report</h3>
            <p className="mt-1 text-sm text-amber-700">
              Report non-performing officers or misconduct issues. Reports are escalated to appropriate authorities.
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Officer Name/Position</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Name and/or position of the officer"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Department/Office</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Which department or office is this officer from?"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Issue Description</label>
        <textarea
          rows={4}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe the issue with this officer (inaction, misconduct, etc.)"
        ></textarea>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Media Evidence</label>
        <div className="border border-slate-300 rounded-lg p-4">
          <div className="flex items-center justify-center gap-4">
            {uploadStatus === 'ready' && (
              <Button 
                variant="outline" 
                size="md" 
                icon={<Upload size={18} />}
                onClick={simulateUpload}
              >
                Upload Photo/Video
              </Button>
            )}
            
            {uploadStatus === 'uploading' && (
              <div className="flex items-center gap-2 text-blue-600">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Uploading...</span>
              </div>
            )}
            
            {uploadStatus === 'success' && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 size={20} />
                <span>Upload successful</span>
              </div>
            )}
          </div>
          
          {uploadStatus === 'success' && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="relative rounded overflow-hidden h-24">
                <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                  <Camera size={24} className="text-slate-500" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
                  evidence_1.jpg
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setIsAnonymous(!isAnonymous)}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            isAnonymous ? 'bg-blue-600' : 'bg-slate-200'
          }`}
        >
          <span className="sr-only">Toggle anonymous reporting</span>
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              isAnonymous ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
        <span className="ml-3 text-sm font-medium text-slate-700 flex items-center">
          {isAnonymous ? (
            <>
              <EyeOff size={16} className="mr-1" />
              Report Anonymously
            </>
          ) : (
            <>
              <Eye size={16} className="mr-1" />
              Report with Identity
            </>
          )}
        </span>
      </div>
      
      <div className="flex justify-end">
        <Button
          variant="primary"
          size="lg"
          icon={<Send size={18} />}
        >
          Submit Report
        </Button>
      </div>
    </div>
  );

  const InfrastructureForm = () => (
    <div className="space-y-4">
      <p>Infrastructure issue reporting form</p>
    </div>
  );

  const SchemeForm = () => (
    <div className="space-y-4">
      <p>Scheme implementation issue reporting form</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Report Issues</h1>
          <p className="text-slate-500 mt-1">Report corruption, accountability, or infrastructure issues</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <Tabs tabs={tabs} onChange={handleTabChange} />
            <div className="mt-6">
              <IssueForm />
            </div>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card title="Reporting Guidelines">
            <div className="space-y-4 text-sm">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-800">Your safety is important</p>
                  <p className="text-slate-600">We protect your identity when you report anonymously.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-800">Be specific and factual</p>
                  <p className="text-slate-600">Include details like dates, locations, and names if possible.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Camera className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-800">Evidence matters</p>
                  <p className="text-slate-600">Photos, videos, or documents help verify your report.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Eye className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-800">Track your report</p>
                  <p className="text-slate-600">You'll receive a reference number to follow the progress.</p>
                </div>
              </div>
            </div>
          </Card>
          
          <Card title="What Happens Next">
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-semibold">1</div>
                <p className="ml-3 text-slate-600">Your report is encrypted and securely stored</p>
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-semibold">2</div>
                <p className="ml-3 text-slate-600">Verification team reviews the report</p>
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-semibold">3</div>
                <p className="ml-3 text-slate-600">Report is forwarded to appropriate authorities</p>
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-semibold">4</div>
                <p className="ml-3 text-slate-600">You receive updates on report status</p>
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-semibold">5</div>
                <p className="ml-3 text-slate-600">Action is taken based on findings</p>
              </div>
            </div>
          </Card>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-amber-800">Emergency Situations</h3>
                <p className="mt-1 text-xs text-amber-700">
                  For immediate help in emergency situations, please contact local authorities directly or call emergency services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportIssues;