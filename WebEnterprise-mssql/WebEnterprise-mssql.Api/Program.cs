using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Quartz;
using WebEnterprise_mssql.Scheduler.Job;

namespace WebEnterprise_mssql.Api
{
    public class Program
    {
        private static readonly string ScheduleCronExpression = "0/5 * * * * ?";
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                })
                .ConfigureServices((hostContext, services) =>
                {
                    // Add the required Quartz.NET services
                    services.AddQuartz(q =>
                    {
                        // Use a Scoped container to create jobs. I'll touch on this later
                        q.UseMicrosoftDependencyInjectionScopedJobFactory();

                        // Create a "key" for the job
                        var jobKey = new JobKey("CheckTopicDeadlineJob");

                        // Register the job with the DI container
                        q.AddJob<CheckTopicDeadlineJob>(opts => opts.WithIdentity(jobKey));

                        // Create a trigger for the job
                        q.AddTrigger(opts => opts
                            .ForJob(jobKey) // link to the CheckTopicDeadlineJob
                            .WithIdentity("HelloWorldJob-trigger") // give the trigger a unique name
                            .WithCronSchedule(ScheduleCronExpression)); // run every 5 seconds
                    });

                    // Add the Quartz.NET hosted service

                    services.AddQuartzHostedService(
                        q => q.WaitForJobsToComplete = true);

                    // other config
                });
    }
}
