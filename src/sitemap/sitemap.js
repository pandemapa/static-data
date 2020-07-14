// import helper.
const each = require('lodash').each

const states = {
  ac: {
    id: 12,
    code: 'AC',
    slug: 'ac',
    name: 'Acre',
    nameSlug: 'acre'
  },
  al: {
    id: 12,
    code: 'AL',
    slug: 'al',
    name: 'Alagoas',
    nameSlug: 'alagoas'
  },
  am: {
    id: 13,
    code: 'AM',
    slug: 'am',
    name: 'Amazonas',
    nameSlug: 'amazonas'
  },
  ap: {
    id: 16,
    code: 'AP',
    slug: 'ap',
    name: 'Amapá',
    nameSlug: 'amapa'
  },
  ba: {
    id: 29,
    code: 'BA',
    slug: 'ba',
    name: 'Bahia',
    nameSlug: 'bahia'
  },
  ce: {
    id: 23,
    code: 'CE',
    slug: 'ce',
    name: 'Ceará',
    nameSlug: 'ceara'
  },
  df: {
    id: 53,
    code: 'DF',
    slug: 'df',
    name: 'Distrito Federal',
    nameSlug: 'distrito-federal'
  },
  es: {
    id: 32,
    code: 'ES',
    slug: 'es',
    name: 'Espírito Santo',
    nameSlug: 'espirito-santo'
  },
  go: {
    id: 52,
    code: 'GO',
    slug: 'go',
    name: 'Goiás',
    nameSlug: 'goias'
  },
  ma: {
    id: 21,
    code: 'MA',
    slug: 'ma',
    name: 'Maranhão',
    nameSlug: 'maranhao'
  },
  mg: {
    id: 31,
    code: 'MG',
    slug: 'mg',
    name: 'Minas Gerais',
    nameSlug: 'minas-gerais'
  },
  ms: {
    id: 50,
    code: 'MS',
    slug: 'ms',
    name: 'Mato Grosso do Sul',
    nameSlug: 'mato-grosso-do-sul'
  },
  mt: {
    id: 51,
    code: 'MT',
    slug: 'mt',
    name: 'Mato Grosso',
    nameSlug: 'mato-grosso'
  },
  pa: {
    id: 15,
    code: 'PA',
    slug: 'pa',
    name: 'Pará',
    nameSlug: 'para'
  },
  pb: {
    id: 25,
    code: 'PB',
    slug: 'pb',
    name: 'Paraíba',
    nameSlug: 'paraiba'
  },
  pe: {
    id: 26,
    code: 'PE',
    slug: 'pe',
    name: 'Pernambuco',
    nameSlug: 'pernambuco'
  },
  pi: {
    id: 22,
    code: 'PI',
    slug: 'pi',
    name: 'Piauí',
    nameSlug: 'piaui'
  },
  pr: {
    id: 41,
    code: 'PR',
    slug: 'pr',
    name: 'Paraná',
    nameSlug: 'parana'
  },
  rj: {
    id: 33,
    code: 'RJ',
    slug: 'rj',
    name: 'Rio de Janeiro',
    nameSlug: 'rio-de-janeiro'
  },
  rn: {
    id: 24,
    code: 'RN',
    slug: 'rn',
    name: 'Rio Grande do Norte',
    nameSlug: 'rio-grande-do-norte'
  },
  ro: {
    id: 11,
    code: 'RO',
    slug: 'ro',
    name: 'Rondônia',
    nameSlug: 'rondonia'
  },
  rr: {
    id: 14,
    code: 'RR',
    slug: 'rr',
    name: 'Roraima',
    nameSlug: 'roraima'
  },
  rs: {
    id: 43,
    code: 'RS',
    slug: 'rs',
    name: 'Rio Grande do Sul',
    nameSlug: 'rio-grande-do-sul'
  },
  sc: {
    id: 42,
    code: 'SC',
    slug: 'sc',
    name: 'Santa Catarina',
    nameSlug: 'santa-catarina'
  },
  se: {
    id: 28,
    code: 'SE',
    slug: 'se',
    name: 'Sergipe',
    nameSlug: 'sergipe'
  },
  sp: {
    id: 35,
    code: 'SP',
    slug: 'sp',
    name: 'São Paulo',
    nameSlug: 'sao-paulo'
  },
  to: {
    id: 17,
    code: 'TO',
    slug: 'to',
    name: 'Tocantins',
    nameSlug: 'tocantins'
  }
}

each(states, (state) => {
  console.log('Sitemap: https://covid.pandemapa.com.br/sitemap-br-' + state.slug + '.xml')
  // console.log(`https://covid.pandemapa.com.br/mapa/br/estado/${state.slug}/confirmados`)
  /// console.log(`https://covid.pandemapa.com.br/mapa/br/estado/${state.slug}/mortes`)
  // console.log(`https://covid.pandemapa.com.br/tabela/br/estado/${state.slug}`)
})
