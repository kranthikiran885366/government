import { create } from 'zustand';
import { collection, query, onSnapshot, orderBy, addDoc, updateDoc, doc } from 'firebase/firestore';
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
      }
    );

    const unsubProjects = onSnapshot(
      query(collection(db, 'projects'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        set({ projects });
      }
    );

    const unsubSpending = onSnapshot(
      query(collection(db, 'spending'), orderBy('date', 'desc')),
      (snapshot) => {
        const spending = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        set({ spending });
      }
    );

    const unsubAgriculturePrices = onSnapshot(
      query(collection(db, 'agriculture_prices'), orderBy('updatedAt', 'desc')),
      (snapshot) => {
        const agriculturePrices = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        set({ agriculturePrices });
      }
    );

    const unsubIssues = onSnapshot(
      query(collection(db, 'issues'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        const issues = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        set({ issues });
      }
    );

    const unsubFeedback = onSnapshot(
      query(collection(db, 'feedback'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        const feedback = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        set({ feedback });
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
      const snapshot = await onSnapshot(q, (querySnapshot) => {
        const leaders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        set({ leaders, error: null });
      });
      return () => snapshot();
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
      const snapshot = await onSnapshot(q, (querySnapshot) => {
        const projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        set({ projects, error: null });
      });
      return () => snapshot();
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
      const snapshot = await onSnapshot(q, (querySnapshot) => {
        const spending = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        set({ spending, error: null });
      });
      return () => snapshot();
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
      const snapshot = await onSnapshot(q, (querySnapshot) => {
        const agriculturePrices = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        set({ agriculturePrices, error: null });
      });
      return () => snapshot();
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
      const snapshot = await onSnapshot(q, (querySnapshot) => {
        const issues = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        set({ issues, error: null });
      });
      return () => snapshot();
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
      const snapshot = await onSnapshot(q, (querySnapshot) => {
        const feedback = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        set({ feedback, error: null });
      });
      return () => snapshot();
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));