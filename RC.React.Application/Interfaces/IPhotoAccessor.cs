using Microsoft.AspNetCore.Http;
using RC.React.Application.Photos;

namespace RC.React.Application.Interfaces;

public interface IPhotoAccessor
{
    Task<PhotoUploadResult> AddPhoto(IFormFile file);
    Task<string> DeletePhoto(string publicId);
}