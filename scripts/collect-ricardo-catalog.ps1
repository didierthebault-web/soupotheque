$ErrorActionPreference='Stop'
New-Item -ItemType Directory -Force -Path '.cache/ricardo-listings' | Out-Null
$all=@{}
$pages=@()
for($page=1;$page -le 17;$page++){
 $path=".cache/ricardo-listings/page-$page.html"
 if(-not(Test-Path -LiteralPath $path)){
  $url="https://www.ricardocuisine.com/recettes/entrees/soupes-et-potages?currentPage=$page&grouping-id=2168&grouping-type=2&content-type=recipe&sort=recent&searchValue="
  Invoke-WebRequest -Uri $url -OutFile $path -TimeoutSec 45
 }
 $html=Get-Content -Raw -LiteralPath $path
 $stateLine=($html -split "`n") | Where-Object { $_.TrimStart().StartsWith('{"user":') }
 $state=$stateLine | ConvertFrom-Json -Depth 80
 $result=$state.routeProps.results.content.results
 if(-not $result.rows){throw "Page $page sans données"}
 if($result.currentPage -ne $page){throw "Mauvaise pagination $page"}
 foreach($row in $result.rows){$all[[string]$row.id]=$row}
 $pages+=@{page=$page;count=$result.rows.Count;reportedTotal=$result.totalFound}
 Write-Output "Page $page : $($result.rows.Count) recettes"
}
@{collectedAt='2026-11-13';pages=$pages;count=$all.Count;rows=@($all.Values | Sort-Object id -Descending)} | ConvertTo-Json -Depth 50 | Set-Content -Encoding UTF8 -LiteralPath '.cache/ricardo-catalog.json'
Write-Output "Total unique : $($all.Count) recettes"
