using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoreMVCReact_Exam.Migrations
{
    /// <inheritdoc />
    public partial class SeedCategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
            SET IDENTITY_INSERT[dbo].[Category] ON
INSERT INTO[dbo].[category] ([category_id], [name]) VALUES(1, N'Family')
INSERT INTO[dbo].[category] ([category_id], [name]) VALUES(2, N'Friends')
INSERT INTO[dbo].[category] ([category_id], [name]) VALUES(3, N'Work')
INSERT INTO[dbo].[category] ([category_id], [name]) VALUES(4, N'Other')
SET IDENTITY_INSERT[dbo].[Category] OFF
");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
