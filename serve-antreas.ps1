$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:8001/')
$listener.Start()

Write-Host "Server running at http://localhost:8001/" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow

$basePath = Join-Path $PSScriptRoot "docs"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $localPath = $request.Url.LocalPath
    if ($localPath -eq '/') {
        $localPath = '/index.html'
    }
    
    $filePath = Join-Path $basePath $localPath.TrimStart('/')
    
    if (Test-Path $filePath -PathType Leaf) {
        $content = [System.IO.File]::ReadAllBytes($filePath)
        $response.ContentLength64 = $content.Length
        
        # Set content type based on file extension
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        switch ($ext) {
            '.html' { $response.ContentType = 'text/html; charset=utf-8' }
            '.css' { $response.ContentType = 'text/css' }
            '.js' { $response.ContentType = 'application/javascript' }
            '.png' { $response.ContentType = 'image/png' }
            '.jpg' { $response.ContentType = 'image/jpeg' }
            '.jpeg' { $response.ContentType = 'image/jpeg' }
            '.webp' { $response.ContentType = 'image/webp' }
            '.yaml' { $response.ContentType = 'text/yaml' }
            '.yml' { $response.ContentType = 'text/yaml' }
            default { $response.ContentType = 'application/octet-stream' }
        }
        
        $response.OutputStream.Write($content, 0, $content.Length)
        Write-Host "$($request.HttpMethod) $localPath - 200" -ForegroundColor Green
    } else {
        $response.StatusCode = 404
        $notFound = [System.Text.Encoding]::UTF8.GetBytes('404 Not Found')
        $response.ContentLength64 = $notFound.Length
        $response.OutputStream.Write($notFound, 0, $notFound.Length)
        Write-Host "$($request.HttpMethod) $localPath - 404" -ForegroundColor Red
    }
    
    $response.Close()
}

