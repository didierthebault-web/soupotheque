$ErrorActionPreference='Stop'
New-Item -ItemType Directory -Force -Path 'docs/ricardo-source' | Out-Null
$rows=Get-Content -Raw -LiteralPath 'docs/ricardo-page-1.json' | ConvertFrom-Json
foreach($row in $rows){
 $path="docs/ricardo-source/$($row.id).html"
 if(-not(Test-Path -LiteralPath $path)){Invoke-WebRequest -Uri ('https://www.ricardocuisine.com/recettes/'+$row.url) -OutFile $path -TimeoutSec 40}
 $html=Get-Content -Raw -LiteralPath $path
 $schemas=[regex]::Matches($html,'(?is)<script[^>]+type=["'']application/ld\+json["''][^>]*>(.*?)</script>')
 foreach($schema in $schemas){try{$parsed=$schema.Groups[1].Value | ConvertFrom-Json -Depth 60;if($parsed.'@type' -eq 'Recipe'){$parsed|ConvertTo-Json -Depth 60|Set-Content -Encoding UTF8 -LiteralPath "docs/ricardo-source/$($row.id).json"}}catch{}}
 Write-Output "Référence $($row.id) consultée"
}
