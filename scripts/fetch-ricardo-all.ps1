$ErrorActionPreference='Stop'
New-Item -ItemType Directory -Force -Path '.cache/ricardo-source' | Out-Null
$root=(Get-Location).Path
$rows=(Get-Content -Raw -LiteralPath '.cache/ricardo-catalog.json' | ConvertFrom-Json -Depth 60).rows
$rows | ForEach-Object -Parallel {
 $row=$_
 $path=Join-Path $using:root ".cache/ricardo-source/$($row.id).html"
 $old=Join-Path $using:root "docs/ricardo-source/$($row.id).html"
 if(Test-Path -LiteralPath $old){Copy-Item -LiteralPath $old -Destination $path}
 if(-not(Test-Path -LiteralPath $path)){
  try{Invoke-WebRequest -Uri ('https://www.ricardocuisine.com/recettes/'+$row.url) -OutFile $path -TimeoutSec 40 -ErrorAction Stop | Out-Null}
  catch{Write-Output "À reprendre : $($row.id)";return}
 }
 Write-Output "Vérifiée : $($row.id)"
} -ThrottleLimit 3
