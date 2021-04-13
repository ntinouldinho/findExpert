Write-Host "Congratulations! Now we run!"
# "yarn install" | cmd
$PATH = Get-Location
$server = "PowerShell.exe", "-NoExit", "-Command", "& { `$Host.UI.RawUI.WindowTitle='FindExpertServer'\; `$Path\; Push-Location $Path\; node server.js}"
$run = "PowerShell.exe", "-NoExit", "-Command", "& {`$Host.UI.RawUI.WindowTitle='FindExpertRun'\;`$Path\;Push-Location $Path\client\;yarn start}"
$build =$server + ';' + $run
Start-Process wt.exe -ArgumentList $build
# start-process $ENV:SystemRoot\system32\cmd.exe -argumentlist ('/k node server.js') -windowstyle minimized
# start-process wt.exe -argumentlist ('-d "%cd%" cmd') 
# Start-Process wt.exe -ArgumentList "PowerShell.exe", "-NoExit", "-Command", "& {Start-Process -PassThru chrome.exe https://stackoverflow.com/}"
# Start-Process wt.exe  "cmd" ; wt.exe -NoNewWindow "PowerShell.exe", "-NoExit", "-Command", "& {`$Host.UI.RawUI.WindowTitle='FindExpertServer'\;`$Path\;Push-Location $Path\;node server.js}"
# Start-Process wt.exe -ArgumentList "PowerShell.exe", "-NoExit", "-Command", "& {`$Host.UI.RawUI.WindowTitle='FindExpertRun'\;`$Path\;Push-Location $Path\client\;yarn start}"
# Start-Process wt.exe -ArgumentList "PowerShell.exe", "-NoExit", "-Command", "& {$Host.UI\; $PWD.Path}"; "PowerShell.exe", "-NoExit", "-Command", "& {$PWD.Path\;$Host.UI}"
# Start-Process wt.exe 'PowerShell.exe -NoExit -Command "& {$Path\;Push-Location $Path\;node server.js}"'
# $PATH = Get-Location
# Set-Location -Path $PATH"\client" -PassThru
# start-process $ENV:SystemRoot\system32\cmd.exe -argumentlist ('/k yarn start') -windowstyle minimized
# Set-Location -Path $PATH -PassThru
# wt PowerShell.exe -NoExit -Command "& {$Host.UI\; $PWD.Path}"; PowerShell.exe -NoExit -Command "& {$PWD.Path\;$Host.UI}"
