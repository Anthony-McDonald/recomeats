using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
   public class UserPermission 
{
    [Key]
    public int PermissionId { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }

    public int PermissionLevel { get; set; }

    public User User { get; set; }
}
}