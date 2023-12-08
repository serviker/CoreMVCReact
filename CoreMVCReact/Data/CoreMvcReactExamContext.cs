using System;
using System.Collections.Generic;
using CoreMVC_React_Exam.Models;
using Microsoft.EntityFrameworkCore;

namespace CoreMVCReact_Exam.Data;

public partial class CoreMvcReactExamContext : DbContext
{
    public CoreMvcReactExamContext()
    {
    }

    public CoreMvcReactExamContext(DbContextOptions<CoreMvcReactExamContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Contact> Contacts { get; set; }

    public virtual DbSet<PhoneNumber> PhoneNumbers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
