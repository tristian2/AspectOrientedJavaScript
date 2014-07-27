using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.OData;
using LogService.Models;

namespace LogService.Controllers
{
    public class LogsController : ODataController
    {
        LogsContext db = new LogsContext();
        private bool LogEntryExists(int key)
        {
            return db.Logs.Any(p => p.RowId == key);
        }
        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }

        //to facilitate querying the entities
        [EnableQuery]
        public IQueryable<LogEntry> Get()
        {
            return db.Logs;
        }
        [EnableQuery]
        public SingleResult<LogEntry>Get([FromODataUri] int key)
        {
            IQueryable<LogEntry> result = db.Logs.Where(p => p.RowId == key);
            return SingleResult.Create(result);
        }

        //to support the writing of logentries to the entity set
        public async Task<IHttpActionResult> Post (LogEntry logEntry)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Logs.Add(logEntry);
            await db.SaveChangesAsync();
            return Created(logEntry);
 
        }

        //finally to support updating of a record PATCH http verb for updating and PUT for 
        //complete replacement of the entity entirely.  for PATCH the controller uses the Deltat<T>
        //to track the changes
        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<LogEntry> logEntry)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var entity = await db.Logs.FindAsync(key);
            if (entity == null)
            {
                return NotFound();
            }
            logEntry.Patch(entity);
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LogEntryExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Updated(entity);
        }
        public async Task<IHttpActionResult> Put ([FromODataUri]int key, LogEntry update)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (key != update.RowId)
            {
                return BadRequest();
            }
            db.Entry(update).State = EntityState.Modified;
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LogEntryExists(key))
                {
                    return NotFound();   
                }
                else
                {
                    throw;
                }
            }
            return Updated(update);
        }

        //entity deletion
        public async Task<IHttpActionResult> Delete([FromODataUri]int key)
        {
            var logEntry = await db.Logs.FindAsync(key);
            if (logEntry == null)
            {
                return NotFound();
            }
            db.Logs.Remove(logEntry);
            await db.SaveChangesAsync();
            return StatusCode(HttpStatusCode.NoContent);
        }


    }
}