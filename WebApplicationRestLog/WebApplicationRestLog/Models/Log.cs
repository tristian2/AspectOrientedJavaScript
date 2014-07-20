using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplicationRestLog.Models
{
    public class Log
    {
        public String Date { get; set; }
        public String Time { get; set; }
        //c-ip client ip address
        public String ErrorMessage {get;set;}
    }
}