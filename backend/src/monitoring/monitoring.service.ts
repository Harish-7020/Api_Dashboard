import { Injectable } from '@nestjs/common';
import * as pidusage from 'pidusage';
import * as si from 'systeminformation';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';

@Injectable()
export class MonitoringService {
  async getCPUUsage(): Promise<number> {
    const stats = await pidusage(process.pid);
    return stats.cpu;
  }

  async getMemoryUsage(): Promise<number> {
    const stats = await pidusage(process.pid);
    return stats.memory / 1024 / 1024; // Convert to MB
  }

  async getDiskUsage(): Promise<number> {
    return new Promise((resolve, reject) => {
      exec(`powershell -command "Get-ChildItem -Recurse | Measure-Object -Property Length -Sum"`, { cwd: path.resolve(__dirname, '../..') }, (error, stdout) => {
        if (error) {
          return reject(error);
        }
        const sizeInBytes = parseFloat(stdout.match(/Sum\s+:\s+(\d+)/)[1].trim());
        resolve(sizeInBytes / 1024 / 1024); // Convert to MB
      });
    });
  }
  

  async getNetworkUsage(): Promise<{ rx: number; tx: number }> {
    const networkStats = await si.networkStats();
  
    if (!networkStats || networkStats.length === 0) {
      return {
        rx: 0,
        tx: 0,
      };
    }
  
    const rx = networkStats.reduce((acc, stat) => acc + (stat.rx_bytes || 0), 0);
    const tx = networkStats.reduce((acc, stat) => acc + (stat.tx_bytes || 0), 0);
  
    return {
      rx: rx / 1024 / 1024, // Convert to MB
      tx: tx / 1024 / 1024, // Convert to MB
    };
  }
  
  async getSystemMetrics(): Promise<any> {
    try {
      const cpuUsage = await this.getCPUUsage();
      const memoryUsage = await this.getMemoryUsage();
      const diskUsage = await this.getDiskUsage(); // Disk usage in MB
      const networkUsage = await this.getNetworkUsage();
  
      return {
        cpuUsage,
        memoryUsage,
        diskUsage,
        networkUsage,
      };
    } catch (error) {
      console.error('Error fetching system metrics:', error);
      return {
        cpuUsage: 0,
        memoryUsage: 0,
        diskUsage: 0,
        networkUsage: { rx: 0, tx: 0 },
      };
    }
  }
}  
  
