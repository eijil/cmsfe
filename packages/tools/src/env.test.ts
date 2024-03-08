import { expect, test } from 'vitest'
import { env } from './env'

test('env test', ()=>{
  expect(env()).toBe('xx')
})