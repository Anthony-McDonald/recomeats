using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class UserRegistrationDto
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public int PermissionLevel { get; set; }
    }
        public class UserLoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    
      public class EditUserDto
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string EmailAddress { get; set; }
        public string PasswordHash { get; set; }
        public int PermissionLevel { get; set; }
    }  
}