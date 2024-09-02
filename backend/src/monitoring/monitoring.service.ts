// import { Injectable } from '@nestjs/common';
// import * as pidusage from 'pidusage';
// import * as si from 'systeminformation';
// import * as path from 'path';
// import { exec } from 'child_process';
// import { promisify } from 'util';

// @Injectable()
// export class MonitoringService {
//   private execPromise = promisify(exec);

//   async getCPUUsage(): Promise<number> {
//     try {
//       const stats = await pidusage(process.pid);
//       return stats.cpu;
//     } catch (error) {
//       console.error('Error fetching CPU usage:', error);
//       return 0;
//     }
//   }

//   async getMemoryUsage(): Promise<number> {
//     try {
//       const stats = await pidusage(process.pid);
//       return stats.memory / 1024 / 1024; // Convert to MB
//     } catch (error) {
//       console.error('Error fetching memory usage:', error);
//       return 0;
//     }
//   }

//   async getDiskUsage(): Promise<number> {
//     try {
//       const { stdout } = await this.execPromise(
//         `powershell -command "Get-ChildItem -Recurse | Measure-Object -Property Length -Sum"`,
//         { cwd: path.resolve(__dirname, '../..') }
//       );
//       const sizeInBytesMatch = stdout.match(/Sum\s+:\s+(\d+)/);
//       if (sizeInBytesMatch) {
//         const sizeInBytes = parseFloat(sizeInBytesMatch[1].trim());
//         return sizeInBytes / 1024 / 1024; // Convert to MB
//       }
//       console.error('Error parsing disk usage output:', stdout);
//       return 0;
//     } catch (error) {
//       console.error('Error fetching disk usage:', error);
//       return 0;
//     }
//   }

//   async getNetworkUsage(): Promise<{ rx: number; tx: number }> {
//     try {
//       const networkStats = await si.networkStats();

//       if (!networkStats || networkStats.length === 0) {
//         return { rx: 0, tx: 0 };
//       }

//       const rx = networkStats.reduce((acc, stat) => acc + (stat.rx_bytes || 0), 0);
//       const tx = networkStats.reduce((acc, stat) => acc + (stat.tx_bytes || 0), 0);

//       return {
//         rx: rx / 1024 / 1024, // Convert to MB
//         tx: tx / 1024 / 1024, // Convert to MB
//       };
//     } catch (error) {
//       console.error('Error fetching network usage:', error);
//       return { rx: 0, tx: 0 };
//     }
//   }

//   async getSystemMetrics(): Promise<any> {
//     try {
//       const [cpuUsage, memoryUsage, diskUsage, networkUsage] = await Promise.all([
//         this.getCPUUsage(),
//         this.getMemoryUsage(),
//         this.getDiskUsage(),
//         this.getNetworkUsage(),
//       ]);

//       return {
//         cpuUsage,
//         memoryUsage,
//         diskUsage,
//         networkUsage,
//       };
//     } catch (error) {
//       console.error('Error fetching system metrics:', error);
//       return {
//         cpuUsage: 0,
//         memoryUsage: 0,
//         diskUsage: 0,
//         networkUsage: { rx: 0, tx: 0 },
//       };
//     }
//   }
// }


// import { Injectable } from '@nestjs/common';
// import * as pidusage from 'pidusage';
// import * as si from 'systeminformation';
// import * as path from 'path';
// import { exec } from 'child_process';
// import { promisify } from 'util';

// @Injectable()
// export class MonitoringService {
//   private execPromise = promisify(exec);

//   // Define thresholds
//   private thresholds = {
//     cpuUsage: 80, // CPU usage threshold in percentage
//     memoryUsage: 1000, // Memory usage threshold in MB
//     diskUsage: 5000, // Disk usage threshold in MB
//     networkRx: 500, // Network receive threshold in MB
//     networkTx: 500, // Network transmit threshold in MB
//   };

//   async getCPUUsage(): Promise<number> {
//     try {
//       const stats = await pidusage(process.pid);
//       return stats.cpu;
//     } catch (error) {
//       console.error('Error fetching CPU usage:', error);
//       return 0;
//     }
//   }

//   async getMemoryUsage(): Promise<number> {
//     try {
//       const stats = await pidusage(process.pid);
//       return stats.memory / 1024 / 1024; // Convert to MB
//     } catch (error) {
//       console.error('Error fetching memory usage:', error);
//       return 0;
//     }
//   }

