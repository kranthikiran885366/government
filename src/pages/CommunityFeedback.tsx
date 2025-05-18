import React, { useState } from 'react';
import { MessageSquareText, ThumbsUp, ThumbsDown, Send, Users, TrendingUp, Clock, Filter } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SearchBar from '../components/ui/SearchBar';
import Tabs from '../components/ui/Tabs';

interface Feedback {
  id: number;
  user: {
    name: string;
    avatar: string;
    location: string;
  };
  content: string;
  topic: string;
  votes: {
    upvotes: number;
    downvotes: number;
  };
  timestamp: string;
  comments: number;
  userVote?: 'up' | 'down' | null;
}

const CommunityFeedback: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState('all');
  const [comments, setComments] = useState<Record<number, boolean>>({});
  const [votedPosts, setVotedPosts] = useState<Record<number, 'up' | 'down' | null>>({});
  
  const toggleComment = (id: number) => {
    setComments(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const handleVote = (id: number, type: 'up' | 'down') => {
    setVotedPosts(prev => {
      // If already voted the same way, remove vote
      if (prev[id] === type) {
        return {
          ...prev,
          [id]: null
        };
      }
      // Otherwise set vote to the new type
      return {
        ...prev,
        [id]: type
      };
    });
  };
  
  const feedbacks: Feedback[] = [
    {
      id: 1,
      user: {
        name: "Rahul Singh",
        avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        location: "Delhi"
      },
      content: "The new highway project is taking too long to complete. It's been over a year since the announced deadline and there's still significant work to be done. This is causing daily traffic issues for commuters.",
      topic: "infrastructure",
      votes: {
        upvotes: 45,
        downvotes: 5
      },
      timestamp: "2 hours ago",
      comments: 12
    },
    {
      id: 2,
      user: {
        name: "Priya Sharma",
        avatar: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        location: "Mumbai"
      },
      content: "The PM-KISAN scheme has been very helpful for small farmers like me. The direct benefit transfer ensures that the money reaches us without any middlemen. However, there's a need for increasing the amount considering the rising costs of farming inputs.",
      topic: "schemes",
      votes: {
        upvotes: 78,
        downvotes: 3
      },
      timestamp: "5 hours ago",
      comments: 23
    },
    {
      id: 3,
      user: {
        name: "Vikram Reddy",
        avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        location: "Bangalore"
      },
      content: "I've noticed that the local MLA has not visited our constituency since the elections 8 months ago. There are several pending issues regarding water supply and road maintenance that need urgent attention.",
      topic: "representatives",
      votes: {
        upvotes: 62,
        downvotes: 8
      },
      timestamp: "1 day ago",
      comments: 17
    },
    {
      id: 4,
      user: {
        name: "Amita Patel",
        avatar: "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        location: "Ahmedabad"
      },
      content: "The new online portal for applying to government schemes is much improved and user-friendly. I was able to complete my application in just 10 minutes, compared to the hours it took earlier. Great job by the IT department.",
      topic: "digital-governance",
      votes: {
        upvotes: 92,
        downvotes: 1
      },
      timestamp: "2 days ago",
      comments: 8
    }
  ];

  const topics = [
    { id: 'all', label: 'All Topics' },
    { id: 'infrastructure', label: 'Infrastructure' },
    { id: 'schemes', label: 'Government Schemes' },
    { id: 'representatives', label: 'Representatives' },
    { id: 'digital-governance', label: 'Digital Governance' },
    { id: 'agriculture', label: 'Agriculture' },
    { id: 'healthcare', label: 'Healthcare' },
  ];

  const filteredFeedbacks = activeTopic === 'all' 
    ? feedbacks 
    : feedbacks.filter(feedback => feedback.topic === activeTopic);

  const tabs = [
    { id: 'trending', label: 'Trending', icon: <TrendingUp size={16} /> },
    { id: 'recent', label: 'Recent', icon: <Clock size={16} /> },
    { id: 'most-voted', label: 'Most Voted', icon: <ThumbsUp size={16} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Community Feedback</h1>
          <p className="text-slate-500 mt-1">Share your thoughts and see what others are saying</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <SearchBar 
            placeholder="Search discussions..." 
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
          {topics.map((topic) => (
            <button
              key={topic.id}
              className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition-colors ${
                activeTopic === topic.id
                  ? 'bg-purple-100 text-purple-800 font-medium'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              onClick={() => setActiveTopic(topic.id)}
            >
              {topic.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <div className="p-4">
              <Tabs tabs={tabs} />
              
              <div className="mt-4">
                <textarea
                  className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Share your feedback or concerns..."
                  rows={3}
                ></textarea>
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-sm text-slate-500">
                    Share your ideas, suggestions, or concerns with the community
                  </div>
                  <Button
                    variant="primary"
                    size="md"
                    icon={<Send size={16} />}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          
          {filteredFeedbacks.map((feedback) => {
            const userVote = votedPosts[feedback.id];
            
            return (
              <Card key={feedback.id} className="overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start">
                    <img
                      src={feedback.user.avatar}
                      alt={feedback.user.name}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-800">{feedback.user.name}</h3>
                          <div className="flex items-center text-xs text-slate-500">
                            <span>{feedback.user.location}</span>
                            <span className="mx-1">•</span>
                            <span>{feedback.timestamp}</span>
                          </div>
                        </div>
                        <div className="text-xs text-purple-600 px-2 py-1 bg-purple-50 rounded-full">
                          {topics.find(t => t.id === feedback.topic)?.label || feedback.topic}
                        </div>
                      </div>
                      <p className="mt-2 text-slate-700">{feedback.content}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button 
                            className={`flex items-center text-sm ${userVote === 'up' ? 'text-green-600' : 'text-slate-500 hover:text-green-600'}`}
                            onClick={() => handleVote(feedback.id, 'up')}
                          >
                            <ThumbsUp size={16} className="mr-1" />
                            <span>{feedback.votes.upvotes + (userVote === 'up' ? 1 : 0)}</span>
                          </button>
                          <button 
                            className={`flex items-center text-sm ${userVote === 'down' ? 'text-red-600' : 'text-slate-500 hover:text-red-600'}`}
                            onClick={() => handleVote(feedback.id, 'down')}
                          >
                            <ThumbsDown size={16} className="mr-1" />
                            <span>{feedback.votes.downvotes + (userVote === 'down' ? 1 : 0)}</span>
                          </button>
                          <button 
                            className="flex items-center text-sm text-slate-500 hover:text-purple-600"
                            onClick={() => toggleComment(feedback.id)}
                          >
                            <MessageSquareText size={16} className="mr-1" />
                            <span>{feedback.comments}</span>
                          </button>
                        </div>
                        <button className="text-xs text-purple-600 hover:text-purple-800">
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {comments[feedback.id] && (
                    <div className="mt-4 pl-12 border-t border-slate-200 pt-4">
                      <div className="mb-3">
                        <div className="text-sm text-slate-500 mb-2">Comments ({feedback.comments})</div>
                        <div className="flex">
                          <input
                            type="text"
                            className="flex-1 p-2 border border-slate-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                            placeholder="Add your comment..."
                          />
                          <button className="bg-purple-600 text-white px-3 rounded-r-lg">
                            <Send size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-slate-300 mr-2 flex-shrink-0"></div>
                          <div>
                            <div className="bg-slate-50 p-2 rounded-lg">
                              <div className="flex justify-between text-xs mb-1">
                                <span className="font-medium text-slate-800">Anonymous User</span>
                                <span className="text-slate-500">1 hour ago</span>
                              </div>
                              <p className="text-sm text-slate-700">This is an important issue that needs immediate attention!</p>
                            </div>
                            <div className="flex items-center mt-1 text-xs text-slate-500 space-x-3">
                              <button className="hover:text-slate-700">Like</button>
                              <button className="hover:text-slate-700">Reply</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
          
          <div className="flex justify-center">
            <Button variant="outline">
              Load More Discussions
            </Button>
          </div>
        </div>
        
        <div className="space-y-6">
          <Card title="Community Guidelines" icon={<Users size={20} />}>
            <div className="space-y-3 text-sm">
              <p className="text-slate-600">
                Our community thrives on respectful and constructive feedback. Please follow these guidelines:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span className="text-slate-600">Be respectful and considerate of others' viewpoints</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span className="text-slate-600">Focus on facts and provide evidence when possible</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span className="text-slate-600">Avoid personal attacks or inflammatory language</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span className="text-slate-600">Stay on topic and contribute meaningfully to discussions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span className="text-slate-600">Report inappropriate content to moderators</span>
                </li>
              </ul>
            </div>
          </Card>
          
          <Card title="Trending Topics" icon={<TrendingUp size={20} />}>
            <div className="space-y-3">
              <a href="#" className="block p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-slate-800">Road Infrastructure</h4>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">128 posts</span>
                </div>
                <p className="text-sm text-slate-500 mt-1">Discussions about local road maintenance and construction</p>
              </a>
              
              <a href="#" className="block p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-slate-800">Farming Subsidies</h4>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">94 posts</span>
                </div>
                <p className="text-sm text-slate-500 mt-1">Farmers discussing financial support and subsidies</p>
              </a>
              
              <a href="#" className="block p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-slate-800">Digital Services</h4>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">76 posts</span>
                </div>
                <p className="text-sm text-slate-500 mt-1">Feedback on government digital services and portals</p>
              </a>
            </div>
          </Card>
          
          <Card title="Start a Petition" icon={<MessageSquareText size={20} />}>
            <p className="text-sm text-slate-600 mb-4">
              Have an issue that needs collective action? Start a petition to gather community support.
            </p>
            <Button
              variant="outline"
              className="w-full"
            >
              Create New Petition
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CommunityFeedback;