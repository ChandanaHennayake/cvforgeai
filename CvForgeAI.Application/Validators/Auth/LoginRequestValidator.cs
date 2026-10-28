using CvForgeAI.Application.DTO.Auth;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace CvForgeAI.Application.Validators.Auth
{
   public class LoginRequestValidator : AbstractValidator<LoginRequest>
    {

        public LoginRequestValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty()
                .WithMessage("Email is required.")
                .EmailAddress()
                .WithMessage("Invalid email format.");

            RuleFor(x => x.Password)
                .NotEmpty()
                .WithMessage ("Passwrd is required.")
                .MinimumLength(8)
                .WithMessage("Password must be at least 6 characters.");

        }
    }
}
