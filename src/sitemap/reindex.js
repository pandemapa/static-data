const path = require('path')
// const request = require('request')
const { google } = require('googleapis')
const key = require(path.resolve(__dirname, '../../service_account.json'))
const axios = require('axios')
const map = require('lodash').map

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

const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/indexing'],
  null
)

jwtClient.authorize(function (err, tokens) {
  if (err) {
    console.log('JWT error', err)
    return
  }
  console.log(tokens.access_token)

  const endpoint = 'https://indexing.googleapis.com/v3/urlNotifications:publish'

  const options = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${tokens.access_token}`
    }
  }

  const makeBody = (url) => {
    return {
      url: url,
      type: 'URL_UPDATED'
    }
  }

  map(states, async (state) => {
    console.log(`https://covid.pandemapa.com.br/tabela/br/estado/${state.slug}`)
  })
  map(states, async (state) => {
    console.log(`https://covid.pandemapa.com.br/mapa/br/estado/${state.slug}/confirmados`)
  })
  map(states, async (state) => {
    console.log(`https://covid.pandemapa.com.br/mapa/br/estado/${state.slug}/mortes`)
  })
  map(states, async (state) => {
    // console.log(`https://covid.pandemapa.com.br/tabela/br/estado/${state.slug}`)
    // setTimeout(function () {
    //   console.log('waiting...')
    // }, 1000)
    // return await axios.post(endpoint, makeBody(`https://covid.pandemapa.com.br/tabela/br/estado/${state.slug}`), options)
    //   .then(({ data }) => console.log(data))
    //   .catch(error => {
    //     console.log(error.response.data)
    //   })
    // https://covid.pandemapa.com.br/tabela/br/estado/${state.slug}
    // axios.post(endpoint, makeBody(`https://covid.pandemapa.com.br/mapa/br/estado/${state.slug}/confirmados`), options)
    //   .then(({ data }) => console.log(data))
    // axios.post(endpoint, makeBody(`https://covid.pandemapa.com.br/mapa/br/estado/${state.slug}/mortes`), options)
    //   .then(({ data }) => console.log(data))
    // axios.post(endpoint, makeBody(`https://covid.pandemapa.com.br/mapa/br/estado/${state.slug}/confirmados`), options)
    //   .then(({ data }) => console.log(data))
    // console.log('Sitemap: https://covid.pandemapa.com.br/sitemap-br-' + state.slug + '.xml')
    // // console.log(`https://covid.pandemapa.com.br/mapa/br/estado/${state.slug}/confirmados`)
    // /// console.log(`https://covid.pandemapa.com.br/mapa/br/estado/${state.slug}/mortes`)
    // // console.log(`https://covid.pandemapa.com.br/tabela/br/estado/${state.slug}`)
  })
  // console.log(a)
  // axios.post(endpoint, body, options)
  //   .then(response => console.log(response.data))
  //   .catch(e => {
  //     console.log(e.response)
  //   })
  //
  // // const options = {
  // //   url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
  // //   method: 'POST',
  // //   // Your options, which must include the Content-Type and auth headers
  // //   headers: {
  // //     'Content-Type': 'application/json'
  // //   },
  // //   auth: { bearer: tokens.access_token },
  // //   // Define contents here. The structure of the content is described in the next step.
  // //   json: {
  // //     url: 'https://covid.pandemapa.com.br/mapa/br/estado/mg/mortes',
  // //     type: 'URL_UPDATED'
  // //   }
  // // }
  // // // eslint-disable-next-line handle-callback-err
  // // request(options, function (error, response, body) {
  // //   // Handle the response
  // //   console.log(body, error, response)
  // // })
})
