using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiException : ApiResponse
    {
        public ApiException(int statueCode, string message = null, string details
        = null) : base(statueCode, message)
        {
            Details = details;
        }
        public string Details { get; set; }
    }
}