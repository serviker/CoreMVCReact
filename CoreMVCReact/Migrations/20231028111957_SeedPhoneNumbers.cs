using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoreMVCReact_Exam.Migrations
{
    /// <inheritdoc />
    public partial class SeedPhoneNumbers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
SET IDENTITY_INSERT [dbo].[PhoneNumber] ON
INSERT INTO [dbo].[phoneNumber] ([phone_id], [phone_number], [contact_id]) VALUES (2, N'89875675655', 1)
INSERT INTO [dbo].[phoneNumber] ([phone_id], [phone_number], [contact_id]) VALUES (3, N'89873435453', 2)
INSERT INTO [dbo].[phoneNumber] ([phone_id], [phone_number], [contact_id]) VALUES (4, N'89876554554', 2)
INSERT INTO [dbo].[phoneNumber] ([phone_id], [phone_number], [contact_id]) VALUES (5, N'89864656376', 3)
INSERT INTO [dbo].[phoneNumber] ([phone_id], [phone_number], [contact_id]) VALUES (6, N'89875647234', 3)
INSERT INTO [dbo].[phoneNumber] ([phone_id], [phone_number], [contact_id]) VALUES (7, N'89875645635', 4)
INSERT INTO [dbo].[phoneNumber] ([phone_id], [phone_number], [contact_id]) VALUES (8, N'89876453453', 4)
INSERT INTO [dbo].[phoneNumber] ([phone_id], [phone_number], [contact_id]) VALUES (9, N'89874556456', 5)
INSERT INTO [dbo].[phoneNumber] ([phone_id], [phone_number], [contact_id]) VALUES (10, N'89875645453', 5)
INSERT INTO [dbo].[phoneNumber] ([phone_id], [phone_number], [contact_id]) VALUES (11, N'89875645345', 6)
INSERT INTO [dbo].[phoneNumber] ([phone_id], [phone_number], [contact_id]) VALUES (12, N'89874545546', 7)
INSERT INTO [dbo].[phoneNumber] ([phone_id], [phone_number], [contact_id]) VALUES (13, N'89867587587', 8)
INSERT INTO [dbo].[phoneNumber] ([phone_id], [phone_number], [contact_id]) VALUES (14, N'89875454342', 8)
INSERT INTO [dbo].[phoneNumber] ([phone_id], [phone_number], [contact_id]) VALUES (15, N'89875453423', 9)
INSERT INTO [dbo].[phoneNumber] ([phone_id], [phone_number], [contact_id]) VALUES (16, N'89876566556', 10)
SET IDENTITY_INSERT [dbo].[PhoneNumber] OFF

");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
