using Domain.Models;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace Api.Filters
{
    public class EditorContentTextLengthAttribute : ValidationAttribute
    {
        private readonly int _maxLength;

        public EditorContentTextLengthAttribute(int maxLength)
        {
            _maxLength = maxLength;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value is string str && !String.IsNullOrEmpty(str))
            {
                EditorContent content;
                try
                {

                    content = JsonSerializer.Deserialize<EditorContent>(str,
                        new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
                      
                       
                }
                catch (JsonException)
                {
                    return new ValidationResult($"Invalid JSON format for field {validationContext.DisplayName}");
                }

                if (content != null && content.Text.Length > _maxLength)
                {
                    return new ValidationResult(GetErrorMessage(validationContext.DisplayName));
                }
            }

            return ValidationResult.Success;
        }

        private string GetErrorMessage(string memberName)
        {
            return $"The field {memberName} Text cannot have more than {_maxLength} characters.";
        }
    }
}
