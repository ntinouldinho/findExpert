Write-Host "Congratulations! Now we run!"
# "yarn install" | cmd
start-process $ENV:SystemRoot\system32\cmd.exe -argumentlist ('/k node server.js') -windowstyle minimized
$PATH = Get-Location
Set-Location -Path $PATH"\client" -PassThru
start-process $ENV:SystemRoot\system32\cmd.exe -argumentlist ('/k yarn start') -windowstyle minimized
Set-Location -Path $PATH -PassThru