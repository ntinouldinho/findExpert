Write-Host "Welcome to findExpert!"
# "yarn install" | cmd
$PATH = Get-Location
$server = "PowerShell.exe", "-NoExit", "-Command", "& { `$Host.UI.RawUI.WindowTitle='FindExpertServer'\; `$Path\; Push-Location $Path\; nodemon server.js}"
$run = "PowerShell.exe", "-NoExit", "-Command", "& {`$Host.UI.RawUI.WindowTitle='FindExpertRun'\;`$Path\;Push-Location $Path\client\;yarn start}"
$build = $server + ';' + $run
Start-Process wt.exe -ArgumentList $build
