using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoreMVCReact_Exam.Migrations
{
    /// <inheritdoc />
    public partial class SeedContacts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
            SET IDENTITY_INSERT[dbo].[Contact] ON
INSERT INTO[dbo].[contact] ([contact_id], [firstName], [lastName]) VALUES(1, N'Alex', N'Petrov')
INSERT INTO[dbo].[contact] ([contact_id], [firstName], [lastName]) VALUES(2, N'Anna', N'Sidorova')
INSERT INTO[dbo].[contact] ([contact_id], [firstName], [lastName]) VALUES(3, N'Alla', N'Sedakova')
INSERT INTO[dbo].[contact] ([contact_id], [firstName], [lastName]) VALUES(4, N'Miha', N'Govrilov')
INSERT INTO[dbo].[contact] ([contact_id], [firstName], [lastName]) VALUES(5, N'Roma', N'Nikonorov')
INSERT INTO[dbo].[contact] ([contact_id], [firstName], [lastName]) VALUES(6, N'Masha', N'Mihailova')
INSERT INTO[dbo].[contact] ([contact_id], [firstName], [lastName]) VALUES(7, N'Alexandra', N'Petrova')
INSERT INTO[dbo].[contact] ([contact_id], [firstName], [lastName]) VALUES(8, N'Olga', N'Sidorova')
INSERT INTO[dbo].[contact] ([contact_id], [firstName], [lastName]) VALUES(9, N'Masha', N'Govrilova')
INSERT INTO[dbo].[contact] ([contact_id], [firstName], [lastName]) VALUES(10, N'Rima', N'Nikonorova')
SET IDENTITY_INSERT[dbo].[Contact] OFF
");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
