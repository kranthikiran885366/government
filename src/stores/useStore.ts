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
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';

interface State {
  leaders: any[];
  projects: any[];
  spending: any[];
  agriculturePrices: any[];
  issues: any[];
  feedback: any[];
  loading: boolean;
  error: string | null;
  subscribeToUpdates: () => void;
  fetchLeaders: () => Promise<void>;
  fetchProjects: () => Promise<void>;
  fetchSpending: () => Promise<void>;
  fetchAgriculturePrices: () => Promise<void>;
  fetchIssues: () => Promise<void>;
  fetchFeedback: () => Promise<void>;
  addIssue: (issue: any) => Promise<void>;
  addFeedback: (feedback: any) => Promise<void>;
  updateIssueStatus: (issueId: string, status: string) => Promise<void>;
  voteFeedback: (feedbackId: string, voteType: 'up' | 'down') => Promise<void>;
}

export const useStore = create<State>((set) => ({
  leaders: [],
  projects: [],
  spending: [],
  agriculturePrices: [],
  issues: [],
  feedback: [],
  loading: false,
  error: null,

  subscribeToUpdates: () => {
    // Subscribe to real-time updates from Firestore
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
      (snapshot) => {
        const issues = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        set({ issues });
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
      await addDoc(collection(db, 'issues'), {
        ...issue,
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