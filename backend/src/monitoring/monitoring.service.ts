import { Injectable } from '@nestjs/common';
import * as pidusage from 'pidusage';
import * as si from 'systeminformation';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

@Injectable()
export class MonitoringService {
  private execPromise = promisify(exec);

  async getCPUUsage(): Promise<number> {
    try {
      const stats = await pidusage(process.pid);
      return stats.cpu;
    } catch (error) {
      console.error('Error fetching CPU usage:', error);
      return 0;
    }
  }

  async getMemoryUsage(): Promise<number> {
    try {
      const stats = await pidusage(process.pid);
      return stats.memory / 1024 / 1024; // Convert to MB
    } catch (error) {
      console.error('Error fetching memory usage:', error);
      return 0;
    }
  }

  async getDiskUsage(): Promise<number> {
    try {
      const { stdout } = await this.execPromise(
        `powershell -command "Get-ChildItem -Recurse | Measure-Object -Property Length -Sum"`,
        { cwd: path.resolve(__dirname, '../..') }
      );
      const sizeInBytesMatch = stdout.match(/Sum\s+:\s+(\d+)/);
      if (sizeInBytesMatch) {
        const sizeInBytes = parseFloat(sizeInBytesMatch[1].trim());
        return sizeInBytes / 1024 / 1024; // Convert to MB
      }
      console.error('Error parsing disk usage output:', stdout);
      return 0;
    } catch (error) {
      console.error('Error fetching disk usage:', error);
      return 0;
    }
  }

  async getNetworkUsage(): Promise<{ rx: number; tx: number }> {
    try {
      const networkStats = await si.networkStats();

      if (!networkStats || networkStats.length === 0) {
        return { rx: 0, tx: 0 };
      }

      const rx = networkStats.reduce((acc, stat) => acc + (stat.rx_bytes || 0), 0);
      const tx = networkStats.reduce((acc, stat) => acc + (stat.tx_bytes || 0), 0);

      return {
        rx: rx / 1024 / 1024, // Convert to MB
        tx: tx / 1024 / 1024, // Convert to MB
      };
    } catch (error) {
      console.error('Error fetching network usage:', error);
      return { rx: 0, tx: 0 };
    }
  }

  async getSystemMetrics(): Promise<any> {
    try {
      const [cpuUsage, memoryUsage, diskUsage, networkUsage] = await Promise.all([
        this.getCPUUsage(),
        this.getMemoryUsage(),
        this.getDiskUsage(),
        this.getNetworkUsage(),
      ]);

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
