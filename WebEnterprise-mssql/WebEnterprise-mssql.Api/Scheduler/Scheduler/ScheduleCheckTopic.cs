using Microsoft.Extensions.Logging;
using Quartz;
using Quartz.Impl;
using System;
using WebEnterprise_mssql.Scheduler.Job;

namespace WebEnterprise_mssql.Scheduler.Scheduler
{
    public class ScheduleCheckTopic
    {
        public ScheduleCheckTopic(ILogger<ScheduleCheckTopic> logger)
        {
            this.logger = logger;
        }
        private static readonly string ScheduleCronExpression = "0 * * ? * *";
        private readonly ILogger<ScheduleCheckTopic> logger;

        public static async System.Threading.Tasks.Task StartAsync()
        {
            try
            {
                var scheduler = await StdSchedulerFactory.GetDefaultScheduler();
                if (!scheduler.IsStarted)
                {
                    await scheduler.Start();
                }
                var job1 = JobBuilder.Create<CheckTopicDeadline>().WithIdentity("ExecuteTaskServiceCallJob1", "group1").Build();
                var trigger1 = TriggerBuilder.Create().WithIdentity("ExecuteTaskServiceCallTrigger1", "group1").WithCronSchedule(ScheduleCronExpression).Build();
                await scheduler.ScheduleJob(job1, trigger1);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
