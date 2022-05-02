using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Quartz;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebEnterprise_mssql.Api.Models;
using WebEnterprise_mssql.Api.Repository;
using WebEnterprise_mssql.Api.Services;

namespace WebEnterprise_mssql.Scheduler.Job
{
    [DisallowConcurrentExecution]
    public class CheckTopicDeadlineJob : IJob
    {
        private readonly IRepositoryWrapper repo;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly ISendMailService mailService;

        public CheckTopicDeadlineJob(
            IRepositoryWrapper repo,
            UserManager<ApplicationUser> userManager,
            ISendMailService mailService
            )
        {
            this.repo = repo;
            this.userManager = userManager;
            this.mailService = mailService;
        }
        public Task Execute(IJobExecutionContext context)
        {
            var task = Task.Run(async () => await CheckAllTopicAsync());
            return task;
        }
        //private void LogConsole()
        //{
        //    Console.WriteLine(DateTimeOffset.UtcNow.ToString());
        //}
        private async Task CheckAllTopicAsync()
        {
           
            var listTopic = await repo.Topics
                .FindAll().ToListAsync();
            if (!listTopic.Count.Equals(0))
            {
                foreach (var topic in listTopic)
                {
                    //Send mail
                    try
                    {
                        await SendMailNoti(topic.TopicName);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                    }
                }
            }
        }

        private async Task SendMailNoti(string topicName)
        {
            //Get All QAM user
            var listUsers = await repo.Users
                .FindAll().ToListAsync();
            List<ApplicationUser> listQam = new();
            foreach (var user in listUsers)
            {
                var role = await userManager.GetRolesAsync(user);
                if (role.Contains("qam"))
                {
                    listQam.Add(user);
                }
            }

            MailContent mailContent = new();
            mailContent.Subject = "Reminder";
            mailContent.Body = $"This is a reminder for all QAM that the topic {topicName}'s Final closure date is due!\nDate Time Now: ({DateTimeOffset.UtcNow})";

            foreach (var user in listQam)
            {
                mailContent.To = user.Email;
                try
                {
                    await mailService.SendMail(mailContent);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }
    }
}
