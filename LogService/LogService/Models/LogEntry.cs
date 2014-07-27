using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Linq;
using System.Web;

namespace LogService.Models
{
    public class LogEntry
    {
        //Date 	time 	Type	 ip 	error
        [Key]
        public int RowId { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public string Type { get; set; }
        public string IP { get; set; }
        public string Error { get; set; }

        public string Self
        {
            get
            {
                return string.Format(CultureInfo.CurrentCulture,
                    "api/log/{0}", this.RowId);
            }
            set { }
        }
    }
}