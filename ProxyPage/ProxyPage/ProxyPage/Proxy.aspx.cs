using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Security;
using System.Web;
using System.Web.Http;

namespace ProxyPage
{
    public partial class Proxy : System.Web.UI.Page
    {
        protected override void OnInit(EventArgs e)
        {
            //roll the dice for a broken response - causing mayhem and some interesting logs!
            if (BrokenRespose())
            {
                return;
            }
            else
            {
                this.ProcessProxyRequest();
            }
        }
        protected void ProcessProxyRequest()
        {


            string queryStringURI = string.Empty;
            string queryStringMode = string.Empty;
            try
            {
                queryStringURI = HttpUtility.UrlDecode(base.Request.QueryString["u"]);
            }
            catch
            {
                //"My Proxy: 01 - No URL provided.");
                return;
            }
            try
            {
                //looking to see if a RESTful request was asked for
                queryStringMode = HttpUtility.UrlDecode(base.Request.QueryString["m"]);
            }
            catch
            {
                //assume a suitelet so carry on as the old way

            }

            if (!string.IsNullOrEmpty(queryStringMode))
            {

                //implement the restful mode to nestsuite - only GET at this point
                try
                {
                    HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create(queryStringURI);
                    httpWebRequest.AllowAutoRedirect = true;
                    httpWebRequest.Method = "GET";
                    httpWebRequest.ContentType = "application/json";                                                            
                    HttpWebResponse httpWebResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                    if (!(httpWebResponse.StatusCode.ToString().ToLower() == "ok"))
                    {
                        //this.ThrowSharePointError("Mimecast TK Proxy (REST mode): 02 - Error retrieving specified URL.");
                        return;
                    }
                    string contentType = httpWebResponse.ContentType;
                    Stream responseStream = httpWebResponse.GetResponseStream();
                    if (responseStream == null)
                    {
                        //this.ThrowSharePointError("Mimecast TK Proxy (REST mode): 01 - Error retrieving specified URL.");
                        return;
                    }
                    StreamReader streamReader = new StreamReader(responseStream);
                    base.Response.ClearHeaders();
                    base.Response.Clear();
                    base.Response.ContentType = contentType;
                    base.Response.Write(streamReader.ReadToEnd());
                    base.Response.StatusCode = 500;
                    base.Response.Flush();
                }
                catch (Exception ex)
                {
                    base.Response.Write("Mimecast TK Proxy (REST mode): " + ex.Message);
                }
                return;
            }

            else if (!string.IsNullOrEmpty(queryStringURI))
            {
                try
                {
                    HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create(queryStringURI);
                    httpWebRequest.AllowAutoRedirect = true;
                    httpWebRequest.Method = "GET";                    
                    HttpWebResponse httpWebResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                    if (!(httpWebResponse.StatusCode.ToString().ToLower() == "ok"))
                    {
                        //this.ThrowSharePointError("Mimecast TK Proxy (GET mode): 02 - Error retrieving specified URL.");
                        return;
                    }
                    string contentType = httpWebResponse.ContentType;
                    Stream responseStream = httpWebResponse.GetResponseStream();
                    if (responseStream == null)
                    {
                        //this.ThrowSharePointError("Mimecast TK Proxy (GET mode): 01 - Error retrieving specified URL.");
                        return;
                    }
                    StreamReader streamReader = new StreamReader(responseStream);
                    base.Response.ClearHeaders();
                    base.Response.Clear();
                    base.Response.ContentType = contentType;
                    base.Response.Write(streamReader.ReadToEnd());
                    base.Response.Flush();
                }
                catch (Exception ex)
                {
                    base.Response.Write(ex.Message);
                }
                return;
            }
            //this.ThrowSharePointError("Mimecast TK Proxy: 02 - No URL provided.");
        }
        private bool BrokenRespose()
        {
            var brokenResponse = false;
            Random rnd = new Random();
            int dice = rnd.Next(1, 3);

            if (dice % 2 != 0)
            {
                //wann invoke an error delibrately
                try
                {
                    var notFoundResponse = new HttpResponseMessage(HttpStatusCode.InternalServerError);
                    throw new HttpResponseException(notFoundResponse);
                }
                catch (HttpResponseException hex)
                {
                    base.Response.Write(hex.Response);
                    brokenResponse = true;
                }
            }
            return brokenResponse;
        }
    }
}