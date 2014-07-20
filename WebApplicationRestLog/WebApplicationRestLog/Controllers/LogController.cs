using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplicationRestLog.Models;
using WebApplicationRestLog.Services;

namespace WebApplicationRestLog.Controllers
{
    public class LogController : ApiController
    {
        private LogRepository logRepository;

        public LogController()
        {
            this.logRepository = new LogRepository();
        }

        // GET api/log
        /*public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }*/
        /*public Log[] Get()
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
        }*/
        public Log[] Get()
        {
            return logRepository.GetAllLogEntries();
        }

        // GET api/log/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/log
        public void Post([FromBody]string value)
        {
        }

        // PUT api/log/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/log/5
        public void Delete(int id)
        {
        }
    }
}
