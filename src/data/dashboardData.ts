import { DashboardData } from '../types/dashboard';

export const initialDashboardData: DashboardData = {
  categories: [
    {
      id: 'cspm-executive',
      name: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 'cloud-accounts',
          name: 'Cloud Accounts',
          text: 'Total cloud accounts connected',
          type: 'donut',
          categoryId: 'cspm-executive',
          data: { total: 4, connected: 2 }
        },
        {
          id: 'cloud-account-risk',
          name: 'Cloud Account Risk Assessment',
          text: 'Risk assessment across cloud accounts',
          type: 'chart',
          categoryId: 'cspm-executive',
          data: { failed: 1689, warning: 681, passed: 7253, total: 9623 }
        }
      ]
    },
    {
      id: 'cwpp-dashboard',
      name: 'CWPP Dashboard',
      widgets: [
        {
          id: 'top-5-namespaces',
          name: 'Top 5 Namespaces Specific Alerts',
          text: 'Most critical namespace alerts',
          type: 'metric',
          categoryId: 'cwpp-dashboard',
          data: { value: 'No images scan available' }
        },
        {
          id: 'workload-alerts',
          name: 'Workload Alerts',
          text: 'Current workload security alerts',
          type: 'metric',
          categoryId: 'cwpp-dashboard',
          data: { value: 'No images scan available' }
        }
      ]
    },
    {
      id: 'registry-scan',
      name: 'Registry Scan',
      widgets: [
        {
          id: 'image-risk-assessment',
          name: 'Image Risk Assessment',
          text: 'Container image vulnerability assessment',
          type: 'progress',
          categoryId: 'registry-scan',
          data: { critical: 9, high: 150, medium: 457, low: 1457, total: 2073 }
        },
        {
          id: 'image-security-issues',
          name: 'Image Security Issues',
          text: 'Security issues found in images',
          type: 'progress',
          categoryId: 'registry-scan',
          data: { critical: 2, high: 10, medium: 5, low: 15, total: 32 }
        }
      ]
    }
  ]
};