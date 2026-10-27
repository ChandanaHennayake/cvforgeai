using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CvForgeAI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ExtendResumeContactAndStyling : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Resumes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "Resumes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "GitHubUrl",
                table: "Resumes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LinkedInUrl",
                table: "Resumes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Resumes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Resumes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PortfolioUrl",
                table: "Resumes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ProfessionalTitle",
                table: "Resumes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TemplateId",
                table: "Resumes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ThemeColorHex",
                table: "Resumes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Resumes");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "Resumes");

            migrationBuilder.DropColumn(
                name: "GitHubUrl",
                table: "Resumes");

            migrationBuilder.DropColumn(
                name: "LinkedInUrl",
                table: "Resumes");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "Resumes");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Resumes");

            migrationBuilder.DropColumn(
                name: "PortfolioUrl",
                table: "Resumes");

            migrationBuilder.DropColumn(
                name: "ProfessionalTitle",
                table: "Resumes");

            migrationBuilder.DropColumn(
                name: "TemplateId",
                table: "Resumes");

            migrationBuilder.DropColumn(
                name: "ThemeColorHex",
                table: "Resumes");
        }
    }
}
