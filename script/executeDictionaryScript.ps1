

#create a new file
$outputFile = "C:\Users\IvanS\Desktop\zadatak\dictionaryData.js"
New-Item -ItemType File -Path $newFile


#get raw dictionary content
$dictionaryPath = "C:\Users\IvanS\Desktop\zadatak\dictionary.txt"
$rawDictionaryContent = Get-Content $dictionaryPath

# Define the desired length
#$desiredLength = 5

# Filter the lines based on length
$filteredLines = $rawDictionaryContent | Select-String -Pattern "^.{6}$"

#set qoutes on every line, set comma on the end of the line
$formatedDictionaryContent = $filteredLines | % { $_ -replace '^(.*?)|$', '"' } | % { $_ -replace '$', ',' }



$outputData = "const data = [`r`n$formatedDictionaryContent `r`n ]"


$outputData | Set-Content $outputFile