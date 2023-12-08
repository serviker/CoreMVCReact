using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace CoreMVC_React_Exam.Models;

[Table("Contact")]
public partial class Contact
{
    [Key]
    [Column("contact_id")]
    public int ContactId { get; set; }

    [Column("firstName")]
    [StringLength(50)]
    [Unicode(false)]
    public string FirstName { get; set; } = null!;

    [Column("lastName")]
    [StringLength(50)]
    [Unicode(false)]
    public string LastName { get; set; } = null!;

    [Column("category_id")]
    public int CategoryId { get; set; }

}
