using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace YourNamespace.Services
{
    public class OpenAIService : IOpenAIService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public OpenAIService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<string> CallChat(string message)
        {
            var apiKey = _configuration["OpenAI:ApiKey"];
            var openaiUrl = "https://api.openai.com/v1/engines/gpt-3.5-turbo/completions";

            var requestData = new
            {
                messages = new[]
                {
                    new { role = "system", content = message }
                },
                model = "gpt-3.5-turbo",
                temperature = 0.01
            };

            var requestJson = JsonSerializer.Serialize(requestData);
            var requestContent = new StringContent(requestJson, Encoding.UTF8, "application/json");

            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

            var response = await _httpClient.PostAsync(openaiUrl, requestContent);

            if (!response.IsSuccessStatusCode)
            {
                throw new ApplicationException($"Failed to call OpenAI API. Status code: {response.StatusCode}");
            }

            var responseJson = await response.Content.ReadAsStringAsync();
            dynamic responseObject = JsonSerializer.Deserialize<dynamic>(responseJson);

            return responseObject.choices[0].text;
        }
    }
}
