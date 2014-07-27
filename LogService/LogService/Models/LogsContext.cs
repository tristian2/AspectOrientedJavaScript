using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace LogService.Models
{
    public class LogsContext : DbContext
    {
        public LogsContext() : base("name=LogsContext")
        {}

        public DbSet<LogEntry>Logs{get;set;}
    }
}