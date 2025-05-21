import { create } from 'zustand';
import { 
  collection, 
  query, 
  onSnapshot, 
  orderBy, 
  addDoc, 
  updateDoc, 
  doc, 
  where,
  getDocs,
  Timestamp,
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { analyticsEngine } from '../lib/analytics';

interface State {
  leaders: any[];
  projects: any[];
  spending: any[];
  agriculturePrices: any[];
  issues: any[];
  feedback: any[];
  analytics: {
    insights: any;
    loading: boolean;
  };
  loading: boolean;
  error: string | null;
  subscribeToUpdates: () => void;
  fetchLeaders: () => Promise<void>;
  fetchProjects: () => Promise<void>;
  fetchSpending: () => Promise<void>;
  fetchAgriculturePrices: () => Promise<void>;
  fetchIssues: () => Promise<void>;
  fetchFeedback: () => Promise<void>;
  fetchAnalytics: () => Promise<void>;
  addIssue: (issue: any) => Promise<void>;
  addFeedback: (feedback: any) => Promise<void>;
  updateIssueStatus: (issueId: string, status: string) => Promise<void>;
  voteFeedback: (feedbackId: string, voteType: 'up' | 'down') => Promise<void>;
  predictIssueResolution: (issue: any) => Promise<any>;
  generateReport: () => Promise<any>;
}

export const useStore = create<State>((set, get) => ({
  leaders: [],
  projects: [],
  spending: [],
  agriculturePrices: [],
  issues: [],
  feedback: [],
  analytics: {
    insights: null,
    loading: false
  },
  loading: false,
  error: null,

  subscribeToUpdates: () => {
    // Existing subscriptions...
    const unsubLeaders = onSnapshot(
      query(collection(db, 'leaders'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        const leaders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        set({ leaders });
      },
      (error) => {
        console.error('Leaders subscription error:', error);
        set({ error: error.message });
      }
    );

    const unsubProjects = onSnapshot(
      query(collection(db, 'projects'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        set({ projects });
      },
      (error) => {
        console.error('Projects subscription error:', error);
        set({ error: error.message });
      }
    );

    const unsubSpending = onSnapshot(
      query(collection(db, 'spending'), orderBy('date', 'desc')),
      (snapshot) => {
        const spending = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        set({ spending });
      },
      (error) => {
        console.error('Spending subscription error:', error);
        set({ error: error.message });
      }
    );

    const unsubAgriculturePrices = onSnapshot(
      query(collection(db, 'agriculture_prices'), orderBy('updatedAt', 'desc')),
      (snapshot) => {
        const agriculturePrices = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        set({ agriculturePrices });
      },
      (error) => {
        console.error('Agriculture prices subscription error:', error);
        set({ error: error.message });
      }
    );

    const unsubIssues = onSnapshot(
      query(collection(db, 'issues'), orderBy('createdAt', 'desc')),
      async (snapshot) => {
        const issues = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const analyzedIssues = await analyticsEngine.analyzeIssuesSentiment(issues);
        set({ issues: analyzedIssues });
      },
      (error) => {
        console.error('Issues subscription error:', error);
        set({ error: error.message });
      }
    );

    const unsubFeedback = onSnapshot(
      query(collection(db, 'feedback'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        const feedback = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        set({ feedback });
      },
      (error) => {
        console.error('Feedback subscription error:', error);
        set({ error: error.message });
      }
    );

    // Return cleanup function
    return () => {
      unsubLeaders();
      unsubProjects();
      unsubSpending();
      unsubAgriculturePrices();
      unsubIssues();
      unsubFeedback();
    };
  },

  fetchAnalytics: async () => {
    try {
      set(state => ({ analytics: { ...state.analytics, loading: true } }));
      const insights = await analyticsEngine.generateInsights();
      set(state => ({ 
        analytics: { 
          insights,
          loading: false
        }
      }));
    } catch (error: any) {
      console.error('Analytics generation error:', error);
      set(state => ({ 
        analytics: { 
          ...state.analytics,
          loading: false
        },
        error: error.message 
      }));
    }
  },

  predictIssueResolution: async (issue) => {
    try {
      return await analyticsEngine.predictIssueResolutionTime(issue);
    } catch (error: any) {
      console.error('Prediction error:', error);
      return null;
    }
  },

  generateReport: async () => {
    const state = get();
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalIssues: state.issues.length,
        resolvedIssues: state.issues.filter(i => i.status === 'resolved').length,
        totalProjects: state.projects.length,
        totalSpending: state.spending.reduce((sum, item) => sum + item.amount, 0),
      },
      analytics: state.analytics.insights,
      trends: {
        issues: await analyticsEngine.analyzeTrends(state.issues),
        spending: state.spending.slice(-30), // Last 30 days
        feedback: state.feedback.slice(-30),
      }
    };

    return report;
  },

  // Existing methods...
  fetchLeaders: async () => {
    try {
      set({ loading: true });
      const q = query(collection(db, 'leaders'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const leaders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      set({ leaders, error: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchProjects: async () => {
    try {
      set({ loading: true });
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      set({ projects, error: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchSpending: async () => {
    try {
      set({ loading: true });
      const q = query(collection(db, 'spending'), orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      const spending = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      set({ spending, error: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchAgriculturePrices: async () => {
    try {
      set({ loading: true });
      const q = query(collection(db, 'agriculture_prices'), orderBy('updatedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const agriculturePrices = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      set({ agriculturePrices, error: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchIssues: async () => {
    try {
      set({ loading: true });
      const q = query(collection(db, 'issues'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const issues = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      set({ issues, error: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchFeedback: async () => {
    try {
      set({ loading: true });
      const q = query(collection(db, 'feedback'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const feedback = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      set({ feedback, error: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  addIssue: async (issue) => {
    try {
      set({ loading: true });
      const prediction = await analyticsEngine.predictIssueResolutionTime(issue);
      await addDoc(collection(db, 'issues'), {
        ...issue,
        predictedResolutionDays: prediction?.estimatedDays,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'pending'
      });
      set({ error: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  addFeedback: async (feedback) => {
    try {
      set({ loading: true });
      await addDoc(collection(db, 'feedback'), {
        ...feedback,
        createdAt: serverTimestamp(),
        upvotes: 0,
        downvotes: 0
      });
      set({ error: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  updateIssueStatus: async (issueId, status) => {
    try {
      set({ loading: true });
      const issueRef = doc(db, 'issues', issueId);
      await updateDoc(issueRef, {
        status,
        updatedAt: serverTimestamp()
      });
      set({ error: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  voteFeedback: async (feedbackId, voteType) => {
    try {
      set({ loading: true });
      const feedbackRef = doc(db, 'feedback', feedbackId);
      await updateDoc(feedbackRef, {
        [voteType === 'up' ? 'upvotes' : 'downvotes']: increment(1)
      });
      set({ error: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  }
}));