//   async getDiskUsage(): Promise<number> {
//     try {
//       const { stdout } = await this.execPromise(
//         `powershell -command "Get-ChildItem -Recurse | Measure-Object -Property Length -Sum"`,
//         { cwd: path.resolve(__dirname, '../..') }
//       );
//       const sizeInBytesMatch = stdout.match(/Sum\s+:\s+(\d+)/);
//       if (sizeInBytesMatch) {
//         const sizeInBytes = parseFloat(sizeInBytesMatch[1].trim());
//         return sizeInBytes / 1024 / 1024; // Convert to MB
//       }
//       console.error('Error parsing disk usage output:', stdout);
//       return 0;
//     } catch (error) {
//       console.error('Error fetching disk usage:', error);
//       return 0;
//     }
//   }

//   async getNetworkUsage(): Promise<{ rx: number; tx: number }> {
//     try {
//       const networkStats = await si.networkStats();

//       if (!networkStats || networkStats.length === 0) {
//         return { rx: 0, tx: 0 };
//       }

//       const rx = networkStats.reduce((acc, stat) => acc + (stat.rx_bytes || 0), 0);
//       const tx = networkStats.reduce((acc, stat) => acc + (stat.tx_bytes || 0), 0);

//       return {
//         rx: rx / 1024 / 1024, // Convert to MB
//         tx: tx / 1024 / 1024, // Convert to MB
//       };
//     } catch (error) {
//       console.error('Error fetching network usage:', error);
//       return { rx: 0, tx: 0 };
//     }
//   }

//   async getSystemMetrics(): Promise<any> {
//     try {
//       const [cpuUsage, memoryUsage, diskUsage, networkUsage] = await Promise.all([
//         this.getCPUUsage(),
//         this.getMemoryUsage(),
//         this.getDiskUsage(),
//         this.getNetworkUsage(),
//       ]);

//       // Check if any metrics exceed thresholds
//       const alerts = {
//         cpuUsage: cpuUsage > this.thresholds.cpuUsage,
//         memoryUsage: memoryUsage > this.thresholds.memoryUsage,
//         diskUsage: diskUsage > this.thresholds.diskUsage,
//         networkRx: networkUsage.rx > this.thresholds.networkRx,
//         networkTx: networkUsage.tx > this.thresholds.networkTx,
//       };

//       if (Object.values(alerts).includes(true)) {
//         // Send alert to frontend (implement notification service or websocket)
//         console.log('Alert: System metrics exceeded thresholds.');
//         // Replace this with your notification service
//         // NotificationService.sendAlert('System metrics exceeded thresholds.');
//       }

//       return {
//         cpuUsage,
//         memoryUsage,
//         diskUsage,
//         networkUsage,
//         alerts,
//       };
//     } catch (error) {
//       console.error('Error fetching system metrics:', error);
//       return {
//         cpuUsage: 0,
//         memoryUsage: 0,
//         diskUsage: 0,
//         networkUsage: { rx: 0, tx: 0 },
//         alerts: { cpuUsage: false, memoryUsage: false, diskUsage: false, networkRx: false, networkTx: false },
//       };
//     }
//   }
// }
/*

//approach 2

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
        powershell -command "Get-ChildItem -Recurse | Measure-Object -Property Length -Sum",
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
  */

import { Injectable } from '@nestjs/common';
import * as pidusage from 'pidusage';
import * as si from 'systeminformation';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Injectable()
@WebSocketGateway()
export class MonitoringService {
  private execPromise = promisify(exec);

  private cpuThreshold = 80; // Example threshold for CPU usage
  private memoryThreshold = 50; // Example threshold for memory usage in MB
  private diskThreshold = 5000; // Example threshold for disk usage in MB

  @WebSocketServer()
  server: Server;

  async getCPUUsage(): Promise<number> {
    try {
      const stats = await pidusage(process.pid);
      const cpuUsage = stats.cpu;
      if (cpuUsage > this.cpuThreshold) this.triggerAlert('CPU usage is high!');
      return cpuUsage;
    } catch (error) {
      console.error('Error fetching CPU usage:', error);
      return 0;
    }
  }

  async getMemoryUsage(): Promise<number> {
    try {
      const stats = await pidusage(process.pid);
      const memoryUsage = stats.memory / 1024 / 1024; 
      if (memoryUsage > this.memoryThreshold) this.triggerAlert('Memory usage is high!');
      return memoryUsage;
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
        const diskUsage = sizeInBytes / 1024 / 1024; 
        if (diskUsage > this.diskThreshold) this.triggerAlert('Disk usage is high!');
        return diskUsage;
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
      const rx = networkStats.reduce((acc, stat) => acc + (stat.rx_bytes || 0), 0) / 1024 / 1024; 
      const tx = networkStats.reduce((acc, stat) => acc + (stat.tx_bytes || 0), 0) / 1024 / 1024; 
      return { rx, tx };
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
      return { cpuUsage, memoryUsage, diskUsage, networkUsage };
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

  private triggerAlert(message: string) {
    // console.log(`ALERT: ${message}`);
    this.server.emit('alert', message); 
  }
}
