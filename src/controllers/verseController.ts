import { Request, Response } from 'express'
import https from 'https'

export const getDailyVerse = async (req: Request, res: Response) => {
  try {
    const options = {
      hostname: 'beta.ourmanna.com',
      path: '/api/v1/get/?format=json&order=daily',
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }

    const apiReq = https.request(options, (apiRes) => {
      let data = ''

      apiRes.on('data', (chunk) => {
        data += chunk
      })

      apiRes.on('end', () => {
        try {
          const parsed = JSON.parse(data)
          const verse = {
            text: parsed.verse.details.text,
            reference: parsed.verse.details.reference,
            version: parsed.verse.details.version
          }
          res.json({ verse })
        } catch (parseError) {
          res.status(500).json({ message: 'Failed to parse verse data' })
        }
      })
    })

    apiReq.on('error', (error) => {
      console.error('VERSE API ERROR:', error)
      res.status(500).json({ message: 'Failed to fetch verse', error: error.message })
    })

    apiReq.end()
  } catch (error) {
    console.error('GET VERSE ERROR:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}