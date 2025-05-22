import * as tf from '@tensorflow/tfjs';
import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export class AnalyticsEngine {
  private static instance: AnalyticsEngine;
  private model: tf.Sequential | null = null;

  private constructor() {
    this.initializeModel();
  }

  static getInstance(): AnalyticsEngine {
    if (!AnalyticsEngine.instance) {
      AnalyticsEngine.instance = new AnalyticsEngine();
    }
    return AnalyticsEngine.instance;
  }

  private async initializeModel() {
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [10], units: 32, activation: 'relu' }),
        tf.layers.dense({ units: 16, activation: 'relu' }),
        tf.layers.dense({ units: 1, activation: 'sigmoid' })
      ]
    });

    this.model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'binaryCrossentropy',
      metrics: ['accuracy']
    });
  }

  async analyzeIssuesSentiment(issues: any[]) {
    // Simplified sentiment analysis using basic keyword matching
    const positiveWords = new Set(['good', 'great', 'excellent', 'positive', 'resolved', 'success']);
    const negativeWords = new Set(['bad', 'poor', 'negative', 'failure', 'problem', 'issue']);

    return issues.map(issue => {
      const words = issue.description.toLowerCase().split(/\s+/);
      let score = 0;
      
      words.forEach(word => {
        if (positiveWords.has(word)) score++;
        if (negativeWords.has(word)) score--;
      });

      return {
        ...issue,
        sentiment: score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral'
      };
    });
  }

  async predictIssueResolutionTime(issue: any) {
    if (!this.model) return null;

    const features = this.extractFeatures(issue);
    const prediction = this.model.predict(tf.tensor2d([features])) as tf.Tensor;
    const days = Math.round(prediction.dataSync()[0] * 30); // Scale to days

    return {
      estimatedDays: days,
      confidence: prediction.dataSync()[0]
    };
  }

  private extractFeatures(issue: any): number[] {
    // Convert issue properties into numerical features
    return [
      issue.type === 'corruption' ? 1 : 0,
      issue.type === 'infrastructure' ? 1 : 0,
      issue.type === 'officer' ? 1 : 0,
      issue.evidence_urls?.length || 0,
      issue.description.length,
      issue.is_anonymous ? 1 : 0,
      // Add more features as needed
      0, 0, 0, 0 // Padding to match input shape
    ];
  }

  async generateInsights() {
    const issuesRef = collection(db, 'issues');
    const issuesSnapshot = await getDocs(issuesRef);
    const issues = issuesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const insights = {
      totalIssues: issues.length,
      byType: this.groupByType(issues),
      resolutionTimes: this.calculateResolutionTimes(issues),
      hotspots: this.identifyHotspots(issues),
      trends: await this.analyzeTrends(issues)
    };

    return insights;
  }

  private groupByType(issues: any[]) {
    return issues.reduce((acc, issue) => {
      acc[issue.type] = (acc[issue.type] || 0) + 1;
      return acc;
    }, {});
  }

  private calculateResolutionTimes(issues: any[]) {
    const resolvedIssues = issues.filter(issue => issue.status === 'resolved');
    if (resolvedIssues.length === 0) return null;

    const times = resolvedIssues.map(issue => {
      const created = new Date(issue.created_at);
      const resolved = new Date(issue.resolved_at);
      return (resolved.getTime() - created.getTime()) / (1000 * 60 * 60 * 24); // Days
    });

    return {
      average: times.reduce((a, b) => a + b, 0) / times.length,
      min: Math.min(...times),
      max: Math.max(...times)
    };
  }

  private identifyHotspots(issues: any[]) {
    const locations = issues.reduce((acc: any, issue: any) => {
      if (issue.location) {
        acc[issue.location] = (acc[issue.location] || 0) + 1;
      }
      return acc;
    }, {});

    return Object.entries(locations)
      .sort(([, a]: any, [, b]: any) => b - a)
      .slice(0, 5);
  }

  private async analyzeTrends(issues: any[]) {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const recentIssues = issues.filter(issue => 
      new Date(issue.created_at) >= last30Days
    );

    const dailyCounts = recentIssues.reduce((acc: any, issue: any) => {
      const date = new Date(issue.created_at).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    return {
      dailyCounts,
      trend: this.calculateTrend(Object.values(dailyCounts))
    };
  }

  private calculateTrend(values: number[]) {
    if (values.length < 2) return 'stable';
    
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;
    
    const recentAvg = values.slice(-7).reduce((a, b) => a + b, 0) / 7;
    
    if (recentAvg > avg * 1.1) return 'increasing';
    if (recentAvg < avg * 0.9) return 'decreasing';
    return 'stable';
  }
}

export const analyticsEngine = AnalyticsEngine.getInstance();