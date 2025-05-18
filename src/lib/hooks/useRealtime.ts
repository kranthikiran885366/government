import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy, where, QueryConstraint } from 'firebase/firestore';
import { db } from '../firebase';

interface UseRealtimeOptions {
  collectionName: string;
  orderByField?: string;
  orderDirection?: 'asc' | 'desc';
  whereClause?: {
    field: string;
    operator: '==' | '>' | '<' | '>=' | '<=';
    value: any;
  };
}

export const useRealtime = <T extends Record<string, any>>({
  collectionName,
  orderByField = 'createdAt',
  orderDirection = 'desc',
  whereClause
}: UseRealtimeOptions) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const queryConstraints: QueryConstraint[] = [
      orderBy(orderByField, orderDirection)
    ];

    if (whereClause) {
      queryConstraints.push(
        where(whereClause.field, whereClause.operator, whereClause.value)
      );
    }

    const q = query(collection(db, collectionName), ...queryConstraints);

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as T[];
        setData(items);
        setLoading(false);
      },
      (err) => {
        console.error('Realtime subscription error:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, orderByField, orderDirection, whereClause]);

  return { data, loading, error };
};