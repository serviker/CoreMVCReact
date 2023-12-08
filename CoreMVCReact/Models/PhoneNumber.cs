using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace CoreMVC_React_Exam.Models;

[Table("PhoneNumber")]
public partial class PhoneNumber
{
    [Key]
    [Column("phone_id")]
    public int PhoneId { get; set; }

    [Column("phone_number")]
    [StringLength(11)]
    [Unicode(false)]
    public string NumPhone { get; set; } = null!;

    [Column("contact_id")]
    public int ContactId { get; set; }

}
