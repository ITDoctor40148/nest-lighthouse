import { Controller, Get } from '@nestjs/common';
import * as lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

@Controller('lighthouse')
export class LighthouseController {
  @Get()
  lighthouse(): Promise<string> {
    /* chromeLauncher
      .launch()
      .then(async (value: chromeLauncher.LaunchedChrome) => {
        const options = {
          logLevel: 'info',
          output: 'json',
          onlyCategories: ['performance'],
          port: value.port,
        };
        const runnerResult = await lighthouse('https://reactjs.org/', options);

        const reportJson = runnerResult.report;
        console.log(reportJson);
        value.kill();
      })
      .catch((err: any) => console.log(err)); */
    const report = this.getReport();
    console.log(report);

    return report;
  }

  private async getReport(): Promise<string> {
    const report = await chromeLauncher
      .launch()
      .then(async (value: chromeLauncher.LaunchedChrome) => {
        const options = {
          logLevel: 'info',
          output: 'json',
          onlyCategories: ['performance'],
          port: value.port,
        };
        const runnerResult = await lighthouse('https://reactjs.org/', options);

        const reportJson = runnerResult.report;
        console.log(reportJson);
        value.kill();
        return reportJson;
      })
      .catch((err: any) => console.log(err));
    return report;
  }
}
