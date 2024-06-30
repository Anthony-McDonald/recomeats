using System.Threading.Tasks;

namespace YourNamespace.Services
{
    public interface IOpenAIService
    {
        Task<string> CallChat(string message);
    }
}
