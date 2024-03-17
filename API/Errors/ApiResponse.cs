using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statueCode, string message = null)
        {
            StatueCode = statueCode;
            Message = message ?? GetDefaultMessageForStatusCode(statueCode);
        }

        public int StatueCode { get; set; }
        public string Message { get; set; }

        private string GetDefaultMessageForStatusCode(int statueCode)
        {
            return statueCode switch
            {
                400 => "A Bad Request, You Have Made",
                401 => "Authorized, You Are Not",
                404 => "Restore Found, It Was Not",
                500 => "Errors Are The Path To The Dark Side", 
                _ => null
            };
        }
    }
}