# PandeMapa - Static Data

This repository aggregates static data such geographic information, maps and other related resources.

## Source and Licensing

The licensing of each resource here may vary, the following list describe where it came from and how to properly check it's licensing.

### Maps

#### raw/geo/br/all/cities.json:
  
Extracted from IBGE's "Malhas" API and processed as following:

Downloaded raw file:

```
curl -vvv -XGET 'https://servicodados.ibge.gov.br/api/v2/malhas?resolucao=5&qualidade=4&formato=application/vnd.geo+json' --output cities-original.json
```

Renamed "codarea" field to "id":
```
mapshaper -i cities-original.json -rename-fields fields="id=codarea" -o cities.json force
```
  
Remove other fields (only keep ID):
```
mapshaper -i cities.json -filter-fields fields="id" -o cities.json force
```  

Clear intersections and overlapping lines.
```
mapshaper -i cities.json -clean -o cities.json force
```



- Source URL:
  
  https://servicodados.ibge.gov.br/api/v2/malhas?resolucao=5&qualidade=4&formato=application/vnd.geo+json
  
- More Information:
  
  https://servicodados.ibge.gov.br/api/docs/malhas?versao=2