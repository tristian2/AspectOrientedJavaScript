using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplicationRestLog.Models;

namespace WebApplicationRestLog.Services
{
    public class LogRepository
    {
        public Log[] GetAllLogEntries()
        {
            return new Log[]
            {
                new Log
                {
                    Date="22/6/2014",
                    Time="17:00:23",
                    ErrorMessage ="division by zero"
                 
                },
                new Log
                {
                    Date="22/6/2014",
                    Time="17:00:23",
                    ErrorMessage ="division by zero"
                 
                }
            };
        }
    }
}